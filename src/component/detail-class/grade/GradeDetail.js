import { useState, useEffect } from 'react';
import {
    Container, Dropdown, Table, InputGroup, FormControl
} from 'react-bootstrap';
import { CSVLink } from "react-csv";
import { useHistory } from 'react-router-dom';
import './../index.css'


function GradeDetail({ items, setItems, getDetail }) {
    const history = useHistory();

    const [studentHeaders, setStudentHeaders] = useState([]);
    const [studentData, setStudentData] = useState([]);

    const [templateHeaders, setTemplateHeaders] = useState([]);
    const [templateData,setTemplateData]=useState([]);

    // const [studentHeaders, setStudentHeaders] = useState([]);
    // const [studentData, setStudentData] = useState([]);
    // const [listStudent, setListStudent] = useState([]);

    const handleTemplateData = () => {

        let headers = [
            { label: "ID", key: "id" },
            { label: "Average", key: "average" },
        ];

        let headertmp=[];

        if (items.grades) {
            headertmp = items.grades.map((grade, index) => {
                const tmp = { label: `${grade.name}`, key:  `${index}`}
                return tmp;
            });
        }

        let headersConcat = headers.concat(headertmp);
        setTemplateHeaders(headersConcat);
       

        let data1 = []

        if (items.teachers) {
            data1 = items.teachers.map((student, index) => {
                let tmp = { id: `${student.studentID}`,average:""}
                if (items.grades) {
                    const dataTmp = items.grades.map((grade, index) => {
                        tmp[`${index}`]="";
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
                            <Dropdown.Item>Action</Dropdown.Item>
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
                                <CSVLink style={{textDecoration:"none",color:"#272343"}}  asyncOnClick={true} data={studentData} headers={studentHeaders} filename='StudentList.csv'>Export student list</CSVLink>
                                </Dropdown.Item>
                                <Dropdown.Item as="div">
                                <CSVLink style={{textDecoration:"none",color:"#272343"}} asyncOnClick={true} data={templateData} headers={templateHeaders} filename='GradeTemplate.csv'>Export template grade</CSVLink>
                                </Dropdown.Item>
                                {/* <Dropdown.Item as="div">
                                    <CSVLink style={{ textDecoration: "none", color: "#272343" }} {...listStudent} >Export grade board</CSVLink>

                                </Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <Table id="emp" bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: "100px" }}>ID</th>
                            <th style={{ width: "200px" }}>Name</th>
                            <th style={{ width: "100px" }}>Average</th>
                            {items.grades && items.grades.map((item, index) => (
                                <th style={{ width: "100px" }} key={item._id}>{item.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.teachers && items.teachers.map((student, index) => (
                            <tr key={student._id}>
                                <td style={{ width: "100px" }}>{student.studentID}</td>
                                <td style={{ width: "200px" }}>{student.name}</td>
                                <td contentEditable="true" style={{ width: "100px" }}>
                                     
                                    </td>
                                {items.grades && items.grades.map((grade, index) => (
                                    <td contentEditable="true" style={{ width: "100px" }}>
                                       
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