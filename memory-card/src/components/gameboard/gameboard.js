import React, { useState } from 'react';
import Gamesquare from '../gamesquare/gamesquare';

export default function Gameboard(props) {
    const [board, setBoard] = useState(props.players);

    let newArray = [];

    const randomizeBoard = () => {
        let copy = [...props.players];
        for (let i = 0; i < 18; i++) {
            let index = Math.floor(Math.random() * copy.length);
            newArray.push(copy[index]);
            copy.splice(index, 1);
        }
    }

    const setRandomBoard = () => {
        randomizeBoard();
        setBoard(newArray);
        newArray=[];
    }

    return (
        <div className='gameboard'>
            {board.map((square) => {
                return (
                    <div className='gamesquare' key={square.name}>
                        <Gamesquare randomize={setRandomBoard} reset={props.reset} players={props.players} score={props.score} img={square.imgFile} name={square.name}/>
                    </div>
                )
            })}
        </div>
    )
}