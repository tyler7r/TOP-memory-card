import React, { useState } from 'react';
import Gameboard from './components/gameboard/gameboard';
import { cast } from './components/players/players.js'

function App() {
  const players = cast;
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const incrementScore = () => {
    setScore(score + 1);
    if (score >= bestScore) {
      setBestScore(score + 1);
    }
  }

  const resetScore = () => {
    setScore(0);
  }

  return (
    <div>
      <div className='scoreboard'>
        <div id='currentScore'>Score: {score}</div>
        <div id='bestScore'>Best Score: {bestScore}</div>
      </div>
      <Gameboard players={players} reset={resetScore} score={incrementScore} />
    </div>
  );
}

export default App;
