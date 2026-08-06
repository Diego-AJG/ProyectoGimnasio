import { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../services/api';

function Asistencias() {
    const [asistencias, setAsistencias] = useState([]);
    const [socios, setSocios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        socio_id: ''
    });

    useEffect(() => {
        cargarAsistencias();
        cargarSocios();
    }, []);

    const cargarAsistencias = async () => {
        try {
            const res = await api.get('/asistencias');
            setAsistencias(res.data.data || []);
        } catch (err) {
            setError('Error al cargar asistencias');
        }
    };

    const cargarSocios = async () => {
        try {
            const res = await api.get('/socios');
            setSocios(res.data.data || []);
        } catch (err) {
            console.error('Error al cargar socios');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/asistencias', formData);
            setSuccess('Asistencia registrada exitosamente');
            setShowModal(false);
            setFormData({ socio_id: '' });
            cargarAsistencias();
        } catch (err) {
            setError(err.response?.data?.error || 'Error al registrar la asistencia');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar este registro de asistencia?')) {
            await api.delete(`/asistencias/${id}`);
            cargarAsistencias();
        }
    };

    return (
        <Container fluid>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Registro de Asistencias</h2>
                <Button variant="primary" onClick={() => {
                    setShowModal(true);
                    setError('');
                    setSuccess('');
                }}>
                    + Registrar Asistencia
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
                                <th>Socio</th>
                                <th>Fecha y Hora de Entrada</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {asistencias.map(a => (
                                <tr key={a.id}>
                                    <td>{a.id}</td>
                                    <td>{a.socio_nombre} {a.socio_apellido}</td>
                                    <td>{new Date(a.fecha_entrada).toLocaleDateString()} {new Date(a.fecha_entrada).toLocaleTimeString()}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(a.id)}>
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
                    <Modal.Title>Registrar Asistencia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Socio</Form.Label>
                            <Form.Select
                                value={formData.socio_id}
                                onChange={e => setFormData({...formData, socio_id: e.target.value})}
                                required
                            >
                                <option value="">Seleccione un socio...</option>
                                {socios.map(s => (
                                    <option key={s.id} value={s.id}>{s.nombre} {s.apellido}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Registrar Asistencia
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Asistencias;