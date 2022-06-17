import React, {useEffect, useState, useContext} from "react";
import soundEffect2 from "../sound/button-hover.wav";
import useSound from "use-sound";
import "./tictactoe.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {numberArrContext} from "../pages/TwoPlayerGame";

const generateRandomNumber = () => {
  return (Math.floor(Math.random() * 999) + 100).toString();
};

const TicTacToe = () => {
  // time counter
  const [counter, setCounter] = useState(10);
  // passed from context provider
  const {numberArr, setNumberArr} = useContext(numberArrContext);
  const [play2, {stop2}] = useSound(soundEffect2);

  const [turn, setTurn] = useState("X");

  // ["","","","","","","","",""，""]
  // to store player choice
  const [cells, setCells] = useState(Array(9).fill(""));
  // result after we got a winner
  const [result, setResult] = useState("");

  // speech recognition

  const commands = [
    {
      command: numberArr[0],
      callback: () => soundCallback(0),
    },
    {
      command: numberArr[1],
      callback: () => soundCallback(1),
    },
    {
      command: numberArr[2],
      callback: () => soundCallback(2),
    },
    {
      command: numberArr[3],
      callback: () => soundCallback(3),
    },
    {
      command: numberArr[4],
      callback: () => soundCallback(4),
    },
    {
      command: numberArr[5],
      callback: () => soundCallback(5),
    },
    {
      command: numberArr[6],
      callback: () => soundCallback(6),
    },
    {
      command: numberArr[7],
      callback: () => soundCallback(7),
    },
    {
      command: numberArr[8],
      callback: () => soundCallback(8),
    },
  ];

  const {transcript, resetTranscript} = useSpeechRecognition({commands});

  useEffect(() => {
    //when time's not up
    if (counter && counter > 0) {
      var timer = setTimeout(() => setCounter(counter - 1), 1000);
    }

    // when time's up, switch turn
    if (counter === 0) {
      if (turn === "X") {
        setTurn("O");
      } else {
        setTurn("X");
      }
      setNumberArr(
        Array(9)
          .fill()
          .map(() => generateRandomNumber())
      );
      setCounter(10);
      resetTranscript();
    }
    return () => clearTimeout(timer);
  }, [counter, resetTranscript, setNumberArr, turn]);

  SpeechRecognition.startListening({
    continuous: true,
    language: "en-GB",
  });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
  }

  const checkWins = (squares) => {
    let patterns = {
      horizontal: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      vertical: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
    // cell ["","","","","","","","",""，""]
    for (let pattern in patterns) {
      patterns[pattern].forEach((pat) => {
        // when no matching pattern
        if (
          squares[pat[0]] === "" ||
          squares[pat[1]] === "" ||
          squares[pat[2]] === ""
        ) {
          return;
          // when got matching pattern
        } else if (
          squares[pat[0]] === squares[pat[1]] &&
          squares[pat[1]] === squares[pat[2]]
        ) {
          if (squares[pat[0]] === "X") {
            setTurn("X");
          } else if (squares[pat[0]] === "O") {
            setTurn("O");
          }
          setCounter(null);
          setResult(squares[pat[0]]);
          return;
        }
      });
    }

    if (squares.indexOf("") === -1) {
      setResult("draw");
      setCounter(null);
      setTurn(null);
    }
  };

  const soundCallback = (num) => {
    if (!result) {
      let squares = [...cells];

      // avoid overriding
      if (cells[num] !== "") {
        return;
      }

      // Assume X = player 1
      if (turn === "X") {
        squares[num] = "X";
        setTurn("O");
      } else {
        squares[num] = "O";
        setTurn("X");
      }
      setCounter(10);
      setNumberArr(
        Array(9)
          .fill()
          .map(() => generateRandomNumber())
      );
      setCells(squares);
      checkWins(squares);
      resetTranscript();
    } else {
      return;
    }
  };

  const restartGame = () => {
    setTurn("X");
    setResult("");
    setNumberArr(
      Array(9)
        .fill()
        .map(() => generateRandomNumber())
    );
    setCounter(10);
    setCells(Array(9).fill(""));
  };

  const Cell = ({num}) => {
    return (
      <td>
        <div></div>
        {cells[num] === "X" ? (
          <i className="choice player-1-choice fa-solid fa-user-astronaut"></i>
        ) : cells[num] === "O" ? (
          <i className="choice player-2-choice fa-solid fa-user-secret"></i>
        ) : (
          <div className="number">{numberArr[num]}</div>
        )}
      </td>
    );
  };

  return (
    <>
      <div className="tictactoe-container">
        <div class="counter" style={{color: "white"}}>
          <div>{counter}</div>
        </div>
        <i
          className={
            turn === "X" && result === "X"
              ? `player player-1 fa-solid fa-user-astronaut win`
              : turn === "X"
              ? `player player-1 fa-solid fa-user-astronaut turn`
              : `player player-1 fa-solid fa-user-astronaut`
          }
        ></i>
        <table>
          <tbody>
            <tr>
              <Cell num={0} />
              <Cell num={1} />
              <Cell num={2} />
            </tr>
            <tr>
              <Cell num={3} />
              <Cell num={4} />
              <Cell num={5} />
            </tr>
            <tr>
              <Cell num={6} />
              <Cell num={7} />
              <Cell num={8} />
            </tr>
          </tbody>
        </table>
        <i
          className={
            turn === "O" && result === "O"
              ? `player player-2 fa-solid fa-user-secret win`
              : turn === "O"
              ? `player player-2 fa-solid fa-user-secret turn`
              : `player player-2 fa-solid fa-user-secret`
          }
        ></i>
      </div>

      <div style={{height: "15%"}}>
        {result ? (
          <div className="result">
            {result === "X"
              ? "Player 1 Wins!"
              : result === "O"
              ? "Player 2 Wins!"
              : "It is a draw!"}
            <div
              className="ply-again-btn"
              onMouseEnter={() => play2()}
              onMouseLeave={() => stop2()}
              onClick={() => restartGame()}
            >
              Play again
            </div>
          </div>
        ) : (
          <div className="result">{transcript}</div>
        )}
      </div>
    </>
  );
};

export default TicTacToe;
