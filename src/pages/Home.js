import React from "react";
import "./home.css";
import {useNavigate} from "react-router-dom";
import useSound from "use-sound";
import soundEffect from "../sound/button-hover.wav";
const Home = () => {
  let navigate = useNavigate();
  const [play, {stop}] = useSound(soundEffect);
  return (
    <>
      <div class="home-title glow">VOICE-CONTROLLED</div>
      <div class="home-title glow">TIC TAC TOE</div>
      <div
        class="home-btn btn-filled"
        onMouseEnter={() => play()}
        onMouseLeave={() => stop()}
        onClick={() => {
          navigate("/game");
        }}
      >
        Play
      </div>
      <div
        onMouseEnter={() => play()}
        onMouseLeave={() => stop()}
        class="home-btn btn-filled"
        onClick={() => {
          navigate("/rule");
        }}
      >
        Rules
      </div>
    </>
  );
};

export default Home;
