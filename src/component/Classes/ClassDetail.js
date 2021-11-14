import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import './classdetail.css'
import { Tab, Tabs } from 'react-bootstrap';
import ShowPeopleList from './ShowPeopleList';


function ClassDetail() {
    const { id } = useParams()
    const [items, setItems] = useState({});

    const getDetail = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("auth-token", localStorage.getItem("auth-token"));

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:3080/course/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {

                setItems(result);
            })
            .catch(error => console.log('error', error));

    }


    useEffect(() => {
        getDetail();
    }, [])
    return (
        <div className="container-tab">
            <Tabs defaultActiveKey="people" id="uncontrolled-tab-example" className="mb-3" style={{ justifyContent: "center" }}>
                <Tab eventKey="people" title="People">
                    <ShowPeopleList items={items}></ShowPeopleList>
                </Tab>
                <Tab eventKey="stream" title="Stream">
                </Tab>
                <Tab eventKey="classwork" title="Classwork" >
                </Tab>
            </Tabs>
        </div>

    );
}

export default ClassDetail;