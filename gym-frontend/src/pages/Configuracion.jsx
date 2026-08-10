import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

function Configuracion() {
    const [success, setSuccess] = useState('');
    const [config, setConfig] = useState({
        nombreGimnasio: 'SoftGym',
        direccion: 'Av. Principal #123',
        telefono: '555-123-4567',
        horarioApertura: '06:00',
        horarioCierre: '22:00',
        email: 'contacto@softgym.com'
    });

    const [perfil, setPerfil] = useState({
        nombreUsuario: '',
        emailUsuario: '',
        contraseñaActual: '',
        contraseñaNueva: '',
        confirmarContraseña: ''
    });

    const handleConfigSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la llamada a la API
        setSuccess('Configuración del gimnasio actualizada correctamente');
    };

    const handlePerfilSubmit = (e) => {
        e.preventDefault();
        // Validar y actualizar perfil
        setSuccess('Perfil de usuario actualizado correctamente');
    };

    return (
        <Container fluid>
            <h2 className="mb-4 fw-bold">Configuración del Sistema</h2>
            
            {success && <Alert variant="success">{success}</Alert>}

            <Row>
                {/* Configuración del Gimnasio */}
                <Col md={6} className="mb-4">
                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white fw-bold">
                             Información del Gimnasio
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleConfigSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre del Gimnasio</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={config.nombreGimnasio}
                                        onChange={(e) => setConfig({...config, nombreGimnasio: e.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={config.direccion}
                                        onChange={(e) => setConfig({...config, direccion: e.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={config.telefono}
                                        onChange={(e) => setConfig({...config, telefono: e.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email de Contacto</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={config.email}
                                        onChange={(e) => setConfig({...config, email: e.target.value})}
                                    />
                                </Form.Group>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Horario de Apertura</Form.Label>
                                            <Form.Control
                                                type="time"
                                                value={config.horarioApertura}
                                                onChange={(e) => setConfig({...config, horarioApertura: e.target.value})}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Horario de Cierre</Form.Label>
                                            <Form.Control
                                                type="time"
                                                value={config.horarioCierre}
                                                onChange={(e) => setConfig({...config, horarioCierre: e.target.value})}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit" className="w-100">
                                    Guardar Configuración
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Configuración de Perfil */}
                <Col md={6} className="mb-4">
                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white fw-bold">
                            Mi Cuenta de Administrador
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handlePerfilSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre de Usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={perfil.nombreUsuario}
                                        onChange={(e) => setPerfil({...perfil, nombreUsuario: e.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={perfil.emailUsuario}
                                        onChange={(e) => setPerfil({...perfil, emailUsuario: e.target.value})}
                                    />
                                </Form.Group>
                                <hr />
                                <h6 className="mb-3">Cambiar Contraseña</h6>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña Actual</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={perfil.contraseñaActual}
                                        onChange={(e) => setPerfil({...perfil, contraseñaActual: e.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nueva Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={perfil.contraseñaNueva}
                                        onChange={(e) => setPerfil({...perfil, contraseñaNueva: e.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={perfil.confirmarContraseña}
                                        onChange={(e) => setPerfil({...perfil, confirmarContraseña: e.target.value})}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Actualizar Perfil
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Configuracion;