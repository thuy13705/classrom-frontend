import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isconfirm, setIsconfirm] = useState(false);

    let error = '';
    const confirm = () => {
        while (confirmPass !== password) {
            error = 'Retype password does not match';
        }
        setIsconfirm(true);
    }

    const clickSubmit = async (e) => {

        console.log(username, password, email)
      
            console.log('register')
            e.preventDefault();
            await fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });
        

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
                        <input type="password" className="form-control" placeholder="Enter retype password" onChange={confirm} onChange={e => setConfirmPass(e.target.value)} />
                        <p>{error}</p>
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
