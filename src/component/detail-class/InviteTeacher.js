import { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom"


import './index.css'
import Login from '../login-register/Login';
import DetailClass from './DetailClass';


function InviteTeacher() {
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
            redirect: 'follow',
            mode: "cors",
        };

        fetch("https://class-room-midterm.herokuapp.com/classes/invite/0/"+id, requestOptions)
        .then(response => {
            if (response.ok) {
                history.push('/classdetail/'+id);
                return response.json();
            }
            else if (response.status === 401) {
                alert("You need to login to join classs");
                setError(false)
                history.push('/signin')
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
          {/* { error?<DetailClass></DetailClass> :<><Login nameurl={link}></Login></>
          } */}
        </div>
    );
}

export default InviteTeacher;