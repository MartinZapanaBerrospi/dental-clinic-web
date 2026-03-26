# 🦷 Clínica Dental Web - Sistema de Gestión Moderno

Este proyecto representa la migración completa de una base de datos heredada en Microsoft Access a una plataforma web moderna, escalable y profesional construida con **Next.js** y **Supabase**.

## 🚀 Resumen del Proyecto

El objetivo principal fue transformar un flujo de trabajo basado en archivos locales de Access hacia una infraestructura en la nube, permitiendo la gestión de pacientes, citas y finanzas desde cualquier dispositivo con una interfaz de usuario premium.

### 📋 Módulos Principales

- **📊 Dashboard de Control:** Vista general de la actividad de la clínica, métricas de pacientes y resumen de ingresos.
- **👥 Gestión de Pacientes:** Búsqueda inteligente en tiempo real, perfiles detallados, gestión de apoderados e historial clínico completo.
- **📅 Agenda de Citas:** Sistema de programación de citas con estados visuales (Asistió, Pendiente, No Show) y vinculación con doctores especialistas.
- **💰 Módulo Financiero:** Registro y seguimiento de pagos, proformas y métodos de pago (Yape, Visa, Efectivo).
- **📱 100% Responsivo:** Interfaz adaptable para móviles, tablets y escritorio, permitiendo a los doctores consultar datos desde sus teléfonos.

## 🛠️ Stack Tecnológico

- **Frontend:** [Next.js 15](https://nextjs.org/) (App Router), TypeScript.
- **Backend/Base de Datos:** [Supabase](https://supabase.com/) (PostgreSQL) con integridad referencial garantizada.
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) con una estética médica moderna (Teal/Slate).
- **Iconografía:** [Lucide React](https://lucide.dev/).
- **Migración (ETL):** Scripts en Python y PowerShell para la extracción, limpieza y carga de datos desde Access.

## 📥 Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/MartinZapanaBerrospi/dental-clinic-web.git
   cd dental-clinic-web
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env.local` en la raíz con tus credenciales de Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
   ```

4. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## 🏗️ Estructura del Proyecto

- `/src/app`: Rutas y páginas principales de la aplicación.
- `/src/components`: Componentes de UI, formularios y layout responsivo.
- `/src/lib`: Configuración del cliente de Supabase y utilidades.
- `/migrar-access`: Herramientas ETL utilizadas para la migración inicial de datos desde `.accdb` a PostgreSQL.

---

Desarrollado con enfoque en la **Experiencia de Usuario (UX)** y la **Integridad de Datos** médicos.
