import { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom"


import './index.css'
import { Container, Fade, Table } from 'react-bootstrap';
import Login from '../login-register/Login';
import DetailClass from './DetailClass';


function InviteStudent() {
    const { id } = useParams();
    const [result, setResult] =useState();
    const [error,setError]=useState(true);
    const history=useHistory();
    const link="/invite/1/"+id

    const getInviteStudent = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://class-room-midterm.herokuapp.com/classes/invite/1/"+id, requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else if (response.status === 401) {
                alert("You need to login to join classs");
                setError(false)
                history.push('/')
            }
          })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        getInviteStudent();
    }, [])

    return (
        <div >
          { error?<DetailClass></DetailClass> :<><Login nameurl={link}></Login></>
          }
        </div>
    );
}

export default InviteStudent;