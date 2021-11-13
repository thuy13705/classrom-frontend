
import React, { useState } from "react";
import { Link } from "react-router-dom";
import userApi from "../../api/userApi";
import './index.css';
import { Redirect } from 'react-router-dom';
import Header from "../header/Header";


function Login(props) {

    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
        error: '',
        redirecToReferrer: false
    })


    const formValues = (event) => {
        setUserDetails({
            ...userDetails,
            [event.target.name]: event.target.value,

        })
    }

    const clickSubmit = () => {
        const user = {
            username: userDetails.username || undefined,
            password: userDetails.password || undefined
        }
        
        const response = userApi.login(user);
        if (response.error) {
            setUserDetails({ ...userDetails, error: response.error });
        } else {
            setUserDetails({ ...userDetails, error: '', redirecToReferrer: true });
        }
        
    }

    const { from } = props.location.state || {
        from: {
            pathname: '/'
        }
    }
    const { redirecToReferrer } = userDetails
    if (redirecToReferrer) {
        return (<Redirect to={from} />)
    }


    return (
        <form>
            <h2>Classroom</h2>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Login</h3>
                    <div className="form-group">
                        <label>Username</label>
                        <input id="username" type="text" className="form-control" placeholder="Enter username" onChange={formValues} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input id="password" type="password" className="form-control" placeholder="Enter password" onChange={formValues} />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <p className="error">{userDetails.error}</p>
                    </div>

                    <button type="submit" className="btn btn-block" onSubmit={clickSubmit}>Login</button>

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
