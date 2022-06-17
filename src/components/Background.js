import React, {useEffect, useState} from "react";
import "./background.css";
import useSound from "use-sound";
import soundEffect from "../sound/galaxy.mp3";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";

const Background = (props) => {
  const [mute, setMute] = useState(true);

  const [play, {stop}] = useSound(soundEffect, {
    loop: true,
    volume: 0.25,
  });

  const toggleMute = () => {
    setMute(!mute);
  };

  useEffect(() => {
    if (mute) {
      stop();
    } else {
      play();
    }
  }, [mute, play, stop]);

  return (
    <div className="main">
      {props.children}
      {mute ? (
        <MusicOffIcon
          sx={{
            fontSize: "40px",
            textShadow:
              "0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #13a0fe,0 0 80px #13a0fe, 0 0 90px #13a0fe, 0 0 100px #13a0fe, 0 0 150px #13a0fe;",
          }}
          className="sound"
          onClick={() => toggleMute()}
        />
      ) : (
        <MusicNoteIcon
          sx={{
            fontSize: "40px",
            textShadow:
              "0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #13a0fe,0 0 80px #13a0fe, 0 0 90px #13a0fe, 0 0 100px #13a0fe, 0 0 150px #13a0fe;",
          }}
          className="sound"
          onClick={() => toggleMute()}
        />
      )}
    </div>
  );
};

export default Background;
