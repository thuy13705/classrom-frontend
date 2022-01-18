import './index.css'
import { Tab, Tabs } from 'react-bootstrap';
import AdminList from './adminDetail/AdminList';
import ClassList from './adminDetail/ClassList';
import UserList from './adminDetail/UserList';
import {useState} from 'react'

function Admin() {

    return (
        <div className="container-tab">
            <h3>Admin manage</h3>
            <Tabs defaultActiveKey="adminList" id="uncontrolled-tab-example" className="mb-3" style={{ justifyContent: "center" }}>
                <Tab eventKey="adminList" title="Admin list">
                    <AdminList></AdminList>
                </Tab>
                <Tab eventKey="userList" title="User list">
                    <UserList></UserList>
                </Tab>

                <Tab eventKey="classList" title="Class list">
                    <ClassList/>
                </Tab>
            </Tabs>
        </div>

    );
}

export default Admin;