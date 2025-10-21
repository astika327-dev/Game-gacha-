import React from 'react';

interface RewardDisplayProps {
  message: string;
}

const RewardDisplay: React.FC<RewardDisplayProps> = ({ message }) => {
  return (
    <div className="reward-display">
      <p>{message}</p>
    </div>
  );
};

export default RewardDisplay;
