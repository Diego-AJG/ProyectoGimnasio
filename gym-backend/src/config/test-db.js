const db = require('./db');

async function probarConexion() {
    console.log('Intentando conectar a la base de datos...');
    try {
        // Intentar obtener una conexión del pool
        const connection = await db.getConnection();
        console.log('✅ ¡Conexión exitosa a MySQL!');
        console.log(' Base de datos conectada:', connection.config.database);
        
        // Liberar la conexión de vuelta al pool
        connection.release();
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:');
        console.error('Mensaje:', error.message);
        console.error('Código de error:', error.code);
    }
}

probarConexion();