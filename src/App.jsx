import { useEffect, useRef, useState } from 'react'
import './App.css'
import Dice from './components/Dice'
import Score from './components/Score'
import { nanoid } from 'nanoid'
import ReactConfetti from 'react-confetti'

function App() {
  const [ dices,setDices ] = useState(()=>getAllNewDices())
  const [ rolls,setRolls ] = useState(0)
  let maxScore = localStorage.getItem('maxScore')
  
  
  function getAllNewDices(){
    return new Array(10).fill(0).map(()=>({
      value:Math.ceil(Math.random()*6),
      isHeld:false,
      id:nanoid()
    }))
  } 

  //! CHECKING IF GAME IS WON
  const gameWon = (dices.every((d)=>d.isHeld) && dices.every((d)=>d.value === dices[0].value))

  function holdDice(id){
    const newDices = dices.map((d)=> d.id === id ? {...d,isHeld:!d.isHeld} : d)
    setDices(newDices)
  }
  const diceElements = dices.map((dice)=>(<Dice 
    value={dice.value} 
    key={dice.id} 
    isHeld={dice.isHeld} 
    hold={()=>holdDice(dice.id)} />))

  function restart(){
    setDices(getAllNewDices())
    setRolls(0)
  }
  
  function rollDice(){
    if(!gameWon){
      setRolls((prev)=> prev+1)
      const newDices = dices.map((d)=>(d.isHeld ? d : {...d,value:Math.ceil(Math.random()*6)}))
      setDices(newDices)
    }
    else{
      setDices(getAllNewDices())
      if(!maxScore || rolls < maxScore){
        localStorage.setItem('maxScore',rolls)
      }
      setRolls(0)
    }
    
  }

  return (
    <>
      <div className='app-div'>
        <h1>Tenzies</h1>
        <button className="restart" onClick={restart}><i class="fa-solid fa-rotate-left"></i></button>
        {rolls === 0 ? <p>Roll the dice, hold matching numbers, and keep rolling until all dice show the same number.</p> : null}
        <div className='dice-container'>
          {diceElements}
        </div>
        <button onClick={rollDice} className='roll-btn'>{gameWon?'New Game':'Roll'}</button>
        <Score currScore={rolls} maxScore={!maxScore ? 0 : maxScore}/>
      </div>
      {gameWon && <ReactConfetti />}
    </>
  )
}

export default App
