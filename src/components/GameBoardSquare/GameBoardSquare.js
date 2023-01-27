import './GameBoardSquare.css';
import { useGameContext } from '../../context/GameContext.js';

export default function GameBoardSquare({ id }) {
  const { boardState, currentPlayer, setCurrentPlayer } = useGameContext();

  return (
    <div className="board-square">
      <p className="board-square-text">{boardState[id].claimedBy}</p>
    </div>
  );
}
