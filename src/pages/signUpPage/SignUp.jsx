import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register, setUserRegistr } from "../../service/slice";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styles from "./signUp.module.css"

function SignUp() {
    const dispatch = useDispatch();
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const nav = useNavigate();
    const [password, setPassword] = useState(null);
    const [confPassword, setConfPassword] = useState(null);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [message, setMessage] = useState("")
    const [stateReg, setStateReg] = useState(null)
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordRepShown, setPasswordRepShown] = useState(false);
    console.log(password)
    console.log(confPassword)

    const validatePassword = () => {

        const hasLowerCaseLetters = /[a-z]/gu.test(password);
        if (!hasLowerCaseLetters){
          setMessage("Password has no lower case letters")
          setStateReg(false);
        } 

        const hasUpperCaseLetters = /[A-Z]/gu.test(password);
        if (!hasUpperCaseLetters) {
          setMessage("Password has no upper case letters")
          setStateReg(false);
        } 

        const hasNumbers = /[0-9]/g.test(password);
        if (!hasNumbers) {
          setMessage("Password has no numbers");
          setStateReg(false);
        }

        const hasSpecialCharacters = /[@#$%^&+=!]/g.test(password);
        if (!hasSpecialCharacters) {
          setMessage("Password has no special characters")
          setStateReg(false);
        }
        
        const hasMinimumLength = password.length >= 8;
        if (!hasMinimumLength) {
          setMessage("Password is less then 8 characters")
          setStateReg(false);
        }
    
        return {
          hasLowerCaseLetters,
          hasUpperCaseLetters,
          hasNumbers,
          hasSpecialCharacters,
          hasMinimumLength,
        };
  };

  const handleClick = async () => {
    const resetForm = () => {
      setName("");
      setEmail("");
      setPassword("");
      setConfPassword("");
    };
    
    if (stateReg) {
      const dispatchResult = await dispatch(
        register({
          name,
          email,
          password,
        })
      );
      // console.log(register.fulfilled.match(dispatchResult))
      // console.log(dispatchResult)
      // console.log(register.fulfilled)
      if (register.fulfilled.match(dispatchResult)) {
        await dispatch(
          setUserRegistr({
              name,
              email,
          })
          
        );
        console.log("good")
        resetForm();
        setTimeout(() => {
          nav("/confirm");
        }, 3000);
        // nav("/confirm");
      }
    }
  }
  

  const handleNameChange = (e) => {
        const nameValue = e.target.value;
        const isValidName = /^[a-zA-Z\u00C0-\u00FF\s'-]+$/.test(nameValue);
        setName(nameValue);
        setNameError(!isValidName);
  };
    
  const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue);
        setEmail(emailValue);
        setEmailError(!isValidEmail);
  };
    
  const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
        const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(passwordValue);
        console.log("here")
        console.log(isValidPassword)
        setPasswordError(!isValidPassword);
  };
    
  const handleConfChange = (e) => {
        const confirmValue = e.target.value;
        setConfPassword(confirmValue);
        const passwordMismatch = confirmValue !== password;
        console.log(passwordMismatch)
        setPasswordError(passwordMismatch);
  };
    
  const handleState = () => {
        if (passwordError || password === null || password === "") {
            setMessage("Wrong password format or it mismatches with confirmation password")
            setStateReg(false)
        } else if (emailError || email === null || email === "") {
            setMessage("Wrong email format")
            setStateReg(false)
        } else if (nameError || name === null || name === "") {
            setMessage("Name is not valid")
            setStateReg(false)
        } else {
            setMessage("")
            setStateReg(true)
        }
  }
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const togglePasswordRepVisibility = () => {
    setPasswordRepShown(!passwordRepShown);
  };

  useEffect (() => {
        handleState();
        if (password != null) {
            validatePassword()
        }
  }, [password, email, confPassword])


  return (
    <div>
    <section>
    <div className={styles.loginForm}>
      <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.text}>Sign Up</div>
        </div>
        <div>
          <Link to="/login" className={styles.linkSignUp} id="signUpLink">
            I want to Login
          </Link> 
        </div>
        <div className={styles.inputs}>
            <div className={styles.auth_input}>
                <input className={styles.in} id='name' type="name" placeholder='Name' required onChange={handleNameChange} value={name}></input>
            </div>
            <div className={styles.auth_input}>
                <input className={styles.in} id='email' type="email" placeholder='Email' required onChange={handleEmailChange} value={email}></input>
            </div>
            <div className={styles.auth_input}>
                <input className={styles.in}  type={passwordShown ? "text" : "password"} required placeholder='Password' onChange={handlePasswordChange} value={password}></input>
                <div className={styles.iconCont}>
                  {passwordShown ? (
                  <VisibilityIcon onClick={togglePasswordVisibility} className={styles.eyeIcon} />
                ) : (
                  <VisibilityOffIcon onClick={togglePasswordVisibility} className={styles.eyeIcon} />
                )}
                </div>
            </div>
            <div className={styles.auth_input}>
                <input className={styles.in}  type={passwordRepShown ? "text" : "password"} required placeholder='Password' onChange={handleConfChange} value={confPassword}></input>
                <div className={styles.iconCont}>
                  {passwordRepShown ? (
                  <VisibilityIcon onClick={togglePasswordRepVisibility} className={styles.eyeIcon} />
                ) : (
                  <VisibilityOffIcon onClick={togglePasswordRepVisibility} className={styles.eyeIcon} />
                )}
                </div>
            </div>
        </div>
        <div className={styles.submit_container}>
            <div className={ `${styles.submitBtn} ${stateReg ? styles.active : styles.notActive}`} onClick={handleClick}>Sign Up</div>
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

export default SignUp