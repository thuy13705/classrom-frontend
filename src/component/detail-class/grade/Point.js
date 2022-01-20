import './../index.css'
import {
    Container,  Table, Button
} from 'react-bootstrap';
import {useState,useEffect} from 'react';

function Point({ teacher, gradeBoard, gradeList, studentID, setOnOne}) {
    const [isMark, setIsMark ] = useState(false);
    const [grades, setGrades] = useState();

    const setG = () => {
        if (gradeBoard && gradeBoard.length > 0){
        if (teacher)
            for (let _gradeBoard of gradeBoard)
                if (_gradeBoard.studentID === studentID)
                    return _gradeBoard;
        for (let _gradeBoard of gradeBoard)
            if (_gradeBoard.isOwner){
                return _gradeBoard;
            }
        }
        let gr = {studentID: '', name: '', point: []};
        if (gradeList && gradeList.length>0)
        for (let grade of gradeList){
            let _grade = grade;
            _grade.isFinal = false;
            gr.point.push({grade: _grade, point: 0});
        }
        return gr;
    }
    useEffect(() =>{
        setGrades(setG);
        if (teacher)
            setIsMark(true);
        else
            setIsMark(false);
    });

    const back =() =>{
        setOnOne(false);
    }

    return(
            <Container>
                <div className="classesdetail">
                    <div className="item-inner total-grade">
                        <h1>Grade Structure</h1>
                        <Table responsive="sm" borderless="true">
                            <thead>
                            <td>
                                    <td >
                                        <h6 style={{ color: "#272343", textAlign: "left", fontWeight: "500" }}></h6>
                                    </td>
                                    <td >
                                        <h6 style={{ color: "#272343", textAlign: "left", fontWeight: "500" }}></h6>
                                    </td>
                                </td>
                            </thead>
                            <tbody>
                            {grades ?<> <tr key={grades._id}>
                                        <td className="list">
                                            Student ID:
                                        </td>
                                        <td className="list" style={{text_align: 'right'}}>
                                            {grades.studentID}
                                        </td>
                                    </tr>
                                    <tr key={grades.name}>
                                        <td className="list">
                                            Full name:
                                        </td>
                                        <td className="list">
                                            {grades.name}
                                        </td>
                                    </tr>
                                {grades.point && grades.point.map((item, index) => (
                                    <tr key={item.grade._id}>
                                        <td className="list">
                                            {item.grade.name}:
                                        </td>
                                        {isMark || item.grade.isFinal ? 
                                        <td className="list">
                                            {item.point}/{item.grade.point}
                                        </td>
                                        :<td className="list">
                                            ./{item.grade.point}
                                        </td>}
                                    </tr>
                                ))}
                                </>
                            :<></>}
                            </tbody>
                        </Table>
                        {teacher? <Button onClick={back} background_color={'blue'}>back</Button>:<></>}
                    </div>
                </div>
            </Container>
    )
}

export default Point;