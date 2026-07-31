import { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../services/api';

function Socios() {
    const [socios, setSocios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [socioEditando, setSocioEditando] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        fecha_registro: new Date().toISOString().split('T')[0],
        estado: 'activo'
    });

    useEffect(() => {
        cargarSocios();
    }, []);

    const cargarSocios = async () => {
        try {
            const response = await api.get('/socios');
            setSocios(response.data.data || []);
        } catch (err) {
            setError('Error al cargar los socios');
        }
    };

    const handleShow = () => {
        setSocioEditando(null);
        setFormData({
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
            fecha_registro: new Date().toISOString().split('T')[0],
            estado: 'activo'
        });
        setShowModal(true);
        setError('');
        setSuccess('');
    };

    const handleClose = () => setShowModal(false);

    const handleEdit = (socio) => {
        setSocioEditando(socio);
        setFormData({
            nombre: socio.nombre,
            apellido: socio.apellido,
            email: socio.email,
            telefono: socio.telefono || '',
            fecha_registro: socio.fecha_registro,
            estado: socio.estado
        });
        setShowModal(true);
        setError('');
        setSuccess('');
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este socio?')) {
            try {
                await api.delete(`/socios/${id}`);
                setSuccess('Socio eliminado exitosamente');
                cargarSocios();
            } catch (err) {
                setError('Error al eliminar el socio');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            if (socioEditando) {
                await api.put(`/socios/${socioEditando.id}`, formData);
                setSuccess('Socio actualizado exitosamente');
            } else {
                await api.post('/socios', formData);
                setSuccess('Socio registrado exitosamente');
            }
            handleClose();
            cargarSocios();
        } catch (err) {
            setError(err.response?.data?.error || 'Error al guardar el socio');
        }
    };

    return (
        <Container fluid>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Socios</h2>
                <Button variant="primary" onClick={handleShow}>
                    + Nuevo Socio
                </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Card>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Fecha Registro</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {socios.map((socio) => (
                                <tr key={socio.id}>
                                    <td>{socio.id}</td>
                                    <td>{socio.nombre}</td>
                                    <td>{socio.apellido}</td>
                                    <td>{socio.email}</td>
                                    <td>{socio.telefono || 'N/A'}</td>
                                    <td>{new Date(socio.fecha_registro).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`badge bg-${socio.estado === 'activo' ? 'success' : 'danger'}`}>
                                            {socio.estado}
                                        </span>
                                    </td>
                                    <td>
                                        <Button 
                                            variant="warning" 
                                            size="sm" 
                                            className="me-2"
                                            onClick={() => handleEdit(socio)}
                                        >
                                            Editar
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm"
                                            onClick={() => handleDelete(socio.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Modal para agregar/editar */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {socioEditando ? 'Editar Socio' : 'Nuevo Socio'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.nombre}
                                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.apellido}
                                onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.telefono}
                                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de Registro</Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.fecha_registro}
                                onChange={(e) => setFormData({...formData, fecha_registro: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Estado</Form.Label>
                            <Form.Select
                                value={formData.estado}
                                onChange={(e) => setFormData({...formData, estado: e.target.value})}
                            >
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            {socioEditando ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Socios;