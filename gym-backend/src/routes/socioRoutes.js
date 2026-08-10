const express = require('express');
const router = express.Router();
const SocioController = require('../controllers/socioController');
const { verificarToken, verificarRol } = require('../middleware/auth');

// Todas las rutas de socios requieren autenticación
router.use(verificarToken);

// Rutas CRUD
router.get('/', SocioController.obtenerTodos);
router.get('/:id', SocioController.obtenerPorId);
router.post('/', SocioController.crear);
router.put('/:id', SocioController.actualizar);
router.delete('/:id', SocioController.eliminar);

module.exports = router;