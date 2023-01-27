import { createContext, useContext, useState } from 'react';

const GameContext = createContext();
const GameProvider = ({ children }) => {
  // state variables living in this context go here
  let [currentPlayer, setCurrentPlayer] = useState('X'); // first player is randomized, this is a fallback
  let [gameStatus, setGameStatus] = useState('running');
  const [boardState, setBoardState] = useState([
    { id: 0, claimedBy: '' },
    { id: 1, claimedBy: '' },
    { id: 2, claimedBy: '' },
    { id: 3, claimedBy: '' },
    { id: 4, claimedBy: '' },
    { id: 5, claimedBy: '' },
    { id: 6, claimedBy: '' },
    { id: 7, claimedBy: '' },
    { id: 8, claimedBy: '' },
  ]);

  function swapCurrentPlayer() {
    currentPlayer === 'X' ? setCurrentPlayer('O') : setCurrentPlayer('X');
  }

  function updateBoardState(squareId, claimingPlayer) {
    // copy boardState to tmp array
    let tmp = boardState;
    // iterate through tmp array, update desired square with claimingPlayer's mark
    for (let square of tmp) {
      if (square.id === squareId) {
        square.claimedBy = claimingPlayer;
      }
    }
    // overwrite boardState with the modified tmp array
    setBoardState(tmp);
  }

  const claimByPlayer = (squareId) => {
    console.log('square', squareId, ' claimed by ', currentPlayer);
    updateBoardState(squareId, currentPlayer);
    swapCurrentPlayer();
  };

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
        claimByPlayer,
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
