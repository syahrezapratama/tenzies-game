import React, { useState, useEffect } from 'react';
import Die from './Die';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';

function App() {

  const [dice, setDice] = useState(allNewDice());
  const [newGame, setNewGame] = useState(false);

  useEffect(() => {
    // console.log("dice state changed"); 
    const allIsHeld = dice.every(die => die.isHeld);
    const firstDieValue = dice[0].value;
    const allHasSameValue = dice.every(die => die.value === firstDieValue);
    if (allIsHeld && allHasSameValue) {
      setNewGame(true);
      console.log("You won!")
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
    
  }

  function rollDice() {
    if (!newGame) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }));
    } else {
      setNewGame(false);
      setDice(allNewDice())
    }
    
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die;
    }))
  }

  const displayDice = dice.map(die => {
    return (
      <Die 
        value={die.value}
        key={die.id} 
        isHeld={die.isHeld} 
        holdDice={() => holdDice(die.id)} 
      />
    )
  })


  return (
    <div className="App">
      <main>
        {newGame && <Confetti />}
        <h1 className='title'>Tenzies</h1>
        <p className='instruction'>
          Roll until all dice are the same. 
          Click each die to hold it at its current value between rolls.
        </p>
        <div className='container'>
          {displayDice}
        </div>
        <button onClick={rollDice}>
          {newGame ? "New Game" : "Roll Dice"}  
        </button>
      </main>
    </div>
  );
}

export default App;
