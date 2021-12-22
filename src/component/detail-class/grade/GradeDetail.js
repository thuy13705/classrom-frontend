import { useState, useEffect } from 'react';
import {
    Container, Dropdown, Table, Form
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { CSVLink } from "react-csv";
import { useHistory } from 'react-router-dom';
import './../index.css'
import ImportFile from './ImportFile';
import { Button } from 'react-bootstrap';

import { faShare } from '@fortawesome/free-solid-svg-icons'
import { render } from '@testing-library/react';


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


    const setStudentList = (input) => {
        setFileStudentList(input.files[0]);
        var reader = new FileReader();
        reader.readAsText(input.files[0]);

        reader.onload = function () {
            const strData = reader.result;
            let arrData = [];
            let lines = strData.split(/\r\n|\n|,/);

            let i = 2;
            while (i < lines.length) {
                while (lines[i] && lines[i] != "" && lines[i].indexOf('"') != -1) {
                    lines[i] = lines[i].replace('"', '');
                }
                while (lines[i + 1] && lines[i + 1] != "" && lines[i + 1].indexOf('"') != -1) {
                    lines[i + 1] = lines[i + 1].replace('"', '');
                }
                let Data = {
                    studentID: lines[i],
                    name: lines[i + 1],
                }
                if (lines[i] && lines[i + 1])
                    arrData.push(Data);
                i = i + 2;
            }
            console.log(arrData);
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            fetch('http://localhost:3080/classes/boardGrade/' + items._id, {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    datas: arrData
                }),
                mode: "cors",

            })
                .then(async (message) => {
                    if (message !== "success") {
                        const result = await getDetail();
                        setItems(result)
                    }
                    else {
                        history.push('/signin')
                    }
                }, (error) => {
                    alert(error);
                })
        }
    }

    const setPointList = (input) => {
        setFileStudentList(input.files[0]);
        var reader = new FileReader();
        reader.readAsText(input.files[0]);

        reader.onload = function () {
            const strData = reader.result;
            let arrData = [];
            let lines = strData.split(/\r\n|\n|,/);

            let i = 2;
            while (i < lines.length) {
                while (lines[i] && lines[i] != "" && lines[i].indexOf('"') != -1) {
                    lines[i] = lines[i].replace('"', '');
                }
                while (lines[i + 1] && lines[i + 1] != "" && lines[i + 1].indexOf('"') != -1) {
                    lines[i + 1] = lines[i + 1].replace('"', '');
                }
                let Data = {
                    studentID: lines[i],
                    point: parseInt(lines[i + 1]),
                    isComplete: false
                }
                if (lines[i] && lines[i + 1])
                    arrData.push(Data);
                i = i + 2;
            }
            console.log(arrData);

            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            fetch('http://localhost:3080/grade/pushAllPoint/' + grade._id, {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    datas: arrData
                }),
                mode: "cors",

            })
                .then(async (message) => {
                    if (message !== "success") {
                        const result = await getDetail();
                        setItems(result)
                    }
                    else {
                        history.push('/signin')
                    }
                }, (error) => {
                    alert(error);
                })
        }
    }

    const setInput = (input) => {
        if (gradeDropDown)
            setPointList(input)
        else
            setStudentList(input);
        setOnHide(!onHide);
    }

    const [studentHeaders, setStudentHeaders] = useState([]);
    const [studentData, setStudentData] = useState([]);


    const [templateHeaders, setTemplateHeaders] = useState([]);
    const [templateData, setTemplateData] = useState([]);

    // const [studentHeaders, setStudentHeaders] = useState([]);
    // const [studentData, setStudentData] = useState([]);
    // const [listStudent, setListStudent] = useState([]);

    const handleTemplateData = () => {

        let headers = [
            { label: "ID", key: "id" },
            { label: "Average", key: "average" },
        ];

        let headertmp = [];

        if (items.grades) {
            headertmp = items.grades.map((grade, index) => {
                const tmp = { label: `${grade.name}`, key: `${index}` }
                return tmp;
            });
        }

        let headersConcat = headers.concat(headertmp);
        setTemplateHeaders(headersConcat);


        let data1 = []

        if (items.teachers) {
            data1 = items.teachers.map((student, index) => {
                let tmp = { id: `${student.studentID}`, average: "" }
                if (items.grades) {
                    const dataTmp = items.grades.map((grade, index) => {
                        tmp[`${index}`] = "";
                        return grade;
                    });
                }

                return tmp;
            });
        }
        setTemplateData(data1);
    }


    const handleStudentsData = () => {

        const headers = [
            { label: "ID", key: "id" },
            { label: "Name", key: "name" },
        ];

        setStudentHeaders(headers);

        let dataTmp = []

        if (items.teachers) {
            dataTmp = items.teachers.map((student, index) => {
                const tmp = { id: `${student.studentID}`, name: `${student.name}`, }
                return tmp;
            });
        }
        setStudentData(dataTmp);
    }

    const sumTotal = (id) => {
        let sum = 0;
        {
            items.boardGrade && items.boardGrade.map((student, index) => {
                if (id === student.studentID) {
                    {
                        student.point && student.point.map((point, index) => {
                            sum = sum + Number(point.point)
                        }
                        )
                    }
                }
            }

            )
        }
        return (
            <td style={{ width: "100px", verticalAlign: "middle" }}>
                {sum}
            </td>
        )
    }

    const tableChange = (event) => {
        console.log("hello");
    }

    const sendPoint = (indexPoint, studentId) => {
        console.log(indexPoint);
        console.log(studentId)
        let idPoint;
        {items.grades && items.grades.map((grade, index) => {
            if (indexPoint === index){
                idPoint = grade._id;
            }
        })}
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        fetch('http://localhost:3080/grade/sendPoint/' + idPoint, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                student: studentId
            }),
            mode: "cors",

        })
            .then(async (message) => {
                if (message !== "success") {
                    const result = await getDetail();
                    setItems(result)
                }
                else {
                    history.push('/signin')
                }
            }, (error) => {
                alert(error);
            })
    }





    useEffect(() => {
        handleStudentsData();
        handleTemplateData();
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
                                <div onClick={() => { setOnHide(!onHide); setGradeDropDown(false) }}>Import student list</div>
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

                                <Dropdown.Item as="div">
                                    <CSVLink style={{ textDecoration: "none", color: "#272343" }} asyncOnClick={true} data={studentData} headers={studentHeaders} filename='StudentList.csv'>Export student list</CSVLink>
                                </Dropdown.Item>
                                <Dropdown.Item as="div">
                                    <CSVLink style={{ textDecoration: "none", color: "#272343" }} asyncOnClick={true} data={templateData} headers={templateHeaders} filename='GradeTemplate.csv'>Export template grade</CSVLink>
                                </Dropdown.Item>
                                {/* <Dropdown.Item as="div">
                                    <CSVLink style={{ textDecoration: "none", color: "#272343" }} {...listStudent} >Export grade board</CSVLink>

                                </Dropdown.Item> */}
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
                            <th style={{ width: "100px", verticalAlign: "middle" }}><p style={{ fontWeight: "normal" }}>ID</p></th>
                            <th style={{ width: "200px", verticalAlign: "middle" }}><p style={{ fontWeight: "normal" }}>Name</p></th>
                            <th style={{ width: "100px", verticalAlign: "middle" }}><p style={{ fontWeight: "normal" }}>Average ({items.totalGrade})</p></th>
                            {items.grades && items.grades.map((item, index) => (
                                <th style={{ width: "100px", verticalAlign: "top" }} key={item._id}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }} >
                                        <p style={{ fontWeight: "normal" }}>{item.name} ({item.point})</p>
                                        <Dropdown style={{ display: "inline", marginLeft: "50px", marginRight: "0px" }}>
                                            <Dropdown.Toggle
                                                style={{ padding: "0", backgroundColor: "white", border: "none", alignItems: "flex-start" }}>
                                                <FontAwesomeIcon style={{ color: "black" }} icon={faEllipsisV} />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item >
                                                    <div onClick={() => { setOnHide(!onHide); setGradeDropDown(true); setGrade(item) }}>Import student list</div>
                                                </Dropdown.Item>
                                                <Dropdown.Item >Another action</Dropdown.Item>
                                                <Dropdown.Item >Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>


                        {items.boardGrade && items.boardGrade.map((student, index) => (
                            <tr key={student.studentID}>

                                <td style={{ width: "100px", verticalAlign: "middle" }}>{student.studentID}</td>
                                <td style={{ width: "200px", verticalAlign: "middle" }}>{student.name}</td>{sumTotal(student.studentID)}


                                {student.point && student.point.map((point, indexPoint) => (
                                    <td contentEditable="true" display="flex" onChange={() => tableChange()}>
                                        {point ? point.point : 0}

                                        
                                            <FontAwesomeIcon icon={faShare} onClick={() => sendPoint(indexPoint, student.studentID)} />

                                        
                                        {/* <td>

                                            <td contentEditable="true" style={{ width: "100px", verticalAlign: "middle" }}>
                                                
                                            </td>
                                            <div style={{ display: 'inline' }}>/100</div>
                                        </td> */}

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