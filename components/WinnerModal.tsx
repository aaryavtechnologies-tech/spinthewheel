"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Gift, RotateCcw, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import type { Prize } from "@/data/prizes";
import { getCouponCode } from "@/lib/couponUtils";

export default function WinnerModal({ prize, onClose }: { prize: Prize | null; onClose: () => void }) {
  const [copied, setCopied] = useState(false); const code = prize ? getCouponCode(prize) : "";
  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(code);
      else throw new Error("Clipboard API unavailable");
    } catch {
      const input = document.createElement("textarea"); input.value = code; input.style.position = "fixed"; input.style.opacity = "0"; document.body.appendChild(input); input.select(); document.execCommand("copy"); input.remove();
    }
    setCopied(true); setTimeout(() => setCopied(false), 2200);
  };
  const claim = () => { onClose(); document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" }); };
  return <AnimatePresence>{prize && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="winner-title">
    <div className="confetti" aria-hidden="true">{Array.from({length: 28},(_,i) => <i key={i} style={{"--i":i} as React.CSSProperties} />)}</div>
    <motion.div className="winner-modal" initial={{ opacity:0, scale:.72, y:40 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:.85 }} transition={{ type:"spring", damping:18, stiffness:230 }}>
      <button className="modal-close" onClick={onClose} aria-label="Close winner modal"><X /></button>
      <div className="winner-icon"><Gift /></div><p className="eyebrow">🎉 Congratulations!</p><h2 id="winner-title">You won</h2><strong className="prize-won">{prize.label}</strong><p>Your Navratri reward is ready to brighten the celebrations.</p>
      <div className="coupon"><span>Coupon code</span><strong>{code}</strong><button onClick={copy} aria-label="Copy coupon code">{copied ? <Check /> : <Copy />}</button></div>
      {copied && <motion.div className="toast" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>Coupon copied successfully!</motion.div>}
      <div className="modal-actions"><button onClick={copy}><Copy size={18}/> Copy code</button><button className="primary" onClick={claim}><ShoppingBag size={18}/> Claim offer</button></div>
      <button className="spin-again" onClick={onClose}><RotateCcw size={17}/> Spin again</button>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}
