import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { confirm } from "../../service/slice";
import { selectUser } from "../../service/selectors";
import styles from "./confirm.module.css"

function ConfirmPage() {
    const [code, setCode] = useState("");
    const [hasChanges, setChanges] = useState(false);
    const currUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const nav = useNavigate();
    console.log(code)
    console.log(currUser);
    const handleChangeCode = (event) => {
        setCode(event.target.value);
    };

    useEffect(() => {
        let str = code.toString();
        if (str.length === 4) {
            setChanges(true);
        } else {
            setChanges(false);
        }
    }, [code])

    const handleClick = async () => {
        if (hasChanges) {
            const dispatchResult = await dispatch(
                confirm({
                  email: currUser.email,
                  code,
                })
            );
            if (confirm.fulfilled.match(dispatchResult)) {
                setCode("");
                nav("/login");
            }
        }
    }
    
  return (
    <div>
        <section>
        <div className={styles.mainContainer}>
          <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.text}> Confirm code </div>
            </div>
            <div >
                <div className={styles.confirmCodeInput}>
                    <input className={styles.in}  type="confirm" placeholder='code' onChange={handleChangeCode} value={code}></input>
                </div>
            </div>
            <div className={styles.submit_container}>
                <div className={ hasChanges ? `${styles.submit} ${styles.active}`: `${styles.submit} ${styles.notActive}`} onClick={handleClick}>Confirm</div>
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

export default ConfirmPage