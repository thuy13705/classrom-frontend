import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './footer.css';


function Footer() {
    return (
        <div className="footer">
            <div className="column-layout">
                <div className="column-item column-one">
                    <h4>Contact with us</h4>
                    <p>Email: abc666747525252@gmail.com</p>
                    <p>Phone: 666 7475 25252</p>

                </div>
                <div className="column-item column-two">
                    <h4>Stay update</h4>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter your email" />
                            <Button type="submit" className="stay-update">
                                Submit
                            </Button>
                        </Form.Group>

                    </Form>
                </div>


            </div>
            
        </div>
    )
}

export default Footer
