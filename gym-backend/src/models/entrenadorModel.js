const db = require('../config/db');

class EntrenadorModel {
    static async obtenerTodos() {
        const [rows] = await db.query('SELECT * FROM entrenadores ORDER BY id DESC');
        return rows;
    }

    static async buscarPorId(id) {
        const [rows] = await db.query('SELECT * FROM entrenadores WHERE id = ?', [id]);
        return rows[0];
    }

    static async crear(data) {
        const { nombre, especialidad, telefono } = data;
        const [result] = await db.query(
            'INSERT INTO entrenadores (nombre, especialidad, telefono) VALUES (?, ?, ?)',
            [nombre, especialidad, telefono]
        );
        return result.insertId;
    }

    static async actualizar(id, data) {
        const { nombre, especialidad, telefono } = data;
        await db.query(
            'UPDATE entrenadores SET nombre = ?, especialidad = ?, telefono = ? WHERE id = ?',
            [nombre, especialidad, telefono, id]
        );
        return true;
    }

    static async eliminar(id) {
        await db.query('DELETE FROM entrenadores WHERE id = ?', [id]);
        return true;
    }
}
module.exports = EntrenadorModel;