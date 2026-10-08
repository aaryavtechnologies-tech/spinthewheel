"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundManager } from "@/lib/soundManager";

export default function SoundToggle() {
  const [muted, setMuted] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("festivalKartMuted") === "true";
    setMuted(saved); soundManager.setMuted(saved);
  }, []);
  const toggle = () => {
    const next = !muted; setMuted(next); localStorage.setItem("festivalKartMuted", String(next)); soundManager.setMuted(next);
    if (!next) { soundManager.unlock(); soundManager.play("chime"); }
  };
  return <button className="sound-toggle" onClick={toggle} aria-label={muted ? "Turn sound on" : "Mute sounds"}>{muted ? <VolumeX /> : <Volume2 />}</button>;
}
