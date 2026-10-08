"use client";

import { motion } from "framer-motion";
import { Gift, MousePointerClick, UserRoundPlus } from "lucide-react";

const steps = [
  { icon:UserRoundPlus, title:"Sign Up", text:"Create your free account in seconds." },
  { icon:MousePointerClick, title:"Spin the Wheel", text:"Try your luck and unlock festive offers." },
  { icon:Gift, title:"Claim Your Offer", text:"Apply your offer and start shopping." },
];

export default function HowItWorks() {
  return <section className="how-section" id="how-it-works"><div className="section-heading ornamental"><span/><div><p>Three simple steps</p><h2>How It <em>Works</em></h2><small>Get your festive offers in 3 simple steps</small></div><span/></div><div className="steps">{steps.map((step,i)=>{const Icon=step.icon;return <motion.div className="step" key={step.title} initial={{opacity:0,x:i===0?-30:i===2?30:0,y:i===1?25:0}} whileInView={{opacity:1,x:0,y:0}} viewport={{once:true,amount:.4}} transition={{delay:i*.12}}><div className="step-icon"><Icon/><b>{i+1}</b></div><div><h3>{step.title}</h3><p>{step.text}</p></div>{i<steps.length-1 && <span className="step-connector">›</span>}</motion.div>})}</div></section>;
}
