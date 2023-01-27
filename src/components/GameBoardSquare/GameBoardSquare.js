import './GameBoardSquare.css';
import { useGameContext } from '../../context/GameContext.js';

export default function GameBoardSquare({ id }) {
  const { boardState, gameStatus, currentPlayer, claimByPlayer } = useGameContext();

  function handleSquareClick(id) {
    // if game already over, do nothing
    if (gameStatus !== 'running') return;
    // if space already claimed, do nothing
    if (boardState[id].claimedBy === 'X' || boardState[id].claimedBy === 'O') return;

    // now that we know space is empty and game is running,
    // update text on square with player symbol
    const squareLabel = document.getElementById(`square-${id}`);
    squareLabel.textContent = currentPlayer;
    // and claim space for player in state
    claimByPlayer(id);
  }

  return (
    <div
      className="board-square"
      onClick={() => {
        handleSquareClick(id);
      }}
    >
      <p className="board-square-text" id={`square-${id}`}>
        {boardState[id].claimedBy}
      </p>
    </div>
  );
}
