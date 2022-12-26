import React, { useEffect, useRef, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
 
import './login.css';

import logo from '../../assets/login-page-logo.png';
import visibleImg from '../../assets/visible.png'
import inVisibleImg from '../../assets/invisible.png'

const hostURL = 'http://localhost:8080';

function LoginPage(){

    var user_name = useRef(HTMLInputElement);
    var password = useRef(HTMLInputElement);
    var rememberMe = useRef(HTMLInputElement);

    var [loginStatus, setLoginStatus] = useState(<></>);
    var [loginBtnEnable, setLoginBtnEnable] = useState(true);
    var [visible, setVisible] = useState(false);
    const [cookie , setCookie] = useCookies(['loginData']);
    const navigate = useNavigate();

    function cookieParse(cookie){
        let res = cookie.split("; ");
        for(let i in res){
            let temp = res[i].split("=");
            res[i] = [temp[0], temp[1]]
        }
        let result = {};
        for(let i of res){
            result[i[0]] = unescape(i[1])//.replace('%20', " ")//.replace('%40', "@");
        }
        return (result);
    }

    useEffect(()=>{
        const cookies = cookieParse(document.cookie);
        if(cookies.User_Name){
            user_name.current.value = (cookies.User_Name);
            password.current.value = (cookies.Password);
        }
        if(user_name.current.value.length){
            setLoginBtnEnable(false);
        }
    }, []);

    function loginSubmit(e){
        e.preventDefault();

        if(rememberMe.current.checked){
            setCookie('User_Name' ,  user_name.current.value , {path:'/login' , maxAge: 1 * 24 * 60 * 60});
            setCookie('Password' ,  password.current.value , {path:'/login' , maxAge: 1 * 24 * 60 * 60});     
        }
        fetch(hostURL+'/login', {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({User_Name:user_name.current.value, Password : password.current.value })//Password:hashSync(password.current.value)})
        })
        .then(res => res.json())
        .then((data)=> {
            console.log(data);
            if(data.err){
                setLoginStatus(<small className="text-danger">{data.err}</small>);
                return ;
            }
            setLoginStatus(<small className="text-success">{data.msg}</small>)
            return;
        }).catch((err) => {
            console.log(err);
        });    
    }

    function checkInputFields(){
        if(user_name.current.value.length > 0 && password.current.value.length > 0){
            setLoginBtnEnable(false);
        }
        else{
            setLoginBtnEnable(true);
        }
    }

    function toggleVisibility(){
        setVisible(prev => !prev);
    }

    return (
        <div className="container  p-5 login-page-content col-md-5">
            <img src={logo} className="img-fluid" alt="logo"/>
            <br/>
            <form className="login-page-form">
                <div className="form-group">
                    <label for="login-user-id" style={{float:"left"}}><b>User name</b></label>
                    <input ref={user_name} onInput={checkInputFields} id="login-user-id" type="text" className="form-control" placeholder="Enter your User name or email"/>
                </div>
                <div className="form-group">
                    <label for="login-password" style={{float:"left"}}><b>Password</b></label>
                    <div className="password-field">
                        <input ref={password} onInput={checkInputFields} id="login-password" type={visible ? "text":"password"} className="form-control" placeholder="Password"/>
                        <img id="password-visibility" onClick={toggleVisibility} src={visible ? visibleImg : inVisibleImg}></img>
                    </div>
                </div>
                <div className="small">
                    <div style={{float:"left"}}> 
                        <input type="checkbox" ref={rememberMe} className="form-check-input" id="login-remember-me"/>
                        <label for="login-remember-me" style={{marginLeft:"5px"}} className="form-check-label">Remember me</label>
                    </div>

                    <div style={{float:"right"}}>
                        <Link to="/forgot">Forgot Password ?</Link>
                    </div>
                </div>
                <button onClick={loginSubmit} disabled={loginBtnEnable} id="login-submit-btn" className="btn btn-primary w-100">Login</button>
                {loginStatus}
            </form>
        </div>
    );
}

export default LoginPage;

