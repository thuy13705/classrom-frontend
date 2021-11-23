import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import './index.css'
import { Tab, Tabs } from 'react-bootstrap';
import ShowPeopleList from './ShowPeopleList';
import InfoClass from './InfoClass';
import checkTeacher from '../../helper/helper';


function DetailClass() {
    const { id } = useParams()
    const [items, setItems] = useState({});
    const [teacher,setTeacher]=useState(false);

    const getDetail = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            mode: "cors",
        };
        fetch("https://class-room-midterm.herokuapp.com/classes/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                setItems(result);
                setTeacher(checkTeacher(result.teachers,localStorage.getItem("user")));
                console.log(" : "+checkTeacher(result.teachers,localStorage.getItem("user")))
            })
            .catch(error => console.log('error', error));

    }

    useEffect(() => {
        getDetail();
        
    }, [])
    return (
        <div className="container-tab">
            <h3>{items.nameClass}</h3>
            <Tabs defaultActiveKey="info-class" id="uncontrolled-tab-example" className="mb-3" style={{ justifyContent: "center" }}>
                {teacher?<Tab eventKey="info-class" title="Information Class">
                    <InfoClass items={items}></InfoClass>
                </Tab>:<></>}
                <Tab eventKey="people" title="People">
                    <ShowPeopleList items={items} teacher={teacher}></ShowPeopleList>
                </Tab>
                <Tab eventKey="stream" title="Stream">
                </Tab>
                <Tab eventKey="classwork" title="Classwork" >
                </Tab>
            </Tabs>
        </div>

    );
}

export default DetailClass;