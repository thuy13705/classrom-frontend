import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Register() {
    return (
        <form>
            <h2>Classroom</h2>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Register</h3>
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>
                    <div className="form-group">
                        <label>Retype your password</label>
                        <input type="password" className="form-control" placeholder="Enter retype your password" />
                    </div>
                    <button type="submit" className="btn btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <Link to="/">login?</Link>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default Register
