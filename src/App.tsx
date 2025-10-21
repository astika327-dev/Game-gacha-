import { useState } from 'react';
import { playSpinSound, playWinSound } from './utils/audio';
import './App.css';

// === Konfigurasi Game ===
const rewards: { [key: string]: number } = {
  '🍒': 10,
  '🍋': 20,
  '🍊': 30,
  '🍇': 50,
  '💎': 100,
  '7️⃣': 250,
};
const symbols = Object.keys(rewards);

const SPIN_COST = 10;
const INITIAL_COINS = 500;
const MAX_BET = 50; // Taruhan maksimum baru

function App() {
  const [reels, setReels] = useState<string[]>(['🍒', '🍋', '🍊']);
  const [coins, setCoins] = useState(INITIAL_COINS);
  const [message, setMessage] = useState('Selamat datang di U2 Gacha Slot!');
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentBet, setCurrentBet] = useState(SPIN_COST);

  const spinReels = () => {
    // Logika ini tetap sama, menghasilkan simbol acak
    return [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];
  };

  const calculateWinnings = (spunReels: string[]): number => {
    // Implementasi dari GDD: Kemenangan jika ada dua atau lebih simbol yang sama
    const counts: { [key: string]: number } = {};
    for (const symbol of spunReels) {
      counts[symbol] = (counts[symbol] || 0) + 1;
    }

    let prize = 0;
    for (const symbol in counts) {
      if (counts[symbol] >= 2) {
        // Hadiah = (Nilai Simbol * Jumlah Kemunculan) * (Taruhan / Biaya Putaran Dasar)
        prize += rewards[symbol] * counts[symbol] * (currentBet / SPIN_COST);
      }
    }
    return prize;
  };

  const handleSpin = () => {
    if (coins < currentBet || isSpinning) return;

    playSpinSound();
    setIsSpinning(true);
    setCoins(prev => prev - currentBet);
    setMessage('');

    // Animasi putaran dummy
    const spinInterval = setInterval(() => {
      setReels(spinReels());
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      const finalReels = spinReels();
      setReels(finalReels);

      const prize = calculateWinnings(finalReels);

      if (prize > 0) {
        setCoins(prev => prev + prize);
        setMessage(`Anda memenangkan ${prize.toFixed(0)} koin!`);
        playWinSound();
      } else {
        setMessage('Coba lagi!');
      }
      setIsSpinning(false);
    }, 1000); // Durasi putaran
  };

  const handleBetMax = () => {
    if (isSpinning) return;
    setCurrentBet(MAX_BET);
    console.log(`Taruhan diatur ke maksimum: ${MAX_BET}`);
  }

  const handleCollect = () => {
    if (isSpinning) return;
    // Logika ini masih berupa placeholder, tetapi memberikan umpan balik
    setMessage(`Anda telah mengumpulkan total ${coins} koin. Sampai jumpa!`);
    // Bisa juga menonaktifkan permainan atau mereset saldo di sini
  }

  return (
    <div id="game-container">
      <header className="game-header">
        <h1>U2 Gacha Slot</h1>
        <div className="balance-display">
          <span>Koin:</span>
          <span className="balance-amount">{coins}</span>
        </div>
      </header>

      <main className="slot-area">
        <div className="slot-frame">
          {reels.map((symbol, index) => (
            <div key={index} className="reel">
              <span className="reel-symbol">{symbol}</span>
            </div>
          ))}
        </div>
        <div className="message-display">{message}</div>
      </main>

      <footer className="game-controls">
        <button className="control-button" onClick={handleBetMax} disabled={isSpinning}>
          BET MAX
        </button>
        <button className="control-button spin" onClick={handleSpin} disabled={isSpinning}>
          {isSpinning ? 'BERPUTAR...' : `SPIN (${currentBet})`}
        </button>
        <button className="control-button" onClick={handleCollect} disabled={isSpinning}>
          COLLECT
        </button>
      </footer>
    </div>
  );
}

export default App;
