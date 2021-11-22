import { useState, useEffect } from 'react';
import './profile.css'
import { Container, Form, Button, Row, Col, Nav, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

function Profile() {
    const [items, setItems] = useState({});

    const getUser = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://class-room-midterm.herokuapp.com/users/profile", requestOptions)
            .then(response => response.json())
            .then(result => {
                setItems(result);
            })
            .catch(error => console.log('error', error));

    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div className="profile">
            <div className="profile-content">
                <Container>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">My Account</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Change Password</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="third">Change Profile</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="fourth">Student ID</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <div className="profile-border-left">
                                            <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: "100px" }}></FontAwesomeIcon>
                                            <div className="account">
                                                <p>Name: <span>{items.name}</span></p>
                                                <p>Email: <span>{items.email}</span></p>
                                                <p>StudentID: <span>{items.email}</span></p>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <div className="profile-border" style={{ paddingTop: "20px" }}>
                                            <h4>Change Password</h4>
                                            <Form style={{ padding: "20px" }}>
                                            <Form.Group as={Row} className="mb-1" controlId="password">
                                                    <Form.Label column sm={3}>
                                                        Password:
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="password" placeholder="Password" required />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-1" controlId="new-password">
                                                    <Form.Label column sm={3}>
                                                        New Password:
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="password" placeholder="Password" required />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-1" controlId="confirm-password">
                                                    <Form.Label column sm={3}>
                                                        Confirm Password:
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="password" placeholder="Password" required />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3">
                                                    <Col sm={{ span: 2, offset: 5 }}>
                                                        <Button type="submit">Save</Button>
                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third">
                                        <div className="profile-border-left">
                                            <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: "100px" }}></FontAwesomeIcon>
                                            <div className="account">
                                                <p>Name: <span>{items.name}</span></p>
                                                <p>Email: <span>{items.email}</span></p>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="fourth">
                                        <div className="profile-border-left">
                                            <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: "100px" }}></FontAwesomeIcon>
                                            <div className="account">
                                                <p>Name: <span>{items.name}</span></p>
                                                <p>Email: <span>{items.email}</span></p>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
            </div>
        </div>

    );
}

export default Profile;