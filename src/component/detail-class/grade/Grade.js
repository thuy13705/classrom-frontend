import './../index.css'
import {
    Container, Row, Col, Form, Button, Table
} from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {useState } from 'react';
import ItemGrade from './ItemGrade';
import {useHistory} from 'react-router-dom';
import {SortableContainer, arrayMove} from 'react-sortable-hoc';



function Grade({ items,setItems,getDetail}) {
    const history=useHistory();
    const [name, setName] = useState();
    const [point, setPoint] = useState(0);
    const [grades, setGrades] = useState(items.grades);

    const handleSubmit = (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        fetch('https://class-room-midterm.herokuapp.com/grade/add/' + items._id, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                name: name,
                point: point,
            }),
            mode:"cors",
            
        })
            .then(async(message) => {
                if (message!="success"){ 
                    alert("Adding grade success.");
                    const result=await getDetail();
                    setItems(result)
                    items=result;
                    setGrades(items.grades);
                }
                else  if (message==="fail"){
                    alert("Failed");
                } else{
                    history.push('/signin')
                }
            }, (error) => {
                alert(error);
            });
    }

    const SortableList = SortableContainer(({grades}) => {
        let list_items = grades.map((item, index) => {
            return <ItemGrade key={`item-${index}`} grade={item} index={index} setItems={setItems} getDetail={getDetail} setGrades={setGrades} />;
          });
    
          return (
            <div style={{background: '#FF0'}}>{list_items}</div>
          );
    });

    function sort(){
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        fetch('https://class-room-midterm.herokuapp.com/grade/sort/' + items._id, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                grades: grades
            }),
            mode:"cors",
            
        })
            .then(async(message) => {
                console.log(message);
                if (message!=="success"){
                    alert("Sort grade success.");
                    const result=await getDetail();
                    setItems(result)
                    items=result;                  
                }
                else{
                    history.push('/signin')
                }
            }, (error) => {
                alert(error);
            });
    }

    function onSortEnd({oldIndex, newIndex}) {
        setGrades(arrayMove(grades, oldIndex, newIndex));
        
      
    }



    return (
        <div className="classdetail">
            <Container>
                <div className="classesdetail">
                    <div className="item-inner total-grade">
                        <h1>Grade Structure</h1>
                        <Table responsive="sm" borderless="true">
                            <thead>
                                <td>
                                    <td >
                                        <h6 style={{ color: "#272343", textAlign: "left", fontWeight: "500" }}>Total</h6>
                                    </td>
                                    <td >
                                        <h6 style={{ color: "#272343", textAlign: "left", fontWeight: "500" }}>{items.totalGrade}</h6>
                                    </td>
                                </td>
                            </thead>
                            <tbody>
                                {items.grades && items.grades.map((item, index) => (
                                    <tr key={item._id}>

                                        <td className="list">
                                            {item.name}:
                                        </td>
                                        <td className="list">
                                            {item.point}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="item-inner">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mb-1" controlId="namseID">
                                <Form.Label column sm={3}>
                                    Name:
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" required onChange={e => {setName(e.target.value)}}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-1" controlId="pointID">
                                <Form.Label column sm={3}>
                                    Point:
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="number" required onChange={e => setPoint (Number(e.target.value))}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Col sm={{ span: 2, offset: 5 }}>
                                    <Button type="submit">Add</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>

                    <div className="item-inner grades" style={{ marginTop: "40px" }}>
                        {grades ? <SortableList grades={grades} onSortEnd={onSortEnd}/> : <></>}
                    </div>
                </div>
            <button onClick={sort}>save</button>
            </Container>
        </div>
    );
}

export default Grade;