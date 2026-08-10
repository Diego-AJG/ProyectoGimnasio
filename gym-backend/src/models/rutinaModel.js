const db = require('../config/db');

class RutinaModel {
    static async obtenerTodos() {
        const [rows] = await db.query(`
            SELECT r.id, r.nombre, r.descripcion, e.nombre AS entrenador_nombre 
            FROM rutinas r
            INNER JOIN entrenadores e ON r.entrenador_id = e.id
            ORDER BY r.id DESC
        `);
        return rows;
    }

    static async buscarPorId(id) {
        const [rows] = await db.query('SELECT * FROM rutinas WHERE id = ?', [id]);
        return rows[0];
    }

    static async crear(data) {
        const { entrenador_id, nombre, descripcion } = data;
        const [result] = await db.query(
            'INSERT INTO rutinas (entrenador_id, nombre, descripcion) VALUES (?, ?, ?)',
            [entrenador_id, nombre, descripcion]
        );
        return result.insertId;
    }

    static async actualizar(id, data) {
        const { entrenador_id, nombre, descripcion } = data;
        await db.query(
            'UPDATE rutinas SET entrenador_id = ?, nombre = ?, descripcion = ? WHERE id = ?',
            [entrenador_id, nombre, descripcion, id]
        );
        return true;
    }

    static async eliminar(id) {
        await db.query('DELETE FROM rutinas WHERE id = ?', [id]);
        return true;
    }
}

module.exports = RutinaModel;