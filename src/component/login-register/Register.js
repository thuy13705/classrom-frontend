import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './index.css';

function Register() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [enterCode, setEnterCode] = useState(false);
    const [code, setCode] = useState("");
    const [eCode, setECode] = useState("");


    const formEmailValidate=(email)=>{
        var regExp = /^[A-Za-z][\w$.]+@[\w]+\.\w+$/;
        if (regExp.test(email)) 
            return true;
          else 
            return false;
      }


    const checkUser = () =>{
      if (!formEmailValidate(email))
        {
            alert("Email is wrong.");
            return false;
        }
        if (username.length > 32)
        {
            alert("Username cannot exceed 32 characters!!!");
            return false;
        }
        for (let i = 0; i< username.length ;i++)
        if (!("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_").includes(username[i]))
            {
                alert("Username illegal!!!");
                return false;
            }
        if (password.length > 32)
        {
            alert("Password cannot exceed 32 characters!!!");
            return false;
        }
        if (password.length < 6)
        {
            alert("Password no shorter than 6 characters!!!");
            return false;
        }
        for (let i = 0; i< password.length ;i++)
        if (!("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_").includes(password[i]))
            {
                alert("Password illegal!!!");
                return false;
            }
            return true;
    }
    
    const clickSubmit = async (e) => {
        e.preventDefault();

        if (!checkUser())
            return false;

        if (password===confirmPass){
            await fetch('http://127.0.0.1:3080/users/sendMailCodeAccount?email='+email, {
                method: 'Get',
                headers: { 'Content-Type': 'application/json' },
                mode: "cors",
            }) .then(async response => {
                const result = await response.json();
                await setECode(result.code);
                await setEnterCode(true);
            })
            .catch(error => console.log('error', error));
        
        }
        else{
            alert("Password does not match!!!")
        }

    }
    const clickSubmitCode = async (e) => {
    if (code!= eCode)
        {
            alert('wrong code');
            return false;
        }
        e.preventDefault();
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
            .then(async result =>{
                console.log(result)
                if (result==="username"){
                    alert("Username exist!");
                }
                else if (result==="Email"){
                    alert("Email exist!");
                }
                else{
                    alert('Register success!');
                    await setEnterCode(false);
                    await setCode("");
                    history.push("/login");
                }
            })
            .catch(error => console.log('error', error));
        
    }

    return (
        <>
        { enterCode ? 
        <form>
            <h2>Classroom</h2>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Register</h3>
                    <div className="form-group">
                        <label>Please enter the confirmation code from email</label>
                        <input value={code} className="form-control" placeholder="Enter your code" onChange={e => setCode(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-block" onClick={clickSubmitCode}>Confirm</button>
                    <button className="btn btn-block" onClick={()=>{setEnterCode(false); setCode("")}}>Cancel</button>
                </div>
            </div>
        </form>
        :
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
        </form>}
        </>
    )
}

export default Register
