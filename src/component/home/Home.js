import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useHistory } from 'react-router-dom';
import AddClassdModal from './AddClassModal';
import Card from './Card';
import getAPI from '../../helper/getAPI';
import InviteClassByCode from './InviteClassByCode';
import Admin from './Admin';

import './index.css';

function Home() {
    const history = useHistory();
    const [isCreate, setIsCreate] = useState(true);
    const [students, setStudent] = useState([]);
    const [teachers, setTeacher] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [isShowInvite, setIsShowInvite] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

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

            setTeacher(result.teachers);
          
        }
    }
       
    useEffect(() => {
        handleData();
        if (localStorage.getItem('roleUser') === 'admin'){
            setIsAdmin(true);
        }
        else setIsAdmin(false);
    }, [isCreate]);

    return (
        <>
        {isAdmin ? <Admin></Admin>
        :
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
                    <Button variant="primary" onClick={() => setIsShowInvite(true)}>
                        Invite By Code
                    </Button>
                    <InviteClassByCode
                        isShowInvite={isShowInvite}
                        setIsShowInvite={setIsShowInvite}
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

            </div>


        </Container>}
        </>

    )
}

export default Home