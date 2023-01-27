import './App.css';

import GameBoard from './components/GameBoard/GameBoard';
import ResetGameButton from './components/ResetGameButton/ResetGameButton';
import Message from './components/Message/Message.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">ticky tacky toeyeye</header>
      <Message />
      <GameBoard />
      <ResetGameButton />
    </div>
  );
}

export default App;
