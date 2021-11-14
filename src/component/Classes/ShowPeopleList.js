import './classdetail.css'
import { Container, Table} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faUserCircle } from '@fortawesome/free-solid-svg-icons'

function ShowPeopleList({items}){

    return(
        <div className="classdetail">
        <Container className="g-4">
            <div className="classesdetail">
                <Table responsive="sm" borderless="true">
                    <thead>
                        <tr className="title-list">
                            <th clas="list" style={{ width: '90%' }}><h3>Giảng viên</h3></th>
                            <th class="icon" ><FontAwesomeIcon icon={faAddressBook}></FontAwesomeIcon></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.teachers && items.teachers.map((item, index) => (
                            <tr key={items._id}>
                                <td className="list">
                                    <FontAwesomeIcon icon={faUserCircle} />
                                    <span>{item.nameUser}</span>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>

                <Table responsive="sm" borderless="true">
                    <thead>
                        <tr className="title-list">
                            <th clas="list" style={{ width: '90%' }}><h3>Sinh viên</h3></th>
                            <th class="icon"><FontAwesomeIcon icon={faAddressBook}></FontAwesomeIcon></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.students && items.students.map((item, index) => (
                            <tr key={items._id}>
                                <td className="list">
                                    <FontAwesomeIcon icon={faUserCircle} />
                                    <span>{item.nameUser}</span>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>


            </div>
        </Container>
    </div>
    );
}

export default ShowPeopleList;