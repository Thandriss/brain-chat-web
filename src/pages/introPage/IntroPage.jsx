import React from 'react'
import styles from "./introPage.module.css"
import { Link, useNavigate } from "react-router-dom";

function IntroPage() {
  const nav = useNavigate();

  const handleLogin = () => {
    nav("/login")
  }

  const handleSignUp = () => {
    nav("/signUp")
  }

  return (
    <div className={styles.main}>
      <div className={styles.spinningBox}>
        {/* <p className={styles.textInside}></p> */}
    </div>
    <div className={styles.glass}>
      <div className={styles.content}>
          <h1 className={styles.title}>Welcome to Our Service</h1>
          <p className={styles.description}>Join us for an amazing experience.</p>
          <div className={styles.buttonContainer}>
            <button className={`${styles.button} ${styles.loginButton}`} onClick={() => handleLogin()}>Log In</button>
            <button className={`${styles.button} ${styles.signUpButton}`} onClick={() => handleSignUp()}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroPage