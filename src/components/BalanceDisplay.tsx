import React from 'react';

interface BalanceDisplayProps {
  balance: number;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
  return (
    <div className="balance-display">
      <h2>Koin U2: {balance}</h2>
    </div>
  );
};

export default BalanceDisplay;
