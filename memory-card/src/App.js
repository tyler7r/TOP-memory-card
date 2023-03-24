import React, { useState, useEffect } from 'react';
import Gameboard from './components/gameboard/gameboard';
import { cast } from './components/players/players.js';

function App() {
  const [players, setPlayers] = useState(cast)
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState('none');

  let randomizedArray = [];

  const resetClickStatus = () => {
    let newArray = [...players];
    for (let i = 0; i < newArray.length; i++) {
        newArray[i].clicked = false;
    }
    setPlayers(newArray);
  }

  const randomizeBoard = (array) => {
    let copy = [...array];
    for (let i = 0; i < array.length; i++) {
      let index = Math.floor(Math.random() * copy.length);
      randomizedArray.push(copy[index]);
      copy.splice(index, 1);
    }
    setPlayers(randomizedArray);
    randomizedArray = [];
  }

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
      randomizeBoard(soka)
    } else if (tribeChoice === 'Tika') {
      randomizeBoard(tika);
    } else if (tribeChoice === 'Ratu') {
      randomizeBoard(ratu);
    }
    setLevel('easy')
    let buttons = document.querySelector('.levelChoice');
    buttons.classList.add('hidden');
  }

  const medium = () => {
    let mediumBoard = [...cast];
    for (let i = 0; i < 6; i++) {
      let randomNum = Math.floor(Math.random() * mediumBoard.length);
      mediumBoard.splice(randomNum, 1);
    }
    randomizeBoard(mediumBoard);
    setLevel('medium');
    let buttons = document.querySelector('.levelChoice');
    buttons.classList.add('hidden');
  }

  const hard = () => {
    randomizeBoard(cast);
    setLevel('hard');
    let buttons = document.querySelector('.levelChoice');
    buttons.classList.add('hidden');
  }

  const changeLevel = () => {
    setLevel('none');
    setScore(0);
    setBestScore(0);
    resetClickStatus();
    let buttons = document.querySelector('.levelChoice');
    buttons.classList.remove('hidden');
  }

  const levelHover = (e) => {
    document.querySelector(`#${e.target.id}Description`).classList.toggle('hidden');
  }

  if (level === 'none') {
    return (
      <div className='container'>
        <div className='title'>SURVIVOR 44 MEMORY</div>
        <div className='currentLevel'>Current Level: {level.toUpperCase()}</div>
        <div className='scoreboard'>
          <div id='currentScore'>Score: {score}</div>
          <div id='bestScore'>Best Score: {bestScore}</div>
        </div>
        <div className='levelChoice'>
          <div id='levelChoiceTitle'>Choose Your Level</div>
          <div className='levelButtons'>
            <div className='easySelect'>
              <div className='levelButton' id='easy' onMouseEnter={levelHover} onMouseLeave={levelHover} onClick={easy}>Easy</div>
              <div className='levelDescription hidden' id='easyDescription'>Play with a random tribe (6 Players)!</div>
            </div>
            <div className='mediumSelect'>
              <div className='levelButton' id='medium' onMouseEnter={levelHover} onMouseLeave={levelHover} onClick={medium}>Medium</div>
              <div className='levelDescription hidden' id='mediumDescription'>Play with 12 random players!</div>
            </div>
            <div className='hardSelect'>
              <div className='levelButton' id='hard' onMouseEnter={levelHover} onMouseLeave={levelHover} onClick={hard}>Hard</div>
              <div className='levelDescription hidden' id='hardDescription'>Play with all 18 cast members!</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='title'>SURVIVOR 44 MEMORY</div>
      <button id='newLevel' onClick={changeLevel}>Change Level</button>
      <div className='scoreboard'>
        <div id='currentScore'>Current Score: {score}</div>
        <div id='bestScore'>Best Score: {bestScore}</div>
      </div>
      <div className='levelChoice'>
        <div id='levelChoiceTitle'>Choose Your Level</div>
        <div className='levelButton' id='easy' onClick={easy}>Easy</div>
        <div className='levelButton' id='medium' onClick={medium}>Medium</div>
        <div className='levelButton' id='hard' onClick={hard}>Hard</div>
      </div>
      <div className='currentLevel'>Current Level: {level.toUpperCase()}</div>
      <div className={['gameboard', level].join(' ')}>
        <Gameboard players={players} cast={cast} randomize={randomizeBoard} reset={resetScore} score={incrementScore} />
      </div>
    </div>
  );
}

export default App;
