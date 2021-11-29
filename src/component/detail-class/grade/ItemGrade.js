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
         const myHeaders = new Headers();
         myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
         myHeaders.append("Accept", "application/json");
         myHeaders.append("Content-Type", "application/json");
         fetch('https://class-room-midterm.herokuapp.com/grade/delete/' + id , {
             method: 'POST',
             headers: myHeaders,
             body: JSON.stringify({
                 id: grade._id 
             }),
             mode:"cors",
             
         })
             .then((message) => {
                 console.log(message);
                 if (message!=="success"){
                    alert("Delete grade success.");
                 }
                 else{
                    history.push('/signin')
                 }
             }, (error) => {
                 alert(error);
             });
     }

     const handleEdit=()=>{
         setEdit(!edit);
         console.log(edit);
     }


     const editGrade = (e) =>{
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        fetch('https://class-room-midterm.herokuapp.com/grade/edit/' + grade._id , {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                id: grade._id,
                name: e.target.nameGrade.value,
                point:e.target.pointGrade.value, 
            }),
            mode:"cors",
            
        })
            .then((message) => {
                if (message!=="success"){
                   alert("Edit grade success.");
                   setEdit(!edit);
                }
                else{
                   history.push('/signin')
                }
            }, (error) => {
                alert(error);
            });
    }


    const SortableItem = SortableElement(({item}) => {
        return (
            <div className="item-inner item-grade">
                <div>
                    { edit ?<p><b>Name</b>: <input defaultValue={item.name} name="nameGrade" type="text"/></p> : <p><b>Name</b>: {item.name}</p> }
                    { edit ?<p><b>Point</b>: <input defaultValue={item.point} name="pointGrade" type="number" /></p>: <p><b>Point</b>: {item.point}</p>}
                </div>
                <div>
                    { edit ? <Button className="btn-edit" onClick={editGrade}><FontAwesomeIcon icon={faCheck}/></Button>:<Button onClick={handleEdit} className="btn-edit"><FontAwesomeIcon icon={faEdit} /></Button>}
                    {/* { edit ? <Button className="btn-trash" onClick={e=>setEdit(true)}><FontAwesomeIcon icon={faWindowClose} /></Button> :
                    <Button className="btn-trash" onClick={deleteGrade}><FontAwesomeIcon icon={faTrash} /></Button>} */}
                    <Button className="btn-trash" onClick={deleteGrade}><FontAwesomeIcon icon={faTrash} /></Button>
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

