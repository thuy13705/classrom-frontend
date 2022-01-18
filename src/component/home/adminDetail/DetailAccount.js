import React, {useEffect,  useState } from 'react';
import { Form, Button, Modal, } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function DetailAccount({show, setShow, item , getData}) {
    const [studentID, setStudentID] = useState();
    const [isChange, setIsChange] = useState(false);

    

    const changeStudentID = async (studentID) =>{
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();
        urlencoded.append("studentID", studentID);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://class-room-midterm.herokuapp.com/users/changeStudentID/"+item._id, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result === "Exist") {
                    alert("StudentID exists");
                }
                else {
                    alert("Success!");
                    item.studentID = studentID;
                    setIsChange(false);
                    getData();
                }
            })
            .catch(error => console.log('error', error));

    }

    const setLock = (str)=>{
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const requestOptions = {
            method: 'get',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://class-room-midterm.herokuapp.com/users/"+str+"/"+item._id, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result === "success") {
                    alert("Success!");
                    item.isLock = !item.isLock;
                    getData();
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <Modal
            show={show}
            onHide={()=>setShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Account
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {item ? <>
                <h3>username: {item.username}</h3>
                <div>email: {item.email}</div>
                <div>name: {item.name}</div>
                <div>role: {item.role}</div>
                {item.role === 'user' ? <div>studentID: {item.studentID}</div>:<></>}
                <div>state: {item.isLock ? 'inactive' : 'active' }</div>
                </>
                :<></>
            }   
            </Modal.Body>{ isChange ?
            <>
            <Modal.Body>
                <Form>
                <Form.Group className="mb-3" controlId="name"  >
                        <Form.Label>New studentID:</Form.Label>
                        <Form.Control type="text" required onChange={e => setStudentID(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Button className="btnAdd" onClick={() => changeStudentID(studentID)}>OK</Button>
            <Button className="btnAdd" onClick={() => setIsChange(false)}>Cancel</Button>
           
            </>
            :<></>
            }
            <Modal.Footer>
                {item && item.role === 'user'? <>
                {item.isLock ? <Button className="btnAdd" onClick={() => setLock('unlock')}>UnLock</Button> :<Button className="btnAdd" onClick={() => setLock('lock')}>Lock</Button>}
                <Button className="btnAdd" onClick={() => setIsChange(true)}>Change studentID</Button>
                <Button className="btnAdd" onClick={() => changeStudentID('')}>Delete studentID</Button>
                </>
                :<></>}
                <Button className="btnAdd" onClick={() => setShow(false)}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DetailAccount;