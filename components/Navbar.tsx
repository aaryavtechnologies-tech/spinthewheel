"use client";

import { useEffect, useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";

const links = [["Home","home"],["Offers","offers"],["How It Works","how-it-works"],["Prizes","spin-wheel"],["FAQ","faq"]];
const triggerSpin = () => document.getElementById("wheel-spin")?.click();

export default function Navbar() {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
    <a className="brand" href="#home" aria-label="FestivalKart home"><span className="brand-mark"><Sparkles /></span><span><strong>Festival<span>Kart</span></strong><small>Celebrate more together</small></span></a>
    <nav className={open ? "nav-links open" : "nav-links"} aria-label="Primary navigation">
      {links.map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      <button className="nav-spin mobile-only" onClick={() => { triggerSpin(); setOpen(false); }}>Spin now</button>
    </nav>
    <button className="nav-spin desktop-only" onClick={triggerSpin}><Sparkles size={18} /> Spin now</button>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
  </header>;
}
