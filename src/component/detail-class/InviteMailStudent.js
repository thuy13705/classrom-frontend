import { Form, Button, Modal, } from 'react-bootstrap'
import React, { useState } from 'react';

function InviteMailStudent({ id, show, onHide }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();
        urlencoded.append("emailTarget", e.target.email.value);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow',
            mode: "cors",
        };

        fetch("https://class-room-midterm.herokuapp.com/classes/sendMailStudent/"+id, requestOptions)
            .then(response => response.text())
            .then(result =>{
                if (result!=="Unauthorized")
                alert("success!")
            })
            .catch(error => console.log('error', error));
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Invite people
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="teacher">
                        <Button className="btn-submit" type='submit'>Invite</Button>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InviteMailStudent;