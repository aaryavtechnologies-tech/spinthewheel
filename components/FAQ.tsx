"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Sparkles } from "lucide-react";
import { useState } from "react";

const items = [
  ["How does the Spin the Wheel offer work?","Tap the SPIN button and the wheel will select one of eight rewards using weighted random odds. Your result is tied directly to where the wheel stops."],
  ["Can I spin more than once?","This demo allows unlimited spins. For a live campaign, the included configuration can limit each browser to one spin every 24 hours."],
  ["How do I claim my prize?","Copy the coupon code from the winner card and apply it during checkout on eligible FestivalKart products."],
  ["Can I combine this offer with another coupon?","Only one promotional code can be used per order unless an individual offer says otherwise."],
  ["How long is my coupon valid?","Navratri wheel coupons are valid for seven days from the date they are won, or until the campaign ends."],
  ["Is there any purchase required to spin?","No purchase is required to spin the wheel or reveal a reward."],
];

export default function FAQ() {
  const [open,setOpen]=useState(0); return <section className="faq-section" id="faq"><div className="section-heading"><p><Sparkles/> Good to know</p><h2>Your questions, answered</h2></div><div className="faq-list">{items.map(([question,answer],i)=><div className={`faq-item ${open===i?"open":""}`} key={question}><button onClick={()=>setOpen(open===i?-1:i)} aria-expanded={open===i}><span>{question}</span>{open===i?<Minus/>:<Plus/>}</button><AnimatePresence initial={false}>{open===i&&<motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}><p>{answer}</p></motion.div>}</AnimatePresence></div>)}</div></section>;
}
