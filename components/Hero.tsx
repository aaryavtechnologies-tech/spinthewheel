"use client";

import { motion } from "framer-motion";
import { BadgePercent, Coins, Gift, Sparkles, Trophy } from "lucide-react";
import Countdown from "./Countdown";
import SpinWheel from "./SpinWheel";

const benefits = [[BadgePercent,"Exciting Discounts"],[Coins,"Assured Cashback"],[Gift,"Free Goodies"],[Trophy,"Jackpot Prizes"]] as const;
const triggerSpin = () => document.getElementById("wheel-spin")?.click();

export default function Hero() {
  return <section className="hero" id="home"><div className="hero-art" /><div className="hero-veil" /><div className="spark-field" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i} style={{"--i":i} as React.CSSProperties}/>)}</div>
    <div className="hero-content">
      <motion.div className="hero-copy" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
        <p className="hero-kicker"><span/> Festival of devotion <b>•</b> Festival of offers <span/></p>
        <h1>Celebrate <span className="gold-text">Navratri</span><br/>with <span className="pink-text">Exciting Offers</span></h1>
        <p className="hero-subtitle">Spin the wheel and unlock amazing discounts, cashback, freebies and festive deals this Navratri!</p>
        <div className="benefits">{benefits.map(([Icon,label])=><div key={label}><span><Icon /></span><p>{label}</p></div>)}</div>
        <div className="hero-actions"><button className="main-cta" onClick={triggerSpin}><Sparkles/> Spin now</button><Countdown/></div>
      </motion.div>
      <motion.div className="hero-wheel" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{duration:.8,delay:.15}}><SpinWheel/></motion.div>
    </div>
  </section>;
}
