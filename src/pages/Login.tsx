import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { Container } from 'react-bootstrap';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/characters');
  };

  return (
    <Container>
      <h1 className="mt-4 text-center mb-4">Login</h1>
      <AuthForm isSignup={false} onAuthSuccess={handleLoginSuccess} />
    </Container>
  );
};

export default Login;
