import { useState, useEffect } from 'react';
import { playSpinSound, playWinSound } from './utils/audio';
import { auth, db } from './lib/firebase'; // Assuming you have a firebase config file
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import './App.css';

// Game configuration (Display only)
const symbols = ['🍒', '🍋', '🍊', '🍇', '💎', '7️⃣'];
const SPIN_COST = 10;
const MAX_BET = 50;

function App() {
  const [reels, setReels] = useState<string[]>(['🍒', '🍋', '🍊']);
  const [coins, setCoins] = useState(0); // Coins will be loaded from Firestore
  const [message, setMessage] = useState('Welcome to Fruit Frenzy Slots!');
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentBet, setCurrentBet] = useState(SPIN_COST);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen for changes to the user's coin balance in Firestore
  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setCoins(doc.data().coins);
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleSpin = async () => {
    if (coins < currentBet || isSpinning || !user) return;

    playSpinSound();
    setIsSpinning(true);
    setMessage('');

    const spinInterval = setInterval(() => {
      const newReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];
      setReels(newReels);
    }, 100);

    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/spin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ bet: currentBet }),
      });

      clearInterval(spinInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error');
      }

      const data = await response.json();
      setReels(data.reels);

      if (data.prize > 0) {
        setMessage(`You won ${data.prize.toFixed(0)} coins!`);
        playWinSound();
      } else {
        setMessage('Try again!');
      }
      // Coin balance will be updated automatically by the Firestore listener
    } catch (error: any) {
      clearInterval(spinInterval);
      setMessage(`Error: ${error.message}`);
      console.error('Spin error:', error);
    } finally {
      setIsSpinning(false);
    }
  };

  const handleBetMax = () => {
    if (isSpinning) return;
    setCurrentBet(MAX_BET);
  };

  const handleCollect = () => {
    if (isSpinning) return;
    setMessage(`You have collected a total of ${coins} coins. See you next time!`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to play.</div>; // Replace with a proper login component
  }

  return (
    <div id="game-container">
      <header className="game-header">
        <h1>Fruit Frenzy Slots</h1>
        <div className="balance-display">
          <span>Coins:</span>
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
        <button className="control-button" onClick={handleBetMax} disabled={isSpinning || coins < MAX_BET}>
          BET MAX
        </button>
        <button className="control-button spin" onClick={handleSpin} disabled={isSpinning || coins < currentBet}>
          {isSpinning ? 'SPINNING...' : `SPIN (${currentBet})`}
        </button>
        <button className="control-button" onClick={handleCollect} disabled={isSpinning}>
          COLLECT
        </button>
      </footer>
    </div>
  );
}

export default App;
