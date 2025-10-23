// api/spin.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomInt } from 'crypto';
import { db, admin } from './firebaseAdmin';

// Game configuration remains the same
const rewards: { [key: string]: number } = {
  '🍒': 10, '🍋': 20, '🍊': 30, '🍇': 50, '💎': 100, '7️⃣': 250,
};
const symbols = Object.keys(rewards);
const SPIN_COST = 10;

const spinReels = (): string[] => [
  symbols[randomInt(symbols.length)],
  symbols[randomInt(symbols.length)],
  symbols[randomInt(symbols.length)],
];

const calculateWinnings = (spunReels: string[], bet: number): number => {
  const counts: { [key: string]: number } = {};
  spunReels.forEach(s => counts[s] = (counts[s] || 0) + 1);
  let prize = 0;
  for (const symbol in counts) {
    if (counts[symbol] >= 2) {
      prize += rewards[symbol] * counts[symbol] * (bet / SPIN_COST);
    }
  }
  return parseFloat(prize.toFixed(2));
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  // --- Authentication ---
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token.' });
  }

  const idToken = authorization.split('Bearer ')[1];
  let decodedToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(idToken);
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
  }

  const userId = decodedToken.uid;
  // --- End Authentication ---

  const { bet } = req.body;

  if (typeof bet !== 'number' || bet <= 0) {
    return res.status(400).json({ error: 'Invalid bet amount.' });
  }

  const userRef = db.collection('users').doc(userId);

  try {
    const result = await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists) {
        throw new Error('User not found.');
      }

      const userData = userDoc.data();
      const currentCoins = userData?.coins || 0;

      if (currentCoins < bet) {
        throw new Error('Insufficient coins.');
      }

      const finalReels = spinReels();
      const prize = calculateWinnings(finalReels, bet);
      const newCoinTotal = currentCoins - bet + prize;

      transaction.update(userRef, { coins: newCoinTotal });

      return { reels: finalReels, prize, newCoinTotal };
    });

    res.status(200).json(result);

  } catch (error: any) {
    console.error('Transaction failure:', error);
    res.status(400).json({ error: error.message });
  }
}
