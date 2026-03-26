# Dental Clinic Web 🦷

Este proyecto contiene el sistema integral para la gestión de una Clínica Dental, comenzando por la migración de su base de datos original (Microsoft Access) hacia Supabase (PostgreSQL) y posteriormente el desarrollo de la aplicación web.

## Estructura del Proyecto

- `migrar-access/`: Scripts y utilidades para el proceso ETL (Extracción, Transformación y Carga) desde MS Access hacia PostgreSQL/Supabase.
  - `extract.ps1`: Script en PowerShell para exportar tablas desde `.accdb` a archivos `.csv`.
  - `etl_migration.py`: Script en Python (Pandas) para transformar, limpiar (deduplicar) y generar el archivo SQL de siembra (`data_seed.sql`).
  - `schema.sql`: Esquema SQL de las tablas en PostgreSQL.
  - `requirements.txt`: Dependencias de Python necesarias para la migración.

## Flujo de Migración a Supabase

1. Extraer los datos a CSV:
   ```powershell
   cd migrar-access
   .\extract.ps1
   ```
2. Transformar a SQL:
   ```bash
   cd migrar-access
   pip install -r requirements.txt
   python etl_migration.py
   ```
3. Ejecutar los SQL generados:
   - En el SQL Editor de Supabase, ejecuta primero `schema.sql`.
   - Luego, ejecuta `data_seed.sql` para poblar la base de datos con tu información histórica.

## Aplicación Web (Próximamente)

La aplicación web será desarrollada con **Next.js** (App Router) e integrada fuertemente con **Supabase** para la autenticación y la gestión de la base de datos.
