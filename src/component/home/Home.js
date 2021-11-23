import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useHistory } from 'react-router-dom';
import AddClassdModal from './AddClassModal';
import Card from './Card';

import './index.css';

function Home() {
    const history=useHistory();
    const [students, setStudent] = useState([]);
    const [teachers, setTeacher] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const handleModalShow = () => {
        setModalShow(!modalShow);
    }

    const getListClass = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            mode: "cors",
        };

        fetch("https://class-room-midterm.herokuapp.com/classes", requestOptions)
            .then(async response => {
                if (response.status === 401) {
                    history.push("/");
                }
                else {
                    const result = await response.json()
                    setStudent(result.students);
                    setTeacher(result.teachers);
                }
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getListClass();
    })
    return (
        <Container>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <Button variant="primary" onClick={() => handleModalShow()}>
                    <FontAwesomeIcon icon={faPlus} />Add
                </Button>
                <AddClassdModal
                    show={modalShow}
                    onHide={() => handleModalShow()}
                />
            </div>

            <h1 style={{ textAlign: "left", marginTop: "10px" }}>My Classes</h1>
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
