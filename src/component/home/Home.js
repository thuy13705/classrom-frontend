import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import Card from './Card';
import { NavLink } from 'react-router-dom';


import './index.css';
import AddClassModal from './AddClassModal';

function Home() {

    const [students, setStudent] = useState([]);
    const [teachers, setTeacher] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const handleModalShow=()=>{
        setModalShow(!modalShow);
    }

    const getListClass = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://class-room-midterm.herokuapp.com/classes", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("hihi");
                console.log(result)
                setStudent(result.students);
                setTeacher(result.teachers);
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getListClass();
    }, [])
    return (
        <Container>
            <NavDropdown id="collasible-nav-dropdown" className="add">
                <NavDropdown.Item onClick={() => handleModalShow()}>Add a class</NavDropdown.Item>
                <AddClassModal show={modalShow} onHide={() => handleModalShow()} />
                
                <NavDropdown.Item href="#action/3.2">Join a class</NavDropdown.Item>

            </NavDropdown>
            <h1 style={{ textAlign: "left", marginTop: "50px" }}>My Classes</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {teachers && teachers.map((item, index) => (
                    <NavLink style={{ textDecorationLine: "none", color: "#282c34" }} to={`/classdetail/${item._id}`}>
                        <Card key={item._id + item._id} items={item}>
                        </Card>
                    </NavLink>
                ))}
            </Row>
            {/* <div className="all-classes">
              
            </div> */}

            <h1 style={{ textAlign: "left", marginTop: "50px" }}>My Join Classes</h1>

            <Row xs={1} md={2} lg={3} className="g-4">
                {students && students.map((item, index) => (
                    <Col key={item._id} >
                        <NavLink style={{ textDecorationLine: "none", color: "#282c34" }} to={`/classdetail/${item._id}`}>
                            <Card key={item._id + item._id} items={item}>
                            </Card>
                        </NavLink>

                    </Col>
                ))}
            </Row>

        </Container>
    )
}

export default Home
