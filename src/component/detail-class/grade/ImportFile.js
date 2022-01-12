import React, {useState, useEffect} from 'react';
import {  Button, Modal } from 'react-bootstrap';

function ImportFile({ show, onHide, setFile }) {
    
    const [fileInput, setFileInput] = useState();
    const [selectedFile, setSelectedFile] = useState(false);

    useEffect(() =>{
        if (!fileInput)
            setSelectedFile(false);
    })
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Import file csv
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="file"
                    accept=".csv"
                    ref={(input) => setFileInput(input)} 
                    onChange={()=> setSelectedFile(true)}
                />
            </Modal.Body>
            <Modal.Footer> 
                {selectedFile ? <Button className="btnAdd" type="submit" onClick={() =>{setFile(fileInput); setSelectedFile(false)}}>OK</Button>:<></>}
                <Button className="btnAdd" onClick={() => {onHide(false); setSelectedFile(false)}}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ImportFile;
