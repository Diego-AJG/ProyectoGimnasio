const express = require('express');
const router = express.Router();
const MembresiaController = require('../controllers/membresiaController');
const { verificarToken } = require('../middleware/auth');

router.use(verificarToken);
router.get('/', MembresiaController.obtenerTodos);
router.post('/', MembresiaController.crear);
router.put('/:id', MembresiaController.actualizar);
router.delete('/:id', MembresiaController.eliminar);

module.exports = router;