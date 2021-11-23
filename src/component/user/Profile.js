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
            redirect: 'follow',
            mode: "cors",
        };

        fetch("https://class-room-midterm.herokuapp.com/users/profile", requestOptions)
            .then(response => response.json())
            .then(result => {
                setItems(result);
            })
            .catch(error => console.log('error', error));

    }

    const changePass = (e) => {
        e.preventDefault();
        if (e.target.newpassword.value !== e.target.confirmpassword.value) {
            alert("Password is not like.")
        }
        else {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            const urlencoded = new URLSearchParams();
            urlencoded.append("password", e.target.password.value);
            urlencoded.append("newpass", e.target.newpassword.value);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body:urlencoded,
                redirect: 'follow'
            };

            fetch("https://class-room-midterm.herokuapp.com/users/password", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result==="wrong"){
                        alert("Password is wrong");
                    }
                    else{
                        alert("Changing Password success!")
                    }
                })
                .catch(error => console.log('error', error));
        }


    }

    const changeProfile = (e) => {
        e.preventDefault();
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            let gender=items.gender;
            if (e.target.gender.value!==""){
                gender=e.target.gender.value;
            }

            const urlencoded = new URLSearchParams();
            urlencoded.append("name", e.target.name.value);
            urlencoded.append("gender", gender);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body:urlencoded,
                redirect: 'follow'
            };

            fetch("https://class-room-midterm.herokuapp.com/users/profile", requestOptions)
                .then(response => response.json())
                .then(result => {
                        alert("Changing Profile success!")
                })
                .catch(error => console.log('error', error));
        


    }

    const changeStudentID = (e) => {
        e.preventDefault();
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            const urlencoded = new URLSearchParams();
            urlencoded.append("password", e.target.password.value);
            urlencoded.append("studentID", e.target.studentID.value);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body:urlencoded,
                redirect: 'follow'
            };

            fetch("https://class-room-midterm.herokuapp.com/users/studentID", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result==="wrong"){
                        alert("Password is wrong");
                    }
                    else if (result==="Exist"){
                        alert("StudentID exists");
                    }
                    else{
                        alert("Success!")
                    }
                })
                .catch(error => console.log('error', error));


    }


    useEffect(() => {
        getUser();
    }, [items])

    return (
        <div className="profile">
            <div className="profile-content">
                <Container>
                    <Tab.Container id="left-tabs-example"  defaultActiveKey="first">
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
                                                <p>Username: <span>{items.username}</span></p>
                                                <p>Gender: <span>{items.gender}</span></p>
                                                <p>Email: <span>{items.email}</span></p>
                                                <p>StudentID: <span>{items.studentID}</span></p>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <div className="profile-border" style={{ paddingTop: "20px" }}>
                                            <h4>Change Password</h4>
                                            <Form style={{ padding: "20px" }} onSubmit={changePass}>
                                                <Form.Group as={Row} className="mb-1" controlId="password">
                                                    <Form.Label column sm={3}>
                                                        Password:
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="password" placeholder="Password" required />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-1" controlId="newpassword">
                                                    <Form.Label column sm={3}>
                                                        New Password:
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="password" placeholder=" New Password" required />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-1" controlId="confirmpassword">
                                                    <Form.Label column sm={3}>
                                                        Confirm Password:
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="password" placeholder="Confirm Password" required />
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
                                        <div className="profile-border" style={{ paddingTop: "20px" }}>
                                            <h4>Change Profile</h4>
                                            <Form style={{ padding: "20px" }} onSubmit={changeProfile}>
                                                <Form.Group as={Row} className="mb-1" controlId="name">
                                                    <Form.Label column sm={3}>
                                                        Name:
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="name" placeholder="name" defaultValue={items.name} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-1" controlId="gender">
                                                    <Form.Label column sm={3}>
                                                        Gender:
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Select aria-label="Default select example">
                                                            <option value="">Open this select menu</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                        </Form.Select>
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
                                    <Tab.Pane eventKey="fourth">
                                    <div className="profile-border" style={{ paddingTop: "20px" }}>
                                            <h4>Student ID</h4>
                                            <Form style={{ padding: "20px" }} onSubmit={changeStudentID}>
                                            <Form.Group as={Row} className="mb-1" controlId="password">
                                                    <Form.Label column sm={3}>
                                                        Password:
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="password" placeholder="password"/>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-1" controlId="studentID">
                                                    <Form.Label column sm={3}>
                                                        StudentID:
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="studentID"  defaultValue={items.studentID} />
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