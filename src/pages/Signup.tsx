import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { Container } from 'react-bootstrap';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    navigate('/characters');
  };

  return (
    <Container>
      <h1 className="mt-4 text-center mb-4">Sign up</h1>
      <AuthForm isSignup={true} onAuthSuccess={handleSignupSuccess} />
    </Container>
  );
};

export default Signup;
