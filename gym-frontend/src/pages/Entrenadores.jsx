import { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../services/api';

function Entrenadores() {
    const [entrenadores, setEntrenadores] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({ nombre: '', especialidad: '', telefono: '' });

    useEffect(() => { cargarEntrenadores(); }, []);

    const cargarEntrenadores = async () => {
        try {
            const res = await api.get('/entrenadores');
            setEntrenadores(res.data.data || []);
        } catch (err) { setError('Error al cargar entrenadores'); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await api.put(`/entrenadores/${editando.id}`, formData);
                setSuccess('Entrenador actualizado');
            } else {
                await api.post('/entrenadores', formData);
                setSuccess('Entrenador registrado');
            }
            setShowModal(false);
            setEditando(null);
            setFormData({ nombre: '', especialidad: '', telefono: '' });
            cargarEntrenadores();
        } catch (err) {
            setError(err.response?.data?.error || 'Error al guardar');
        }
    };

    const handleEdit = (ent) => {
        setEditando(ent);
        setFormData({ nombre: ent.nombre, especialidad: ent.especialidad, telefono: ent.telefono || '' });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar este entrenador?')) {
            await api.delete(`/entrenadores/${id}`);
            cargarEntrenadores();
        }
    };

    return (
        <Container fluid>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Entrenadores</h2>
                <Button variant="primary" onClick={() => { setEditando(null); setFormData({ nombre: '', especialidad: '', telefono: '' }); setShowModal(true); }}>
                    + Nuevo Entrenador
                </Button>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Card>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr><th>ID</th><th>Nombre</th><th>Especialidad</th><th>Teléfono</th><th>Acciones</th></tr>
                        </thead>
                        <tbody>
                            {entrenadores.map(ent => (
                                <tr key={ent.id}>
                                    <td>{ent.id}</td>
                                    <td>{ent.nombre}</td>
                                    <td>{ent.especialidad}</td>
                                    <td>{ent.telefono || 'N/A'}</td>
                                    <td>
                                        <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(ent)}>Editar</Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(ent.id)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton><Modal.Title>{editando ? 'Editar' : 'Nuevo'} Entrenador</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Especialidad</Form.Label>
                            <Form.Control type="text" value={formData.especialidad} onChange={e => setFormData({...formData, especialidad: e.target.value})} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control type="text" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">{editando ? 'Actualizar' : 'Guardar'}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
export default Entrenadores;