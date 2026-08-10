const MembresiaModel = require('../models/membresiaModel');

class MembresiaController {
    static async obtenerTodos(req, res) {
        try {
            const membresias = await MembresiaModel.obtenerTodos();
            res.json({ message: 'Membresías obtenidas', data: membresias });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async crear(req, res) {
        try {
            const { nombre, duracion_meses, precio } = req.body;
            if (!nombre || !duracion_meses || !precio) {
                return res.status(400).json({ error: 'Todos los campos son requeridos' });
            }
            
            const nuevoId = await MembresiaModel.crear({ nombre, duracion_meses, precio });
            res.status(201).json({ message: 'Membresía registrada', membresiaId: nuevoId });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async actualizar(req, res) {
        try {
            const { id } = req.params;
            await MembresiaModel.actualizar(id, req.body);
            res.json({ message: 'Membresía actualizada' });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async eliminar(req, res) {
        try {
            const { id } = req.params;
            await MembresiaModel.eliminar(id);
            res.json({ message: 'Membresía eliminada' });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = MembresiaController;