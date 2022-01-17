import { useState, useEffect } from 'react';
import { useHistory,useParams } from 'react-router';
import { Container, Table, Button, Row, Col, Nav, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import getAPI from '../../../helper/getAPI';
import './../index.css'

function GradeReview() {
    const history = useHistory();
    const params=useParams();
    const [gradeReview, setGradeReview] = useState({});

    const getGradeReview = async () => {
        const api="http://127.0.0.1:3080/notification/detail/"+params.idGrade+"/"+params.studentID;
        const result = await getAPI(api);
        if (result === "401") {
            history.push('/signin');
        }
        else if (result) {
            setGradeReview(result);        }
    }
    useEffect(() => {
        getGradeReview();
    },[]);

    return (
       <div className="classdetail">
            <Container style={{minHeight:"400px"}}>
               <div className="classesdetail">
                    <div className="item-inner total-grade">
                        <h1>Grade Review Detail</h1>
                        <Table responsive="sm" borderless="true">
                            {gradeReview!={}?<tbody>
                            <tr >
                                        <td className="list">
                                            Student ID:
                                        </td>
                                        <td className="list" style={{text_align: 'right'}}>
                                            {gradeReview.student.studentID}
                                        </td>
                                    </tr>
                                    <tr >
                                        <td className="list">
                                            Name Student:
                                        </td>
                                        <td className="list" style={{text_align: 'right'}}>
                                            {gradeReview.student.name}
                                        </td>
                                    </tr>
                                    <tr >
                                        <td className="list">
                                            Grade:
                                        </td>
                                        <td className="list" style={{text_align: 'right'}}>
                                            {gradeReview.grade.name}
                                        </td>
                                    </tr>
                                    <tr >
                                        <td className="list">
                                            Point:
                                        </td>
                                        <td className="list" style={{text_align: 'right'}}>
                                            {gradeReview.point}
                                        </td>
                                    </tr>
                            </tbody>:<></> }
                        </Table>
                    </div>
                    
                    <div className="item-inner grades">
                        
                    </div>
                </div>
        </Container>
       </div>
    );
}

export default GradeReview;