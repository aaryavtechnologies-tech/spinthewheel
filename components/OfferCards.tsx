"use client";

import { motion } from "framer-motion";
import { Gift, Percent, ShoppingBag, BadgeIndianRupee, Sparkles } from "lucide-react";

const offers = [
  { title:"10% OFF", text:"On all products", icon:Gift, tone:"rose" },
  { title:"Flat ₹500 OFF", text:"On orders above ₹2499", icon:BadgeIndianRupee, tone:"amber" },
  { title:"Buy 1 Get 1", text:"On selected categories", icon:ShoppingBag, tone:"violet" },
  { title:"Free Gift", text:"On every eligible spin", icon:Percent, tone:"mint" },
];
const spin = () => { document.getElementById("spin-wheel")?.scrollIntoView({behavior:"smooth",block:"center"}); setTimeout(() => document.getElementById("wheel-spin")?.focus(),650); };

export default function OfferCards() {
  return <section className="offers-section" id="offers"><div className="section-heading"><p><Sparkles/> Festive favourites</p><h2>More joy in every spin</h2></div><div className="offer-grid">{offers.map((offer,i)=>{const Icon=offer.icon;return <motion.article className={`offer-card ${offer.tone}`} key={offer.title} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.35}} transition={{delay:i*.08}} whileHover={{y:-7}}><div className="offer-illustration"><Icon/></div><div><h3>{offer.title}</h3><p>{offer.text}</p><button onClick={spin}>Spin &amp; get <span>›</span></button></div></motion.article>})}</div></section>;
}
