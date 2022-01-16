import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './index.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const history = useHistory();

    const clickSubmit = async (e) => {
        e.preventDefault();

        if (password===confirmPass){
            await fetch('https://class-room-midterm.herokuapp.com/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
                mode: "cors",
            }) .then(response => response.text())
            .then(result =>{
                console.log(result)
                if (result==="username"){
                    alert("Username exist!");
                }
                else if (result==="Email"){
                    alert("Email exist!");
                }
                else{
                    alert('Register success!');
                    history.pushState("/");
                }
            })
            .catch(error => console.log('error', error));
        
        }
        else{
            alert("Password does not match!!!")
        }

    }

    return (
        <form>
            <h2>Classroom</h2>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Register</h3>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter your username" onChange={e => setUsername(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Retype password</label>
                        <input type="password" className="form-control" placeholder="Enter retype password" onChange={e => setConfirmPass(e.target.value)} />
                    </div>

                    <button type="submit" className="btn btn-block" onClick={clickSubmit}>Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <Link to="/">login?</Link>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default Register
