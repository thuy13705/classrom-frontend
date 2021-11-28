import './../index.css'
import {Button} from 'react-bootstrap';
import {useHistory, useParams} from 'react-router-dom';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

function ItemGrade({ grade }) {
    const history=useHistory();
    const { id } = useParams()
    const deleteGrade = () =>{
         console.log(grade._id)
         const myHeaders = new Headers();
         myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
         myHeaders.append("Accept", "application/json");
         myHeaders.append("Content-Type", "application/json");
         fetch('http://localhost:3080/grade/delete/' + id , {
             method: 'POST',
             headers: myHeaders,
             body: JSON.stringify({
                 id: grade._id 
             }),
             mode:"cors",
             
         })
             .then((message) => {
                 if (message!=="success"){
                    alert("Delete grade success.");
                 }
                 else{
                    history('/signin')
                 }
             }, (error) => {
                 alert(error);
             });
     }


    return (
        <div className="item-inner item-grade">
            <div>
                <p><b>Name</b>: {grade.name}</p>
                <p><b>Point</b>: {grade.point}</p>
            </div>
            <div>
                <Button className="btn-edit"><FontAwesomeIcon icon={faEdit} /></Button>
                <Button className="btn-trash" onClick={deleteGrade}><FontAwesomeIcon icon={faTrash} /></Button>
            </div>
        </div>
    );
}

export default ItemGrade;

