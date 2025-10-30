import React from 'react';

interface ObjectiveProps {
  name: string;
  image: string;
}

const Objective: React.FC<ObjectiveProps> = ({ name, image }) => {
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt={name} style={{ maxWidth: '200px' }} />
    </div>
  );
};

export default Objective;
