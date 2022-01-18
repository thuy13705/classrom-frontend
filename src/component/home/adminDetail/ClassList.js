import {
    Table, Button, Container, InputGroup, FormControl
} from 'react-bootstrap';
import PageItem from 'react-bootstrap/PageItem';
import Pagination from 'react-bootstrap/Pagination';
import { NavLink, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function ClassList  () {

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(30);
    const [totalPage, setToTalPage]=useState(1);
    const [sort, setSort] = useState(-1);
    const [name, setName] = useState('');
    const [first, setFirst] = useState(true);
    const getData = async()=> {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        await fetch('http://localhost:3080/classes/getAllClass?page='+page+'&perPage='+perPage+'&sort='+sort+'&name='+name , {
            method: 'get',
            headers: myHeaders,
            mode: "cors",

        })
            .then(async (response) => {
                const rs = await response.json();
                if (rs.result)
                await setItems(rs.result);
                if (rs.perPage)
                await setPerPage(parseInt(rs.perPage));
                if (rs.count)
                await setToTalPage(Math.round((parseInt(rs.count)+perPage-1)/perPage));
                console.log(rs);
            }, async (error) => {
                alert(error);
            })
    }

    const changeName = async(sName)=> {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        await fetch('http://localhost:3080/classes/getAllClass?page='+page+'&perPage='+perPage+'&sort='+sort+'&name='+sName , {
            method: 'get',
            headers: myHeaders,
            mode: "cors",

        })
            .then(async (response) => {
                const rs = await response.json();
                if (rs.result)
                await setItems(rs.result);
                if (rs.perPage)
                await setPerPage(parseInt(rs.perPage));
                if (rs.count)
                await setToTalPage(Math.round((parseInt(rs.count)+perPage-1)/perPage));
                console.log(rs);
            }, async (error) => {
                alert(error);
            })
    }

    const changeSort = async(sSort)=> {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        await fetch('http://localhost:3080/classes/getAllClass?page='+page+'&perPage='+perPage+'&sort='+sSort+'&name='+name , {
            method: 'get',
            headers: myHeaders,
            mode: "cors",

        })
            .then(async (response) => {
                const rs = await response.json();
                if (rs.result)
                await setItems(rs.result);
                if (rs.perPage)
                await setPerPage(parseInt(rs.perPage));
                if (rs.count)
                await setToTalPage(Math.round((parseInt(rs.count)+perPage-1)/perPage));
                console.log(rs);
            }, async (error) => {
                alert(error);
            })
    }

    useEffect(async()=>{
        if (first){
            await getData();
            await setFirst(false);
        }
    })

    return<>
    <Container>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                    <Button onClick ={async()=>{changeSort(-sort);await setSort(-sort)}}>Sort</Button>
                </div>
    <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
    <FormControl
      placeholder="name"
      aria-label="Username"
      aria-describedby="basic-addon1"
      onChange = {async (e)=>{await setName(e.target.value);changeName(e.target.value)}}
    />
    </InputGroup>
     <Table>
         <thead>
             <tr>
                 <th>Name</th>
                 <th>Date create</th>
             </tr>
         </thead>
         <tbody>
             {items && items.map((item)=>(
                <tr> 
                    
                    <th>
                    <NavLink key={item._id} style={{ textDecorationLine: "none", color: "#282c34" }} to={`/classdetail/${item._id}`}>
                            {item.nameClass}
                        </NavLink>
                    </th>
                    <th>{item.date}</th>
                </tr>
             ))}
         </tbody>
     </Table>
     <Pagination>
         <PageItem onClick={async()=> {await setPage(1); await getData()}}>«</PageItem>
         {page > 1 ? <PageItem onClick={async()=> {await setPage(page-1); await getData()}}>{page-1}</PageItem>:<></>}
         <PageItem active>{page}</PageItem>
         {page < totalPage ? <PageItem onClick={async()=> {await setPage(page+1); await getData()}}>{page+1}</PageItem>:<></>}
         <PageItem onClick={async()=> {await setPage(totalPage); await getData()}}>»</PageItem>
     </Pagination>
     </Container>
     </>
}

export default ClassList;