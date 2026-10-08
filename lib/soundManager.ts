type SoundName = "hover" | "start" | "tick" | "win" | "chime";
class SoundManager {
  private context: AudioContext | null = null;
  private muted = false;
  setMuted(value: boolean) { this.muted = value; }
  unlock() { if (typeof window === "undefined") return; this.context ??= new AudioContext(); if (this.context.state === "suspended") void this.context.resume(); }
  play(name: SoundName) {
    if (this.muted || typeof window === "undefined") return;
    this.unlock(); if (!this.context) return;
    const patterns: Record<SoundName, Array<[number, number, number]>> = { hover: [[520,0,.035]], tick: [[850,0,.025]], start: [[220,0,.08],[340,.08,.1],[520,.18,.12]], chime: [[660,0,.12],[880,.11,.18]], win: [[523,0,.16],[659,.13,.16],[784,.26,.28]] };
    patterns[name].forEach(([f,d,t]) => this.tone(f,d,t));
  }
  private tone(frequency: number, delay: number, duration: number) {
    if (!this.context) return; const now = this.context.currentTime + delay; const osc = this.context.createOscillator(); const gain = this.context.createGain();
    osc.type = "sine"; osc.frequency.setValueAtTime(frequency, now); gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(.065, now+.008); gain.gain.exponentialRampToValueAtTime(.0001, now+duration); osc.connect(gain).connect(this.context.destination); osc.start(now); osc.stop(now+duration+.02);
  }
}
export const soundManager = new SoundManager();
