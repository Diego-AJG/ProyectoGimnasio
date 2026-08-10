const PagoModel = require('../models/pagoModel');
const SocioModel = require('../models/socioModel');

class PagoController {
    static async obtenerTodos(req, res) {
        try {
            const pagos = await PagoModel.obtenerTodos();
            res.json({ message: 'Pagos obtenidos', data: pagos });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async crear(req, res) {
        try {
            const { socio_id, monto, metodo_pago } = req.body;
            
            if (!socio_id || !monto || !metodo_pago) {
                return res.status(400).json({ error: 'Socio, monto y método de pago son requeridos' });
            }

            // Validar que el socio exista
            const socio = await SocioModel.buscarPorId(socio_id);
            if (!socio) {
                return res.status(404).json({ error: 'El socio seleccionado no existe' });
            }

            const nuevoId = await PagoModel.crear({ socio_id, monto, metodo_pago });
            res.status(201).json({ message: 'Pago registrado exitosamente', pagoId: nuevoId });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async eliminar(req, res) {
        try {
            const { id } = req.params;
            await PagoModel.eliminar(id);
            res.json({ message: 'Pago eliminado' });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = PagoController;