import React from 'react'
import styles from "./notFounded.module.css"

function NotFounded() {
  return (
    <div><div className={styles.main}>
    <div className={styles.spinningBox}>
      {/* <p className={styles.textInside}></p> */}
  </div>
  <div className={styles.glass}>
    <div className={styles.content}>
        <h1 className={styles.title}>404 Not Founded</h1>
        {/* <p className={styles.description}>Join us for an amazing experience.</p> */}
        {/* <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.loginButton}`} onClick={() => handleLogin()}>Log In</button>
          <button className={`${styles.button} ${styles.signUpButton}`} onClick={() => handleSignUp()}>Sign Up</button>
        </div> */}
      </div>
    </div>
  </div></div>
  )
}

export default NotFounded