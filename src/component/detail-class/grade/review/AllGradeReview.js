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
        console.log(e.target);
        const api = "http://127.0.0.1:3080/review/comment/" + idReview;
        const result = await postAPI(api, { message: e.target.cmt.value });
        if (result === "401") {
            history.push('/signin');
        }
        else if (result) {
            if (result.message === "success") {
                setIsComment(!isComment);
            }
        }
    }

    const responseReview = async (idReview) => {
        const api = "http://127.0.0.1:3080/review/response/" + idReview;
        const result = await postAPI(api,{});
        if (result === "401") {
            history.push('/signin');
        }
        else if (result) {
            if (result.message === "success") {
                alert("success.")
            }
        }
    }

    const getGradeReview = async () => {

        console.log(gradeReview);

        const api = "http://127.0.0.1:3080/review/detail/" + params.idGrade;
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
            <Container style={{ minHeight: "400px" }}>
                {Object.keys(gradeReview).length != 0 ?
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
                                    <div className="item-inner ">
                                        <div style={{ textAlign: "left" }}>
                                            <p><b>StudentID</b>: {item.studentID}</p>
                                            <p><b>Expectation</b>: {item.expectation}</p>
                                            <p><b>Current Point</b>: {item.grade.point}</p>
                                            <p><b>Explanation</b>: {item.explanation}</p>
                                            <p><b>Finished</b>: {item.status.toString()}</p>
                                            {!item.status ? <Button onClick={()=>responseReview(item._id)}>
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
                                                            <div className="item-cmt">
                                                                <div style={{ textAlign: "left" }}>
                                                                    <p><b>Name</b>: {cmt.user.name}</p>
                                                                    <p><b>Message</b>: {cmt.message}</p>
                                                                    {/* <p style={{fonSize:"12px"}}>Time: {new Date(cmt.time)}</p> */}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <Form onSubmit={(e) => sendComment(e, item._id)}
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
                    </div> : <div>Loading</div>
                }

            </Container >
        </div >
    );
}

export default AllGradeReview;