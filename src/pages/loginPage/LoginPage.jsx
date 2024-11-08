import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login} from "../../service/slice";
import styles from "./loginPage.module.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function LoginPage() {
  // const [action, setAction] = useState("Sign Up")
  // const nav = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasChanges, setChanges] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [message, setMessage] = useState("")

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(event.target.value);
    setEmailError(!isValidEmail);
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(event.target.value);
    setPasswordError(!isValidPassword);
  };

  const loggin = async () => {
    console.log("login")
    console.log(email);
    const dispatchResult = await dispatch(
      login({
        email,
        password,
      })
    );
  }

  const handleState = () => {
    if (passwordError && password != null && message !== "") {
        setMessage("Wrong password format or it mismatchs with confirmation password")
        setChanges(false)
    } else if (emailError && email != null && message !== "") {
        setMessage("Wrong email format")
        setChanges(false)
    }  else {
        setMessage("")
        setChanges(true)
    }
}

const validatePassword = () => {

  const hasLowerCaseLetters = /[a-z]/gu.test(password);
  if (!hasLowerCaseLetters) setMessage("Password has no lower case letters")

  const hasUpperCaseLetters = /[A-Z]/gu.test(password);
  if (!hasUpperCaseLetters) setMessage("Password has no upper case letters")

  const hasNumbers = /[0-9]/g.test(password);
  if (!hasNumbers) setMessage("Password has no numbers")

  const hasSpecialCharacters = /[@#$%^&+=!]/g.test(password);
  if (!hasSpecialCharacters) setMessage("Password has no special characters")

  const hasMinimumLength = password.length >= 8;
  if (!hasMinimumLength) setMessage("Password is less then 8 characters")

  return {
    hasLowerCaseLetters,
    hasUpperCaseLetters,
    hasNumbers,
    hasSpecialCharacters,
    hasMinimumLength,
  };
};

  useEffect (() => {
    handleState();
    if (password != null) {
        validatePassword()
    }
  }, [password, email])


  return (
    <div>
        <section>
        <div className={styles.loginForm}>
          <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.text}> Log In</div>
            </div>
            <div>
              <Link to="/signUp" className={styles.linkSignUp} id="signUpLink">
                I want to Sign Up
              </Link> 
            </div>
            <div className={styles.inputs}>
                <div className={styles.auth_input}>
                    <input className={styles.in} id='email' type="email" placeholder='Email' onChange={handleChangeEmail}></input>
                </div>
                <div className={styles.auth_input}>
                    <input className={styles.in} id='password' type={passwordShown ? "text" : "password"} placeholder='Password' onChange={handleChangePassword}></input>
                    <div className={styles.iconCont}>
                      {passwordShown ? (
                      <VisibilityIcon onClick={togglePasswordVisibility} className={styles.eyeIcon} />
                    ) : (
                      <VisibilityOffIcon onClick={togglePasswordVisibility} className={styles.eyeIcon} />
                    )}
                    </div>
                    
                </div>
            </div>
            <div className={styles.submit_container}>
                <div className={ `${styles.submitBtn} ${hasChanges ? styles.active : styles.notActive}`} onClick={() => loggin()}>Log in</div>
            </div>
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

export default LoginPage