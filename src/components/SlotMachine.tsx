import React from 'react';

interface SlotMachineProps {
  reels: string[];
}

const SlotMachine: React.FC<SlotMachineProps> = ({ reels }) => {
  return (
    <div className="slot-machine">
      {reels.map((symbol, index) => (
        <div key={index} className="reel">
          {symbol}
        </div>
      ))}
    </div>
  );
};

export default SlotMachine;
