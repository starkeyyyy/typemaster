import React, { useState, useRef, useEffect  } from 'react';
import {Chart as ChartJS, LogarithmicScale, scales} from "chart.js/auto";
import{ Line } from "react-chartjs-2";
import { useContext } from 'react';
import { variableContext } from './variableContext';
import Bar from './Bar';
import './home.css' ;
function Hi() { 
  let para = "obligation regard urine opposite transmission sugar imposter greet paragraph tribute industry appoint station salvation reliance lost fixture competition salad ivory seem satisfaction herb stress breakdown arrangement constituency hunting medicine solid orbit plot prestige basic rehearsal narrow proportion put eye relinquish liver praise radical front conscience mix long sunshine second swordspokesperson elephant rhythm injury occupy orange hemisphere competition reservoir animal attention bring word college agree reptile prestige ballot corpse provision promotion shy important cut descent shark model danger whole agent Venus promote faint history shop unrest brake confession mine unlike trip upset announcement sensitive disability glory page conscious just revive";
  const timer = useContext(variableContext);
  let MaxTime = timer.timer;
  let [charIndex, setCharIndex] = useState(0);
  let [isTyping, setIsTyping] = useState(true);
  const [lineIndex, setLineIndex] = useState(111133);
  const [wpm, setWpm] = useState(0);
  const [ rawWpm , setRawWpm ] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [color, setColor] = useState([]);
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [paragraph, setParagraph] = useState(para);
  const [wpmHistory , setWpmHistory ] = useState([]);
  const [rawWpmHistory, setRawWpmHistory] = useState([]);
  const [ errorHistory , setErrorHistory ] = useState([]);
  const [ errors , setErrors ] = useState(0);
  const [ correctChar , setCorrectChar ] = useState(0);
  const [ wrongChar , setWrongChar ] = useState(0);
  const [ input , setInput ] = useState('');
  const [ wordChar , setWordChar ] = useState(0);
  const [ rightWard , setRightWard] = useState(0);
  const [ prevWord , setPrevWord ] = useState(0);
  const[ prevLine , setPrevLine ] = useState(0);

  

  let typeRef = useRef(0);
  let charRef = useRef([]);
  let timerRef = useRef(0);
  let wpmRef = useRef();
  const characters = para.split("");
  const combo = para.split(" ");
  
  

  useEffect(() => {
    setColor(Array(charRef.current.length).fill(''));
    typeRef.current.focus();
  }, []);

  let words = paragraph.split(' ');

  useEffect(() => {
    if (charIndex > 0) {
      timerRef.current = setTimeout(() => setCount(count + 1), 1000);
      if (count === MaxTime || charIndex === characters.length) {
        clearTimeout(timerRef.current);
      }
      setCpm((correctChar/ count) * 60);
    }
  }, [count, charIndex]);

  useEffect(() => {
    setWpm((((correctChar)/5) / count)*60 );
    
  }, [count]);

  useEffect(() => {
    setRawWpm((((charIndex)/5) / count) * 60);
  },[count]);

  


  function shuffleArray() {
    for (let i = words.length; i > 0; i--) {
      const j = Math.floor(Math.random() * words.length);
      [words[i], words[j]] = [words[j], words[i]];
    }
    setParagraph(words.join(' '));
    typeRef.current.value = '';
    typeRef.current.focus();
    setCharIndex(0);
    setColor(Array(charRef.current.length).fill(''));
    setCount(0);
    clearTimeout(timerRef.current)
    setIsTyping(true);
    setWpm(0);
    setCpm(0);
    setWordIndex(0);
    setPrevLine(0)
    setWpmHistory([]);
    setRawWpm([]);
    setLineIndex(433);
    setPrevWord(0)
    setRightWard(0);
    setCorrectChar(0);
    setErrors(0);

  }
  const handleEvent = (e) => {
    const { type, keyCode } = e;
    const letters = charRef.current;
    let currentChar = charRef.current[charIndex];
    let previousTypedChar = e.target.value.slice();
    let typedChar = e.target.value.slice(-1);
    let typedSentence = e.target.value;

    if (type === 'change') {
      if (typedSentence === combo[wordIndex]) {
        setInput(combo[wordIndex]);
      }

      if (charIndex < letters.length && count < MaxTime) {
        if (!isTyping) {
          setIsTyping(true);
        }

        if(typedSentence.length === wordChar+1 || typedSentence.length === charIndex+1){
        if (typedChar === currentChar.textContent) {
          setCharIndex(charIndex + 1);
          setCorrectChar(correctChar+1)
          setWordChar(wordChar+1)
          color[charIndex] = 'green';
          if (typedChar === ' ' && input === combo[wordIndex]) {
            typeRef.current.value = '';
            setWordIndex(wordIndex + 1);
            setWordChar(0)
          }   
        } else {
          if (currentChar.textContent === ' ') {
            color[charIndex] = 'purple';
            setCharIndex(charIndex + 1);
            setWordChar(wordChar+1);
            setErrors(errors + 1);
          } else {
            setCharIndex(charIndex + 1);
            setWordChar(wordChar+1)
            color[charIndex] = 'red';
            setErrors(errors + 1);
          }
        }}
      } else {
        setIsTyping(false);
        clearTimeout(timerRef.current);
      }
    }
    if (type === 'keydown') {
      if (keyCode === 8) { // Backspace key
        typeRef.current.focus();
        if (charIndex > 0 && typeRef.current.value !== '') {
          setCharIndex(charIndex - 1);
          setWordChar(wordChar-1);
          color[charIndex - 1] = '';
        }
      }
    }

    
  };



  

  const restart = (e) => {
    typeRef.current.value = '';
    typeRef.current.focus();
    setCharIndex(0);
    setColor(Array(charRef.current.length).fill(''));
    setCount(0);
    clearTimeout(timerRef.current)
    setWpm(0);
    setCpm(0);
    setWordIndex(0);
    setPrevLine(0);
    setLineIndex(433)
    setIsTyping(true);
    setWpmHistory([]);
    setRawWpmHistory([])
    setPrevWord(0);
    setCorrectChar(0)
    setErrors(0);
    let warray= [];
  };

  useEffect(() => {
    if (charIndex > 0 && charIndex < (characters.length - 1)) {
      let currentLineIndex = Math.floor(charRef.current[charIndex+1].getBoundingClientRect().y);
      let currentWordIndex = Math.floor(charRef.current[charIndex].getBoundingClientRect().x);
      let prevWordIndex = Math.floor(charRef.current[charIndex-1].getBoundingClientRect().x);
      if (currentLineIndex <= lineIndex ) {
        setLineIndex(currentLineIndex);
      }
      if(currentWordIndex < 10000){setRightWard(currentWordIndex-prevWordIndex); setPrevWord(prevWordIndex)}
      
      if( typeRef.current.value.slice(-1) === " " || typeRef.current.value === ''){ 
        if(currentLineIndex>lineIndex && currentLineIndex-lineIndex>1){
        setPrevWord(0)
        setPrevLine(prevLine+1);}
        }
    }
  }, [charIndex]);


  useEffect(()=> {
    if(count>0){
      setWpmHistory([...wpmHistory , Math.floor(wpm)])
      setRawWpmHistory([...rawWpmHistory , Math.floor(rawWpm)])
     
    }
  },[count])

  

  
const [ isFocused , setIsFocused ] = useState(false);
const handleBlur = (e) => {
  setIsFocused(false)
  
}

const handleFocus = () => {
  setIsFocused(true)
}

 

  

  
  
  let timerChart = new Array;
  
  for(var i = 1 ; i<MaxTime ; i++){
    timerChart[i] = i.toString();
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    
    scales: {

      x:{
        beginAtZero: false,
        min: 1,
        ticks: {
          callback: function (value, index) {
            return index % 3 === 0 ? this.getLabelForValue(value) : '';
          }

        },
        grid: {
          drawOnChartArea: true,
          drawTicks: true,
          color: function(context) {
            if (context.tick.label % 3 === 1) {
              return 'rgba(0,0,0,0.1)';
            } else {
              return 'rgba(0, 0, 0, 0)';
            }
          }
        }

      },


      
      
      y:
      {
          beginAtZero: true, 
          ticks:{
            stepSize:40,
          }
        }
    }
  }
  const [consistency , setConsistency ] = useState(0);
  
useEffect(() => {
  if(count === MaxTime){
    setConsistency(((wpmHistory[1]-wpmHistory[count-1])/wpmHistory[1])*100)
  }

})

  
  return (
    <div>
          
      <div className={` ${isTyping === true && count < MaxTime ? "" : "hide-main-content"}`}>
        <Bar value =  {` ${ charIndex > 0? 'h': ''}`}/>
    
      <h1><strong>{MaxTime - count}</strong>  <strong>{ Infinity > wpm > 0 ?Math.floor(wpm) : 0} </strong></h1>
        <div className= "cursor"  style={ prevWord >= 100 ?{ transform: `translateX(${(prevWord-100) + rightWard}px)` } : { }} ></div>
        <div className= {`container ${isFocused===false? 'not-focus' : ''}`} onClick={() => typeRef.current.focus()} >
          <div className={`typingarea`} onClick={() => typeRef.current.focus()} style={ prevLine>0? { transform: `translateY(-${45*prevLine}px)` } : {}}>
            {paragraph.split('').map((char, index) => (
              <span
                className={`char ${charIndex === index ? 'active' : ''} ${color[index]}`}
                ref={(e) => (charRef.current[index] = e)}
                key={index}
              >
                {char}
              </span>
            ))}
        </div>
      </div>
      </div>


      <input type="text" ref={typeRef} onChange={handleEvent} onKeyDown={handleEvent} onBlur={handleBlur} onFocus={handleFocus}/>


        <div className={`${isTyping !== true || count === timer.timer? "result-page": "hidden-result-page"}`}>
            <div className='result-area'>
              <div className='result'>
                <strong>WPM:</strong>
                <strong className='strong'>{wpm > 0 ?Math.floor(wpm) : 0}</strong>
                <strong>CPM: </strong>
                <strong className='strong'>{Math.floor(cpm)} </strong>
              </div>
            
            <div className='chart'>
              <Line
                data={{
                  labels: timerChart,
                  datasets: [{
                    label: "wpm",
                    data: wpmHistory,
                    tension: 0.4,
                    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-text'),
                    pointBackgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-text'),
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--color-text'),
                    

                  },
                    {label: "Raw",
                     data: rawWpmHistory,
                     backgroundColor: 'rgb(225,225,225,0.1)',
                    pointBackgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-heading'),
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--color-heading'),
                    fill: true,
                    tension: 0.4,

                  }],
                }
              }
              options={options}
              />
            </div>
            </div>
            <div className ='footer'>
            <div className='buttons'>
              <button className='next-button' onClick={shuffleArray}>❯ <span className='show-next'>next test</span></button>
              <button onClick={restart} className='retry-button'> ⭯ <span className='show-retry'>retry</span></button> 
            </div>
            <div className = 'accuracy'>
              <h4><h6>accuracy:</h6>{Math.floor(((charIndex-errors)/charIndex)*100)}%</h4>
            </div>
            <div className = 'raw' >
              <h4><h6>raw:</h6>{rawWpm > 0 ?Math.floor(rawWpm) : 0}</h4>
            </div>
            <div className = 'char-info' >
              <h4><h6 className='hidden-char-info'>words/chars/err/corr:</h6>{wordIndex}/{charIndex}/{errors}/{charIndex-errors}</h4>
            </div>
            <div className = 'char-info' >
              <h4><h6>time:</h6>{count}</h4>
            </div>
            <div className = 'char-info' >
              <h4><h6>consistency:</h6>{Math.abs(consistency)>100 ? 'afk detected' : Math.floor(Math.abs(100-consistency))+'%'}</h4>
            </div>
            </div>
        </div>
      
    </div>
  );
}

export default Hi;