import { createContext, useContext, useState } from 'react';

const GameContext = createContext();
const GameProvider = ({ children }) => {
  // state variables living in this context go here
  const [currentPlayer, setCurrentPlayer] = useState('X'); // first player is randomized, this is a fallback
  const [gameStatus, setGameStatus] = useState('running');
  const [boardState, setBoardState] = useState([
    { id: 0, claimedBy: '0' },
    { id: 1, claimedBy: '1' },
    { id: 2, claimedBy: '2' },
    { id: 3, claimedBy: '3' },
    { id: 4, claimedBy: '4' },
    { id: 5, claimedBy: '5' },
    { id: 6, claimedBy: '6' },
    { id: 7, claimedBy: '7' },
    { id: 8, claimedBy: '8' },
  ]);

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
