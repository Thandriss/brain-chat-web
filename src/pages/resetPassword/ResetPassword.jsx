import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../../service/slice";
import styles from "./resetPassword.module.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function ResetPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasChanges, setChanges] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = useState("")
  const nav = useNavigate();


  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(event.target.value);
    setEmailError(!isValidEmail);
  };


  const resetPassword = async () => {
    console.log("reset")
    console.log(email);
    const dispatchResult = await dispatch(
      reset({
        email
      })
    );
    if (reset.fulfilled.match(dispatchResult)) {
      nav("/login");
      setEmail("");
      setPassword("");
    }
  }

  const handleState = () => {
    if (emailError || email === null || email === "") {
        setMessage("Wrong email format")
        setChanges(false)
    }  else {
        setMessage("")
        setChanges(true)
    }
  }

  useEffect (() => {
    handleState();
  }, [password, email])

  console.log(hasChanges)
  return (
    <div>
        <section>
        <div className={styles.loginForm}>
          <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.text}> Password Reset</div>
            </div>
            <div>
              <Link to="/login" className={styles.linkSignUp} id="signUpLink">
                Back to Log In
              </Link> 
            </div>
            <div className={styles.inputs}>
                <div className={styles.auth_input}>
                    <input className={styles.in} id='email' type="email" placeholder='Email' onChange={handleChangeEmail}></input>
                </div>
                
            </div>
            <div className={styles.submit_container}>

                <div className={ `${styles.submitBtn} ${hasChanges ? styles.active : styles.notActive}`} onClick={() => resetPassword()}>Confirm</div>
            </div>
            <div>{message}</div>
          </div>
        </div>
          <div className={`${styles.wave} ${styles.wave1}`}></div>
          <div className={`${styles.wave} ${styles.wave2}`}></div>
          <div className={`${styles.wave} ${styles.wave3}`}></div>
          <div className={`${styles.wave} ${styles.wave4}`}></div>
        </section>
    </div>
  )
}

export default ResetPassword