const db = require('../config/db');

class PagoModel {
    static async obtenerTodos() {
        // Unimos con la tabla socios para mostrar el nombre del socio en la lista
        const [rows] = await db.query(`
            SELECT p.id, p.monto, p.fecha_pago, p.metodo_pago, s.nombre AS socio_nombre, s.apellido AS socio_apellido
            FROM pagos p
            INNER JOIN socios s ON p.socio_id = s.id
            ORDER BY p.fecha_pago DESC
        `);
        return rows;
    }

    static async buscarPorId(id) {
        const [rows] = await db.query('SELECT * FROM pagos WHERE id = ?', [id]);
        return rows[0];
    }

    static async crear(data) {
        const { socio_id, monto, metodo_pago } = data;
        const [result] = await db.query(
            'INSERT INTO pagos (socio_id, monto, metodo_pago) VALUES (?, ?, ?)',
            [socio_id, monto, metodo_pago]
        );
        return result.insertId;
    }

    static async eliminar(id) {
        await db.query('DELETE FROM pagos WHERE id = ?', [id]);
        return true;
    }
}

module.exports = PagoModel;