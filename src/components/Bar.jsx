import React from 'react'
import './Bar.css'
import { variableContext } from './variableContext'
import { useContext ,useState , useEffect} from 'react'

const Bar = (props) => {
    const timerState = useContext(variableContext);
    const [show , setShow ] = useState("");
    const handleShow = () => {
    setShow('show1')}
    const handleOtherShow = () => {
      setShow('show')
    }
useEffect( () => {
  setShow('show')
},[])
  return (
    <>
    <div className={ ` ${props.value}`}>
    <div className={`bar ${props.value}`}>
    <button className="punctuation" >@ punctuation</button>
    <button className="numbers" ># numbers</button>
    <hr />
    <button className={`${show==='show'? 'time': ''}`} style = {{color:getComputedStyle(document.documentElement).getPropertyValue('--color-heading')}} onClick={handleOtherShow} >time</button>
    <button className="words" onClick={handleShow}>A words</button>
  </div>
  <div className={`word-selector ${props.value} ${show==='show1'? 'show1': ''}`}>
    <hr/>
      <button className='span'>15</button>
      <button className='span'>30</button>
      <button className='span' >60</button>
      <button className='span'>120</button>
    </div>
    <div className={`time-selector ${props.value} ${show==='show'? 'show':''}`} >
    <hr/>
      <button className={`span ${timerState.timer===10? 'time':''}`} onClick = {() => timerState.setTimer(10)}>10</button>
      <button className={`span ${timerState.timer===30? 'time':''}`} onClick = {() => timerState.setTimer(30)}>30</button>
      <button className={`span ${timerState.timer===60? 'time':''}`} onClick = {() => timerState.setTimer(60)}>60</button>
      <button className={`span ${timerState.timer===120? 'time':''}`} onClick = {() => timerState.setTimer(120)}>120</button>
    </div>
    </div>
    
  </>
  )
}

export default Bar;
