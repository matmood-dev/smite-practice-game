import React from 'react';
import { type GameObjective } from '../types/types';

interface MainMenuProps {
  onStartGame: (objective: GameObjective) => void;
}

const objectives: GameObjective[] = [
  { name: 'Baron Nashor', maxHealth: 12000, image: '/assets/baron.svg' },
  { name: 'Infernal Drake', maxHealth: 6400, image: '/assets/dragon.svg' },
];

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  return (
    <div>
      <h2>Select an Objective to Practice:</h2>
      <div>
        {objectives.map((obj) => (
          <button key={obj.name} onClick={() => onStartGame(obj)}>
            {obj.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainMenu;
