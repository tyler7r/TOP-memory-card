import React, { useState } from 'react';
import Gameboard from './components/gameboard/gameboard';
import { cast } from './components/players/players.js'

function App() {
  const [players, setPlayers] = useState([])
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState('none');

  const incrementScore = () => {
    setScore(score + 1);
    if (score >= bestScore) {
      setBestScore(score + 1);
    }
  }

  const resetScore = () => {
    setScore(0);
  }

  const easy = () => {
    let tribes = ['Soka', 'Ratu', 'Tika']
    let randomNum = Math.floor(Math.random() * 3)
    let tribeChoice = tribes[randomNum];
    const soka = cast.filter(player => player.tribe === 'Soka');
    const tika = cast.filter(player => player.tribe === 'Tika');
    const ratu = cast.filter(player => player.tribe === 'Ratu');
    if (tribeChoice === 'Soka') {
      setPlayers(soka)
    } else if (tribeChoice === 'Tika') {
      setPlayers(tika);
    } else if (tribeChoice === 'Ratu') {
      setPlayers(ratu);
    }
    setLevel('easy');
    let buttons = document.querySelector('.levelChoice');
    buttons.classList.add('hidden');
    // document.querySelector('.gameboard').classList.remove('hidden')
  }

  const medium = () => {
    const activePlayers = cast.filter(player => player.status === 'in');
    setPlayers(activePlayers);
    setLevel('medium');
    let buttons = document.querySelector('.levelChoice');
    buttons.classList.add('hidden');
    // document.querySelector('.gameboard').classList.remove('hidden')
  }

  const hard = () => {
    setPlayers(cast);
    setLevel('hard');
    let buttons = document.querySelector('.levelChoice');
    buttons.classList.add('hidden');
    // document.querySelector('.gameboard').classList.remove('hidden')
  }

  const changeLevel = () => {
    setLevel('none');
    let buttons = document.querySelector('.levelChoice');
    buttons.classList.remove('hidden');
  }

  if (level === 'none') {
    return (
      <div>
        <div className='scoreboard'>
          <div id='currentScore'>Score: {score}</div>
          <div id='bestScore'>Best Score: {bestScore}</div>
        </div>
        <div className='levelChoice'>
          <button id='easy' onClick={easy}>Easy</button>
          <button id='medium' onClick={medium}>Medium</button>
          <button id='hard' onClick={hard}>Hard</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='scoreboard'>
        <div id='currentScore'>Score: {score}</div>
        <div id='bestScore'>Best Score: {bestScore}</div>
      </div>
      <div className='levelChoice'>
        <button id='easy' onClick={easy}>Easy</button>
        <button id='medium' onClick={medium}>Medium</button>
        <button id='hard' onClick={hard}>Hard</button>
      </div>
      <Gameboard players={players} reset={resetScore} score={incrementScore} />
      <button id='newLevel' onClick={changeLevel}>Change Level</button>
    </div>
  );
}

export default App;
