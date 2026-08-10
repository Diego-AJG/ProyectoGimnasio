const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ 
            error: 'No se proporcionó token de autenticación' 
        });
    }

    try {
        // El token viene como "Bearer <token>"
        const tokenSinBearer = token.split(' ')[1];
        const decoded = jwt.verify(tokenSinBearer, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 
            error: 'Token inválido o expirado' 
        });
    }
};

const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ 
                error: 'No tiene permisos para acceder a este recurso' 
            });
        }
        next();
    };
};

module.exports = { verificarToken, verificarRol };