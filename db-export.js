const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function exportDatabase() {
  const password = process.env.SUPABASE_DB_PASSWORD;
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  if (!password || !projectUrl) {
    console.error('❌ Error: SUPABASE_DB_PASSWORD o NEXT_PUBLIC_SUPABASE_URL no están configurados en .env.local');
    process.exit(1);
  }

  const projectRef = projectUrl.split('//')[1].split('.')[0];
  const encodedPassword = encodeURIComponent(password);
  const connectionString = `postgresql://postgres.${projectRef}:${encodedPassword}@aws-1-us-east-1.pooler.supabase.com:5432/postgres`;

  const client = new Client({ 
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('⏳ Conectando a Supabase para exportar datos...');
    await client.connect();

    const tables = ['treatments', 'doctors', 'patients', 'appointments', 'payments', 'patient_guardians', 'patient_treatments'];
    let sqlContent = `-- PostgreSQL Data Export (${new Date().toLocaleString('es-PE')})\n`;
    sqlContent += `-- Este script contiene el estado actual de la base de datos para usar como semilla.\n\n`;
    
    // Add Truncates
    sqlContent += `-- 0. Cleanup\n`;
    tables.slice().reverse().forEach(table => {
      sqlContent += `TRUNCATE TABLE ${table} CASCADE;\n`;
    });
    sqlContent += `\n`;

    for (const table of tables) {
      console.log(`📦 Exportando tabla: ${table}...`);
      const { rows } = await client.query(`SELECT * FROM ${table} ORDER BY id ASC`);
      
      if (rows.length === 0) continue;

      const columns = Object.keys(rows[0]);
      sqlContent += `-- Table: ${table}\n`;
      
      for (const row of rows) {
        const values = columns.map(col => {
          const val = row[col];
          if (val === null) return 'NULL';
          if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
          if (val instanceof Date) return `'${val.toISOString().split('T')[0]}'`;
          return val;
        });
        sqlContent += `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${values.join(', ')}) ON CONFLICT (id) DO UPDATE SET ${columns.map(c => `${c} = EXCLUDED.${c}`).join(', ')};\n`;
      }
      sqlContent += `\n`;
    }

    // Add Sequences Reset
    sqlContent += `-- Reset Sequences\n`;
    tables.forEach(table => {
      sqlContent += `SELECT setval('${table}_id_seq', COALESCE((SELECT MAX(id)+1 FROM ${table}), 1), false);\n`;
    });

    const exportPath = path.join(__dirname, 'migrar-access', 'data_seed.sql');
    fs.writeFileSync(exportPath, sqlContent);
    console.log(`\n✅ ¡Éxito! Datos exportados a: ${exportPath}`);
    console.log(`🚀 Ahora puedes usar 'npm run db:reset' sin miedo a perder tus nuevos datos.`);

  } catch (err) {
    console.error('❌ Error fatal:', err.message);
  } finally {
    await client.end();
  }
}

exportDatabase();
