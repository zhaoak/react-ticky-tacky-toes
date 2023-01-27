import './App.css';
import { useGameContext } from './context/GameContext.js';

import GameBoard from './components/GameBoard/GameBoard';
import ResetGameButton from './components/ResetGameButton/ResetGameButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">ticky tacky toeyeye</header>
      <p>replace this tag with the message component</p>
      <GameBoard />
      <ResetGameButton />
    </div>
  );
}

export default App;
