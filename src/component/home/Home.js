import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from './Card';
import './index.css';

function Home() {

    const [students, setStudent] = useState([]);
    const [teachers, setTeacher] = useState([]);

    const getListClass = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:3080/classes", requestOptions)
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
            <h1 style={{ textAlign: "left", marginTop: "50px" }}>My Classes</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {teachers && teachers.map((item, index) => (
                    <Col key={item._id} >
                        <Card key={item._id + item._id} items={item}>
                        </Card>
                    </Col>

                ))}
            </Row>
            {/* <div className="all-classes">
              
            </div> */}

            <h1 style={{ textAlign: "left", marginTop: "50px" }}>My Join Classes</h1>

            <Row xs={1} md={2} lg={3} className="g-4">
                {students && students.map((item, index) => (
                    <Col key={item._id} >
                        <Card key={item._id + item._id} items={item}>
                        </Card>
                    </Col>
                ))}
            </Row>

        </Container>
    )
}

export default Home
