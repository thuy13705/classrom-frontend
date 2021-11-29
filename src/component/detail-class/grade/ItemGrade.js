import './../index.css'
import {Button} from 'react-bootstrap';
import {useHistory, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faCheck, faClosedCaptioning, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import {SortableElement} from 'react-sortable-hoc';
import {
     Form
} from 'react-bootstrap';

function ItemGrade({ grade, index }) {
    const history=useHistory();
    const { id } = useParams();
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(grade.name);
    const [point, setPoint] = useState(grade.point);
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


     const editGrade = () =>{
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        fetch('http://localhost:3080/grade/edit/' + grade._id , {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                id: grade._id,
                name: name,
                point: point, 
            }),
            mode:"cors",
            
        })
            .then((message) => {
                if (message!=="success"){
                   alert("Edit grade success.");
                   setEdit(false);
                }
                else{
                   history('/signin')
                }
            }, (error) => {
                alert(error);
            });
    }


    const SortableItem = SortableElement(({item}) => {
        return (
            <div className="item-inner item-grade">
                <div>
                    { edit ?<p><b>Name</b>: <input value={name} type="text" onChange={e=> setName(e.target.value)}/></p> : <p><b>Name</b>: {item.name}</p> }
                    { edit ?<p><b>Point</b>: <input value={point} type="number" onChange={e => setPoint(e.target.value)} /></p>: <p><b>Point</b>: {item.point}</p>}
                </div>
                <div>
                    { edit ? <Button className="btn-edit" onClick={editGrade}><FontAwesomeIcon icon={faCheck}/></Button>:<Button onClick={e=>setEdit(true)} className="btn-edit"><FontAwesomeIcon icon={faEdit} /></Button>}
                    { edit ? <Button className="btn-trash" onClick={e=>setEdit(true)}><FontAwesomeIcon icon={faWindowClose} /></Button> :
                    <Button className="btn-trash" onClick={deleteGrade}><FontAwesomeIcon icon={faTrash} /></Button>}
                </div> 
            </div>
        );
    })

    /*
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
    );*/

    return <SortableItem index={index} item={grade} />;
}

export default ItemGrade;

