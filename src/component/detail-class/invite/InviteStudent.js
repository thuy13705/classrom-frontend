import { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom"
import Home from '../../home/Home';


import './../index.css'


function InviteStudent() {
    const { id } = useParams();
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

        fetch("https://class-room-midterm.herokuapp.com/classes/invite/1/"+id, requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else if (response.status === 401) {
                alert("You need to login to join classs");
                setError(false)
                history.push('/signin')
            }
          })
            .then(result =>{
                console.log(result);
                history.push('/classdetail/'+id);
            })
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        getInviteStudent();
    }, [])

    return (
        <Home/>
    );
}

export default InviteStudent;