<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# BEYCO-SDADD

Sistema informático para automatizar la generación de documentos administrativos en Consultores BEYCO y Asociados, reduciendo el tiempo operativo en la elaboración de exámenes, registros de asistencia, DC-3 y diplomas.

---

## 🛠️ Tecnologías Utilizadas

* **Backend:** Node.js, Express.js
* **Base de Datos:** MySQL
* **Entorno de Desarrollo:** Docker

---

## 🚀 Cómo Empezar (Entorno de Desarrollo con Docker)

Este proyecto está 100% dockerizado, por lo que no necesitas instalar MySQL o Node.js en tu máquina.

### **Prerrequisitos**

* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/products/docker-desktop/) y Docker Compose
* [Visual Studio Code](https://code.visualstudio.com/) (Recomendado)

### **Instalación y Despliegue**

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/Braus80/BEYCO-SDADD.git](https://github.com/Braus80/BEYCO-SDADD.git)
    ```
2.  **Navega al directorio del proyecto:**
    ```bash
    cd BEYCO-SDADD
    ```
3.  **Levanta los contenedores:**
    ```bash
    docker-compose up --build
    ```
4.  **¡Listo!**
    * Tu aplicación estará corriendo en `http://localhost:3000`.
    * La base de datos MySQL estará accesible en el puerto `3306`.

### **Conexión a la Base de Datos**
* **Host:** `127.0.0.1`
* **Port:** `3306`
* **User:** `beyco_user`
* **Password:** `your_strong_user_password`
* **Database:** `beyco_db`

---

## 📝 Descripción Detallada del Proyecto

Este sistema fue diseñado para optimizar los procesos de Consultores BEYCO y Asociados, una empresa de capacitación en Seguridad, Salud e Higiene Industrial. El objetivo es reducir el tiempo y los errores en la generación de resultados de exámenes, registros de asistencia, formatos DC-3 y diplomas.

### **Problemática**

Actualmente, el personal invierte aproximadamente 1.5 horas para generar la documentación de un grupo de 15 empleados. Este proceso manual es repetitivo y propenso a errores.

### **Características Principales**

* **Gestión de Usuarios:** Autenticación por roles (administrador, secretaria, instructor).
* **Generación de Documentos:** Emisión automática de formatos DC-3 y diplomas.
* **Control de Cursos:** Consulta de historial y cursos activos.
* **Registro Académico:** Gestión de asistencia y calificaciones.
* **Generación de Reportes:** Creación de reportes en PDF/Excel.

### **Metodología**

El desarrollo se guió por la metodología **Rational Unified Process (RUP)**. Este proyecto fue desarrollado en el Instituto Tecnológico de Saltillo para la materia de Fundamentos de Ingeniería de Software.

---

## ✍️ Autores

* Armando Becerra García
* Mauricio Emmanuel García Valerio
* Edgar Alonso Carrillo Quijano
* Jose Enrique Vazquez Garcia

## 📖 Documentación

* [Ver explicación detallada de la Base de Datos](docs/database_setup.md)
>>>>>>> 6f6b07da5817e7493d9e1d06173fe40717ef91b5
