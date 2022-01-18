import React, { useState } from 'react';
import { Form, Button, Modal, } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';



function InviteClassByCode({isShowInvite, setIsShowInvite }) {
    const history = useHistory();
    const [code, setCode] = useState('');

    const handleSubmit =async (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        await fetch('https://class-room-midterm.herokuapp.com/classes/InviteByCode/'+code, {
            method: 'get',
            headers: myHeaders,
            mode: "cors"
        })
            .then(async response =>{                
                const rs = await response.json();
                console.log(rs)
                if (rs.result === '')
                    alert("Class not exist");
                else
                if (rs.result === 'Exist')
                    alert("You already exist in class");
                else
                    setIsShowInvite(false)
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });

    }
    return (
        <Modal
            show={isShowInvite}
            onHide={()=>setIsShowInvite(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Invite class by code
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="name"  >
                        <Form.Label>Code of class:</Form.Label>
                        <Form.Control type="text" required onChange={e => setCode(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btnAdd" type="submit" onClick={handleSubmit}>Invite</Button>
                <Button className="btnAdd" onClick={() => setIsShowInvite(false)}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InviteClassByCode;