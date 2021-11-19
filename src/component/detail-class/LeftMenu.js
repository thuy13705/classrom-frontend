import React from 'react';
import { Nav, Col, Row} from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Login from '../login-register/Login';
import './index.css'

function LeftMenu() {
    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3} className="left-menu">
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <h5>Ten lop hoc</h5>
                                <Nav.Link eventKey="first" className="item-tab">Thong tin lop hoc</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className="item-tab">Moi nguoi</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                {/* <Sonnet /> */}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                {/* <Sonnet /> */}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default LeftMenu
