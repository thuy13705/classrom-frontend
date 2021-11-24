import React, {useState} from 'react';
import { Form, Button, Modal, } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';



function AddClassModal({ show, onHide }) {
    const history=useHistory();
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [room, setRoom] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        fetch('https://class-room-midterm.herokuapp.com/classes', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                name: name,
                category: category,
                room: room,
            }),
            mode:"cors"
        })
            .then(res => res.json())
            .then((result) => {
                if (result!=="Unauthorized"){
                    alert("Adding class success.");
                }
                else{
                    history('/signin')
                }
            }, (error) => {
                alert(error);
            });

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
                    Add a new class
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="name"  >
                        <Form.Label>Class's name:</Form.Label>
                        <Form.Control type="text" required onChange={e => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="category" >
                        <Form.Label>Categoty:</Form.Label>
                        <Form.Control type="text" required  onChange={e => setCategory(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="room"  >
                        <Form.Label>Room:</Form.Label>
                        <Form.Control type="text" required onChange={e => setRoom(e.target.value)}/>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer> 
                <Button className="btnAdd" type="submit" onClick={handleSubmit}>Create</Button>
                <Button className="btnAdd" onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddClassModal;
