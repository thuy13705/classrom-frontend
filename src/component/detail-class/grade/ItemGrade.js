import './../index.css'
import {Button} from 'react-bootstrap';
import {useHistory, useParams} from 'react-router-dom';
import {  useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons'
import {SortableElement} from 'react-sortable-hoc';

function ItemGrade({ teacher,grade, index,setItems,getDetail, setGrades }) {
    const history=useHistory();
    const { id } = useParams();
    const [edit, setEdit] = useState(false);

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
             .then(async (message) => {
                 if (message!=="success"){
                    alert("Delete grade success.");
                    const result=await getDetail();
                   setItems(result)
                   grade=result.grades;
                   setGrades(grade);        
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
     }


     const editGrade = (e) =>{
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        fetch('https://class-room-midterm.herokuapp.com/grade/edit/' + id , {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                id: grade._id,
                name: document.getElementById('nameGrade').value,
                point:document.getElementById('pointGrade').value, 
            }),
            mode:"cors",
            
        })
            .then(async(message) => {
                if (message!=="success"){
                   alert("Edit grade success.");
                   const result=await getDetail();
                   setItems(result)
                   grade=result.grades;
                   setGrades(grade);  
                  
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
                    { edit ?<p><b>Name</b>: <input defaultValue={item.name} id="nameGrade" type="text"/></p> : <p><b>Name</b>: {item.name}</p> }
                    { edit ?<p><b>Point</b>: <input defaultValue={item.point} id="pointGrade" type="number" /></p>: <p><b>Point</b>: {item.point}</p>}
                    {/* { curPoint ? <p><b>Your Point</b>: {curPoint}</p>:<></>} */}

                </div>
                {teacher?<div>
                    { edit ? <Button className="btn-edit" onClick={()=>editGrade()}><FontAwesomeIcon icon={faCheck}/></Button>:<Button onClick={()=>handleEdit()} className="btn-edit"><FontAwesomeIcon icon={faEdit} /></Button>}
                    <Button className="btn-trash" onClick={()=>deleteGrade()}><FontAwesomeIcon icon={faTrash} /></Button>
                </div>:<></>
                }
                
            </div>
        );
    })

    // useEffect(() => {
    //     getDetail().then((result) => {
    //         setItems(result)
    //         grade=result.grades;
    //         setGrades(grade);
    //     }).catch(error => console.log('error', error));                  
    // }, [])

    // return (
    //     <div className="item-inner item-grade">
    //         <div>
    //             <p><b>Name</b>: {grade.name}</p>
    //             <p><b>Point</b>: {grade.point}</p>
    //         </div>
    //         <div>
    //             <Button className="btn-edit"><FontAwesomeIcon icon={faEdit} /></Button>
    //             <Button className="btn-trash" onClick={deleteGrade}><FontAwesomeIcon icon={faTrash} /></Button>
    //         </div>
    //     </div>
    // );

    return <SortableItem index={index} item={grade} />;
}

export default ItemGrade;