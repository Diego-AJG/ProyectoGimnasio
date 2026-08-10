const express = require('express');
const router = express.Router();
const RutinaController = require('../controllers/rutinaController');
const { verificarToken } = require('../middleware/auth');

router.use(verificarToken);
router.get('/', RutinaController.obtenerTodos);
router.post('/', RutinaController.crear);
router.put('/:id', RutinaController.actualizar);
router.delete('/:id', RutinaController.eliminar);

module.exports = router;