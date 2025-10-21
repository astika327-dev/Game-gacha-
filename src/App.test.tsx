import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mocking audio utility untuk menghindari error di lingkungan pengujian
vi.mock('./utils/audio', () => ({
  playSpinSound: vi.fn(),
  playWinSound: vi.fn(),
}));

describe('App - U2 Gacha Slot', () => {
  it('Menampilkan judul utama "U2 Gacha Slot"', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /U2 Gacha Slot/i, level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('Menampilkan saldo koin awal dan taruhan awal', () => {
    render(<App />);
    const balanceAmount = screen.getByText('500');
    expect(balanceAmount).toBeInTheDocument();

    // Tombol SPIN sekarang menyertakan taruhan
    const spinButton = screen.getByRole('button', { name: /SPIN \(10\)/i });
    expect(spinButton).toBeInTheDocument();
  });

  it('Mengurangi saldo sesuai taruhan saat SPIN ditekan', () => {
    render(<App />);
    const spinButton = screen.getByRole('button', { name: /SPIN \(10\)/i });

    fireEvent.click(spinButton);

    // Saldo baru harus 500 - 10 = 490
    const newBalanceAmount = screen.getByText('490');
    expect(newBalanceAmount).toBeInTheDocument();
  });

  it('Memperbarui jumlah taruhan saat BET MAX ditekan', () => {
    render(<App />);
    const betMaxButton = screen.getByRole('button', { name: /BET MAX/i });

    // Awalnya tombol spin bertuliskan (10)
    expect(screen.getByRole('button', { name: /SPIN \(10\)/i })).toBeInTheDocument();

    fireEvent.click(betMaxButton);

    // Setelah menekan BET MAX, taruhan menjadi 50
    const newSpinButton = screen.getByRole('button', { name: /SPIN \(50\)/i });
    expect(newSpinButton).toBeInTheDocument();

    // Pastikan saldo berkurang 50 saat diputar dengan taruhan baru
    fireEvent.click(newSpinButton);
    const newBalanceAmount = screen.getByText('450'); // 500 - 50
    expect(newBalanceAmount).toBeInTheDocument();
  });

  it('Menonaktifkan semua tombol saat berputar', async () => {
    vi.useFakeTimers();
    render(<App />);

    const spinButton = screen.getByRole('button', { name: /SPIN/i });
    const betMaxButton = screen.getByRole('button', { name: /BET MAX/i });
    const collectButton = screen.getByRole('button', { name: /COLLECT/i });

    fireEvent.click(spinButton);

    // Semua tombol harus dinonaktifkan
    expect(spinButton).toBeDisabled();
    expect(betMaxButton).toBeDisabled();
    expect(collectButton).toBeDisabled();
    expect(screen.getByText('BERPUTAR...')).toBeInTheDocument();

    // Selesaikan putaran
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    // Semua tombol harus diaktifkan kembali
    expect(spinButton).not.toBeDisabled();
    expect(betMaxButton).not.toBeDisabled();
    expect(collectButton).not.toBeDisabled();

    vi.useRealTimers();
  });
});
