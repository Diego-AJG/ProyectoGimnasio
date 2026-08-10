const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// ✅ Estas rutas SON PÚBLICAS. No deben tener middleware de autenticación.
router.post('/registro', AuthController.registrar);
router.post('/login', AuthController.login);

module.exports = router;