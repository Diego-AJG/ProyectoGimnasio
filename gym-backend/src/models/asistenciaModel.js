const db = require('../config/db');

class AsistenciaModel {
    static async obtenerTodos() {
        const [rows] = await db.query(`
            SELECT a.id, a.fecha_entrada, s.nombre AS socio_nombre, s.apellido AS socio_apellido
            FROM asistencias a
            INNER JOIN socios s ON a.socio_id = s.id
            ORDER BY a.fecha_entrada DESC
        `);
        return rows;
    }

    static async buscarPorId(id) {
        const [rows] = await db.query('SELECT * FROM asistencias WHERE id = ?', [id]);
        return rows[0];
    }

    static async crear(data) {
        const { socio_id } = data;
        const [result] = await db.query(
            'INSERT INTO asistencias (socio_id) VALUES (?)',
            [socio_id]
        );
        return result.insertId;
    }

    static async eliminar(id) {
        await db.query('DELETE FROM asistencias WHERE id = ?', [id]);
        return true;
    }
}

module.exports = AsistenciaModel;