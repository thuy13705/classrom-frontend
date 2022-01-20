
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Container, Table, Button, Accordion, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane,faCheck} from '@fortawesome/free-solid-svg-icons'
import getAPI from '../../../../helper/getAPI';
import '.././../index.css'
import postAPI from '../../../../helper/postAPI';

function AllGradeReview() {
    const history = useHistory();
    const params = useParams();
    const [gradeReview, setGradeReview] = useState({});
    const [isComment, setIsComment] = useState(true);

    const sendComment = async (e, idReview) => {
        e.preventDefault();
        const api = "https://class-room-midterm.herokuapp.com/review/comment/" + idReview;
        const result = await postAPI(api, { message: e.target.cmt.value });
        console.log(result);
        if (result === "401") {
            history.push('/signin');
        }
        else if (result) {
            if (result=== "success") {
                alert("success.")
                setIsComment(!isComment);
            }
            else{
                alert("Failed");
            }
        }
    }

    const responseReview = async (idReview) => {
        const api = "https://class-room-midterm.herokuapp.com/review/response/" + idReview;
        const result = await postAPI(api,{});
        if (result === "401") {
            history.push('/signin');
        }
        else if (result) {
            if (result==="success"){
                alert("success.")
            }else{
                alert("Failed");
            }
        }
    }

    const getGradeReview = async () => {
        const api = "https://class-room-midterm.herokuapp.com/review/detail/" + params.idGrade;
        const result = await getAPI(api);
        if (result === "401") {
            history.push('/signin');
        }
        else if (result) {
            console.log(result);
            if (result.message === "success") {
                setGradeReview(result);
            }
        }
    }

    useEffect(() => {
        getGradeReview();
    }, [isComment]);

    return (
        <div className="classdetail">
            
                {Object.keys(gradeReview).length != 0 ?
                  <Container style={{ minHeight: "400px" }}>
                       <div className="classesdetail" >
                    <div className="item-inner total-grade" style={{ marginBottom: "40px" }}>
                        <h1>Grade Review Detail</h1>
                        <Table responsive="sm" borderless="true">
                            <tbody>
                                <tr >
                                    <td className="list">
                                        Grade:
                                    </td>
                                    <td className="list" style={{ text_align: 'right' }}>
                                        {gradeReview.grade.name}
                                    </td>
                                </tr>
                                <tr >
                                    <td className="list">
                                        Point:
                                    </td>
                                    <td className="list" style={{ text_align: 'right' }}>
                                        {gradeReview.grade.point}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                    </div>

                    {gradeReview.reviews.length != 0 ?
                        <>{
                            gradeReview.reviews.map((item) => (
                                <div  key={item._id}className="item-inner ">
                                    <div style={{ textAlign: "left" }}>
                                        <p><b>StudentID</b>: {item.studentID}</p>
                                        <p><b>Expectation</b>: {item.expectation}</p>
                                        <p><b>Current Point</b>: {item.grade.point}</p>
                                        <p><b>Explanation</b>: {item.explanation}</p>
                                        <p><b>Finished</b>: {item.status.toString()}</p>
                                        {!item.status ? <Button onClick={async ()=>await responseReview(item._id)}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </Button> : <></>
                                        }
                                    </div>
                                    <Accordion flush>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header >Comment</Accordion.Header>
                                            <Accordion.Body>
                                                <div>
                                                    {item.comment && item.comment.map((cmt, index) => (
                                                        <div key={index+cmt._id} className="item-cmt">
                                                            <div style={{ textAlign: "left" }}>
                                                                <p><b>Name</b>: {cmt.user.name}</p>
                                                                <p><b>Message</b>: {cmt.message}</p>
                                                                {/* <p style={{fonSize:"12px"}}>Time: {new Date(cmt.time)}</p> */}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <Form onSubmit={async(e) => {await sendComment(e, item._id)}}
                                                    style={{ display: "flex", justifyContent: "space-around" }}>
                                                    <Form.Group controlId="cmt"  >
                                                        <Form.Control type="text" required />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Button style={{ marginTop: "0px" }} type='submit'>
                                                            <FontAwesomeIcon icon={faPaperPlane} />
                                                        </Button>
                                                    </Form.Group>
                                                </Form>

                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>

                            ))
                        }
                        </>
                        : <></>
                    }
                </div>
                       </Container >
                :<></>}

           
        </div >
    );
}

export default AllGradeReview;