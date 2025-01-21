import React from 'react';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Container } from 'react-bootstrap';

const App: React.FC = () => {
  return (
    <Container>
      <Signup />
    </Container>
  );
}

export default App;
