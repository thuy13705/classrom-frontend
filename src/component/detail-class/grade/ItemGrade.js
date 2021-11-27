import './../index.css'
import {
    Container, Row, Col, Form, Button, Table
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

function ItemGrade({ grade }) {
    return (
        <div className="item-inner item-grade">
            <div>
                <p><b>Name</b>: {grade.name}</p>
                <p><b>Point</b>: {grade.point}</p>
            </div>
            <div>
                <Button className="btn-edit"><FontAwesomeIcon icon={faEdit} /></Button>
                <Button className="btn-trash"><FontAwesomeIcon icon={faTrash} /></Button>
            </div>
        </div>
    );
}

export default ItemGrade;

