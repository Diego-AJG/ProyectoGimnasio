const RutinaModel = require('../models/rutinaModel');

class RutinaController {
    static async obtenerTodos(req, res) {
        try {
            const rutinas = await RutinaModel.obtenerTodos();
            res.json({ message: 'Rutinas obtenidas', data: rutinas });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async crear(req, res) {
        try {
            const { entrenador_id, nombre, descripcion } = req.body;
            if (!entrenador_id || !nombre) {
                return res.status(400).json({ error: 'Entrenador y nombre son requeridos' });
            }
            const nuevoId = await RutinaModel.crear({ entrenador_id, nombre, descripcion });
            res.status(201).json({ message: 'Rutina registrada', rutinaId: nuevoId });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async actualizar(req, res) {
        try {
            const { id } = req.params;
            await RutinaModel.actualizar(id, req.body);
            res.json({ message: 'Rutina actualizada' });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async eliminar(req, res) {
        try {
            const { id } = req.params;
            await RutinaModel.eliminar(id);
            res.json({ message: 'Rutina eliminada' });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = RutinaController;