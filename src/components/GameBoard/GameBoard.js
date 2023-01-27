import GameBoardSquare from '../GameBoardSquare/GameBoardSquare.js';
import { useGameContext } from '../../context/GameContext.js';

export default function GameBoard() {
  const { boardState } = useGameContext();
  return (
    <section className="game-board">
      {boardState.map((square) => (
        <GameBoardSquare key={square.id} id={square.id} />
      ))}
    </section>
  );
}
