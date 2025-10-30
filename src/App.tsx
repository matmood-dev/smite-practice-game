import React, { useState } from 'react';
import Game from './components/Game';
import MainMenu from './components/MainMenu';
import EndScreen from './components/EndScreen';
import { GameState, type GameObjective, type Rank } from './types/types';
import styled from 'styled-components';

const StyledAppContainer = styled.div`
  min-height: 100vh;
  background-color: #000000; /* pure black */
  color: #e5e7eb; /* lighter body text on black */
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContentWrapper = styled.div`
  max-width: 920px;
  width: 92%;
  padding: 2.25rem;
  background-color: #0b0b0b; /* near-black card */
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(2,6,23,0.8), inset 0 1px 0 rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.03);
  text-align: center;
`;

function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [selectedObjective, setSelectedObjective] = useState<GameObjective | null>(null);
  const [selectedRank, setSelectedRank] = useState<Rank | null>(null);
  const [gameResult, setGameResult] = useState<boolean>(false); // true for pass, false for fail

  const handleStartGame = (objective: GameObjective, rank: Rank) => {
    setSelectedObjective(objective);
    setSelectedRank(rank);
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
    <StyledAppContainer>
      <StyledContentWrapper>
        {
          gameState === GameState.MENU && (
            <MainMenu onStartGame={handleStartGame} />
          )
        }
        {
          gameState === GameState.PLAYING && selectedObjective && selectedRank && (
            <Game
              selectedObjective={selectedObjective}
              rank={selectedRank}
              onEndGame={handleEndGame}
            />
          )
        }
        {
          gameState === GameState.END && (
            <EndScreen result={gameResult} onRestartGame={handleRestartGame} />
          )
        }
      </StyledContentWrapper>
    </StyledAppContainer>
  );
}

export default App;