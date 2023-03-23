import React, { useState } from 'react';

export default function Gamesquare(props) {
    const [cast, setCast] = useState(props.players);

    const resetClickStatus = () => {
        let newArray = [...cast];
        for (let i = 0; i < newArray.length; i++) {
            newArray[i].clicked = false;
        }
        setCast(newArray);
    }

    const clickPlayer = (e) => {
        console.log(e);
        let copy = [...cast];
        const selectedPlayer = copy.findIndex(obj => {
            return obj.name === e.target.id;
        })
        console.log(copy[selectedPlayer]);
        if (copy[selectedPlayer].clicked === true) {
            resetClickStatus();
            props.reset();
        } else if (copy[selectedPlayer].clicked !== true) {
            copy[selectedPlayer].clicked = true;
            props.score();
        }
        props.randomize();
    }

    return (
        <div className={props.tribe} onClick={clickPlayer} id={props.name}>
            <div id={props.name} className='playerName'>{props.name}</div>
            <img src={require(`../players/images/${props.name}.jpg`)} alt={props.name} id={props.name}/>
        </div>
    )
}