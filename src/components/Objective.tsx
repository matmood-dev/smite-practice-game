import React from 'react';
import styled from 'styled-components';

interface ObjectiveProps {
  name: string;
  image: string;
}

const StyledObjectiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem; /* space-y-4 */
`;

const StyledName = styled.h3`
  font-size: 1.875rem; /* text-3xl */
  font-weight: 600; /* font-semibold */
  color: #facc15; /* yellow-400 */
`;

const StyledImage = styled.img`
  max-width: 12rem; /* max-w-xs */
  width: 100%;
  height: auto;
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); /* shadow-lg */
`;

const Objective: React.FC<ObjectiveProps> = ({ name, image }) => {
  return (
    <StyledObjectiveContainer>
      <StyledName>{name}</StyledName>
      <StyledImage src={image} alt={name} />
    </StyledObjectiveContainer>
  );
};

export default Objective;
