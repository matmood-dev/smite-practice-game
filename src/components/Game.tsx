import React, { useState, useEffect, useCallback } from 'react';
import Objective from './Objective';
import HealthBar from './HealthBar';
import { type GameObjective } from '../types/types';

const SMITE_DAMAGE = 900;

interface GameProps {
  selectedObjective: GameObjective;
  onEndGame: (result: boolean) => void;
}

const Game: React.FC<GameProps> = ({ selectedObjective, onEndGame }) => {
  const [currentHealth, setCurrentHealth] = useState(selectedObjective.maxHealth);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setCurrentHealth(selectedObjective.maxHealth);
    setIsGameRunning(true);
    setMessage('');
  }, [selectedObjective]);

  const handleSmite = () => {
    if (!isGameRunning) return;

    const healthAfterSmite = currentHealth - SMITE_DAMAGE;
    if (healthAfterSmite <= 0 && currentHealth > 0) {
      setMessage(`Success! You smote ${selectedObjective?.name}!`);
      onEndGame(true);
    } else if (healthAfterSmite > 0) {
      setMessage('Too early!');
      onEndGame(false);
    } else {
      setMessage('Too late!');
      onEndGame(false);
    }
    setIsGameRunning(false);
    setCurrentHealth(healthAfterSmite > 0 ? healthAfterSmite : 0);
  };

  useEffect(() => {
    if (isGameRunning && currentHealth > 0) {
      const interval = setInterval(() => {
        setCurrentHealth((prevHealth) => {
          const newHealth = prevHealth - Math.floor(Math.random() * 500 + 200);
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
  }, [isGameRunning, currentHealth, onEndGame]);

  return (
    <div>
      {selectedObjective && (
        <div>
          <Objective name={selectedObjective.name} image={selectedObjective.image} />
          <HealthBar
            currentHealth={currentHealth}
            maxHealth={selectedObjective.maxHealth}
          />
          {isGameRunning ? (
            <button onClick={handleSmite}>Smite</button>
          ) : (
            <p>{message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
