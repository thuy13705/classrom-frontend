import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useHistory } from 'react-router-dom';
import AddClassdModal from './AddClassModal';
import Card from './Card';
import getAPI from '../../helper/getAPI';

import './index.css';

function Home() {
    const history = useHistory();
    const [isCreate, setIsCreate] = useState(true);
    const [students, setStudent] = useState([]);
    const [hiddenStudent, setHiddenStudent] = useState(true);
    const [teachers, setTeacher] = useState([]);
    const [hiddenTeacher, setHiddenTeacher] = useState(true);
    const [modalShow, setModalShow] = useState(false);

    const handleModalShow = () => {
        setModalShow(!modalShow);
    }
        
    const handleData = async () => {
        const api="https://class-room-midterm.herokuapp.com/classes";
        const result = await getAPI(api);
        if (result === "401") {
            history.push('/signin');
        }
        else if (result) {
            setStudent(result.students);
            if (result.students.length > 3) {
                setStudent(result.students.slice(0, 2));
            }
            if (result.students.length === 0) {
                setHiddenStudent(false)
            }

            setTeacher(result.teachers);
            if (result.teachers.length > 3) {
                setStudent(result.teachers.slice(0, 2));
            }
            if (result.teachers.length === 0) {
                setHiddenTeacher(false)
            }
        }
    }
       
    useEffect(() => {
        handleData();
    }, [isCreate]);

    return (
        <Container >
            <div className="home">

                {/* add class*/}
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <Button variant="primary" onClick={() => handleModalShow()}>
                        <FontAwesomeIcon icon={faPlus} />Add
                    </Button>
                    <AddClassdModal
                        isCreate={isCreate}
                        setIsCreate={setIsCreate}
                        show={modalShow}
                        onHide={() => handleModalShow()}
                    />
                </div>

                {/* my class */}
                <h3 style={{ textAlign: "left", marginTop: "10px" }}>My Classes</h3>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {teachers && teachers.map((item, index) => (
                        <NavLink key={item._id + index} style={{ textDecorationLine: "none", color: "#282c34" }} to={`/classdetail/${item._id}`}>
                            <Card key={item._id + item._id} items={item}>
                            </Card>
                        </NavLink>
                    ))}
                </Row>

                {
                    hiddenTeacher ? <div style={{ display: "flex", justifyContent: "end" }}>
                        <NavLink style={{ textDecorationLine: "none", color: "#282c34" }} to={`/create`}>
                            <Button>
                                <FontAwesomeIcon icon={faAngleDoubleRight} />
                            </Button>
                        </NavLink>
                    </div> : <></>
                }

                {/* class join */}
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

                {hiddenStudent ? <div style={{ display: "flex", justifyContent: "end" }}>
                    <NavLink style={{ textDecorationLine: "none", color: "#282c34" }} to={`/join`}>
                        <Button>
                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                        </Button>
                    </NavLink>

                </div> : <></>
                }

            </div>


        </Container>

    )
}

export default Home
