
import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import './index.css';

function Login({ nameurl }) {

import { Redirect,useHistory } from 'react-router-dom';

import './index.css';


function Login({nameurl, setLoggedIn}) {
    const history=useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');

    const [isLogin, setLogin] = useState(localStorage.getItem("token") != null);
    const [user, setUser] = useState(localStorage.getItem("user") != null);


    const genericErrorMessage = "Something went wrong! Please try again later."
    const clickSubmit = async (e) => {
        e.preventDefault();
        setError("");

        fetch('https://class-room-midterm.herokuapp.com/users/login', {
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
                    console.log(data);
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("user", data.user._id)
                    setLoggedIn(data.token);
                    console.log(history.action);
                    if (history.action !== 'POP') {
                        history.goBack();
                    } else {
                        history.push("/home");
                    }
                }
            })
            .catch(error => {

                setError(genericErrorMessage)
            })

        console.log(isLogin)
    };


    const responseGoogle = (response) => {
        console.log(response);


        const googleResponse = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            token: response.googleId,
            Image: response.profileObj.imageUrl,
            ProviderId: 'Google'
        };
        console.log(googleResponse);
        fetch('http://localhost:3080/users/loginGoogle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                googleResponse
            })
        }).then(async res => {
            console.log('response: ', res);
            if (!res.ok) {
                console.log(res.state)
            } else {
                const data = await res.json()
                console.log(data);
                localStorage.setItem("token", data.token)
                localStorage.setItem("user", data.user._id)
                setLogin(true)
                console.log(isLogin)
                

            }
        })
            .catch(error => {

                
            })

        console.log(isLogin)

    }


    return (
        <form>
            <h2>Classroom</h2>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Login</h3>
                    <div className="form-group">
                        <label>Username</label>
                        <input id="username" type="text" className="form-control" placeholder="Enter username" onChange={e => setUsername(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input id="password" type="password" className="form-control" placeholder="Enter password" onChange={e => setPassword(e.target.value)} required />
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

                        <GoogleLogin
                            clientId="835120072786-tulnah1f5c8r5v0lq8gi4visd69topae.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
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
