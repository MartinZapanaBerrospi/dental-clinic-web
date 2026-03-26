const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function syncDatabase() {
  const password = process.env.SUPABASE_DB_PASSWORD;
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  if (!password || !projectUrl) {
    console.error('❌ Error: SUPABASE_DB_PASSWORD o NEXT_PUBLIC_SUPABASE_URL no están configurados en .env.local');
    process.exit(1);
  }

  // Extraer el project ref de la URL: https://[REF].supabase.co
  const projectRef = projectUrl.split('//')[1].split('.')[0];
  
  // Codificamos el password para manejar el @ y otros caracteres especiales
  const encodedPassword = encodeURIComponent(password);
  
  // Usamos el host del pooler pero intentamos el puerto 5432 que respondió al telnet
  const connectionString = `postgresql://postgres.${projectRef}:${encodedPassword}@aws-1-us-east-1.pooler.supabase.com:5432/postgres`;

  console.log(`\n🚀 Intentando conectar a: aws-1-us-east-1.pooler.supabase.com:5432`);
  const client = new Client({ 
    connectionString,
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 10000 
  });

  try {
    console.log('⏳ Estableciendo conexión...');
    await client.connect();
    console.log('✅ ¡Conexión exitosa a la base de datos!');
    console.log('✅ Conexión establecida.');

    const schemaPath = path.join(__dirname, 'migrar-access', 'schema.sql');
    const dataPath = path.join(__dirname, 'migrar-access', 'data_seed.sql');

    console.log('\n📝 Ejecutando schema.sql...');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schemaSql);
    console.log('✅ Estructura de tablas creada/reiniciada.');

    console.log('\n📊 Ejecutando data_seed.sql (esto puede tardar unos segundos)...');
    const dataSql = fs.readFileSync(dataPath, 'utf8');
    await client.query(dataSql);
    console.log('✅ Semilla de datos insertada correctamente.');

    console.log('\n✨ ¡Sincronización completada con éxito!');
  } catch (err) {
    console.error('\n❌ Error durante la sincronización:');
    console.error(err.message);
    if (err.message.includes('authentication failed')) {
      console.error('👉 Tip: Verifica que la contraseña del DB sea correcta y que no tenga caracteres especiales sin escapar si usas un string de conexión (aunque aquí usamos objeto, revisa el arroba).');
    }
  } finally {
    await client.end();
  }
}

syncDatabase();
