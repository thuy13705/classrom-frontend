import { useState, useEffect } from 'react';
import {
    Container, Dropdown, Table, InputGroup, FormControl
} from 'react-bootstrap';
import { CSVLink } from "react-csv";
import { useHistory } from 'react-router-dom';
import './../index.css'
import ImportFile from './ImportFile';


function GradeDetail({ items, setItems, getDetail }) {
    const history = useHistory();

    const [headers, setHeader] = useState([]);
    const [data, setData] = useState([]);
    const [csvReport, setCSVReport] = useState([]);
    const [fileStudentList, setFileStudentList] = useState();
    const [fileGrade, setFileGrade] = useState();
    const [onHide, setOnHide] = useState(false);
    const [gradeDropDown, setGradeDropDown] = useState(false);
    const [grade, setGrade] = useState();

    const setStudentList = (input) =>{
        setFileStudentList(input.files[0]);
        var reader = new FileReader();
        reader.readAsText(input.files[0]);

        reader.onload = function() {
            const strData = reader.result;
            let arrData = [];
            let lines = strData.split(/\r\n|\n|,/);
            
            let i=2;
            while (i < lines.length)
            {
                while (lines[i] && lines[i]!="" && lines[i].indexOf('"') !=-1){
                    lines[i] = lines[i].replace('"','');
                }
                while (lines[i+1] && lines[i+1]!="" &&  lines[i+1].indexOf('"') !=-1){
                    lines[i+1] = lines[i+1].replace('"','');
                }
                let Data ={
                    studentID: lines[i],
                    name: lines[i+1],
                }
                if (lines[i] && lines[i+1])
                arrData.push(Data);
                i=i+2;
            }
            console.log(arrData);
            const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
            fetch('http://localhost:3080/classes/boardGrade/' + items._id , {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    datas: arrData
                }),
                mode:"cors",
                
            })
                .then(async(message) => {
                    if (message!=="success"){
                       const result=await getDetail();
                       setItems(result)
                    }
                    else{
                       history.push('/signin')
                    }
                }, (error) => {
                    alert(error);
                })
        }
    }

    const setPointList = (input) =>{
        setFileStudentList(input.files[0]);
        var reader = new FileReader();
        reader.readAsText(input.files[0]);

        reader.onload = function() {
            const strData = reader.result;
            let arrData = [];
            let lines = strData.split(/\r\n|\n|,/);
            
            let i=2;
            while (i < lines.length)
            {
                while (lines[i] && lines[i]!="" && lines[i].indexOf('"') !=-1){
                    lines[i] = lines[i].replace('"','');
                }
                while (lines[i+1] && lines[i+1]!="" &&  lines[i+1].indexOf('"') !=-1){
                    lines[i+1] = lines[i+1].replace('"','');
                }
                let Data ={
                    studentID: lines[i],
                    point: parseInt(lines[i+1]),
                }
                if (lines[i] && lines[i+1])
                arrData.push(Data);
                i=i+2;
            }
            console.log(arrData);
            
            const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
            fetch('http://localhost:3080/grade/pushAllPoint/' + grade._id , {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    datas: arrData
                }),
                mode:"cors",
                
            })
                .then(async(message) => {
                    if (message!=="success"){
                       const result=await getDetail();
                       setItems(result)
                    }
                    else{
                       history.push('/signin')
                    }
                }, (error) => {
                    alert(error);
                })
        }
    }

    const setInput = (input) =>{
        if (gradeDropDown)
            setPointList(input)
        else    
            setStudentList(input);
        setOnHide(!onHide);
    }

    const handleData = () => {

        const headers = [
            { label: "ID", key: "id" },
            { label: "Name", key: "name" },
        ];

        setHeader(headers);

        let dataTmp = []

        if (items.teachers) {
            dataTmp = items.teachers.map((student, index) => {
                const tmp = { id: `${student.studentID}`, name: `${student.name}`, }
                return tmp;
            });
        }
        setData(dataTmp);
    }

    useEffect(() => {
        handleData();
        const report = {
            data: data,
            headers: headers,
            filename: 'StudentList.csv'
        };
        setCSVReport(report)
    }, [])
    
    return (
        <>

            <Container>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                    <Dropdown style={{ marginRight: "10px" }}>
                        <Dropdown.Toggle variant="success" id="dropdown-import">
                            Import
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item >
                                <div onClick={()=>{setOnHide(!onHide); setGradeDropDown(false)}}>Import student list</div>
                            </Dropdown.Item>
                            <Dropdown.Item >Another action</Dropdown.Item>
                            <Dropdown.Item >Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-export">
                            Export
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Menu>
                                <Dropdown.Item as="Label">
                                    <CSVLink style={{ textDecoration: "none", color: "#272343" }} data={data} headers={headers} filename="StudentList.csv">Export student list</CSVLink>
                                </Dropdown.Item>
                                <Dropdown.Item as="Label">
                                    <CSVLink style={{ textDecoration: "none", color: "#272343" }}  {...csvReport}>Export template grade list</CSVLink>
                                </Dropdown.Item>
                                <Dropdown.Item as="Label">
                                    <CSVLink style={{ textDecoration: "none", color: "#272343" }}  {...csvReport}>Export grade board</CSVLink>

                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <ImportFile
                                    show={onHide}
                                    onHide={setOnHide}
                                    setFile={setInput}
                                />
                <Table id="emp" bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: "100px" }}>ID</th>
                            <th style={{ width: "200px" }}>Name</th>
                            <th style={{ width: "100px" }}>Average</th>
                            {items.grades && items.grades.map((item, index) => (
                                <th style={{ width: "100px" }} key={item._id}> {item.name} 
                                <Dropdown style={{display:"inline", marginLeft: "50px", marginRight:"0px"}}>
                                <Dropdown.Toggle >
                                    &#10247;
                                </Dropdown.Toggle>
        
                                <Dropdown.Menu>
                                    <Dropdown.Item >
                                        <div onClick={()=>{setOnHide(!onHide); setGradeDropDown(true); setGrade(item)}}>Import student list</div>
                                    </Dropdown.Item>
                                    <Dropdown.Item >Another action</Dropdown.Item>
                                    <Dropdown.Item >Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown></th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.boardGrade && items.boardGrade.map((student, index) => (
                            <tr key={student.studentID}>
                                <td style={{ width: "100px" }}>{student.studentID}</td>
                                <td style={{ width: "200px" }}>{student.name}</td>
                                <td contentEditable="true" style={{ width: "100px" }}>
                                    </td>
                                {student.point && student.point.map((point, index) => (
                                    <td><td contentEditable="true" style={{ width: "100px" }}>
                                        {point.point}
                                    </td>
                                    <div style={{ display: 'inline'}}>/{point.pointGrade}</div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default GradeDetail;