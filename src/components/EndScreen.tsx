import React from 'react';
import styled from 'styled-components';

interface EndScreenProps {
  result: boolean; // true for pass, false for fail
  onRestartGame: () => void;
}

const StyledEndScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem; /* space-y-6 */
`;

const StyledGameOverTitle = styled.h2`
  font-size: 2.25rem; /* text-4xl */
  font-weight: 800;
  color: #ef4444; /* fail-color */
  letter-spacing: -0.01em;
`;

const StyledResultMessage = styled.p<{ success: boolean }>`
  font-size: 1.875rem; /* text-3xl */
  font-weight: 600; /* font-semibold */
  color: ${props => props.success ? '#4CAF50' : '#F44336'}; /* success-color or fail-color */
`;

const StyledRestartButton = styled.button`
  background-color: #111827; /* deep near-black button */
  color: #e5e7eb; /* text-color */
  font-weight: 700;
  padding: 0.75rem 1.5rem; /* py-3 px-6 */
  border-radius: 0.75rem; /* rounded-lg */
  font-size: 1.125rem; /* text-xl */
  transition: transform 0.22s, box-shadow 0.22s;
  box-shadow: 0 8px 24px rgba(2,6,23,0.6);
  border: 1px solid rgba(255,255,255,0.02);

  &:hover {
    background-color: #0b1220; /* button-hover-bg */
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 36px rgba(2,6,23,0.8);
  }
`;

const EndScreen: React.FC<EndScreenProps> = ({ result, onRestartGame }) => {
  return (
    <StyledEndScreenContainer>
      <StyledGameOverTitle>Game Over</StyledGameOverTitle>
      <StyledResultMessage success={result}>
        {result ? 'You Passed!' : 'You Failed!'}
      </StyledResultMessage>
      <StyledRestartButton onClick={onRestartGame}>
        Play Again
      </StyledRestartButton>
    </StyledEndScreenContainer>
  );
};

export default EndScreen;
