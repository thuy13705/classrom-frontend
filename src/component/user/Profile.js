import { useState, useEffect } from 'react';
import './profile.css'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

function Profile() {
    const [items, setItems] = useState({});

    const getUser = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("auth-token", localStorage.getItem("auth-token"));

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:3080/profile", requestOptions)
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
                    <Row className="g-4">
                        <Col xs={12} lg={4} md={4} >
                            <div className="profile-border-left">
                            <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: "100px" }}></FontAwesomeIcon>
                            <div className="account">
                                <p>Name: <span>{items.nameUser}</span></p>
                                <p>Email: <span>{items.email}</span></p>
                            </div>
                            </div>
                        </Col>
                        <Col xs={12} lg={8} md={8}>
                           <div className="profile-border"style={{paddingTop:"20px"}}>
                           <h4>Change Profile</h4>
                            <Form style={{padding:"20px"}}>
                                <Form.Group as={Row} className="mb-3" controlId="email">
                                    <Form.Label column sm={2}>
                                        Email:
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="email" placeholder="Email" required />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="password">
                                    <Form.Label column sm={2}>
                                        Password:
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="password" placeholder="Password" required />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={{ span:2, offset:5}}>
                                        <Button type="submit">Save</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                           </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    );
}

export default Profile;
