import { useState } from 'react';
import { Container, Row, Col, Card, Nav, Button, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link, Routes, Route } from 'react-router-dom';

// 1. IMPORTAR LOS COMPONENTES DE LAS PÁGINAS
import Socios from './Socios';
import Entrenadores from './Entrenadores'; // <-- LÍNEA AGREGADA
import Membresias from './Membresias';
import Pagos from './Pagos';
import Rutinas from './Rutinas';

function Dashboard() {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('inicio');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        navigate('/login');
    };

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    return (
        <div>
            {/* Barra de navegación superior */}
            <Navbar bg="dark" variant="dark" className="px-3">
                <Navbar.Brand>SoftGym</Navbar.Brand>
                <Navbar.Text className="ms-auto text-light me-3">
                    Usuario: {usuario.username || 'Admin'}
                </Navbar.Text>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                    Cerrar Sesión
                </Button>
            </Navbar>

            <Container fluid>
                <Row>
                    {/* Menú lateral */}
                    <Col md={2} className="bg-light min-vh-100 p-3">
                        <Nav className="flex-column">
                            <Nav.Link 
                                as={Link} 
                                to="/dashboard" 
                                active={activeMenu === 'inicio'}
                                onClick={() => setActiveMenu('inicio')}
                            >
                                 Inicio
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
                                to="/dashboard/entrenadores" 
                                active={activeMenu === 'entrenadores'}
                                onClick={() => setActiveMenu('entrenadores')}
                            >
                                 Entrenadores
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
                        </Nav>
                    </Col>

                    {/* Contenido principal */}
                    <Col md={10} className="p-4">
                        <Routes>
                            <Route path="/" element={<Inicio />} />
                            <Route path="socios" element={<Socios />} />
                            <Route path="entrenadores" element={<Entrenadores />} />
                            <Route path="membresias" element={<Membresias />} />
                            <Route path="pagos" element={<Pagos />} />
                            <Route path="rutinas" element={<Rutinas />} />
                            {/* Aquí irán las demás rutas (membresias, pagos, etc.) cuando las creemos */}
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

// Componente de Inicio
function Inicio() {
    return (
        <div>
            <h2 className="mb-4">Panel de Control</h2>
            <Row>
                <Col md={3} className="mb-3">
                    <Card bg="primary" text="white">
                        <Card.Body>
                            <Card.Title>Socios</Card.Title>
                            <Card.Text className="fs-2">0</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card bg="success" text="white">
                        <Card.Body>
                            <Card.Title>Entrenadores</Card.Title>
                            <Card.Text className="fs-2">0</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card bg="info" text="white">
                        <Card.Body>
                            <Card.Title>Membresías Activas</Card.Title>
                            <Card.Text className="fs-2">0</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card bg="warning" text="white">
                        <Card.Body>
                            <Card.Title>Asistencias Hoy</Card.Title>
                            <Card.Text className="fs-2">0</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;