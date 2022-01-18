import { useState, useEffect } from 'react';
import {
    Container, Dropdown, Table
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { CSVLink } from "react-csv";
import { useHistory } from 'react-router-dom';
import './../index.css'
import ImportFile from './ImportFile';

import { faShare } from '@fortawesome/free-solid-svg-icons';
import Loading from 'react-loading';
import Point from './Point';



function GradeDetail({ items, setItems, getDetail }) {
    const history = useHistory();


    const [studentHeaders, setStudentHeaders] = useState([]);
    const [studentData, setStudentData] = useState([]);


    const [templateHeaders, setTemplateHeaders] = useState([]);
    const [templateData, setTemplateData] = useState([]);

    const [gradeHeaders, setGradeHeaders] = useState([]);
    const [gradeData, setGradeData] = useState([]);

    const [fileStudentList, setFileStudentList] = useState();
    const [onHide, setOnHide] = useState(false);
    const [gradeDropDown, setGradeDropDown] = useState(false);
    const [grade, setGrade] = useState();
    const [curPoint, setCurPoint] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [stID, setStID] = useState();
    const [onOne, setOnOne] = useState(null);

    const selectStudentID = (studentID) =>{
        setOnOne(true);
        setStID(studentID);
    }
    const mark = (item) =>{
        console.log(item);
        const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            fetch('http://localhost:3080/grade/markFinal/' + item._id, {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                }),
                mode: "cors",

            })
                .then(async (message) => {
                    if (message !== "success") {
                        const result = await getDetail();
                        setItems(result);
                        handleStudentsData();
                        handleGradeData();
                        alert("success");
                    }
                    else {
                        history.push('/signin')
                    }
                }, (error) => {
                    alert(error);
                })

    }

    const setStudentList = (input) => {
        setFileStudentList(input.files[0]);
        var reader = new FileReader();
        reader.readAsText(input.files[0]);

        reader.onload = async function() {
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

            await setIsLoading(true);

            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            fetch('http://localhost:3080/classes/gradeBoard/' + items._id, {
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
                        setItems(result);
                        handleStudentsData();
                        handleGradeData();
                        //alert("success");
                        await setIsLoading(false);
                    }
                    else {
                        history.push('/signin')
                    }
                }, async (error) => {
                    alert(error);
                    await setIsLoading(false);
                })
        }
    }

    const setPointList = (input) => {
        setFileStudentList(input.files[0]);
        var reader = new FileReader();
        reader.readAsText(input.files[0]);

        reader.onload = async function () {
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
            await setIsLoading(true);
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
                        await setIsLoading(false);
                        await setItems(result);
                        handleStudentsData();
                        handleGradeData();
                        //alert("success");
                    }
                    else {
                        history.push('/signin')
                    }
                }, async (error) => {
                    alert(error);
                    await setIsLoading(false);
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




    const handleTemplateData = (index) => {

        let headers = [
            { label: "ID", key: "id" }
        ];

        console.log(index);
        if (items.grades.length > index) {
            const tmp = { label: `${items.grades[index].name}`, key: `${index}` }
            headers.push(tmp);
        }

        setTemplateHeaders(headers);


        let data1 = []

        if (items.gradeBoard.length === 0) {
            if (items.students) {
                data1 = items.students.map((student, index) => {
                    let tmp = { id: `${student.studentID}` }
                    if (items.grades.length > index) {
                        tmp[`${index}`] = "";
                    }
                    return tmp;
                });
            }
        }
        else {
            if (items.gradeBoard) {
                data1 = items.gradeBoard.map((student, index) => {
                    let tmp = { id: `${student.studentID}` }
                    if (items.grades.length > index) {
                        tmp[`${index}`] = "";
                    }
                    return tmp;
                });
            }
        }

        setTemplateData(data1);
    }

    const handleGradeData = () => {

        let headers = [
            { label: "ID", key: "id" },
            { label: "Name", key: "name" },
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

        setGradeHeaders(headersConcat);
        let data1 = []
        if (items.gradeBoard.length === 0) {
            if (items.students) {
                data1 = items.students.map((student, index) => {
                    let tmp = { id: `${student.studentID}`, name: student.name }
                    tmp["average"] = sumTotalGrade(student.studentID);
                    if (items.grades) {
                        const dataTmp = items.grades.map((grade, index) => {
                            let obj = studentPoint(student.studentID, grade.studentPointList)
                            if (obj) {
                                tmp[`${index}`] = obj.point;
                            }
                            else {
                                tmp[`${index}`] = "";
                            }
                            return grade;
                        });
                    }

                    return tmp;
                });

            }
        }
        else {
            if (items.gradeBoard) {
                data1 = items.gradeBoard.map((student, index) => {
                    let tmp = { id: `${student.studentID}`, name: student.name };
                    tmp["average"] = sumTotalGrade(student.studentID);
                    if (items.grades) {
                        const dataTmp = items.grades.map((grade, index) => {
                            let obj = studentPoint(student.studentID, grade.studentPointList)
                            if (obj) {
                                tmp[`${index}`] = obj.point;
                            }
                            else {
                                tmp[`${index}`] = "";
                            }
                            return grade;
                        });
                    }
                    return tmp;
                });
            }
        }




        setGradeData(data1);
    }


    const handleStudentsData = () => {

        const headers = [
            { label: "ID", key: "id" },
            { label: "Name", key: "name" },
        ];

        setStudentHeaders(headers);

        let dataTmp = []
        if (items.gradeBoard.length === 0) {
            if (items.students) {
                dataTmp = items.students.map((student, index) => {
                    const tmp = { id: `${student.studentID}`, name: `${student.name}`, }
                    return tmp;
                });
            }
        }
        else {
            if (items.gradeBoard) {
                dataTmp = items.gradeBoard.map((student, index) => {
                    const tmp = { id: `${student.studentID}`, name: `${student.name}`, }
                    return tmp;
                });
            }
        }
        setStudentData(dataTmp);
    }


    const sumTotal = (id) => {
        let sum = 0;
        sum = sumTotalGrade(id);
        return (
            <td style={{ width: "100px", verticalAlign: "middle" }}>
                {sum}
            </td>)
    }

    const sumTotalGrade = (id) => {
        let sum = 0;
        {
            items.gradeBoard && items.gradeBoard.map((student, index) => {
                if (id === student.studentID) {
                    {
                        student.point && student.point.map((point, index) => {
                            sum = sum + Number(point.point);
                        })
                    }
                }
            })
        }
        return sum;
    }

    const studentPoint = (studentId, objs) => {
        let obj = null;
        if (objs.length === 0) {
            obj = null;
        }
        else {
            obj = objs.find(o => o.studentID === studentId);
        }
        return obj;
    }


    const sendPoint = async(idGrade, studentId) => {
        await setIsLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        fetch('http://localhost:3080/grade/sendPoint/' + idGrade, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                studentID: studentId,
                point: curPoint
            }),
            mode: "cors",

        })
            .then(async (message) => {
                if (message !== "success") {
                    const result = await getDetail();
                    await setItems(result)
                    await setIsLoading(false);
                    //alert("success");
                }
                else {
                    history.push('/signin')
                }
            }, async (error) => {
                alert(error);
                await setIsLoading(false);
            })
    }

    const handleInputGrade = async (e, point) => {
        console.log(e.target.textContent);
        await setCurPoint(parseInt(e.target.textContent));
    }



    useEffect(() => {
        handleStudentsData();
        handleGradeData();
    }, [])

    return (
        <>
            {onOne ? <Point teacher={true} gradeBoard={items.gradeBoard} gradeList={items.grades} studentID={stID} setOnOne={setOnOne}></Point>:
            <Container>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                    <Dropdown style={{ marginRight: "10px" }}>
                        <Dropdown.Toggle variant="success" id="dropdown-import">
                            Import
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item >
                                <div onClick={() => { setOnHide(true); setGradeDropDown(false) }}>Import student list</div>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-export" >
                            Export
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Menu>

                                <Dropdown.Item as="div">
                                    <CSVLink style={{ textDecoration: "none", color: "#272343" }} asyncOnClick={true} data={studentData} headers={studentHeaders} filename='StudentList.csv'>Export student list</CSVLink>
                                </Dropdown.Item>

                                <Dropdown.Item as="div">

                                    <CSVLink style={{ textDecoration: "none", color: "#272343" }} asyncOnClick={true} data={gradeData} headers={gradeHeaders} filename='GradeBoard.csv' >Export grade board</CSVLink>
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
                            <th style={{ width: "100px", verticalAlign: "middle" }}><p style={{ fontWeight: "normal" }}>ID</p></th>
                            <th style={{ width: "200px", verticalAlign: "middle" }}><p style={{ fontWeight: "normal" }}>Name</p></th>
                            <th style={{ width: "100px", verticalAlign: "middle" }}><p style={{ fontWeight: "normal" }}>Average ({items.totalGrade})</p></th>
                            {items.grades && items.grades.map((item, index) => (
                                <th style={{ width: "100px", verticalAlign: "top" }} key={item._id}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }} >
                                        <p style={{ fontWeight: "normal" }}>{item.name} ({item.point})</p>
                                        <Dropdown style={{ display: "inline", marginLeft: "50px", marginRight: "0px" }}>
                                            <Dropdown.Toggle
                                                style={{ padding: "0", backgroundColor: "white", marginTop: "0", border: "none", alignItems: "flex-start" }}>
                                                <FontAwesomeIcon style={{ color: "black" }} icon={faEllipsisV} />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item >
                                                    <div onClick={() => { setOnHide(true); setGradeDropDown(true); setGrade(item) }}>Import grade list</div>
                                                </Dropdown.Item>
                                                <Dropdown.Item as="div">
                                                    <CSVLink style={{ textDecoration: "none", color: "#272343" }} asyncOnClick={true} data={templateData} headers={templateHeaders} onClick={() => handleTemplateData(index)} filename='GradeTemplate.csv'>Export template grade</CSVLink>
                                                </Dropdown.Item>
                                                <Dropdown.Item >
                                                    <div onClick={() => { mark(item) }}>Mark a grade composition as finalized</div>
                                                </Dropdown.Item>

                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                    { isLoading ? <Loading style={{left: '47%', width: '100px', position:'absolute'}} type={'spin'} color={'blue'}/> :<></>}

                        {items.gradeBoard && items.gradeBoard.map((student, index) => (
                            <tr key={student.studentID}>

                                <td style={{ width: "100px", verticalAlign: "middle", cursor: 'pointer'}} onClick={() => {selectStudentID(student.studentID)}}>{student.studentID}</td>
                                <td style={{ width: "200px", verticalAlign: "middle" }}>{student.name}</td>{sumTotal(student.studentID)}
                                {/* {items.grades && items.grades.map((grade, index) => (
                                    <>
                                    </>
                                ))} */}

                                {student.point && student.point.map((point, indexPoint) => (
                                    <td >
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <td contentEditable="true" style={{ width: "100px", verticalAlign: "middle" }} onBlur={(e) => handleInputGrade(e, point)}>
                                                {point ? point.point : 0}
                                            </td>
                                            <div style={{ display: 'inline' }}></div>
                                            <FontAwesomeIcon icon={faShare} onClick={() => sendPoint(point.grade._id, student.studentID)} />
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}

                    </tbody>

                </Table>
            </Container>}
        </>
    );
}

export default GradeDetail;