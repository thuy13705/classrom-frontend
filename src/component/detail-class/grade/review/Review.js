import './../../index.css'
import {
    Container, Table
} from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink} from 'react-router-dom';

function Review({ teacher, items }) {
    const grades=items.grades;
    const studentID = localStorage.getItem("studentID");

    return (
        <div className="classdetail" >
            <Container>
                <div className="classesdetail">
                    <div className="item-inner total-grade">
                        <h1>Grade Structure</h1>
                        <Table responsive="sm" borderless="true">
                            <thead>
                                <td>
                                    <td >
                                        <h6 style={{ color: "#272343", textAlign: "left", fontWeight: "500" }}>Total</h6>
                                    </td>
                                    <td >
                                        <h6 style={{ color: "#272343", textAlign: "left", fontWeight: "500" }}>{items.totalGrade}</h6>
                                    </td>
                                </td>
                            </thead>
                            <tbody>
                                {items.grades && items.grades.map((item, index) => (
                                    <tr key={item._id}>

                                        <td className="list">
                                            {item.name}:
                                        </td>
                                        <td className="list">
                                            {item.point}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <div className="item-inner grades" style={{ marginTop: "40px" }}>
                        {grades && grades.map((item,index)=>( 
                        <>{
                            teacher ? <NavLink key={index+item._id} to={`/review/detail/${item._id}`}>
                                <div className="item-inner item-grade">
                                    <div>
                                        <p><b>Name</b>: {item.name}</p>
                                        <p><b>Point</b>: {item.point}</p>
                                    </div>
                                </div>
                            </NavLink> : <>{studentID != ""?
                            <NavLink  key={index+item._id} to={`/review/detail/${item._id}/${studentID}`}>
                                <div className="item-inner item-grade">
                                    <div>
                                        <p><b>Name</b>: {item.name}</p>
                                        <p><b>Point</b>: {item.point}</p>
                                    </div>
                                </div>
                            </NavLink>:<></>}</>
                        }</>))}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Review;