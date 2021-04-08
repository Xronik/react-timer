import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import moment from 'moment';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import LoopIcon from '@material-ui/icons/Loop';

function Timer() {

  const [currenttime, setCurrentTime] = useState(new Date().toLocaleTimeString())
  setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000)

  let timeLeft = (inputtime) => {
    let timeEnd = moment(inputtime, 'HH:mm')
    let timeStart = moment()
    let timeDifference = moment(timeEnd.diff(timeStart)).utc().format('HH:mm:ss')
    if (timeDifference < 0) timeDifference.add(24, 'hours')
    return timeDifference
  }

  const [time, setTime] = useState('--:--:--')

  const [condition, setCondition] = useState(false)

  const [inputtime, setInputTime] = useState('')

  useEffect(() => {
    if (condition && inputtime && (time !== "00:00:00")) {
      const timer = setInterval(() => {
        setTime(timeLeft(inputtime))
      }, 1000)
      return () => clearInterval(timer)
    }
    if (time === '00:00:00') {
      setCondition(false)
      setTime('TIME END')
    }
  }, [condition, time])

  return (
    <TimerWrap>
      <ClockWrap>
        <p>{time}</p>
        <LoopIconWrap>
          {
            (condition && inputtime) ? <LoopIcon className="rotate loop" /> : <LoopIcon className="loop" />
          }
        </LoopIconWrap>
      </ClockWrap>
      <InputWrap>
        <input type="time" onChange={
          (ev) => setInputTime(ev.target.value)
        }></input>

        <button type="submit" onClick={(ev) => {
          setCondition(!condition);
          ev.target.className.add('red')
        }}>
          {
            (condition) ? <PauseIcon /> : <PlayArrowIcon />
          }
        </button>
      </InputWrap>
      <p>Текущее время: {currenttime}</p>
    </TimerWrap>
  )
}

const TimerWrap = styled.div`
  grid-area:timer;
`

const ClockWrap = styled.div`
  grid-area:timer;
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-items:center;
  align-items:center;
  border:3px solid black;
  border-radius: 10px;
  width:200px;
  height:80px;
  p {
    display:block;
    font-size:29px;
    line-height: 80px;
    margin:0 10px;
  }
`
const LoopIconWrap = styled.div`
  .loop {
    height:38px;
    width:38px;
    margin-top:10px;
  }
  .rotate {
    animation: moving 3s infinite linear;
    transform-origin: 50% 50% 0;
    @keyframes moving {
      100% {transform: rotate(-360deg);}
    }
}
`
const InputWrap = styled.div`
  display:grid;
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows:40px;
  grid-gap:20px;
  justify-content:space-around;
  align-items: center;
  margin-top:10px;
  button, input {
    height:100%;
    border:3px solid black;
    border-radius: 10px;
    outline:none;
    cursor:pointer
  }
  input {
    height:86%;
  }
  button {
    background-color: green;
  }
`

export default Timer