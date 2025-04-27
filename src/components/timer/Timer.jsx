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
      <div style={{fontSize: '20px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
    </div>
  );
}

export default Timer