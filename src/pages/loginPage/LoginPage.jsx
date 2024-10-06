import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "./loginPage.css"

function LoginPage() {
  const [action, setAction] = useState("Sign Up")
  const nav = useNavigate();

  const registration = async () =>{
    console.log("registrate")
    // let res = await fetch("/auth/register", {
    //     method: "POST",
    //     headers: {
    //         "Content-type": "application/json"
    //     },
    //     body: '{ "email": "' + document.getElementById("email").value +'", "password":"' + document.getElementById("password").value +'" }'
    // })
    // let data = await res.json()
    // if (data.message) {
    //     toast.error(data.message)//toast for error
    // } else if (data.errors) {
    //     for (let i=0; i<data.errors.length; i++) {
    //         toast.error(data.errors[i].msg)
    //     }
    // } else if (data.status) {
    //     toast.success('Successfully registration!')
    // }
}

//function for login which is usin email and password data from input
const loggin = async () => {
  console.log("login")
    // let res = await fetch("/auth/login", {
    //     method: "POST",
    //     headers: {
    //         "Content-type": "application/json"
    //     },
    //     body: '{ "email": "' + document.getElementById("email").value +'", "password":"' + document.getElementById("password").value +'" }'
    // })
    // let data = await res.json()
    // if (data.message) {
    //     toast.error(data.message)//toast for error
    // } else {
    //     nav('/cards')//after login user goes on the main page with cards  
    // }
}

  return (
    <div>
        <section>
        <div className={"loginForm"}>
          <div className="container">
            <div className="header">
                <div className="text"> {action}</div>
            </div>
            <div className="inputs">
                <div className="auth_input">
                    <input className='in' id='email' type="email" placeholder='Email'></input>
                </div>
                <div className="auth_input">
                    <input className='in' id='password' type="password" placeholder='Password'></input>
                </div>
            </div>
            <div className="submit-container">
                <div className={action==="Log In"? "submit grey": "submit active"} onClick={() => {action==="Sign Up"? registration():setAction("Sign Up")}}>Sign up</div>
                <div className={action==="Sign Up"? "submit grey": "submit active"} onClick={() => {action==="Log In"? loggin():setAction("Log In")}}>Log in</div>
            </div>
            {/* {action==="Log In"? <div className="thirdP"><div id='googleAuth' onClick={() => googleLog()}>Google+</div></div>: <></>} */}
          </div>
        </div>
          <div className={"wave wave1"}></div>
          <div className={"wave wave2"}></div>
          <div className={"wave wave3"}></div>
          <div className={"wave wave4"}></div>
        </section>
    </div>
  )
}

export default LoginPage