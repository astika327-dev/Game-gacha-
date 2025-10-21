import { useState } from 'react';
import SlotMachine from './components/SlotMachine';
import SpinButton from './components/SpinButton';
import RewardDisplay from './components/RewardDisplay';
import BalanceDisplay from './components/BalanceDisplay';
import { playSpinSound, playWinSound } from './utils/audio';
import './App.css';

// Definisikan simbol dan hadiah sesuai GDD (dengan emoji)
const rewards: { [key: string]: number } = {
  '🍒': 2,
  '🍇': 3,
  '🍊': 5,
  '🔔': 10,
  '💎': 25,
  '🎰': 100,
};
const symbols = Object.keys(rewards);
const SPIN_COST = 10;

function App() {
  const [reels, setReels] = useState(['?', '?', '?']);
  const [message, setMessage] = useState('Selamat datang! Tekan tombol untuk bermain.');
  const [balance, setBalance] = useState(100);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    if (balance < SPIN_COST || isSpinning) {
      // Jangan lakukan apa-apa jika koin tidak cukup atau sedang berputar
      return;
    }

    playSpinSound(); // Mainkan suara putaran
    setIsSpinning(true);
    setBalance(prev => prev - SPIN_COST);

    setTimeout(() => {
      const newReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];
      setReels(newReels);

      if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
        const symbol = newReels[0];
        const prize = rewards[symbol] * SPIN_COST;
        setBalance(prev => prev + prize);
        setMessage(`Jackpot! Anda memenangkan ${prize} koin dengan tiga ${symbol}!`);
        playWinSound(); // Mainkan suara kemenangan
      } else {
        setMessage('Coba lagi! Semoga beruntung di putaran berikutnya.');
      }
      setIsSpinning(false);
    }, 1000);
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
