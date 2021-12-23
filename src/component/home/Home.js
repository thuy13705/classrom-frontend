import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useHistory } from 'react-router-dom';
import AddClassdModal from './AddClassModal';
import Card from './Card';

import './index.css';

function Home() {
    const history = useHistory();
    const [students, setStudent] = useState([]);
    const [teachers, setTeacher] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const handleModalShow = () => {
        setModalShow(!modalShow);
    }

    const getListClass = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            mode: "cors",
        };

        return await fetch("https://class-room-midterm.herokuapp.com/classes", requestOptions)
            .then(async response => {
                if (response.status === 401) {
                    history.push("/signin");
                }
                else {
                    return await response.json();
                }
            })
            .catch(error => console.log('error', error));
    }
    const handleData = async () => {
        const result = await getListClass();
        if (result){
            setStudent(result.students);
            setTeacher(result.teachers);
        }
    }
    useEffect(() => {
        handleData();
    }, []);

    return (
        <Container >
            <div className="home">
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <Button variant="primary" onClick={() => handleModalShow()}>
                        <FontAwesomeIcon icon={faPlus} />Add
                    </Button>
                    <AddClassdModal
                        getListClass={getListClass}
                        setStudent={setStudent}
                        setTeacher={setTeacher}
                        show={modalShow}
                        onHide={() => handleModalShow()}
                    />
                </div>

                <h3 style={{ textAlign: "left", marginTop: "10px" }}>My Classes</h3>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {teachers && teachers.map((item, index) => (
                        <NavLink key={item._id + index} style={{ textDecorationLine: "none", color: "#282c34" }} to={`/classdetail/${item._id}`}>
                            <Card key={item._id + item._id} items={item}>
                            </Card>
                        </NavLink>
                    ))}
                </Row>

                <h3 style={{ textAlign: "left", marginTop: "50px" }}>My Participatory Classes</h3>

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
            </div>


        </Container>

    )
}

export default Home
