import { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom"
import './index.css'
import { Tab, Tabs } from 'react-bootstrap';
import ShowPeopleList from './ShowPeopleList';
import InfoClass from './InfoClass';
import checkTeacher from '../../helper/helper';
import Grade from './grade/Grade';
import GradeDetail from './grade/GradeDetail';
import Review from './grade/review/Review';
import getAPI from '../../helper/getAPI';
import Error from '../error/Error';

function DetailClass() {
    const history = useHistory();
    const { id } = useParams();
    const [roleUser,setRoleUser]=useState("no");
    const [items, setItems] = useState({});
    const [teacher, setTeacher] = useState(false);

    const getDetail =async() => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            mode: "cors",
        };
        return await fetch("https://class-room-midterm.herokuapp.com/classes/" + id, requestOptions)
            .then(async response => {
                if (response.status === 401) {
                    history.push("/signin");
                }
                return await response.json();
            })
    }

    const getRole =async() => {
        const api = "https://class-room-midterm.herokuapp.com/classes/check/" + id;
        const result = await getAPI(api);
        if (result === "401") {
            history.push('/signin');
        }
        else if (result) {
            console.log(result);
            if (result!=="not"){
                setRoleUser(result);
            }
        }
    }


    const setItem = async (result) =>{
        await setItems(result);
        console.log(result)
    }

    const handleData=async()=>{
        const result=await getDetail();
        setItem(result);
        setTeacher(checkTeacher(result.teachers, localStorage.getItem("user")));
    }

    useEffect( () => {
        getRole();
        if (roleUser!=="not"){
            handleData();
        }
    }, [])
    return (
       <>{roleUser!=="not"? <div className="container-tab">
       <h3>{items.nameClass}</h3>
       <Tabs defaultActiveKey="people" id="uncontrolled-tab-example" className="mb-3" style={{ justifyContent: "center" }}>
           <Tab eventKey="info-class" title="Information Class">
               <InfoClass teacher={teacher} items={items}></InfoClass>
           </Tab>
           <Tab eventKey="people" title="People">
               <ShowPeopleList items={items} teacher={teacher}></ShowPeopleList>
           </Tab>

           <Tab eventKey="classword" title="Classwork">
               <Grade items={items} setItems={setItems} getDetail={getDetail} teacher={teacher}></Grade>
           </Tab>
           {
               teacher ? <Tab eventKey="grade" title="Grade" >
                   <GradeDetail items={items} setItems={setItem} getDetail={getDetail} ></GradeDetail>
               </Tab> : <></>
           }
            <Tab eventKey="review" title="Review">
                <Review items={items} teacher={teacher}></Review>
           </Tab>
       </Tabs>
   </div>
:<Error/>}</>
    );
}

export default DetailClass;