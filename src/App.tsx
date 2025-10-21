import { useState } from 'react';
import SlotMachine from './components/SlotMachine';
import SpinButton from './components/SpinButton';
import RewardDisplay from './components/RewardDisplay';
import BalanceDisplay from './components/BalanceDisplay';
import './App.css';

// Definisikan simbol dan hadiah sesuai GDD
const rewards: { [key: string]: number } = {
  'Ceri': 2,
  'Anggur': 3,
  'Jeruk': 5,
  'Lonceng': 10,
  'Berlian': 25,
  'U2': 100,
};
const symbols = Object.keys(rewards);
const SPIN_COST = 10;

function App() {
  const [reels, setReels] = useState(['?', '?', '?']);
  const [message, setMessage] = useState('Selamat datang! Tekan tombol untuk bermain.');
  const [balance, setBalance] = useState(100);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    if (balance < SPIN_COST) {
      setMessage('Koin tidak cukup!');
      return;
    }

    setIsSpinning(true);
    setBalance(prev => prev - SPIN_COST);

    // Simulasi putaran
    setTimeout(() => {
      const newReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];
      setReels(newReels);

      // Hitung hadiah
      if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
        const symbol = newReels[0];
        const prize = rewards[symbol] * SPIN_COST;
        setBalance(prev => prev + prize);
        setMessage(`Jackpot! Anda memenangkan ${prize} koin dengan tiga ${symbol}!`);
      } else {
        setMessage('Coba lagi! Semoga beruntung di putaran berikutnya.');
      }
      setIsSpinning(false);
    }, 1000); // Durasi animasi putaran
  };

  return (
    <div className="app-container">
      <h1>U2 Gacha Slot</h1>
      <BalanceDisplay balance={balance} />
      <RewardDisplay message={message} />
      <SlotMachine reels={reels} />
      <SpinButton onClick={handleSpin} disabled={isSpinning} />
    </div>
  );
}

export default App;
