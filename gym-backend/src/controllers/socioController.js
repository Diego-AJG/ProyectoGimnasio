const SocioModel = require('../models/socioModel');

class SocioController {
    // Obtener todos los socios
    static async obtenerTodos(req, res) {
        try {
            const socios = await SocioModel.obtenerTodos();
            res.json({
                message: 'Socios obtenidos exitosamente',
                data: socios
            });
        } catch (error) {
            console.error('Error al obtener socios:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor' 
            });
        }
    }

    // Obtener socio por ID
    static async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const socio = await SocioModel.buscarPorId(id);

            if (!socio) {
                return res.status(404).json({ 
                    error: 'Socio no encontrado' 
                });
            }

            res.json({
                message: 'Socio encontrado',
                data: socio
            });
        } catch (error) {
            console.error('Error al obtener socio:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor' 
            });
        }
    }

    // Crear nuevo socio
    static async crear(req, res) {
        try {
            const { nombre, apellido, email, telefono, fecha_registro, estado } = req.body;

            // Validaciones
            if (!nombre || !apellido || !email || !fecha_registro) {
                return res.status(400).json({ 
                    error: 'Nombre, apellido, email y fecha de registro son requeridos' 
                });
            }

            // Verificar si el email ya existe
            const socioExistente = await SocioModel.buscarPorEmail(email);
            if (socioExistente) {
                return res.status(409).json({ 
                    error: 'El email ya está registrado' 
                });
            }

            // Crear socio
            const nuevoSocioId = await SocioModel.crear({
                nombre,
                apellido,
                email,
                telefono: telefono || '',
                fecha_registro,
                estado: estado || 'activo'
            });

            res.status(201).json({
                message: 'Socio registrado exitosamente',
                socioId: nuevoSocioId
            });

        } catch (error) {
            console.error('Error al crear socio:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor' 
            });
        }
    }

    // Actualizar socio
    static async actualizar(req, res) {
        try {
            const { id } = req.params;
            const { nombre, apellido, email, telefono, estado } = req.body;

            // Validaciones
            if (!nombre || !apellido || !email) {
                return res.status(400).json({ 
                    error: 'Nombre, apellido y email son requeridos' 
                });
            }

            // Verificar si el socio existe
            const socio = await SocioModel.buscarPorId(id);
            if (!socio) {
                return res.status(404).json({ 
                    error: 'Socio no encontrado' 
                });
            }

            // Actualizar
            await SocioModel.actualizar(id, {
                nombre,
                apellido,
                email,
                telefono: telefono || '',
                estado: estado || 'activo'
            });

            res.json({
                message: 'Socio actualizado exitosamente'
            });

        } catch (error) {
            console.error('Error al actualizar socio:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor' 
            });
        }
    }

    // Eliminar socio
    static async eliminar(req, res) {
        try {
            const { id } = req.params;

            // Verificar si el socio existe
            const socio = await SocioModel.buscarPorId(id);
            if (!socio) {
                return res.status(404).json({ 
                    error: 'Socio no encontrado' 
                });
            }

            // Eliminar
            await SocioModel.eliminar(id);

            res.json({
                message: 'Socio eliminado exitosamente'
            });

        } catch (error) {
            console.error('Error al eliminar socio:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor' 
            });
        }
    }
}

module.exports = SocioController;