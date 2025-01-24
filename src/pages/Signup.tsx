import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
            login(token);
            navigate("/characters");
        } catch (err: any) {
            setError(err.message || "An error occurred. Please try again.");
            console.error(err);
        }
    };

    return (
        <Container>
            <Form onSubmit={ handleSubmit }>
                <h1 className="mt-4 text-center mb-4">Sign up</h1>
                {error && <Alert variant="danger">{ error }</Alert>}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={ email }
                        onChange={ (e) => setEmail(e.target.value) }
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mb-3">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default Signup;
