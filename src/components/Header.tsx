import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Header.scss";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header: React.FC = () => {
  const { user, setUser, logout } = useAuth();


  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
        <Navbar expand="lg" className="bg-body-tertiary" id="header-navbar" fixed="top">
            <Container>

                <Navbar.Brand id="navbar-brand">Rick&Morty</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">

                  <Nav className="me-auto gap-4">
                      <Navbar.Text><Link to="/characters" id="navbar-link">Characters</Link></Navbar.Text>

                      <Navbar.Text onClick={handleLogout} id="navbar-link">Logout</Navbar.Text>
                  </Nav>

                </Navbar.Collapse>

            </Container>
        </Navbar>
  );
};

export default Header;