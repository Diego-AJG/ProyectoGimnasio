import { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../services/api';

function Membresias() {
    const [membresias, setMembresias] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        nombre: '',
        duracion_meses: '',
        precio: ''
    });

    useEffect(() => {
        cargarMembresias();
    }, []);

    const cargarMembresias = async () => {
        try {
            const res = await api.get('/membresias');
            setMembresias(res.data.data || []);
        } catch (err) {
            setError('Error al cargar membresías');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await api.put(`/membresias/${editando.id}`, formData);
                setSuccess('Membresía actualizada');
            } else {
                await api.post('/membresias', formData);
                setSuccess('Membresía registrada');
            }
            setShowModal(false);
            setEditando(null);
            setFormData({ nombre: '', duracion_meses: '', precio: '' });
            cargarMembresias();
        } catch (err) {
            setError(err.response?.data?.error || 'Error al guardar');
        }
    };

    const handleEdit = (membresia) => {
        setEditando(membresia);
        setFormData({
            nombre: membresia.nombre,
            duracion_meses: membresia.duracion_meses,
            precio: membresia.precio
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar esta membresía?')) {
            await api.delete(`/membresias/${id}`);
            cargarMembresias();
        }
    };

    return (
        <Container fluid>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Membresías</h2>
                <Button variant="primary" onClick={() => {
                    setEditando(null);
                    setFormData({ nombre: '', duracion_meses: '', precio: '' });
                    setShowModal(true);
                }}>
                    + Nueva Membresía
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
                                <th>Duración (meses)</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {membresias.map(m => (
                                <tr key={m.id}>
                                    <td>{m.id}</td>
                                    <td>{m.nombre}</td>
                                    <td>{m.duracion_meses}</td>
                                    <td>${m.precio}</td>
                                    <td>
                                        <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(m)}>
                                            Editar
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(m.id)}>
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editando ? 'Editar' : 'Nueva'} Membresía</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.nombre}
                                onChange={e => setFormData({...formData, nombre: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Duración (meses)</Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.duracion_meses}
                                onChange={e => setFormData({...formData, duracion_meses: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                value={formData.precio}
                                onChange={e => setFormData({...formData, precio: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            {editando ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Membresias;