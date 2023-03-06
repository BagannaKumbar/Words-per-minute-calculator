import {useState, useEffect, useRef} from 'react'
import randomWords from 'random-words'
import "../styles.css";
const NUMB_OF_WORDS = 200
const SECONDS = 60

const TYPING_TIPS = [
    "Practice typing regularly to build muscle memory.",
    "Learn to touch type to increase typing speed and accuracy.",
    "Use proper typing posture and avoid unnecessary finger movements.",
    "Take breaks to avoid strain and fatigue.",
    "Use online typing games and exercises to improve typing skills.",
  ];

function App() {
  const [words, setWords] = useState([])
  const [countDown, setCountDown] = useState(SECONDS)
  const [currInput, setCurrInput] = useState("")
  const [currWordIndex, setCurrWordIndex] = useState(0)
  const [currCharIndex, setCurrCharIndex] = useState(-1)
  const [currChar, setCurrChar] = useState("")
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [status, setStatus] = useState("waiting")
  const textInput = useRef(null)

  useEffect(() => {
    setWords(generateWords())
  }, [])

  useEffect(() => {
    if (status === 'started') {
      textInput.current.focus()
    }
  }, [status])

  function generateWords() {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords())
  }

  function start() {

    if (status === 'finished') {
      setWords(generateWords())
      setCurrWordIndex(0)
      setCorrect(0)
      setIncorrect(0)
      setCurrCharIndex(-1)
      setCurrChar("")
    }

    if (status !== 'started') {
      setStatus('started')
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval)
            setStatus('finished')
            setCurrInput("")
            return SECONDS
          } else {
            return prevCountdown - 1
          }
        }  )
      } ,  1000 )
    }
    
  }

  function handleKeyDown({keyCode, key}) {
    // space bar 
    if (keyCode === 32) {
      checkMatch()
      setCurrInput("")
      setCurrWordIndex(currWordIndex + 1)
      setCurrCharIndex(-1)
    // backspace
    } else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1)
      setCurrChar("")
    } else {
      setCurrCharIndex(currCharIndex + 1)
      setCurrChar(key)
    }
  }

  function checkMatch() {
    const wordToCompare = words[currWordIndex]
    const doesItMatch = wordToCompare === currInput.trim()
    if (doesItMatch) {
      setCorrect(correct + 1)
    } else {
      setIncorrect(incorrect + 1)
    }
  }

  function getCharClass(wordIdx, charIdx, char) {
    if (wordIdx === currWordIndex && charIdx === currCharIndex && currChar && status !== 'finished') {
      if (char === currChar) {
        return 'has-background-success'
      } else {
        return 'has-background-danger'
      }
    } else if (wordIdx === currWordIndex && currCharIndex >= words[currWordIndex].length) {
      return 'has-background-danger'
    } else {
      return ''
    }
  }
  const reStart=()=>{
    window. location. reload(false);
  }

  return (
    <div className="row">
    <div className="col-md-6 offset-sm-3 text-left">
    <div className="App">
      <div className="section p-2">
        <div className="is-size-1 has-text-centered has-text-primary ">
          <h2 style={{fontFamily:'fantasy',backgroundColor:'GrayText',borderRadius:'10px', width:'80px',marginLeft:'46%'}}>{countDown}</h2>
        </div>
      </div>
      <div className="control is-expanded section p-2">
        <input ref={textInput} disabled={status !== "started"} type="text" className="form-control" placeholder="Type here " onKeyDown={handleKeyDown} value={currInput} onChange={(e) => setCurrInput(e.target.value)}  />
      </div>
      <div className='container'>
      <div className="row justify-content-center">
        <button className="btn btn-outline-success btn-lg col-4   " onClick={start}>
           Start
        </button>
        <button className="btn btn-outline-success btn-lg col-4 offset-md-2  " onClick={reStart}>
           Restart
        </button>

      </div>
      </div>
      </div>
    </div>
      {status === 'started' && (
        <div className="section " >
          <div className="card ">
            <div className="card-content">
              <div className="content text-dark">
                {words.map((word, i) => (
                  <span key={i}>
                    <span>
                      {word.split("").map((char, idx) => (
                        <span className={getCharClass(i, idx, char)} key={idx}>{char}</span>
                      )) }
                    </span>
                    <span> </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {status === 'finished' && (
        <div className="section">
          <div className="columns">
            <div className="column has-text-centered">
              <p className="is-size-5">Words per minute:</p>
              <p className="has-text-primary is-size-1">
                {correct}
              </p>
            </div>
            <div className="column has-text-centered">
              <p className="is-size-5">Accuracy:</p>
              {correct !== 0 ? (
                <p className="has-text-info is-size-1">
                  {Math.round((correct / (correct + incorrect)) * 100)}%
                </p>
              ) : (
                <p className="has-text-info is-size-1">0%</p>
              )}
            </div>
          </div>
          
        <div className='section'>
            <div className='card'>
                <div className='card-content'>
                    <div className='content text-dark'>
                    <h3>Typing Tips:</h3>
 
                        {
                        correct<40 ?(
                            <div className="has-text-left">
                            <ul>
                                {TYPING_TIPS.map((tip, index) => (
                                <li key={index}>{tip}</li>
                                ))}
                            </ul>
                            <div className='text-danger font-weight-bolder '>NOTE: Average typing speed should bee 40wpm.</div>
                            </div>
                        ):(<p> congratulations your typing speed is greater than average speed. </p>)}
                    </div>
                </div>
            </div>
        </div>

        </div>
      )}
      

    </div>
   
  );
}

export default App;
