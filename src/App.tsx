import React from 'react';
import './App.css';
import Login from './pages/Login';
import { Container } from 'react-bootstrap';

const App: React.FC = () => {
  return (
    <Container>
      <Login />
    </Container>
  );
}

export default App;
