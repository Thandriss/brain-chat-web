import React, {useEffect, useState} from 'react';
import { useTimer } from 'react-timer-hook';

function Timer( { time, onExpire, startTimer } ) {
  const [setMinutes, setSeconds] = time.split(":").map(Number);
  const setTotalSeconds = setMinutes * 60 + setSeconds;
  const [curTime, setCurTime] = useState();
    
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ curTime, onExpire });

  useEffect(()=> {
    let date = new Date();
    date.setSeconds(date.getSeconds() + setTotalSeconds)
    setCurTime(date);
    restart(date);
    pause();
  }, [])

  useEffect(() => {
    if (startTimer) {
      let date = new Date();
      date.setSeconds(date.getSeconds() + setTotalSeconds)
      setCurTime(date);
      restart(date, true);
    } else {
      pause();
    }
  }, [startTimer, restart, pause]);

  return (
    <div style={{textAlign: 'center'}}>
      {/* <h1>react-timer-hook </h1>
      <p>Timer Demo</p> */}
      <div style={{fontSize: '20px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={() => {
        // Restarts to 5 minutes timer
        let date = new Date();
        date.setSeconds(date.getSeconds() + setTotalSeconds)
        restart(date)
      }}>Restart</button>
    </div>
  );
}

export default Timer