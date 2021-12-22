import './index.css'
import {
    Container, Table,
    Row, Col, Accordion,
    InputGroup, FormControl, Button
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'


function ShowPeopleList({ teacher, items }) {
    const history = useHistory();

    const [points, setPoints] = useState();
    let studentLink = "";
    let teacherLink = "";
    if (window.location.port !== null) {
        studentLink = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/invite/1/" + items._id;
        teacherLink = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/invite/0/" + items._id;
    }
    else {
        studentLink = window.location.protocol + "//" + window.location.hostname + "/invite/1/" + items._id;
        teacherLink = window.location.protocol + "//" + window.location.hostname + "/invite/0/" + items._id;
    }

    const getDetail = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            mode: "cors",
        };
        return fetch("http://localhost:3080/grade/getPoint/",teacher._id, requestOptions)
            .then(async response => {
                // if (response.status === 401) {
                //     history.push("/signin");
                // }
                
                return response.json();
            })
    }

    useEffect(async () => {
        if(!teacher)
            {
                const result = await getDetail();
                setPoints(result);
            }
    }, [])


    return (
        <div  className="classdetail">
            <Container >
                <div className="info">
                    <h3>{items.nameClass}</h3>
                    <h6>{items.category} _ room: {items.room}</h6>
                </div>

                {teacher ? <Accordion flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header >Invite Link</Accordion.Header>
                        <Accordion.Body>
                            <div className="info-link">
                                <p> <b>Invite Teacher: </b>{teacherLink}</p>
                                <p> <b>Invite Student: </b>{studentLink}</p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion> : <></>}

                <Row className="info-class" className="g-4" >
                    <Col xs={12} md={4} lg={2} style={{ borderTop: "2px outset #e5ecf8" }}>
                        <Table responsive="sm" borderless="true">
                            <thead>
                                <td>
                                    <td >
                                        <h6 style={{ color: "#272343", textAlign: "left", fontWeight: "500" }}>Grade Structure</h6>
                                    </td>
                                    <td >
                                        <h6 style={{ color: "#272343", textAlign: "left", fontWeight: "500" }}>{items.totalGrade}</h6>
                                    </td>
                                </td>
                            </thead>
                            <tbody>
                                {items.grades && items.grades.map((item, index) => (
                                    <tr key={item._id}>

                                        <td className="list">
                                            {item.name}:
                                        </td>
                                        <td style={{ textAlign: 'center' }} className="list">
                                            {item.point}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>

                    <Col xs={12} md={8} lg={10}>
                        <div className="stream">
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="..."
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                  
                                />
                                <Button id="button-addon2" style={{marginTop:"0px"}}>
                                    <FontAwesomeIcon icon={faAddressCard} />
                                </Button>
                            </InputGroup>
                            {teacher ? <></>:<div>My point</div>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ShowPeopleList;