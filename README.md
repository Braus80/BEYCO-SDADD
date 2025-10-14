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