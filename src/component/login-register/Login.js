
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import './index.css';


function Login(name) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userContext, setUserContext] = useContext(UserContext);

    const genericErrorMessage = "Something went wrong! Please try again later."
    const clickSubmit = async (e) => {
        console.log('j');
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(async response => {
                console.log('response: ', response);
                if (!response.ok) {
                    if (response.status === 400) {
                        setError("Please fill all the fields correctly!")
                    } else if (response.status === 401) {
                        setError("Invalid username and password combination.")
                    } else {
                        setError(genericErrorMessage)
                    }
                } else {
                    const data = await response.json()
                    setUserContext(oldValues => {
                        return { ...oldValues, token: data.token }
                    })
                }
            })
            .catch(error => {
                setIsSubmitting(false)
                setError(genericErrorMessage)
            })

        if (isSubmitting) {
            setRedirect(true);
        }


    };

    if (redirect) {
        return <Redirect to="/home" />;
    }






    return (
        <form>
            <h2>Classroom</h2>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Login</h3>
                    <div className="form-group">
                        <label>Username</label>
                        <input id="username" type="text" className="form-control" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input id="password" type="password" className="form-control" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <p className="error">{error}</p>
                    </div>

                    <button type="submit" className="btn btn-block" onClick={clickSubmit}>Login</button>

                    <div className="form-group">
                        <div>
                            <label className="login-with">Login with</label>
                        </div>
                        <button className="loginBtn loginBtn--google">
                            Google
                        </button>
                        <button className="loginBtn loginBtn--facebook">
                            Facebook
                        </button>
                    </div>
                    <p className="register">
                        You haven't an account? <Link to="/register">Create an new account</Link>
                    </p>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default Login
