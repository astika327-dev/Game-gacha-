
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import App from './App';
import { User } from 'firebase/auth';

// --- Mocks ---
vi.mock('./utils/audio', () => ({
  playSpinSound: vi.fn(),
  playWinSound: vi.fn(),
}));

vi.mock('./lib/firebase', () => ({
  auth: {
    onAuthStateChanged: vi.fn(),
  },
  db: 'mock-db-instance',
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  onSnapshot: vi.fn(),
}));

global.fetch = vi.fn();
// --- End Mocks ---

import { auth } from './lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const mockFetch = (data: any, ok = true) => {
    (fetch as Mock).mockResolvedValue({
      ok,
      json: () => Promise.resolve(data),
    });
};

const mockUser = {
    uid: 'test-user-id',
    getIdToken: () => Promise.resolve('test-token'),
} as unknown as User;

describe('App - Fruit Frenzy Slots', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockFetch({ reels: ['🍒', '🍋', '🍊'], prize: 0 });

      // Correctly mock the onAuthStateChanged signature
      (auth.onAuthStateChanged as Mock).mockImplementation((callback) => {
        callback(mockUser);
        return () => {}; // Return a mock unsubscribe function
      });

      (doc as Mock).mockReturnValue('mock-doc-ref');
      (onSnapshot as Mock).mockImplementation((_docRef, callback) => {
          callback({ exists: () => true, data: () => ({ coins: 500 }) });
          return () => {}; // Return a mock unsubscribe function
      });
    });

    it('Displays title and coin balance after loading', async () => {
        render(<App />);
        await waitFor(() => {
          expect(screen.getByRole('heading', { name: /Fruit Frenzy Slots/i, level: 1 })).toBeInTheDocument();
          expect(screen.getByText('500')).toBeInTheDocument();
        });
        expect(doc).toHaveBeenCalledWith('mock-db-instance', 'users', 'test-user-id');
        expect(onSnapshot).toHaveBeenCalledWith('mock-doc-ref', expect.any(Function));
    });

    it('Displays loading state initially', () => {
        (auth.onAuthStateChanged as Mock).mockImplementation(() => {
          return () => {};
        });
        render(<App />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('Prompts user to sign in if not authenticated', async () => {
        (auth.onAuthStateChanged as Mock).mockImplementation((callback) => {
          callback(null);
          return () => {};
        });
        render(<App />);
        await waitFor(() => {
          expect(screen.getByText('Please sign in to play.')).toBeInTheDocument();
        });
    });

    it('Disables all buttons during a spin', async () => {
        render(<App />);
        await screen.findByText('500');

        const spinButton = screen.getByRole('button', { name: /SPIN/i });
        const betMaxButton = screen.getByRole('button', { name: /BET MAX/i });
        const collectButton = screen.getByRole('button', { name: /COLLECT/i });

        act(() => { fireEvent.click(spinButton); });

        await waitFor(() => {
          expect(spinButton).toBeDisabled();
          expect(betMaxButton).toBeDisabled();
          expect(collectButton).toBeDisabled();
          expect(screen.getByText('SPINNING...')).toBeInTheDocument();
        });
    });

    it('Calls the spin API with the auth token', async () => {
        render(<App />);
        await screen.findByText('500');

        const spinButton = screen.getByRole('button', { name: /SPIN/i });

        await act(async () => { fireEvent.click(spinButton); });

        expect(fetch).toHaveBeenCalledWith('/api/spin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer test-token' },
          body: JSON.stringify({ bet: 10 }),
        });
    });
});
