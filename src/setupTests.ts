import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Web Audio API
global.AudioContext = vi.fn(() => ({
  createBufferSource: vi.fn(() => ({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    buffer: null,
  })),
  createBuffer: vi.fn(() => ({
    getChannelData: vi.fn(() => new Float32Array([])),
  })),
  createGain: vi.fn(() => ({
    connect: vi.fn(),
    gain: {
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
  })),
  createOscillator: vi.fn(() => ({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    type: 'sine',
    frequency: {
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
  })),
  destination: {},
  currentTime: 0,
  sampleRate: 44100,
  resume: vi.fn(),
  state: 'running',
}));
