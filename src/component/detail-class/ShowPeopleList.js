import './index.css'
import React, { useState } from 'react';
import { Container, Table,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import InviteMailStudent from './InviteMailStudent';

function ShowPeopleList({items,teacher}){
    const [modalShow, setModalShow] = useState(false);


    const handleModalShow=()=>{
        setModalShow(!modalShow);
    }

    return(
        <div className="classdetail">
        <Container className="g-4">
            <div className="classesdetail">
                <Table responsive="sm" borderless="true">
                    <thead>
                        <tr className="title-list">
                            <th clas="list" style={{ width: '90%' }}><h3>Teacher</h3></th>
                            {teacher? <th class="icon" >
                            <Button variant="primary" onClick={() => handleModalShow()}>
                            <FontAwesomeIcon icon={faAddressBook}></FontAwesomeIcon>
                        </Button>

                        <InviteMailStudent
                            show={modalShow}
                            onHide={() => handleModalShow()}
                            id={items._id}
                        /></th>:<></>}
                        </tr>
                    </thead>
                    <tbody>
                        {items.teachers && items.teachers.map((item, index) => (
                            <tr key={items._id}>
                                <td className="list">
                                    <FontAwesomeIcon icon={faUserCircle} />
                                    <span>{item.name}</span>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>

                <Table responsive="sm" borderless="true">
                    <thead>
                        <tr className="title-list">
                            <th clas="list" style={{ width: '90%' }}><h3>Student</h3></th>
                            {teacher? <th class="icon" ><FontAwesomeIcon icon={faAddressBook}></FontAwesomeIcon></th>:<></>}
                        </tr>
                    </thead>
                    <tbody>
                        {items.students && items.students.map((item, index) => (
                            <tr key={items._id}>
                                <td className="list">
                                    <FontAwesomeIcon icon={faUserCircle} />
                                    <span>{item.name}</span>
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