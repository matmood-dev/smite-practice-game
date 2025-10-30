import React from 'react';

interface EndScreenProps {
  result: boolean; // true for pass, false for fail
  onRestartGame: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ result, onRestartGame }) => {
  return (
    <div>
      <h2>Game Over</h2>
      {result ? <p>You Passed!</p> : <p>You Failed!</p>}
      <button onClick={onRestartGame}>Play Again</button>
    </div>
  );
};

export default EndScreen;
