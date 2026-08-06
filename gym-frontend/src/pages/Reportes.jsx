import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import api from '../services/api';

function Reportes() {
    const [stats, setStats] = useState({
        sociosActivos: 0,
        sociosInactivos: 0,
        totalPagos: 0,
        ingresosMes: 0
    });
    const [socios, setSocios] = useState([]);
    const [pagos, setPagos] = useState([]);

    useEffect(() => {
        cargarReportes();
    }, []);

    const cargarReportes = async () => {
        try {
            const [sociosRes, pagosRes] = await Promise.all([
                api.get('/socios'),
                api.get('/pagos')
            ]);

            const sociosData = sociosRes.data.data || [];
            const pagosData = pagosRes.data.data || [];

            const activos = sociosData.filter(s => s.estado === 'activo').length;
            const inactivos = sociosData.filter(s => s.estado === 'inactivo').length;
            const totalPagos = pagosData.length;
            
            // Calcular ingresos del mes actual
            const mesActual = new Date().getMonth();
            const anioActual = new Date().getFullYear();
            const ingresosMes = pagosData
                .filter(p => {
                    const fecha = new Date(p.fecha_pago);
                    return fecha.getMonth() === mesActual && fecha.getFullYear() === anioActual;
                })
                .reduce((sum, p) => sum + parseFloat(p.monto), 0);

            setStats({
                sociosActivos: activos,
                sociosInactivos: inactivos,
                totalPagos,
                ingresosMes
            });
            setSocios(sociosData);
            setPagos(pagosData);
        } catch (error) {
            console.error('Error al cargar reportes:', error);
        }
    };

    return (
        <Container fluid>
            <h2 className="mb-4 fw-bold">📈 Reportes del Sistema</h2>
            
            {/* Tarjetas de Resumen */}
            <Row className="mb-4">
                <Col md={3}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <h6 className="text-muted">Socios Activos</h6>
                            <h2 className="text-success fw-bold">{stats.sociosActivos}</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <h6 className="text-muted">Socios Inactivos</h6>
                            <h2 className="text-danger fw-bold">{stats.sociosInactivos}</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <h6 className="text-muted">Total de Pagos</h6>
                            <h2 className="text-primary fw-bold">{stats.totalPagos}</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <h6 className="text-muted">Ingresos del Mes</h6>
                            <h2 className="text-warning fw-bold">${stats.ingresosMes.toFixed(2)}</h2>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Reporte de Socios por Estado */}
            <Row>
                <Col md={6}>
                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white fw-bold">
                            👥 Distribución de Socios
                        </Card.Header>
                        <Card.Body>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Estado</th>
                                        <th>Cantidad</th>
                                        <th>Porcentaje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><Badge bg="success">Activos</Badge></td>
                                        <td>{stats.sociosActivos}</td>
                                        <td>{((stats.sociosActivos / (stats.sociosActivos + stats.sociosInactivos)) * 100).toFixed(1)}%</td>
                                    </tr>
                                    <tr>
                                        <td><Badge bg="danger">Inactivos</Badge></td>
                                        <td>{stats.sociosInactivos}</td>
                                        <td>{((stats.sociosInactivos / (stats.sociosActivos + stats.sociosInactivos)) * 100).toFixed(1)}%</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white fw-bold">
                            💰 Resumen de Pagos
                        </Card.Header>
                        <Card.Body>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Método</th>
                                        <th>Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {['efectivo', 'tarjeta', 'transferencia'].map(metodo => (
                                        <tr key={metodo}>
                                            <td className="text-capitalize">{metodo}</td>
                                            <td>{pagos.filter(p => p.metodo_pago === metodo).length}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Reportes;