import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setUser } = useAuth()!;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            setUser(userCredential.user);
            
            localStorage.setItem("token", await userCredential.user.getIdToken());

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Form onSubmit={ handleSubmit }>
            <h1 className="mb-5 mt-5 text-center">Login</h1>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={ email } onChange={ (e) => setEmail(e.target.value) } />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={ password } onChange={ (e) => setPassword(e.target.value) }/>
            </Form.Group>

            <Button variant="primary" type="submit" className="mb-3">
                Submit
            </Button>

            <hr />

            <p>Don't have an account? </p>
        </Form>
    )
}

export default Login;