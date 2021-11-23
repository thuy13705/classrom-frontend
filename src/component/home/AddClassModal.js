import React, {useState, useEffect} from 'react';
import { Form, Button, Modal, } from 'react-bootstrap';

function AddClassModal({ show, onHide }) {
    const [snackbareopen, setSnack] = useState(false);
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [room, setRoom] = useState();
    const [items, setItems] = useState({});

    const handleSubmit = (e) => {
        console.log("click");
        e.preventDefault();
        fetch('https://class-room-midterm.herokuapp.com/classes/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                category: category,
                room: room,
                
            })
        })
            .then(res => res.json())
            .then((result) => {
                setSnack(true);
                alert("Thêm thành công.");
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

export default AddClassModal
