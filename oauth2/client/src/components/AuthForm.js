import React, {useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            if (response.data.token) {
                Cookies.set('token', response.data.token);
                window.location.href = '/secret';
            } else {
                console.log('Missing token');
            }
        } catch (error) {
            alert('Błąd logowania: ' + error.response.data.error);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { email, password });
            if (response.data.token) {
                Cookies.set('token', response.data.token);
                window.location.href = '/secret';
            } else {
                console.log('Missing token');
            }
        } catch (error) {
            alert('Błąd rejestracji: ' + error.response.data.error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/google/login');
            window.location.href = response.data.authUrl;
        } catch (error) {
            alert('Błąd logowania za pomocą Google: ' + error.message);
        }
    };

    const handleGitHubLogin = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/github/login');
            window.location.href = response.data.authUrl;
        } catch (error) {
            alert('Błąd logowania za pomocą Github: ' + error.message);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100 justify-content-center">
                <Col md="6">
                    <Card>
                        <Card.Body>
                            <h3 className="text-center">{isLogin ? 'Logowanie' : 'Rejestracja'}</h3>
                            <Form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
                                <Form.Group>
                                    <Form.Label column="email">Email</Form.Label>
                                    <Form.Control id="email" type="email" placeholder="Wpisz email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label column="password">Hasło</Form.Label>
                                    <Form.Control id="password" type="password" placeholder="Wpisz hasło" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 mt-3">
                                    {isLogin ? 'Zaloguj' : 'Zarejestruj'}
                                </Button>
                            </Form>

                            <div className="mt-3" style={{ visibility: isLogin ? '' : 'hidden' }}>
                                <Button variant="light" onClick={handleGoogleLogin} className="w-100 border border-secondary">
                                    Zaloguj przez Google
                                </Button>
                            </div>

                            <div className="mt-2" style={{ visibility: isLogin ? '' : 'hidden' }}>
                                <Button variant="light" onClick={handleGitHubLogin} className="w-100 border border-secondary">
                                    Zaloguj przez GitHub
                                </Button>
                            </div>

                            <div className="mt-3 text-center">
                                <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                                    {isLogin ? 'Nie masz konta? Zarejestruj się' : 'Masz już konto? Zaloguj się'}
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AuthForm;
