import React, { useState } from 'react';
import { Form, Button, Modal, } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import postAPI from '../../../../helper/postAPI';



function AddReviewModal({ isReview,setReview,gradeReview, show, onHide }) {
    const history = useHistory();
    const handleSubmit =async (e) => {
        e.preventDefault();
        const api = "http://localhost:3080/review"
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();
        urlencoded.append("grade", gradeReview.grade._id);
        urlencoded.append("studentID",gradeReview.student.studentID );
        urlencoded.append("expectation", e.target.expectation.value);
        urlencoded.append("explanation", e.target.explanation.value);

        await fetch(api, {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            mode: "cors"
        })
            .then(res => res.json())
            .then(async (result) => {
                console.log(result);
                if (result.status !== 401) {
                    setReview(!isReview);
                    alert("success.");                }
                else {
                    history.push('/signin')
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
                    Review Grade
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name"  >
                        <Form.Label>Grade Name:</Form.Label>
                        <Form.Control type="text" required value={gradeReview.grade.name}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="currentPoint" >
                        <Form.Label>Current Point:</Form.Label>
                        <Form.Control type="text" required value={gradeReview.point} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="expectation" >
                        <Form.Label>expectation:</Form.Label>
                        <Form.Control type="number" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="explanation"  >
                        <Form.Label>Explanation:</Form.Label>
                        <Form.Control type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button type='submit'>Confirm</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btnAdd" onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddReviewModal;
