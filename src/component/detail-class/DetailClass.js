import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import './index.css'
import { Tab, Tabs } from 'react-bootstrap';
import ShowPeopleList from './ShowPeopleList';
import InfoClass from './InfoClass';


function DetailClass() {
    const { id } = useParams()
    const [items, setItems] = useState({});

    const getDetail = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:3080/classes/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                setItems(result);
                console.log(result);
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
                <Tab eventKey="info-class" title="Information Class">
                    <InfoClass items={items}></InfoClass>

                </Tab>
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

export default DetailClass;