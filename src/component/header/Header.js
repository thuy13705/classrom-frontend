import React, { useState, useEffect } from 'react';
import { Container, Nav, NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link,useHistory} from 'react-router-dom';
import './header.css';

function Header({loggedIn,setLoggedIn }) {
    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        setLoggedIn(null)
        history.push('/');
    }
    let menu;
    if (!loggedIn) {

        menu = (
            <Nav>
                <Nav.Link>
                    <Link className="header-item" to='/'>Login</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link className="header-item" to='/register'>Register</Link>
                </Nav.Link>
            </Nav>
        )
    } else {
        menu = (
            <Nav>

                <Nav>
                    <Nav.Link>
                        <Link className="header-item" to='/profile'>My info</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link className="header-item" onClick={logout}>Logout</Link>
                    </Nav.Link>
                </Nav>
            </Nav>
        )
    }
    return (
        <div>
            <Navbar className="header-color">
                <Container>
                    <Navbar.Brand ><Link className="header-item" to='/home'>Classroom</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            {menu}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
