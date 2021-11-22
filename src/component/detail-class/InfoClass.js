import './index.css'
import { Container, Table} from 'react-bootstrap';


function ShowPeopleList({items}){

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
                                    {items.room}
                                </td>
                            </tr>
                            <tr>
                                <td className="list">
                                Invite Student
                                </td>
                                <td className="list">
                                    {items.room}
                                </td>
                            </tr>
                    </tbody>
                </Table>
        </Container>
    </div>
    );
}

export default ShowPeopleList;