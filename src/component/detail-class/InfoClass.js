import './index.css'
import { Container, Table} from 'react-bootstrap';


function ShowPeopleList({items}){
    let studentLink="";
    let teacherLink="";
    if (window.location.port!==null){
        studentLink=window.location.protocol +"//"+ window.location.hostname +":"+window.location.port+"/invite/1/"+items._id;
        teacherLink=window.location.protocol +"//"+ window.location.hostname +":"+window.location.port+"/invite/0/"+items._id;
    }
    else{
        studentLink=window.location.protocol +"//"+ window.location.hostname +"/invite/1/"+items._id;
        teacherLink=window.location.protocol +"//"+ window.location.hostname +"/invite/0/"+items._id;
    }
 

    return(
        <div >
        <Container className="classinfo">
        <Table responsive="sm" borderless="true">
                    <tbody>
                            <tr>
                                <td className="list">
                                    Name
                                </td>
                                <td className="list">
                                    {items.nameClass}
                                </td>
                            </tr>
                            <tr>
                                <td className="list">
                                    Category
                                </td>
                                <td className="list">
                                    {items.category}
                                </td>
                            </tr>
                            <tr>
                                <td className="list">
                                    Room
                                </td>
                                <td className="list">
                                    {items.room}
                                </td>
                            </tr>
                            <tr>
                                <td className="list">
                                    Invite Teacher
                                </td>
                                <td className="list">
                                    {teacherLink}
                                </td>
                            </tr>
                            <tr>
                                <td className="list">
                                Invite Student
                                </td>
                                <td className="list">
                                    {studentLink}
                                </td>
                            </tr>
                    </tbody>
                </Table>
        </Container>
    </div>
    );
}

export default ShowPeopleList;