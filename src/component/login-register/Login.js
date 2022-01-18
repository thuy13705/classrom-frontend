
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

import './index.css';

import GoogleLogin from 'react-google-login';


function Login({ setLoggedIn }) {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [eCode, setECode] = useState('');
    const [code, setCode] = useState('');
    const [isForgot, setIsForgot] = useState(false);
    const [usernameForgot, setUsernameForgot] = useState('');
    const [isUsernameForgot, setIsUsernameForgot] = useState(false);

    // const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');

    // const [isLogin, setLogin] = useState(localStorage.getItem("token") != null);
    // const [user, setUser] = useState(localStorage.getItem("user") != null);

    var myheaders = new Headers();
    myheaders.append('Access-Control-Allow-Origin', '*');
    myheaders.append('Access-Control-Allow-Credentials', 'true');
    myheaders.append('Content-Type', 'application/json')

    const genericErrorMessage = "Something went wrong! Please try again later."
    const clickSubmit = async (e) => {
        e.preventDefault();
        setError("");

        fetch('http://localhost:3080/users/login', {
            method: 'POST',
            headers: myheaders,
            body: JSON.stringify({
                username,
                password
            }),
            mode: "cors",
        })
            .then(async response => {
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
                    localStorage.setItem("roleUser", data.user.role)
                    setLoggedIn(data.token);
                    if (history.action !== 'POP') {
                        history.goBack();
                    } else {
                        history.push("/");
                    }
                }
            })
            .catch(error => {

                setError(genericErrorMessage)
            })

    };

    const sendCode = async (e) => {
            e.preventDefault();
            await fetch('http://localhost:3080/users/sendMailCodeForgetPassword?username='+usernameForgot, {
                    method: 'get',
                    headers: { 'Content-Type': 'application/json' },
                    mode: "cors",
                }) .then(async response =>{
                    const rs = await response.json();
                    if (rs.code != ''){
                    await setECode(rs.code);
                    await setIsUsernameForgot(true);
                    }
                    else
                    alert('username not exists')
                })
                .catch(error => console.log('error', error));
        }

    const clickSubmitCode = async (e) => {
        if (code!= eCode)
            {
                alert('wrong code');
                return false;
            }
            e.preventDefault();
            await fetch('http://localhost:3080/users/sendMailNewPassword?username='+usernameForgot, {
                    method: 'get',
                    headers: { 'Content-Type': 'application/json' },
                    mode: "cors",
                }) .then(async response =>{await setIsForgot(false); setCode('')})
                .catch(error => console.log('error', error));
        }

    const responseGoogle = (response) => {
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
            }),
            mode: "cors",
        }).then(async res => {
            console.log('response: ', res);
            if (!res.ok) {
                console.log(res.state)
            } else {
                const data = await res.json()
                localStorage.setItem("token", data.token)
                localStorage.setItem("user", data.user._id)
                localStorage.setItem("roleUser", data.user.role)
                setLoggedIn(data.token);
                
                    history.push("/");
                


            }
        })
            .catch(error => console.log('error', error));


    }
    return (
        <>
        { isForgot ? 
        <>
        { !isUsernameForgot ?
        <form>
        <h2>Classroom</h2>
        <div className="auth-wrapper">
            <div className="auth-inner">
                <h3>Forgot</h3>
                <div className="form-group">
                    <label>Username</label>
                    <input value={usernameForgot} className="form-control" placeholder="Enter your username" onChange={e => setUsernameForgot(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-block" onClick={sendCode}>Get code</button>
                <button className="btn btn-block" onClick={()=>{setIsForgot(false); setCode(""); setIsUsernameForgot(false); setUsernameForgot('')}}>Cancel</button>
            </div>
        </div>
        </form>
        :
        <form>
            <h2>Classroom</h2>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Forgot</h3>
                    <div className="form-group">
                        <label>Please enter the confirmation code from email</label>
                        <input value={code} className="form-control" placeholder="Enter your code" onChange={e => setCode(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-block" onClick={clickSubmitCode}>Confirm</button>
                    <button className="btn btn-block" onClick={()=>{setIsForgot(false); setCode("");setIsUsernameForgot(false); setUsernameForgot('')}}>Cancel</button>
                </div>
            </div>
        </form>}
        </>
        :
        <form style={{marginTop:"50px"}}>
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
                        <p className="error">{error}</p>
                    </div>

                    <div style={{ textAlign: "center" }} className="form-group">
                        <button type="submit" className="btn btn-block" onClick={clickSubmit}>Login</button>
                        <button type="submit" className="btn btn-block" onClick={()=>setIsForgot(true)}>Forgot password</button>
                    </div>

                    <h6 style={{ textAlign: "center", marginTop: "10px" }}>Or</h6>

                    <div style={{ textAlign: "center", marginTop: "10px" }} className="form-group">
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
                </div>
            </div>
        </form>}
        </>
    )
}

export default Login;