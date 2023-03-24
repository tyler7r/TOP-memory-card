import React, { useState, useEffect } from 'react';
import Gamesquare from '../gamesquare/gamesquare';
import './gameboard-style.css'

export default function Gameboard(props) {
    const [board, setBoard] = useState(props.players);

    let newArray = [];

    const randomizeBoard = () => {
        let copy = [...props.players];
        for (let i = 0; i < props.players.length; i++) {
            let index = Math.floor(Math.random() * copy.length);
            newArray.push(copy[index]);
            copy.splice(index, 1);
        }
        setBoard(newArray);
        newArray = [];
    }

    // const setRandomBoard = () => {
    //     randomizeBoard();
    //     setBoard(newArray);
    //     newArray=[];
    // }

    return (
        <div className='gameboard'>
            {board.map((square) => {
                return (
                    <Gamesquare key={square.name} cast={props.cast} tribe={square.tribe} randomize={randomizeBoard} reset={props.reset} players={props.players} score={props.score} name={square.name}/>
                )
            })}
        </div>
    )
}