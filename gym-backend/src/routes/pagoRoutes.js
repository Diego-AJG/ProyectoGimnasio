const express = require('express');
const router = express.Router();
const PagoController = require('../controllers/pagoController');
const { verificarToken } = require('../middleware/auth');

router.use(verificarToken);
router.get('/', PagoController.obtenerTodos);
router.post('/', PagoController.crear);
router.delete('/:id', PagoController.eliminar);

module.exports = router;