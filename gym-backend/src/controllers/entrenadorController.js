const EntrenadorModel = require('../models/entrenadorModel');

class EntrenadorController {
    static async obtenerTodos(req, res) {
        try {
            const entrenadores = await EntrenadorModel.obtenerTodos();
            res.json({ message: 'Entrenadores obtenidos', data: entrenadores });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async crear(req, res) {
        try {
            const { nombre, especialidad, telefono } = req.body;
            if (!nombre || !especialidad) return res.status(400).json({ error: 'Nombre y especialidad son requeridos' });
            
            const nuevoId = await EntrenadorModel.crear({ nombre, especialidad, telefono });
            res.status(201).json({ message: 'Entrenador registrado', entrenadorId: nuevoId });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async actualizar(req, res) {
        try {
            const { id } = req.params;
            await EntrenadorModel.actualizar(id, req.body);
            res.json({ message: 'Entrenador actualizado' });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async eliminar(req, res) {
        try {
            const { id } = req.params;
            await EntrenadorModel.eliminar(id);
            res.json({ message: 'Entrenador eliminado' });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}
module.exports = EntrenadorController;