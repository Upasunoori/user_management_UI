import React, { useRef, useState } from 'react';
import './Forgot_password.css';
import logo from '../../assets/login-page-logo.png';

const hostURL = 'http://localhost:8080';

function ForgotPasswordPage(){

    var [btnDisable, setBtnDisable] = useState(true);
    var [msg, setMsg] = useState(<></>);

    var user_name = useRef(HTMLInputElement);
    var email = useRef(HTMLInputElement);

    function handleInput(){
        if(user_name.current.value && email.current.value){
            setBtnDisable(false);
        }
        else{
            setBtnDisable(true);
        }
    }

    function submit(e){
        e.preventDefault();
        fetch(hostURL+'/forgot_password', { 
            method:"POST",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                User_Name: user_name.current.value,
                Email: email.current.value
            })
        }).then(res => res.json())
        .then((data)=>{
            if(data.err){
                setMsg(<small className="text-danger">{data.err}</small>);
            }
            else{
                setMsg(<small className="text-success">{data.msg}</small>);
                setBtnDisable(true);
            }
        }).catch((err)=>{
            setMsg(err);
        });
    }

    return (
        <div className="container  p-5 Forgot-page-content col-md-5">
            <img className='img-fluid' src={logo} alt="logo"/>
            <br/>
            <h1>Forgot Password</h1>
            <form className="Forgot-page-form">
                <div class="form-group">
                    <label for="forgot-user-id" style={{float:"left"}}><b>User name</b></label>
                    <input ref={user_name} onInput={handleInput} id="forgot-user-id" type="text" className="form-control" placeholder="Enter your User name"/>
                </div>
                <div class="form-group">
                    <label for="forgot-email" style={{float:"left"}}><b>Email</b></label>
                    <input ref={email} onInput={handleInput} id="forgot-email" type="email" className="form-control" placeholder="Enter your email"/>
                    <small style={{float:"left"}}>Password will be sent to this email address.</small>
                </div>
                
                <button disabled={btnDisable} onClick={submit} className="btn btn-primary w-100">Send Password</button>
                {msg}
            </form>
        </div>
    );
}

export default ForgotPasswordPage;