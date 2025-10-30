import React, { useState, useEffect } from 'react';
import Objective from './Objective';
import HealthBar from './HealthBar';
import { type GameObjective, type Rank } from '../types/types';
import styled from 'styled-components';

const SMITE_DAMAGE = 1200;

const StyledGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem; /* space-y-6 */
`;

const StyledSmiteButton = styled.button`
  background-color: #ef4444; /* vivid red for action */
  color: #ffffff;
  font-weight: 800;
  padding: 0.75rem 1.5rem; /* py-3 px-6 */
  border-radius: 0.75rem; /* rounded-lg */
  font-size: 1.125rem; /* text-xl */
  transition: transform 0.18s cubic-bezier(.2,.9,.2,1), box-shadow 0.18s;
  box-shadow: 0 8px 28px rgba(239,68,68,0.12);
  border: 1px solid rgba(255,255,255,0.03);

  &:hover {
    background-color: #dc2626; /* red-700 */
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 40px rgba(220,38,38,0.18);
  }
`;

const StyledMessage = styled.p`
  font-size: 1.5rem; /* text-2xl */
  font-weight: 600; /* font-semibold */
  margin-top: 1rem; /* mt-4 */
  color: #e5e7eb; /* text-color */
`;

interface GameProps {
  selectedObjective: GameObjective;
  rank: Rank;
  onEndGame: (result: boolean) => void;
}

const Game: React.FC<GameProps> = ({ selectedObjective, rank, onEndGame }) => {
  const [currentHealth, setCurrentHealth] = useState(selectedObjective.maxHealth);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [message, setMessage] = useState('');

  const enemySmiteThreshold = rank === 'silver' ? 500 : rank === 'diamond' ? 800 : 1000;

  useEffect(() => {
    setCurrentHealth(selectedObjective.maxHealth);
    setIsGameRunning(true);
    setMessage('');
  }, [selectedObjective]);

  const handleSmite = () => {
    if (!isGameRunning) return;

    // If enemy already smited (or health is at/under enemy smite threshold), player loses
    if (currentHealth <= enemySmiteThreshold) {
      setMessage('Too late! Enemy jungler already smited the objective.');
      setIsGameRunning(false);
      setCurrentHealth(0);
      onEndGame(false);
      return;
    }

    // If player smites too early (objective health higher than player's smite power), fail
    if (currentHealth > SMITE_DAMAGE) {
      setMessage('Too early! You smited before the objective was low enough.');
      setIsGameRunning(false);
      onEndGame(false);
      return;
    }

  // Valid smite window: currentHealth is between enemy threshold + 1 and player's smite power (<=1200)
    const healthAfterSmite = currentHealth - SMITE_DAMAGE;
    if (healthAfterSmite <= 0) {
      setMessage(`Success! You smote ${selectedObjective?.name}!`);
      setIsGameRunning(false);
      setCurrentHealth(0);
      onEndGame(true);
    } else {
      // This case is unlikely because we handled currentHealth > SMITE_DAMAGE earlier,
      // but keep fallback handling.
      setMessage('Too early!');
      setIsGameRunning(false);
      setCurrentHealth(healthAfterSmite > 0 ? healthAfterSmite : 0);
      onEndGame(false);
    }
  };

  useEffect(() => {
      if (isGameRunning && currentHealth > 0) {
      const interval = setInterval(() => {
        setCurrentHealth((prevHealth) => {
          const newHealth = prevHealth - Math.floor(Math.random() * 500 + 200);
          // If health drops to or below enemy smite threshold, the enemy jungler will smite and steal
          if (newHealth <= enemySmiteThreshold) {
            setIsGameRunning(false);
            setMessage('Objective was stolen by the enemy jungler!');
            onEndGame(false);
            return 0;
          }
          // If health somehow reaches 0 or below (edge case), handle as taken
          if (newHealth <= 0) {
            setIsGameRunning(false);
            setMessage('Objective was taken by the enemy team!');
            onEndGame(false);
            return 0;
          }
          return newHealth;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isGameRunning, currentHealth, onEndGame, enemySmiteThreshold]);

  return (
    <StyledGameContainer>
      {selectedObjective && (
        <>
          <Objective name={selectedObjective.name} image={selectedObjective.image} />
          <HealthBar
            currentHealth={currentHealth}
            maxHealth={selectedObjective.maxHealth}
          />
          {isGameRunning ? (
            <StyledSmiteButton onClick={handleSmite}>
              Smite
            </StyledSmiteButton>
          ) : (
            <StyledMessage>{message}</StyledMessage>
          )}
        </>
      )}
    </StyledGameContainer>
  );
};

export default Game;
