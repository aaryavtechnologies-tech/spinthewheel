"use client";

import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { prizes, type Prize } from "@/data/prizes";
import { selectWeightedPrize } from "@/lib/weightedRandom";
import { calculateTargetRotation, SEGMENT_ANGLE } from "@/lib/wheelMath";
import { soundManager } from "@/lib/soundManager";
import SoundToggle from "./SoundToggle";
import WinnerModal from "./WinnerModal";

const DEMO_MODE = true;
const COOLDOWN_MS = 24 * 60 * 60 * 1000;

export default function SpinWheel() {
  const rotation = useMotionValue(0); const currentRotation = useRef(0); const lastTick = useRef(-1);
  const [spinning,setSpinning] = useState(false); const [winner,setWinner] = useState<Prize|null>(null); const [cooldown,setCooldown] = useState(0); const reduceMotion = useReducedMotion();
  const gradient = useMemo(() => `conic-gradient(from -22.5deg, ${prizes.map((p,i) => `${p.color} ${i*SEGMENT_ANGLE}deg ${(i+1)*SEGMENT_ANGLE}deg`).join(",")})`, []);
  useEffect(() => {
    if (DEMO_MODE) return; const update = () => { const last = Number(localStorage.getItem("lastSpinTimestamp") || 0); setCooldown(Math.max(0, last + COOLDOWN_MS - Date.now())); }; update(); const timer = setInterval(update,1000); return () => clearInterval(timer);
  }, []);
  const cooldownText = `${Math.floor(cooldown/3600000)}h ${Math.floor(cooldown/60000)%60}m ${Math.floor(cooldown/1000)%60}s`;
  const spin = () => {
    if (spinning) return; if (!DEMO_MODE && cooldown > 0) return;
    soundManager.unlock(); soundManager.play("start"); setSpinning(true); setWinner(null);
    const selected = selectWeightedPrize(prizes); const selectedIndex = prizes.findIndex(p => p.id === selected.id); const fullRotations = 5 + Math.floor(Math.random()*4); const target = calculateTargetRotation(currentRotation.current, selectedIndex, fullRotations); const duration = reduceMotion ? 2.2 : 5.8;
    animate(rotation, target, { duration, ease:[.12,.8,.18,1], onUpdate(value) { const segment = Math.floor((value+22.5)/45); if (segment !== lastTick.current) { lastTick.current = segment; soundManager.play("tick"); } }, onComplete() {
      currentRotation.current = target; setSpinning(false); setWinner(selected); localStorage.setItem("lastSpinTimestamp",String(Date.now())); localStorage.setItem("lastPrize",selected.id); soundManager.play("win"); setTimeout(() => soundManager.play("chime"),260);
    }});
  };
  return <div className="wheel-stage" id="spin-wheel">
    <div className="wheel-orbit" aria-label="Prize wheel with eight offers">
      <div className="pointer" aria-hidden="true"><span /></div>
      <div className="bulb-ring" aria-hidden="true">{Array.from({length:24},(_,i)=><i key={i} style={{transform:`rotate(${i*15}deg) translateY(-50%)`}} />)}</div>
      <motion.div className="wheel" style={{ rotate: rotation, background: gradient }}>
        {prizes.map((prize,i) => { const Icon = prize.icon; const angle=i*45; const radians=angle*Math.PI/180; const left=50+31*Math.sin(radians); const top=50-31*Math.cos(radians); return <div className={`wheel-label label-${i}`} key={prize.id} style={{left:`${left}%`,top:`${top}%`}}><span><Icon /><b>{prize.shortLabel.split("\n").map((line,j)=><em key={j}>{line}</em>)}</b></span></div>; })}
      </motion.div>
      <button id="wheel-spin" className="spin-center" onClick={spin} disabled={spinning || (!DEMO_MODE && cooldown>0)} aria-label="Spin the prize wheel"><Sparkles />{spinning ? "SPINNING" : "SPIN"}</button>
    </div>
    <div className="wheel-meta"><SoundToggle /><span>{spinning ? "Your festive reward is on its way…" : "Tap the center and try your luck"}</span></div>
    {!DEMO_MODE && cooldown>0 && <p className="cooldown">You&apos;ve already used today&apos;s spin. Come back in <strong>{cooldownText}</strong></p>}
    <WinnerModal prize={winner} onClose={() => setWinner(null)} />
  </div>;
}
