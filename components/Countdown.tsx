"use client";

import { useEffect, useState } from "react";

const EVENT_END = new Date("2026-10-20T23:59:59+05:30").getTime();
const getRemaining = () => {
  const diff = Math.max(0, EVENT_END - Date.now());
  return { days: Math.floor(diff/86400000), hours: Math.floor(diff/3600000)%24, minutes: Math.floor(diff/60000)%60, seconds: Math.floor(diff/1000)%60 };
};

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => { setTime(getRemaining()); const timer = setInterval(() => setTime(getRemaining()), 1000); return () => clearInterval(timer); }, []);
  return <div className="countdown-card" aria-label="Limited time offer countdown"><p>Limited time Navratri offer</p><div className="countdown-grid">{Object.entries(time).map(([label,value]) => <div key={label}><strong>{String(value).padStart(2,"0")}</strong><span>{label}</span></div>)}</div></div>;
}
