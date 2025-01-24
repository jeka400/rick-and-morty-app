import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ToggleButtonTheme from '../components/ToggleButtonTheme';

const Header: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      id="header-navbar"
      fixed="top"
    >
      <Container>
        <Navbar.Brand id="navbar-brand">
          <Link to="/characters">Rick&Morty</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto gap-4">
            <Navbar.Text>
              <Link to="/characters" className="navbar-link" id="navbar-link-characters" >
                Characters
              </Link>
            </Navbar.Text>

            <Navbar.Text onClick={logout} className="navbar-link" id='navbar-link-logout'>
              Logout
            </Navbar.Text>
          </Nav>

          <ToggleButtonTheme />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
