import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Nav, Dropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import getAPI from '../../helper/getAPI';
import postAPI from '../../helper/postAPI';
import './header.css';


function Header({ loggedIn, setLoggedIn }) {
    const history = useHistory();
    const [notification, setNoti] = useState([]);
    const [count, setCount] = useState(0);

    const getNoti = async () => {
        if (loggedIn){
            const api = "https://class-room-midterm.herokuapp.com/notification"
            const result = await getAPI(api);
            if (result === "401") {
                history.push('/signin');
            }
            else if (result) {
                console.log(result)
                setNoti(result);
                getCount(result);
            }
        }
    }

    const getCount = (notification) => {
        let tmpCount = 0;
        for (let noty of notification) {
            if (noty.status) {
                tmpCount++;
            }
        }
        setCount(tmpCount);
    }

    const handleClickNoty = async (id) => {
        const api = "https://class-room-midterm.herokuapp.com/notification/edit/" + id
        const result = await postAPI(api, "");
        if (result === "401") {
            history.push('/signin');
        }
    }

    const logout = () => {
        localStorage.clear();
        setLoggedIn(null);
        history.push('/signin');
    }


    useEffect(() => {
        if (loggedIn){
       getNoti();
        }
    }, [loggedIn])

    return (
        <div>
            <Navbar className="header-color" >
                <Container>
                    <Navbar.Brand ><Link className="header-item" to='/'>Classroom</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            {!loggedIn ? <Nav>
                                <Nav.Link>
                                    <Link className="header-item" to='/signin'>Login</Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link className="header-item" to='/register'>Register</Link>
                                </Nav.Link>
                            </Nav> : <Nav>

                                <Nav>
                                    <Nav.Item >
                                        <Dropdown>
                                            <Dropdown.Toggle className="btn-noty"
                                                id="dropdown-autoclose-true"
                                                style={{ margin: "auto 10px", position: "relative", border: "none" }}>
                                                <FontAwesomeIcon
                                                    style={{ fontSize: "20px", margin: "auto 0" }}
                                                    icon={faBell} />
                                                {count != 0 ? <div className="noty-count">{count}</div> : <></>}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu style={{ maxHeight: "300px", overflow: "auto" }}>

                                                {notification && notification.map((noty, index) => (
                                                    <Dropdown.Item key={noty._id + index} href="#" style={{ margin: "5px 0px", border: "0.5px solid rgba(0,0,0,.1)", borderRadius: "5px" }}>
                                                        <NavLink to={`/review/detail/${noty.grade._id}`}>
                                                            <p style={{ fontWeight: "bold", marginBottom: "3px" }}>{noty.user.name}</p>
                                                            <p style={{ marginBottom: "0" }}>{noty.grade.name + " " + noty.description}</p>
                                                        </NavLink>
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Nav.Item>
                                    <Nav.Link>
                                        <Link className="header-item" to='/profile'>My info</Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link className="header-item" onClick={logout}>Logout</Link>
                                    </Nav.Link>
                                </Nav>
                            </Nav>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    )
}

export default Header
