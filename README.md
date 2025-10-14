# BEYCO-SDADD
Sistema informático para automatizar la generación de documentos administrativos en Consultores BEYCO y Asociados, reduciendo el tiempo operativo en la elaboración de exámenes, registros de asistencia, DC-3 y diplomas. [cite: 94]
# Sistema de Automatización de Documentos para BEYCO (SDADD)

[cite_start]Proyecto universitario para la materia de Fundamentos de Ingeniería de Software [cite: 5][cite_start], desarrollado en el Instituto Tecnológico de Saltillo[cite: 4].

## Descripción del Proyecto

[cite_start]Este sistema fue diseñado para optimizar y automatizar los procesos operativos de Consultores BEYCO y Asociados, una empresa dedicada a la capacitación en Seguridad, Salud e Higiene Industrial[cite: 38]. [cite_start]El objetivo principal es reducir significativamente el tiempo y los errores asociados con la generación manual de documentos como resultados de exámenes, registros de asistencia, formatos DC-3 y diplomas[cite: 41, 44, 94].

### Problemática a Resolver

[cite_start]Actualmente, el personal de BEYCO invierte aproximadamente 1.5 horas para generar la documentación de un solo grupo de 15 empleados[cite: 42, 81]. [cite_start]Este proceso manual en hojas de Excel es repetitivo, propenso a errores y limita la capacidad operativa de la empresa[cite: 80, 82]. [cite_start]El SDADD centraliza la información y automatiza estas tareas[cite: 90].

## Características Principales (Requerimientos Funcionales)

* [cite_start]**Gestión de Usuarios:** Autenticación segura por roles (administrador, secretaria, instructor)[cite: 109, 106].
* [cite_start]**Generación de Documentos:** Emisión automática de formatos DC-3 y diplomas personalizados en lote[cite: 106, 109].
* [cite_start]**Control de Cursos:** Consulta de cursos activos e historial de cursos finalizados[cite: 106].
* [cite_start]**Registro Académico:** Gestión de asistencia, registro de calificaciones y subida de evidencia fotográfica por sesión[cite: 106].
* [cite_start]**Generación de Reportes:** Creación de reportes en PDF/Excel con filtros por curso, fecha o instructor[cite: 106].
* [cite_start]**Gestión de Empresas:** Administración del catálogo de empresas clientes[cite: 109].

## Metodología

[cite_start]El desarrollo del proyecto se guió por la metodología **Rational Unified Process (RUP)**, utilizando un enfoque iterativo e incremental para el análisis y diseño del sistema[cite: 46, 102].
# BEYCO-SDADD

Descripción breve de lo que hace el proyecto.

---

## 🚀 Cómo Empezar (Entorno de Desarrollo con Docker)

Este proyecto está 100% dockerizado, por lo que no necesitas instalar MySQL o Node.js/Python/PHP en tu máquina.

### **Prerrequisitos**

Asegúrate de tener instalado lo siguiente:
* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/products/docker-desktop/) y Docker Compose
* [Visual Studio Code](https://code.visualstudio.com/)
* La extensión [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) para VS Code (Recomendado).

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
    Este único comando hará todo lo siguiente:
    * Construirá la imagen de la aplicación.
    * Creará y configurará el contenedor de la base de datos MySQL.
    * Inicializará la base de datos con el esquema que se encuentra en `db-init/init.sql`.
    * Iniciará la aplicación y la conectará a la base de datos.

4.  **¡Listo!**
    * Tu aplicación estará corriendo en `http://localhost:3000` (o el puerto que hayas configurado).
    * La base de datos MySQL estará accesible en el puerto `3306` de tu máquina local.

### **Desarrollo Profesional con VS Code Dev Containers**
La forma recomendada de trabajar es desarrollar *dentro* del contenedor para tener un entorno consistente.

1.  Abre la carpeta del proyecto en VS Code.
2.  VS Code detectará la configuración y te mostrará una notificación. Haz clic en **"Reopen in Container"**.
3.  ¡Listo! Ahora tu terminal y todas las herramientas de VS Code se están ejecutando dentro del contenedor de la aplicación.

### **Conexión a la Base de Datos**
Puedes conectarte a la base de datos desde tu herramienta preferida (TablePlus, DBeaver, MySQL Workbench) con los siguientes datos:
* **Host:** `127.0.0.1` o `localhost`
* **Port:** `3306`
* **User:** `beyco_user` (definido en `docker-compose.yml`)
* **Password:** `your_strong_user_password` (definido en `docker-compose.yml`)
* **Database:** `beyco_db` (definido en `docker-compose.yml`)

## Autores

* [cite_start]Armando Becerra García [cite: 6]
* [cite_start]Mauricio Emmanuel García Valerio [cite: 7]
* [cite_start]Edgar Alonso Carrillo Quijano   [cite: 8]
* [cite_start]Jose Enrique Vazquez Garcia[cite: 9]
