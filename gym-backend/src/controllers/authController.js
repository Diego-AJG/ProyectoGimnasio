const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuarioModel');

class AuthController {
    // Registro de usuario (solo para crear el primer admin)
    static async registrar(req, res) {
        try {
            const { username, password, rol } = req.body;

            // Validaciones
            if (!username || !password) {
                return res.status(400).json({ 
                    error: 'Username y password son requeridos' 
                });
            }

            // Verificar si el usuario ya existe
            const usuarioExistente = await UsuarioModel.buscarPorUsername(username);
            if (usuarioExistente) {
                return res.status(409).json({ 
                    error: 'El usuario ya existe' 
                });
            }

            // Hashear contraseña
            const passwordHash = await UsuarioModel.hashearPassword(password);

            // Crear usuario
            const nuevoUsuarioId = await UsuarioModel.crear(
                username, 
                passwordHash, 
                rol || 'admin'
            );

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                return res.status(400).json({ error: 'El formato del email no es válido' });
            }

            // Validar longitud mínima de contraseña
            if (password.length < 6) {
                return res.status(400).json({ 
                    error: 'La contraseña debe tener al menos 6 caracteres' 
                });
            }

            res.status(201).json({
                message: 'Usuario registrado exitosamente',
                userId: nuevoUsuarioId
            });

        } catch (error) {
            console.error('Error en registro:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor' 
            });
        }
    }
    

    // Login
    static async login(req, res) {
        try {
            const { username, password } = req.body;

            // Validaciones
            if (!username || !password) {
                return res.status(400).json({ 
                    error: 'Username y password son requeridos' 
                });
            }

            // Buscar usuario
            const usuario = await UsuarioModel.buscarPorUsername(username);
            if (!usuario) {
                return res.status(401).json({ 
                    error: 'Credenciales inválidas' 
                });
            }

            // Verificar contraseña
            const passwordValido = await UsuarioModel.verificarPassword(
                password, 
                usuario.password_hash
            );

            if (!passwordValido) {
                return res.status(401).json({ 
                    error: 'Credenciales inválidas' 
                });
            }

            // Generar token JWT
            const token = jwt.sign(
                {
                    id: usuario.id,
                    username: usuario.username,
                    rol: usuario.rol
                },
                process.env.JWT_SECRET,
                { expiresIn: '8h' } // El token expira en 8 horas
            );

            res.json({
                message: 'Login exitoso',
                token: token,
                usuario: {
                    id: usuario.id,
                    username: usuario.username,
                    rol: usuario.rol
                }
            });

        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor' 
            });
        }
    }
}

module.exports = AuthController;