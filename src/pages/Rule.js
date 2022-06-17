import React from "react";
import "./rule.css";
import soundEffect from "../sound/button-hover.wav";
import useSound from "use-sound";
import {useNavigate} from "react-router-dom";

const Rule = () => {
  let navigate = useNavigate();
  const [play, {stop}] = useSound(soundEffect);

  return (
    <div className="rule-container">
      <div
        className="back-btn-rule"
        onMouseEnter={() => play()}
        onMouseLeave={() => stop()}
        onClick={() => {
          navigate("/");
        }}
      >
        <i className="fa-regular fa-square-caret-left"></i>
      </div>
      <div className="rules">
        <div className="rules-title">Rules</div>
        <div className="rules-content">
          1. This is not your ordinary Tic Tac Toe.
        </div>
        <div className="rules-content">
          2. Open the mic of your device before playing the game.
        </div>
        <div className="rules-content">
          3. Speak out the number on the slot you want to fill in to make a move
          before running out of time.
        </div>
        <div className="rules-content">
          4. Player who forms 3 consecutive moves wins the game.
        </div>
      </div>
    </div>
  );
};

export default Rule;
