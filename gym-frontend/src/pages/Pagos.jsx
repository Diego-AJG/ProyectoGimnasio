import { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../services/api';

function Pagos() {
    const [pagos, setPagos] = useState([]);
    const [socios, setSocios] = useState([]); // Para el dropdown
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        socio_id: '',
        monto: '',
        metodo_pago: 'efectivo'
    });

    useEffect(() => {
        cargarPagos();
        cargarSocios();
    }, []);

    const cargarPagos = async () => {
        try {
            const res = await api.get('/pagos');
            setPagos(res.data.data || []);
        } catch (err) {
            setError('Error al cargar los pagos');
        }
    };

    const cargarSocios = async () => {
        try {
            const res = await api.get('/socios');
            setSocios(res.data.data || []);
        } catch (err) {
            console.error('Error al cargar socios para el formulario');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/pagos', formData);
            setSuccess('Pago registrado exitosamente');
            setShowModal(false);
            setFormData({ socio_id: '', monto: '', metodo_pago: 'efectivo' });
            cargarPagos();
        } catch (err) {
            setError(err.response?.data?.error || 'Error al registrar el pago');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este registro de pago?')) {
            await api.delete(`/pagos/${id}`);
            cargarPagos();
        }
    };

    return (
        <Container fluid>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Historial de Pagos</h2>
                <Button variant="primary" onClick={() => {
                    setShowModal(true);
                    setError('');
                    setSuccess('');
                }}>
                    + Registrar Nuevo Pago
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
                                <th>Monto</th>
                                <th>Método de Pago</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagos.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.socio_nombre} {p.socio_apellido}</td>
                                    <td>${parseFloat(p.monto).toFixed(2)}</td>
                                    <td className="text-capitalize">{p.metodo_pago}</td>
                                    <td>{new Date(p.fecha_pago).toLocaleDateString()} {new Date(p.fecha_pago).toLocaleTimeString()}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>
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
                    <Modal.Title>Registrar Nuevo Pago</Modal.Title>
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
                        <Form.Group className="mb-3">
                            <Form.Label>Monto ($)</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                value={formData.monto}
                                onChange={e => setFormData({...formData, monto: e.target.value})}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Método de Pago</Form.Label>
                            <Form.Select
                                value={formData.metodo_pago}
                                onChange={e => setFormData({...formData, metodo_pago: e.target.value})}
                                required
                            >
                                <option value="efectivo">Efectivo</option>
                                <option value="tarjeta">Tarjeta</option>
                                <option value="transferencia">Transferencia</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Guardar Pago
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Pagos;