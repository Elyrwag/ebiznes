import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';
import AuthForm from './components/AuthForm';
import {Container} from "react-bootstrap";

function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken && storedToken !== 'undefined') {
            setToken(storedToken);
        } else {
            setToken(null);
            Cookies.remove('token');
        }
    }, []);

    const handleLogout = () => {
        setToken(null);
        Cookies.remove('token');
    };

    const SecretPage = () => {
        return (
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <div>
                    <h2>Zalogowano pomyślnie</h2>
                    <button onClick={handleLogout}>Wyloguj i wróć do strony z logowaniem</button>
                </div>
            </Container>
        );
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route
                        path="/" element={token ? (
                            <Navigate to="/secret" />
                        ) : (
                            <AuthForm />
                        )}
                    />

                    <Route
                        path="/secret" element={token ? (
                            <SecretPage />
                        ) : (
                            <Navigate to="/" />
                        )}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
