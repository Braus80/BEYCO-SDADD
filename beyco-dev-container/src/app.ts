import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Rutas de ejemplo
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la aplicación Beyco!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});