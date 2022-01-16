import React, { useEffect, useState } from 'react';
import { Container, Row, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useHistory } from 'react-router-dom';
import AddClassdModal from './AddClassModal';
import getAPI from '../../helper/getAPI';

import Card from './Card';

import './index.css';

function HomeJoin() {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    const history = useHistory();
    const [isCreate, setIsCreate] = useState(false);
    const [students, setStudent] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [items,setItems]=useState([]);
    const [onePage,setOnePage]=useState([]);


    let maxPages=0;
    let leftSide=0;
    let rightSide=0;

    const nextPage = () => {
        if(currentPage<maxPages){
          setCurrentPage(currentPage+1)
        }
        if (currentPage*perPage<=students.length){
            setOnePage(students.slice(currentPage*perPage-perPage,currentPage*perPage));

        }
        else{
            setOnePage(students.slice(currentPage*perPage-perPage,students.length));

        }
    }
      
      const prevPage = () => {
        if(currentPage>1){
          setCurrentPage(currentPage-1)
        }
        if (currentPage*perPage<=students.length){
            setOnePage(students.slice(currentPage*perPage-perPage,currentPage*perPage));

        }
        else{
            setOnePage(students.slice(currentPage*perPage-perPage,students.length));

        }
      }

    const handleModalShow = () => {
        setModalShow(!modalShow);
    }


    const handleData = async () => {
        const api="https://class-room-midterm.herokuapp.com/classes";
        const result = await getAPI(api);
        if (result === "401") {
            history.push('/signin');
        }
        else if (result) {
            setStudent(result.students);
        }
    }
    useEffect(() => {
        handleData();
        if (currentPage*perPage<=students.length){
            setOnePage(students.slice(currentPage*perPage-perPage,currentPage*perPage));

        }
        else{
            setOnePage(students.slice(currentPage*perPage-perPage,students.length));

        }
        let tmp=[];
        maxPages = students.length/perPage;
        leftSide = currentPage - 2;
        if (leftSide <= 0) leftSide = 1;
        rightSide = currentPage + 2;
        if (rightSide > maxPages) rightSide = maxPages;
        for (let number = leftSide; number <= rightSide; number++) {
            tmp.push(
                <div key={number} className={(number === currentPage ? 'round-effect active-page' : 'round-effect')} onClick={() => { setCurrentPage(number) }}>
                    {number}
                </div>,
            );
        }
        setItems(tmp);
    }, [isCreate]);

    return (
        <Container >
            <div className="home">
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <Button variant="primary" onClick={() => handleModalShow()}>
                        <FontAwesomeIcon icon={faPlus} />Add
                    </Button>
                    <AddClassdModal
                        isCreate={isCreate}
                        setIsCreate={setIsCreate}
                        show={modalShow}
                        onHide={() => handleModalShow()}
                    />
                </div>
                <h3 style={{ textAlign: "left", marginTop: "10px" }}>My Classes</h3>
                <div>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {onePage && onePage.map((item, index) => (
                            <NavLink key={item._id + index} style={{ textDecorationLine: "none", color: "#282c34" }} to={`/classdetail/${item._id}`}>
                                <Card key={item._id + item._id} items={item}>
                                </Card>
                            </NavLink>
                        ))}
                    </Row>
                </div>
                <div className="flex-container">
                    <div className="paginate-ctn">
                        <div className="round-effect" onClick={prevPage}>
                            <FontAwesomeIcon icon={faAngleLeft}/>
                        </div>
                        {items}
                        <div className="round-effect" onClick={nextPage}>
                        <FontAwesomeIcon icon={faAngleRight}/>
                         </div>
                    </div>
                </div>

            </div>
        </Container>

    )
}

export default HomeJoin
