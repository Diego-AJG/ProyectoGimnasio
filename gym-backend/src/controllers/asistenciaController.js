const AsistenciaModel = require('../models/asistenciaModel');
const SocioModel = require('../models/socioModel');

class AsistenciaController {
    static async obtenerTodos(req, res) {
        try {
            const asistencias = await AsistenciaModel.obtenerTodos();
            res.json({ message: 'Asistencias obtenidas', data: asistencias });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async crear(req, res) {
        try {
            const { socio_id } = req.body;
            
            if (!socio_id) {
                return res.status(400).json({ error: 'El socio es requerido' });
            }

            // Validar que el socio exista
            const socio = await SocioModel.buscarPorId(socio_id);
            if (!socio) {
                return res.status(404).json({ error: 'El socio seleccionado no existe' });
            }

            const nuevoId = await AsistenciaModel.crear({ socio_id });
            res.status(201).json({ message: 'Asistencia registrada exitosamente', asistenciaId: nuevoId });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async eliminar(req, res) {
        try {
            const { id } = req.params;
            await AsistenciaModel.eliminar(id);
            res.json({ message: 'Asistencia eliminada' });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = AsistenciaController;