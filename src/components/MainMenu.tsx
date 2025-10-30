import React, { useState } from 'react';
import { type GameObjective, type Rank } from '../types/types';

interface MainMenuProps {
  onStartGame: (objective: GameObjective, rank: Rank) => void;
}

import styled from 'styled-components';

const StyledMainMenuContainer = styled.div`
  text-align: center;
`;

const StyledTitle = styled.h1`
  font-size: 3.5rem; /* text-5xl */
  font-weight: 800;
  margin-bottom: 1.25rem; /* tighter spacing */
  color: #0ea5e9; /* bright cyan accent */
  letter-spacing: -0.02em;
`;

const StyledSubtitle = styled.h2`
  font-size: 1.375rem; /* slightly smaller subtitle */
  margin-bottom: 1.5rem; /* mb-6 */
  color: #e5e7eb; /* text-color */
  font-weight: 600;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem; /* space-y-4 md:space-y-0 md:space-x-4 */

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const StyledButton = styled.button`
  background-color: #111827; /* deep near-black button */
  color: #e5e7eb; /* text-color */
  font-weight: 700;
  padding: 0.75rem 1.5rem; /* py-3 px-6 */
  border-radius: 0.75rem; /* slightly larger radius */
  font-size: 1.125rem; /* text-xl-ish */
  transition: transform 0.22s cubic-bezier(.2,.9,.2,1), box-shadow 0.22s;
  box-shadow: 0 6px 18px rgba(2,6,23,0.6);
  border: 1px solid rgba(255,255,255,0.02);

  &:hover {
    background-color: #0b1220; /* subtle hover lift */
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 30px rgba(2,6,23,0.8);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2,6,23,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background: #0b0b0b;
  padding: 1.25rem;
  border-radius: 12px;
  width: 90%;
  max-width: 420px;
  text-align: center;
  box-shadow: 0 12px 40px rgba(2,6,23,0.9);
  border: 1px solid rgba(255,255,255,0.03);
  overflow-y: auto;
  max-height: 90vh;

  @media (max-width: 480px) {
    /* Keep comfortable side margins on very small screens */
    width: calc(100% - 48px);
    max-width: 360px;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(2,6,23,0.95);
  }
`;

const ModalTitle = styled.h3`
  margin: 0 0 0.75rem 0;
  color: #e5e7eb;
  font-size: 1.25rem;
  font-weight: 700;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 0.75rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.6rem;
    align-items: stretch;
  }
`;

const ModalButton = styled.button`
  padding: 0.8rem 1rem;
  border-radius: 12px;
  font-weight: 700;
  border: none;
  background: #111827;
  color: #e5e7eb;
  box-shadow: 0 8px 24px rgba(2,6,23,0.6);
  transition: transform 0.12s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 110px;

  &:hover { transform: translateY(-2px); }

  @media (max-width: 480px) {
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.6rem;
    padding: 0.75rem 0.75rem;
    width: 100%;
  }
`;

const RankImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 8px;
  background: rgba(255,255,255,0.02);
  padding: 6px;

  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
  }
`;

const RankDesc = styled.p`
  margin: 0;
  font-size: 0.78rem;
  color: #9ca3af;
  max-width: 140px;
  text-align: center;
`;

const ModalCancel = styled.button`
  margin-top: 0.75rem;
  background: transparent;
  border: none;
  color: #9ca3af;
  font-weight: 600;
  padding: 0.5rem 0.75rem;

  @media (max-width: 480px) {
    padding: 0.75rem 0.5rem;
  }
`;

const objectives: GameObjective[] = [
  { name: 'Baron Nashor', maxHealth: 12000, image: '/assets/baron.svg' },
  { name: 'Infernal Drake', maxHealth: 6400, image: '/assets/dragon.svg' },
  { name: 'Atakan', maxHealth: 8000, image: '/assets/atakan.svg' },
];

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  const [pendingObjective, setPendingObjective] = useState<GameObjective | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleObjectiveClick = (obj: GameObjective) => {
    setPendingObjective(obj);
    setIsModalOpen(true);
  };

  const handleSelectDifficulty = (rank: Rank) => {
    if (!pendingObjective) return;
    onStartGame(pendingObjective, rank);
    setIsModalOpen(false);
    setPendingObjective(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setPendingObjective(null);
  };

  return (
    <StyledMainMenuContainer>
      <StyledTitle>Smite Practice</StyledTitle>
      <StyledSubtitle>Select an Objective to Practice:</StyledSubtitle>
      <StyledButtonContainer>
        {objectives.map((obj) => (
          <StyledButton key={obj.name} onClick={() => handleObjectiveClick(obj)}>
            {obj.name}
          </StyledButton>
        ))}
      </StyledButtonContainer>

      {isModalOpen && pendingObjective && (
        <ModalOverlay role="dialog" aria-modal="true">
          <ModalContent>
            <ModalTitle>Select Your Rank</ModalTitle>
            <ModalButtons>
              <ModalButton onClick={() => handleSelectDifficulty('silver')} aria-label="Select Silver">
                <RankImage src="/assets/ranks/silver.webp" alt="Silver rank" />
                <span>Silver</span>
                <RankDesc>Enemy jungler smites at ~500 HP — forgiving timing.</RankDesc>
              </ModalButton>
              <ModalButton onClick={() => handleSelectDifficulty('diamond')} aria-label="Select Diamond">
                <RankImage src="/assets/ranks/diamond.png" alt="Diamond rank" />
                <span>Diamond</span>
                <RankDesc>Skilled jungler smites at ~800 HP — tighter window.</RankDesc>
              </ModalButton>
              <ModalButton onClick={() => handleSelectDifficulty('challenger')} aria-label="Select Challenger">
                <RankImage src="/assets/ranks/challenger.webp" alt="Challenger rank" />
                <span>Challenger</span>
                <RankDesc>Elite jungler smites at ~1000 HP — very small window.</RankDesc>
              </ModalButton>
            </ModalButtons>
            <ModalCancel onClick={handleCancel}>Cancel</ModalCancel>
          </ModalContent>
        </ModalOverlay>
      )}
    </StyledMainMenuContainer>
  );
};

export default MainMenu;
