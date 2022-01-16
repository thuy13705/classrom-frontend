import './../index.css'
import {
    Container, Row, Col, Form, Button, Table
} from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {useState,useEffect} from 'react';
import ItemGrade from './ItemGrade';
import {useHistory} from 'react-router-dom';
import {SortableContainer, arrayMove} from 'react-sortable-hoc';
import Loading from 'react-loading'
import Point from './Point';



function Grade({teacher, items,setItems,getDetail,currentPoint}) {
    const history=useHistory();
    const [name, setName] = useState();
    const [point, setPoint] = useState(0);
    const [grades, setGrades] = useState(items.grades);
    const [isLoading, setIsLoading] = useState(false);

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
            return <ItemGrade key={`item-${index}`} teacher={teacher} grade={item} index={index} setItems={setItems} getDetail={getDetail} setGrades={setGrades} currentPoint={currentPoint} />;
          });
    
          return (
            <div style={{background: '#FF0'}}>{list_items}</div>
          );
    });

    useEffect(() => {
        console.log(currentPoint);
        getDetail().then((result) => {
            setItems(result)
                    items=result;
                    setGrades(items.grades);
        }).catch(error => console.log('error', error));   
    }, [])

    async function sort(tmpGrades){
        await setIsLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        fetch('http://localhost:3080/grade/sort/' + items._id, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                grades: tmpGrades
            }),
            mode:"cors",
        })
            .then(async(message) => {
                if (message!=="success"){
                    const result=await getDetail();
                    await setItems(result)
                    items=result;
                    console.log(items)
                    await setIsLoading(false);
                }
                else{
                    history.push('/signin')
                }
            }, async(error) => {
                alert(error);
                await setIsLoading(false);
            });
    }

    async function onSortEnd({oldIndex, newIndex}) {
        const tmp = await arrayMove(grades, oldIndex, newIndex)
        await setGrades(tmp);
        sort(tmp);
    }


    return (
        <div className="classdetail">
            {!teacher ? <Point teacher ={teacher} gradeBoard={items.gradeBoard}/> 
            :
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
                    {teacher ?  <div className="item-inner">
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
                    </div>:<></>
                    }
                    { isLoading ? <Loading style={{left: '47%', width: '100px', position:'absolute'}} type={'spin'} color={'blue'}/> :<></>}
                    <div className="item-inner grades" style={{ marginTop: "40px" }}>
                        {grades ? <SortableList grades={grades} onSortEnd={onSortEnd}/> : <></>}
                    </div>
                </div>
            </Container>}
        </div>
    );
}

export default Grade;