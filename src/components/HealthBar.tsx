import React from 'react';

interface HealthBarProps {
  currentHealth: number;
  maxHealth: number;
}

const HealthBar: React.FC<HealthBarProps> = ({ currentHealth, maxHealth }) => {
  const percentage = (currentHealth / maxHealth) * 100;

  return (
    <div style={{ border: '1px solid white', width: '100%', height: '30px' }}>
      <div
        style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: 'red',
        }}
      />
      <div style={{ textAlign: 'center', marginTop: '-28px' }}>
        {currentHealth} / {maxHealth}
      </div>
    </div>
  );
};

export default HealthBar;
