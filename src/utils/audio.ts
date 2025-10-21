// src/utils/audio.ts

// Buat satu AudioContext untuk seluruh aplikasi
const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

export const playSpinSound = () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // Membuat suara 'whoosh' dengan noise
  const noise = audioCtx.createBufferSource();
  const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.5, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  noise.buffer = buffer;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

  noise.connect(gain);
  gain.connect(audioCtx.destination);
  noise.start();
  noise.stop(audioCtx.currentTime + 0.5);
};

export const playWinSound = () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // Membuat suara 'chime' sederhana
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  oscillator.type = 'sine'; // Gelombang sinus untuk nada yang bersih
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // Nada A4
  oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.2);

  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

  oscillator.connect(gain);
  gain.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.4);
};
