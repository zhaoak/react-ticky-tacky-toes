import { useGameContext } from '../../context/GameContext.js';

export default function ResetGameButton() {
  const { resetGame } = useGameContext();

  return <button onClick={resetGame}>reset game?</button>;
}
