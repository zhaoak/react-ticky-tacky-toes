import { createContext, useContext, useState } from 'react';

const GameContext = createContext();
const GameProvider = ({ children }) => {
  // state variables living in this context go here
  let [currentPlayer, setCurrentPlayer] = useState(pickRandomPlayer());
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

  // helper functions - not documented in readme, meant for internal use ==============================
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

  // scans boardState for three in a row of a specific player symbol
  function scanForWinningLines(playerSymbol) {
    // all possible combos of three in a row on a 3x3 board by square ids
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // counts how many in a row match
    let lineCounter = 0;

    // scan through all possible winning lines
    for (let line of winningLines) {
      for (let square of line) {
        // if square matches, increment counter, check next square in line
        if (boardState[square].claimedBy === playerSymbol) {
          lineCounter++;
          // check if line is three in a row, if so that's a win
          if (lineCounter >= 3) return true;
          continue;
        } else {
          // if square doesn't match, check next line
          lineCounter = 0;
          break;
        }
      }
    }
    // if no lines, no win yet
    return false;
  }

  function scanForTie() {
    // iterate through whole game board
    for (let square of boardState) {
      // if any empty spaces, no tie yet
      if (square.claimedBy === '') return false;
    }
    // if all spaces full, return true
    return true;
  }

  function pickRandomPlayer() {
    const val = Math.random() * 2;
    if (val < 1) return 'X';
    else return 'O';
  }

  // actual game logic ===================================
  const checkForGameEnd = () => {
    // check if player who just moved made three in a row
    // checking for wins takes precedence over ties
    if (scanForWinningLines(currentPlayer)) {
      setGameStatus(`${currentPlayer}win`);
      return true;
    }

    // check for tie
    if (scanForTie()) {
      setGameStatus('tie');
      return true;
    }

    // if neither, game not over
    return false;
  };

  const claimByPlayer = (squareId) => {
    updateBoardState(squareId, currentPlayer);
    checkForGameEnd();
    swapCurrentPlayer();
  };

  const resetGame = () => {
    // set to board to fully empty state
    setBoardState([
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
    setGameStatus('running');
    setCurrentPlayer(pickRandomPlayer());
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
        resetGame,
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
