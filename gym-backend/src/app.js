const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
// Configuración de CORS optimizada para despliegue (permite peticiones desde Vercel y localhost)
app.use(cors({
    origin: '*', // Permite peticiones desde cualquier origen (frontend desplegado)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

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
app.use('/api/asistencias', asistenciaRoutes); 

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
            entrenadores: '/api/entrenadores (requiere autenticación)'
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

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`API disponible en http://localhost:${PORT}/api`);
});