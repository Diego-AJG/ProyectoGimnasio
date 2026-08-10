const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const socioRoutes = require('./routes/socioRoutes');
const entrenadorRoutes = require('./routes/entrenadorRoutes'); 
const membresiaRoutes = require('./routes/membresiaRoutes');
const pagoRoutes = require('./routes/pagoRoutes');
const rutinaRoutes = require('./routes/rutinaRoutes');
const asistenciaRoutes = require('./routes/asistenciaRoutes');


// RUTAS PÚBLICAS
app.use('/api/auth', authRoutes);

// RUTAS PROTEGIDAS
app.use('/api/socios', socioRoutes);
app.use('/api/entrenadores', entrenadorRoutes);
app.use('/api/membresias', membresiaRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/rutinas', rutinaRoutes);
app.use('/api/asistencias', asistenciaRoutes); // <-- ¡ESTA ERA LA LÍNEA QUE FALTABA!

// Ruta de prueba pública
app.get('/api', (req, res) => {
    res.json({ 
        message: 'API del Gimnasio funcionando correctamente',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            login: '/api/auth/login',
            registro: '/api/auth/registro',
            socios: '/api/socios (requiere autenticación)',
            entrenadores: '/api/entrenadores (requiere autenticación)' // Agregado para referencia
        }
    });
});

// Ruta principal
app.get('/', (req, res) => {
    res.json({ 
        message: 'Bienvenido a la API del Gimnasio',
        version: '1.0.0',
        documentation: '/api'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`API disponible en http://localhost:${PORT}/api`);
});