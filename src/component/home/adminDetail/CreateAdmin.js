import React, { useState } from 'react';
import { Form, Button, Modal, } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function CreateAdmin({show, setShow, getData }) {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const checkUser = () =>{
        if (username.length > 32)
        {
            alert("Username cannot exceed 32 characters!!!");
            return false;
        }
        for (let i = 0; i< username.length ;i++)
        if (!("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_").includes(username[i]))
            {
                alert("Username illegal!!!");
                return false;
            }
        if (password.length > 32)
        {
            alert("Password cannot exceed 32 characters!!!");
            return false;
        }
        if (password.length < 8)
        {
            alert("Password no shorter than 6 characters!!!");
            return false;
        }
        for (let i = 0; i< password.length ;i++)
        if (!("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_").includes(password[i]))
            {
                alert("Password illegal!!!");
                return false;
            }
            return true;
    }

    const handleSubmit =async (e) => {
        
        if (!checkUser)
        return;
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        await fetch('http://localhost:3080/users/createAdmin', {
            method: 'Post',
            headers: myHeaders,
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
            }),
            mode: "cors"
        })
            .then(async response =>{                
                const rs = await response.json();
                console.log(rs)
                if (rs.message === 'username')
                    alert("Username exist");
                else
                if (rs.message === 'email')
                    alert("Email Exist");
                else{
                    setShow(false)
                    getData();
                }
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });

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
                    Create Admin
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group className="mb-3" controlId="name"  >
                        <Form.Label>username:</Form.Label>
                        <Form.Control type="text" required onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="category" >
                        <Form.Label>password:</Form.Label>
                        <Form.Control type="password" required onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="room"  >
                        <Form.Label>email:</Form.Label>
                        <Form.Control type="email" required onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btnAdd" type="submit" onClick={handleSubmit}>Create</Button>
                <Button className="btnAdd" onClick={() => setShow(false)}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateAdmin;