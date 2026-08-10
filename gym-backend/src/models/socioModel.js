const db = require('../config/db');

class SocioModel {
    // Obtener todos los socios
    static async obtenerTodos() {
        const [rows] = await db.query(
            'SELECT * FROM socios ORDER BY id DESC'
        );
        return rows;
    }

    // Buscar socio por ID
    static async buscarPorId(id) {
        const [rows] = await db.query(
            'SELECT * FROM socios WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    // Buscar socio por email
    static async buscarPorEmail(email) {
        const [rows] = await db.query(
            'SELECT * FROM socios WHERE email = ?',
            [email]
        );
        return rows[0];
    }

    // Crear nuevo socio
    static async crear(data) {
        const { nombre, apellido, email, telefono, fecha_registro, estado } = data;
        const [result] = await db.query(
            'INSERT INTO socios (nombre, apellido, email, telefono, fecha_registro, estado) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, apellido, email, telefono, fecha_registro, estado || 'activo']
        );
        return result.insertId;
    }

    // Actualizar socio
    static async actualizar(id, data) {
        const { nombre, apellido, email, telefono, estado } = data;
        await db.query(
            'UPDATE socios SET nombre = ?, apellido = ?, email = ?, telefono = ?, estado = ? WHERE id = ?',
            [nombre, apellido, email, telefono, estado, id]
        );
        return true;
    }

    // Eliminar socio
    static async eliminar(id) {
        await db.query('DELETE FROM socios WHERE id = ?', [id]);
        return true;
    }
}

module.exports = SocioModel;