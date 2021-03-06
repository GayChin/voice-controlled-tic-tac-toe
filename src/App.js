import {HashRouter, Routes, Route} from "react-router-dom";
import Background from "./components/Background";
import Home from "./pages/Home";
import TwoPlayerGame from "./pages/TwoPlayerGame";
import Rule from "./pages/Rule";

function App() {
  return (
    <HashRouter>
      <Background>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<TwoPlayerGame />} />
          <Route path="/rule" element={<Rule />} />
        </Routes>
      </Background>
    </HashRouter>
  );
}

export default App;
