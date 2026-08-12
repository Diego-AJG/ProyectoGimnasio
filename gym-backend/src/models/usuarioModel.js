const db = require('../config/db');
const bcrypt = require('bcryptjs');

class UsuarioModel {
    // Buscar usuario por username
    static async buscarPorUsername(username) {
        const [rows] = await db.query(
            'SELECT * FROM usuarios WHERE username = ?',
            [username]
        );
        return rows[0];
    }

    // Crear nuevo usuario
    static async crear(username, passwordHash, rol) {
        const [result] = await db.query(
            'INSERT INTO usuarios (username, password, rol) VALUES (?, ?, ?)',
            [username, passwordHash, rol]
        );
        return result.insertId;
    }

    // Verificar contraseña
    static async verificarPassword(password, passwordHash) {
        return await bcrypt.compare(password, passwordHash);
    }

    // Hashear contraseña
    static async hashearPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
}

module.exports = UsuarioModel;