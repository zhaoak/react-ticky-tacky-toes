import { useGameContext } from '../../context/GameContext.js';

export default function GameBoardSquare({ id }) {
  const { boardState, currentPlayer, setCurrentPlayer } = useGameContext();

  return (
    <div>
      <p>{boardState[id].claimedBy}</p>
    </div>
  );
}
