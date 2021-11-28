import './../index.css'
import {
    Container, Row, Col, Form, Button, Table
} from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ItemGrade from './ItemGrade';



function Grade({ items }) {
    return (
        <div className="classdetail">
            <Container>
                <div className="classesdetail">
                    <div className="item-inner total-grade">
                        <h1>Grade Structure</h1>
                        <Table responsive="sm" borderless="true">
                            <thead>
                                <td>
                                    <td >
                                        <h6 style={{ color: "#272343", textAlign: "left", fontWeight: "500" }}>Total</h6>
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
                                        <td className="list">
                                            {item.point}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="item-inner">
                        <Form >
                            <Form.Group as={Row} className="mb-1" controlId="studentID">
                                <Form.Label column sm={3}>
                                    Name:
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-1" controlId="studentID">
                                <Form.Label column sm={3}>
                                    Point:
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="number" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Col sm={{ span: 2, offset: 5 }}>
                                    <Button type="submit">Add</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>

                    <div className="item-inner grades" style={{ marginTop: "40px" }}>
                        {items.grades && items.grades.map((item, index) => (
                            <ItemGrade grade={item} />
                        ))}
                    </div>
                </div>

            </Container>
        </div>
    );
}

export default Grade;

