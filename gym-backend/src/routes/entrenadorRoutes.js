const express = require('express');
const router = express.Router();
const EntrenadorController = require('../controllers/entrenadorController');
const { verificarToken } = require('../middleware/auth');

router.use(verificarToken);
router.get('/', EntrenadorController.obtenerTodos);
router.post('/', EntrenadorController.crear);
router.put('/:id', EntrenadorController.actualizar);
router.delete('/:id', EntrenadorController.eliminar);

module.exports = router;