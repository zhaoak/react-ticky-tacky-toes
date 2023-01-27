import { useGameContext } from '../../context/GameContext.js';

export default function Message() {
  const { gameStatus, currentPlayer } = useGameContext();

  function setMessage() {
    // check gameStatus first
    if (gameStatus === 'Xwin') return 'X wins!';
    if (gameStatus === 'Owin') return 'O wins!';
    if (gameStatus === 'tie') return 'Tied game!';

    // if none of those return, we know game is still running
    return `Your turn, ${currentPlayer}.`;
  }

  return (
    <section className="message-container">
      <p>{setMessage()}</p>
    </section>
  );
}
