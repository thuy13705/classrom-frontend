import React, { useState } from 'react';
import { Form, Button, Modal, } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import postAPI from '../../../../helper/postAPI';



function AddReviewModal({ isReview,setReview,gradeReview, show, onHide }) {
    const history = useHistory();
    const handleSubmit =async (e) => {
        e.preventDefault();
        const api = "https://class-room-midterm.herokuapp.com/review";
        const result = await postAPI(api,{grade:gradeReview.grade._id,
                                            studentID:gradeReview.student.studentID,
                                            expectation:e.target.expectation.value,
                                            explanation:e.target.explanation.value});
        if (result === "401") {
            history.push('/signin');
        }
        else if (result) {
            if (result==="success"){
                alert("success.");
                setReview(!isReview);
            }else{
                alert("Failed");
            }
        }
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
                <Form onSubmit={async(e)=>await handleSubmit()}>
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
