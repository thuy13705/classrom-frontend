import React from 'react';
import { Container, Nav, NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
    return (
        <div>
            <Navbar className="header-color">
                <Container>
                    <Navbar.Brand href="#home">Classroom</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                        </Nav>
                        <Nav>
                            {/* <NavDropdown title="" id="collasible-nav-dropdown" className="add">
                                <NavDropdown.Item href="#action/3.1">Add a class</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Join a class</NavDropdown.Item>

                            </NavDropdown>
                            <NavDropdown title="Account" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">My Info</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>

                            </NavDropdown> */}

                            <Nav.Link>
                                <Link className="header-item" to='/'>Login</Link>
                                </Nav.Link>
                            <Nav.Link>
                                <Link className="header-item" to='/register'>Register</Link>
                                </Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
