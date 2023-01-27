import { createContext, useContext, useState } from 'react';

const GameContext = createContext();
const GameProvider = ({ children }) => {
  // state variables living in this context go here
  const [currentPlayer, setCurrentPlayer] = useState('X'); // first player is randomized, this is a fallback
  const [gameStatus, setGameStatus] = useState('running');
  const [boardState, setBoardState] = useState([]);

  return (
    <GameContext.Provider
      value={{
        // these will be accessible from context
        currentPlayer,
        setCurrentPlayer,
        gameStatus,
        setGameStatus,
        boardState,
        setBoardState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('You tried to call useGameContext outside of its provider tags');
  }
  return context;
};

export { GameProvider, useGameContext };
