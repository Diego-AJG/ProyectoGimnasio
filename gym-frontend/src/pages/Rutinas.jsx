import { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../services/api';

function Rutinas() {
    const [rutinas, setRutinas] = useState([]);
    const [entrenadores, setEntrenadores] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        entrenador_id: '',
        nombre: '',
        descripcion: ''
    });

    useEffect(() => {
        cargarRutinas();
        cargarEntrenadores();
    }, []);

    const cargarRutinas = async () => {
        try {
            const res = await api.get('/rutinas');
            setRutinas(res.data.data || []);
        } catch (err) { setError('Error al cargar rutinas'); }
    };

    const cargarEntrenadores = async () => {
        try {
            const res = await api.get('/entrenadores');
            setEntrenadores(res.data.data || []);
        } catch (err) { console.error('Error al cargar entrenadores'); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await api.put(`/rutinas/${editando.id}`, formData);
                setSuccess('Rutina actualizada');
            } else {
                await api.post('/rutinas', formData);
                setSuccess('Rutina registrada');
            }
            setShowModal(false);
            setEditando(null);
            setFormData({ entrenador_id: '', nombre: '', descripcion: '' });
            cargarRutinas();
        } catch (err) {
            setError(err.response?.data?.error || 'Error al guardar');
        }
    };

    const handleEdit = (rutina) => {
        setEditando(rutina);
        setFormData({
            entrenador_id: rutina.entrenador_id,
            nombre: rutina.nombre,
            descripcion: rutina.descripcion || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar esta rutina?')) {
            await api.delete(`/rutinas/${id}`);
            cargarRutinas();
        }
    };

    return (
        <Container fluid>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Rutinas</h2>
                <Button variant="primary" onClick={() => {
                    setEditando(null);
                    setFormData({ entrenador_id: '', nombre: '', descripcion: '' });
                    setShowModal(true);
                }}>
                    + Nueva Rutina
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
                                <th>Descripción</th>
                                <th>Entrenador</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rutinas.map(r => (
                                <tr key={r.id}>
                                    <td>{r.id}</td>
                                    <td>{r.nombre}</td>
                                    <td>{r.descripcion || 'Sin descripción'}</td>
                                    <td>{r.entrenador_nombre}</td>
                                    <td>
                                        <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(r)}>Editar</Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(r.id)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editando ? 'Editar' : 'Nueva'} Rutina</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Entrenador</Form.Label>
                            <Form.Select
                                value={formData.entrenador_id}
                                onChange={e => setFormData({...formData, entrenador_id: e.target.value})}
                                required
                            >
                                <option value="">Seleccione un entrenador...</option>
                                {entrenadores.map(e => (
                                    <option key={e.id} value={e.id}>{e.nombre} - {e.especialidad}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de la Rutina</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.nombre}
                                onChange={e => setFormData({...formData, nombre: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.descripcion}
                                onChange={e => setFormData({...formData, descripcion: e.target.value})}
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

export default Rutinas;