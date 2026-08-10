import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', {
                username,
                password
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="p-0">
            <Row className="g-0" style={{ minHeight: '100vh' }}>
                {/* Columna izquierda - Roja con ilustración */}
                <Col md={6} className="login-left d-flex align-items-center justify-content-center p-5">
                    <div className="text-center text-white">
                        <div className="mb-4">
                            <h1 className="display-4 fw-bold">SoftGym</h1>
                            <p className="lead">Sistema de Gestión de Gimnasio</p>
                        </div>
                        <div className="login-illustration">
                            <img 
                                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop" 
                                alt="Gym Equipment" 
                                className="img-fluid rounded"
                                style={{ maxHeight: '400px', opacity: 0.9 }}
                            />
                        </div>
                    </div>
                </Col>

                {/* Columna derecha - Blanca con formulario */}
                <Col md={6} className="login-right d-flex align-items-center justify-content-center p-5">
                    <div style={{ maxWidth: '400px', width: '100%' }}>
                        <h2 className="mb-4 fw-bold text-dark">¡Bienvenido de nuevo!</h2>
                        
                        {error && <Alert variant="danger">{error}</Alert>}
                        
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Correo electrónico"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="py-3"
                                    style={{ border: '2px solid #ddd', borderRadius: '8px' }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="py-3"
                                    style={{ border: '2px solid #ddd', borderRadius: '8px' }}
                                />
                            </Form.Group>

                            <Button 
                                variant="danger" 
                                type="submit" 
                                className="w-100 py-3 fw-bold"
                                disabled={loading}
                                style={{ 
                                    backgroundColor: '#a52a2a', 
                                    borderColor: '#a52a2a',
                                    borderRadius: '25px'
                                }}
                            >
                                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                            </Button>

                            <div className="text-center mt-3">
                                <a href="#" className="text-muted" style={{ textDecoration: 'none' }}>
                                    Recordar contraseña
                                </a>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
            
            {/* Footer con año dinámico - COMMIT 14 */}
            <div className="text-center p-3 bg-light text-muted small border-top">
              © {new Date().getFullYear()} SoftGym. Todos los derechos reservados.
            </div>
        </Container>
    );
}

export default Login;