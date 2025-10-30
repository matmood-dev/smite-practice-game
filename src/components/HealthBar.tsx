import React from 'react';
import styled from 'styled-components';

interface HealthBarProps {
  currentHealth: number;
  maxHealth: number;
}

const StyledHealthBarContainer = styled.div`
  width: 100%;
  background-color: #0b0b0b; /* near-black track */
  border-radius: 9999px; /* rounded-full */
  height: 2rem; /* h-8 */
  border: 1px solid #000000; /* subtle black border */
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
`;

const StyledHealthBarFill = styled.div<{ percentage: number }>`
  height: 100%;
  background-color: #10b981; /* success - bright green */
  transition: width 0.12s cubic-bezier(.2,.9,.2,1);
  width: ${props => props.percentage}%;
  box-shadow: 0 6px 18px rgba(16,185,129,0.06);
`;

const StyledHealthText = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e5e7eb; /* text-color */
  font-weight: bold;
  font-size: 0.875rem; /* text-sm */
`;

const HealthBar: React.FC<HealthBarProps> = ({ currentHealth, maxHealth }) => {
  const percentage = (currentHealth / maxHealth) * 100;

  return (
    <StyledHealthBarContainer>
      <StyledHealthBarFill percentage={percentage} />
      <StyledHealthText>
        {currentHealth} / {maxHealth}
      </StyledHealthText>
    </StyledHealthBarContainer>
  );
};

export default HealthBar;
