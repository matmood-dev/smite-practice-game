import React, { useState } from 'react';
import Game from './components/Game';
import MainMenu from './components/MainMenu';
import EndScreen from './components/EndScreen';
import { GameState, type GameObjective } from './types/types';

function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [selectedObjective, setSelectedObjective] = useState<GameObjective | null>(null);
  const [gameResult, setGameResult] = useState<boolean>(false); // true for pass, false for fail

  const handleStartGame = (objective: GameObjective) => {
    setSelectedObjective(objective);
    setGameState(GameState.PLAYING);
  };

  const handleEndGame = (result: boolean) => {
    setGameResult(result);
    setGameState(GameState.END);
  };

  const handleRestartGame = () => {
    setSelectedObjective(null);
    setGameState(GameState.MENU);
  };

  return (
    <div className="App">
      <h1>Smite Practice</h1>
      {
        gameState === GameState.MENU && (
          <MainMenu onStartGame={handleStartGame} />
        )
      }
      {
        gameState === GameState.PLAYING && selectedObjective && (
          <Game
            selectedObjective={selectedObjective}
            onEndGame={handleEndGame}
          />
        )
      }
      {
        gameState === GameState.END && (
          <EndScreen result={gameResult} onRestartGame={handleRestartGame} />
        )
      }
    </div>
  );
}

export default App;