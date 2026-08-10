import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Button, Navbar, Form, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link, Routes, Route } from 'react-router-dom';
import Socios from './Socios';
import Entrenadores from './Entrenadores';
import Membresias from './Membresias';
import Pagos from './Pagos';
import Rutinas from './Rutinas';
import Asistencias from './Asistencias';
import Reportes from './Reportes';
import api from '../services/api';
import './Dashboard.css';
import Configuracion from './Configuracion';

function Dashboard() {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('inicio');
    const [stats, setStats] = useState({
        socios: 0,
        entrenadores: 0,
        membresias: 0,
        asistencias: 0
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        navigate('/login');
    };

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    useEffect(() => {
        cargarEstadisticas();
    }, []);

    const cargarEstadisticas = async () => {
        try {
            const [sociosRes, entrenadoresRes, membresiasRes, asistenciasRes] = await Promise.all([
                api.get('/socios'),
                api.get('/entrenadores'),
                api.get('/membresias'),
                api.get('/asistencias')
            ]);

            const hoy = new Date().toISOString().split('T')[0];
            const asistenciasHoy = asistenciasRes.data.data?.filter(a => 
                new Date(a.fecha_entrada).toISOString().split('T')[0] === hoy
            ).length || 0;

            setStats({
                socios: sociosRes.data.data?.length || 0,
                entrenadores: entrenadoresRes.data.data?.length || 0,
                membresias: membresiasRes.data.data?.length || 0,
                asistencias: asistenciasHoy
            });
        } catch (error) {
            console.error('Error al cargar estadísticas:', error);
        }
    };

    return (
        <Container fluid className="p-0">
            <Row className="g-0" style={{ minHeight: '100vh' }}>
                {/* Sidebar Rojo */}
                <Col md={2} className="sidebar p-0">
                    <div className="sidebar-header p-4">
                        <h3 className="text-white fw-bold mb-0">️ SoftGym</h3>
                    </div>
                    <Nav className="flex-column sidebar-nav">
                        <Nav.Link 
                            as={Link} 
                            to="/dashboard" 
                            active={activeMenu === 'inicio'}
                            onClick={() => setActiveMenu('inicio')}
                        >
                             Dashboard
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/dashboard/socios" 
                            active={activeMenu === 'socios'}
                            onClick={() => setActiveMenu('socios')}
                        >
                             Socios
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/dashboard/membresias" 
                            active={activeMenu === 'membresias'}
                            onClick={() => setActiveMenu('membresias')}
                        >
                             Membresías
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/dashboard/pagos" 
                            active={activeMenu === 'pagos'}
                            onClick={() => setActiveMenu('pagos')}
                        >
                             Pagos
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/dashboard/entrenadores" 
                            active={activeMenu === 'entrenadores'}
                            onClick={() => setActiveMenu('entrenadores')}
                        >
                             Entrenadores
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/dashboard/rutinas" 
                            active={activeMenu === 'rutinas'}
                            onClick={() => setActiveMenu('rutinas')}
                        >
                             Rutinas
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/dashboard/asistencias" 
                            active={activeMenu === 'asistencias'}
                            onClick={() => setActiveMenu('asistencias')}
                        >
                             Asistencias
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/dashboard/reportes" 
                            active={activeMenu === 'reportes'}
                            onClick={() => setActiveMenu('reportes')}
                        >
                             Reportes
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/dashboard/configuracion" 
                            active={activeMenu === 'configuracion'}
                            onClick={() => setActiveMenu('configuracion')}
                        >
                             Configuración
                        </Nav.Link>
                    </Nav>
                </Col>

                {/* Contenido Principal */}
                <Col md={10} className="main-content">
                    {/* Header Superior */}
                    <Navbar bg="white" className="px-4 py-3 shadow-sm">
                        <Navbar.Brand className="fw-bold">Gestión de Socios</Navbar.Brand>
                        <Navbar.Text className="text-muted small">
                            Administra la información de los socios del gimnasio.
                        </Navbar.Text>
                        <div className="ms-auto d-flex align-items-center">
                            <Button variant="light" className="me-3 position-relative">
                                
                                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                                    3
                                </Badge>
                            </Button>
                            <div className="dropdown">
                                <Button variant="light" className="d-flex align-items-center">
                                    <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-2" style={{ width: '35px', height: '35px' }}>
                                        
                                    </div>
                                    <div className="text-start">
                                        <div className="fw-bold small">{usuario.rol || 'Administrador'}</div>
                                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{usuario.username || 'Admin'}</div>
                                    </div>
                                </Button>
                            </div>
                            <Button variant="outline-danger" size="sm" className="ms-3" onClick={handleLogout}>
                                Cerrar Sesión
                            </Button>
                        </div>
                    </Navbar>

                    {/* Contenido de las Rutas */}
                    <div className="p-4">
                        <Routes>
                            <Route path="/" element={<Inicio stats={stats} />} />
                            <Route path="socios" element={<Socios />} />
                            <Route path="entrenadores" element={<Entrenadores />} />
                            <Route path="membresias" element={<Membresias />} />
                            <Route path="pagos" element={<Pagos />} />
                            <Route path="rutinas" element={<Rutinas />} />
                            <Route path="asistencias" element={<Asistencias />} />
                            <Route path="reportes" element={<Reportes />} />
                            <Route path="configuracion" element={<Configuracion />} />
                        </Routes>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

// Componente de Inicio con estadísticas reales
function Inicio({ stats }) {
    return (
        <div>
            <h2 className="mb-4 fw-bold">Panel de Control</h2>
            <Row>
                <Col md={3} className="mb-3">
                    <Card className="stat-card border-0 shadow-sm h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Card.Title className="text-muted small mb-2">Socios</Card.Title>
                                    <Card.Text className="fs-2 fw-bold text-primary mb-0">{stats.socios}</Card.Text>
                                </div>
                                <div className="fs-1"></div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card className="stat-card border-0 shadow-sm h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Card.Title className="text-muted small mb-2">Entrenadores</Card.Title>
                                    <Card.Text className="fs-2 fw-bold text-success mb-0">{stats.entrenadores}</Card.Text>
                                </div>
                                <div className="fs-1"></div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card className="stat-card border-0 shadow-sm h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Card.Title className="text-muted small mb-2">Membresías Activas</Card.Title>
                                    <Card.Text className="fs-2 fw-bold text-info mb-0">{stats.membresias}</Card.Text>
                                </div>
                                <div className="fs-1">💳</div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card className="stat-card border-0 shadow-sm h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Card.Title className="text-muted small mb-2">Asistencias Hoy</Card.Title>
                                    <Card.Text className="fs-2 fw-bold text-warning mb-0">{stats.asistencias}</Card.Text>
                                </div>
                                <div className="fs-1">✅</div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;