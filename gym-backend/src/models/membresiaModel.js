const db = require('../config/db');

class MembresiaModel {
    static async obtenerTodos() {
        const [rows] = await db.query('SELECT * FROM membresias ORDER BY id DESC');
        return rows;
    }

    static async buscarPorId(id) {
        const [rows] = await db.query('SELECT * FROM membresias WHERE id = ?', [id]);
        return rows[0];
    }

    static async crear(data) {
        const { nombre, duracion_meses, precio } = data;
        const [result] = await db.query(
            'INSERT INTO membresias (nombre, duracion_meses, precio) VALUES (?, ?, ?)',
            [nombre, duracion_meses, precio]
        );
        return result.insertId;
    }

    static async actualizar(id, data) {
        const { nombre, duracion_meses, precio } = data;
        await db.query(
            'UPDATE membresias SET nombre = ?, duracion_meses = ?, precio = ? WHERE id = ?',
            [nombre, duracion_meses, precio, id]
        );
        return true;
    }

    static async eliminar(id) {
        await db.query('DELETE FROM membresias WHERE id = ?', [id]);
        return true;
    }
}

module.exports = MembresiaModel;