/**
 * Romantic Quiet Luxury Ambient Music Engine (Web Audio API)
 * Generates soft modern classical piano notes and warm string swells in an infinite,
 * tranquil progression (reminiscent of Ludovico Einaudi & Max Richter).
 */

class AmbientMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.65;
  private step: number = 0;

  // Romantic modern classical chord progression in F Major / D Minor
  // Fmaj9 -> Am7 -> Bbmaj7 -> C(add9) -> Dm9 -> Gm9 -> Csus4 -> C
  private chords = [
    // Fmaj9: F3, A3, C4, E4, G4
    { bass: 174.61, mids: [220.00, 261.63, 329.63, 392.00] },
    // Am7: A2, E3, A3, C4, G4
    { bass: 110.00, mids: [164.81, 220.00, 261.63, 392.00] },
    // Bbmaj7: Bb2, F3, A3, D4, F4
    { bass: 116.54, mids: [174.61, 220.00, 293.66, 349.23] },
    // C(add9): C3, G3, D4, E4, G4
    { bass: 130.81, mids: [196.00, 293.66, 329.63, 392.00] },
    // Dm9: D3, A3, C4, E4, F4
    { bass: 146.83, mids: [220.00, 261.63, 329.63, 349.23] },
    // Gm9: G2, D3, Bb3, F4, A4
    { bass: 98.00, mids: [146.83, 233.08, 349.23, 440.00] },
    // F/A: A2, F3, C4, F4, A4
    { bass: 110.00, mids: [174.61, 261.63, 349.23, 440.00] },
    // Csus4 -> C: C3, G3, C4, E4
    { bass: 130.81, mids: [196.00, 261.63, 329.63, 523.25] },
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public async start(): Promise<boolean> {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) return true;
    this.isPlaying = true;

    // Fade in master gain smoothly
    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(this.volume, this.ctx.currentTime + 2.5);
    }

    this.playNextBar();
    return true;
  }

  public stop() {
    if (!this.isPlaying) return;
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
      setTimeout(() => {
        if (this.timerId) {
          clearTimeout(this.timerId);
          this.timerId = null;
        }
        this.isPlaying = false;
      }, 1850);
    } else {
      this.isPlaying = false;
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.ctx && this.masterGain && this.isPlaying) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.2);
    }
  }

  private playNextBar = () => {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const currentChord = this.chords[this.step % this.chords.length];
    this.step++;

    const now = this.ctx.currentTime;

    // 1. Warm String Pad Swell (Soft sine + filtered triangle)
    this.playWarmString(currentChord.bass, now, 5.5, 0.18);
    this.playWarmString(currentChord.mids[0], now + 0.1, 5.2, 0.12);
    this.playWarmString(currentChord.mids[1], now + 0.2, 5.0, 0.10);

    // 2. Delicate Acoustic Piano Arpeggio Notes
    // Note 1 (Bass resonance)
    this.playPianoNote(currentChord.bass * 2, now + 0.05, 0.28);
    // Note 2
    this.playPianoNote(currentChord.mids[0], now + 0.6, 0.22);
    // Note 3
    this.playPianoNote(currentChord.mids[1], now + 1.2, 0.20);
    // Note 4
    this.playPianoNote(currentChord.mids[2], now + 1.9, 0.22);
    // Note 5
    if (currentChord.mids[3]) {
      this.playPianoNote(currentChord.mids[3], now + 2.7, 0.18);
    }
    // High gentle sparkle note
    this.playPianoNote(currentChord.mids[1] * 2, now + 3.4, 0.14);

    // Schedule next chord bar in ~4.2 seconds
    this.timerId = window.setTimeout(this.playNextBar, 4200);
  };

  private playPianoNote(freq: number, startTime: number, velocity: number) {
    if (!this.ctx || !this.masterGain) return;

    // Fundamental oscillator (sine with warm body)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, startTime);

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    // Lowpass filter to mimic warm felt piano hammer
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, startTime);
    filter.frequency.exponentialRampToValueAtTime(250, startTime + 2.8);

    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, startTime);
    // Fast attack (percussive piano felt strike)
    noteGain.gain.linearRampToValueAtTime(velocity * 0.45, startTime + 0.025);
    // Natural exponential piano decay
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 3.2);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + 3.3);
    osc2.stop(startTime + 3.3);
  }

  private playWarmString(freq: number, startTime: number, duration: number, volume: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Subtle detune for lush orchestral feel
    const oscDetune = this.ctx.createOscillator();
    oscDetune.type = 'triangle';
    oscDetune.frequency.setValueAtTime(freq * 1.002, startTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, startTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, startTime);
    // Slow gentle swell (bowing)
    gain.gain.linearRampToValueAtTime(volume * 0.35, startTime + 1.8);
    // Smooth release
    gain.gain.linearRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    oscDetune.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    oscDetune.start(startTime);
    osc.stop(startTime + duration + 0.1);
    oscDetune.stop(startTime + duration + 0.1);
  }
}

export const ambientMusicEngine = new AmbientMusicEngine();
