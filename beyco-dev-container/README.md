# Beyco Development Container

Este proyecto utiliza un contenedor de desarrollo para facilitar el desarrollo y la ejecución de la aplicación. A continuación se detallan las instrucciones para configurar y ejecutar el proyecto.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- Docker
- Visual Studio Code
- La extensión "Remote - Containers" para Visual Studio Code

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de archivos:

```
beyco-dev-container
├── .devcontainer
│   ├── devcontainer.json
│   └── docker-compose.yml
├── src
│   └── app.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Configuración del Contenedor de Desarrollo

1. Abre la carpeta `beyco-dev-container` en Visual Studio Code.
2. Haz clic en el icono de "Reabrir en contenedor" en la esquina inferior izquierda de la ventana de Visual Studio Code.
3. Visual Studio Code construirá el contenedor utilizando la configuración especificada en `.devcontainer/devcontainer.json` y `.devcontainer/docker-compose.yml`.

## Ejecución de la Aplicación

Una vez que el contenedor esté en funcionamiento, puedes ejecutar la aplicación siguiendo estos pasos:

1. Abre una terminal dentro del contenedor.
2. Navega al directorio `src`.
3. Ejecuta el siguiente comando para iniciar la aplicación:

   ```
   npm start
   ```

La aplicación estará disponible en `http://localhost:3000`.

## Notas

- Asegúrate de cambiar las contraseñas y configuraciones sensibles en el archivo `docker-compose.yml` antes de ejecutar el contenedor.
- Puedes agregar más dependencias al archivo `package.json` según sea necesario para tu proyecto.