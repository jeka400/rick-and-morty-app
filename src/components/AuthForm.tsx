import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

interface AuthFormProps {
  isSignup: boolean;
  onAuthSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignup, onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      let userCredential;
      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      
      const token = await userCredential.user.getIdToken();
      login(token);
      onAuthSuccess();
    } catch (err: any) {
      setError(isSignup ? 'Error creating account. Please try again.' : 'Invalid email or password. Please try again.');
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mb-3">
        {isSignup ? 'Sign up' : 'Login'}
      </Button>
    </Form>
  );
};

export default AuthForm;
