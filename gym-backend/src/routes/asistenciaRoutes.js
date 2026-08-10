const express = require('express');
const router = express.Router();
const AsistenciaController = require('../controllers/asistenciaController');
const { verificarToken } = require('../middleware/auth');

router.use(verificarToken);
router.get('/', AsistenciaController.obtenerTodos);
router.post('/', AsistenciaController.crear);
router.delete('/:id', AsistenciaController.eliminar);

module.exports = router;