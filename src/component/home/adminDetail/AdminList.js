import {
    Table, Button, Container, InputGroup, FormControl
} from 'react-bootstrap';
import PageItem from 'react-bootstrap/PageItem';
import Pagination from 'react-bootstrap/Pagination';

import React, { useEffect, useState } from 'react';
import CreateAdmin from './CreateAdmin';
import DetailAccount from './DetailAccount';

function AdminList  () {

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(30);
    const [totalPage, setToTalPage]=useState(1);
    const [sort, setSort] = useState(-1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [first, setFirst] = useState(true);

    const [isCreate, setIsCreate] = useState(false);
    const [isDetail, setIsDetail] = useState(false);
    const [account, setAccount] = useState();

    const getData = async()=> {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        await fetch('https://class-room-midterm.herokuapp.com/users/listAccountAdmin?page='+page+'&perPage='+perPage+'&sort='+sort+'&name='+name+'&email='+email, {
            method: 'get',
            headers: myHeaders,
            mode: "cors",

        })
            .then(async (response) => {
                const rs = await response.json();
                await setItems(rs.result);
                await setPerPage(parseInt(rs.perPage));
                await setToTalPage(Math.round((parseInt(rs.count)+perPage-1)/perPage));
                console.log(rs);
            }, async (error) => {
                alert(error);
            })
    }
    const changeEmail = async(sEmail)=> {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        await fetch('https://class-room-midterm.herokuapp.com/users/listAccountAdmin?page='+page+'&perPage='+perPage+'&sort='+sort+'&name='+name+'&email='+sEmail, {
            method: 'get',
            headers: myHeaders,
            mode: "cors",

        })
            .then(async (response) => {
                const rs = await response.json();
                await setItems(rs.result);
                await setPerPage(parseInt(rs.perPage));
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
        await fetch('https://class-room-midterm.herokuapp.com/users/listAccountAdmin?page='+page+'&perPage='+perPage+'&sort='+sort+'&name='+sName+'&email='+email, {
            method: 'get',
            headers: myHeaders,
            mode: "cors",

        })
            .then(async (response) => {
                const rs = await response.json();
                await setItems(rs.result);
                await setPerPage(parseInt(rs.perPage));
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
        await fetch('https://class-room-midterm.herokuapp.com/users/listAccountAdmin?page='+page+'&perPage='+perPage+'&sort='+sSort+'&name='+name+'&email='+email, {
            method: 'get',
            headers: myHeaders,
            mode: "cors",

        })
            .then(async (response) => {
                const rs = await response.json();
                await setItems(rs.result);
                await setPerPage(parseInt(rs.perPage));
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
                    <Button onClick={()=>setIsCreate(true)}>Create</Button>
                    <Button onClick ={async()=>{changeSort(-sort);await setSort(-sort)}}>Sort</Button>
                </div>
    <CreateAdmin show={isCreate} setShow={setIsCreate} getData={getData}/>
    <DetailAccount show={isDetail} setShow={setIsDetail} item={account}/>
    <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
    <FormControl
      placeholder="name"
      aria-label="Username"
      aria-describedby="basic-addon1"
      onChange = {async (e)=>{await setName(e.target.value);changeName(e.target.value)}}
    />
    <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
    <FormControl
      placeholder="email"
      aria-label="Username"
      aria-describedby="basic-addon1"
      onChange = {async (e)=>{await setEmail(e.target.value);changeEmail(e.target.value)}}
    />
    </InputGroup>
     <Table>
         <thead>
             <tr>
                 <th>Username</th>
                 <th>Name</th>
                 <th>Email</th>
                 <th>Date create</th>
             </tr>
         </thead>
         <tbody>
             {items && items.map((item)=>(
                <tr> 
                     <th><div style={{cursor: 'pointer'}} onClick={() => {setAccount(item); setIsDetail(true)}}>{item.username}</div></th>
                     <th>{item.name}</th>
                     <th>{item.email}</th>
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

export default AdminList;