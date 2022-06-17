import React, {useState, createContext} from "react";
import {useNavigate} from "react-router-dom";
import TicTacToe from "../components/TicTacToe";
import soundEffect from "../sound/button-hover.wav";
import useSound from "use-sound";

import "./twoPlayerGame.css";
export const numberArrContext = createContext();

const generateRandomNumber = () => {
  return (Math.floor(Math.random() * 999) + 100).toString();
};

const TwoPlayerGame = () => {
  const [numberArr, setNumberArr] = useState(
    Array(9)
      .fill()
      .map(() => generateRandomNumber())
  );

  const [play, {stop}] = useSound(soundEffect);
  let navigate = useNavigate();

  return (
    <numberArrContext.Provider value={{numberArr, setNumberArr}}>
      <div className="game-container">
        <div
          className="back-btn"
          onMouseEnter={() => play()}
          onMouseLeave={() => stop()}
          onClick={() => {
            navigate("/");
          }}
        >
          <i className="fa-regular fa-square-caret-left"></i>
        </div>
        <TicTacToe />
      </div>
    </numberArrContext.Provider>
  );
};

export default TwoPlayerGame;
