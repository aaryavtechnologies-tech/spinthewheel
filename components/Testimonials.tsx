"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

const quotes = [
  { text:"Amazing offers! I got a 50% discount on my festive shopping. Loved the experience!", name:"Priya Sharma", initials:"PS" },
  { text:"The wheel felt so much fun, and my free-gift coupon worked instantly at checkout.", name:"Meera Patel", initials:"MP" },
  { text:"A lovely festive surprise — I won cashback and found everything I needed for Garba night.", name:"Aarav Shah", initials:"AS" },
];

export default function Testimonials() {
  const [index,setIndex]=useState(0); useEffect(()=>{const timer=setInterval(()=>setIndex(i=>(i+1)%quotes.length),5000);return()=>clearInterval(timer)},[]); const quote=quotes[index];
  return <div className="testimonial"><button onClick={()=>setIndex((index-1+quotes.length)%quotes.length)} aria-label="Previous testimonial"><ChevronLeft/></button><AnimatePresence mode="wait"><motion.div key={index} initial={{opacity:0,x:18}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-18}}><div className="avatar">{quote.initials}</div><div><blockquote>“{quote.text}”</blockquote><div className="rating">{Array.from({length:5},(_,i)=><Star key={i} fill="currentColor"/>)}</div><p><strong>{quote.name}</strong><span>Verified customer</span></p></div></motion.div></AnimatePresence><button onClick={()=>setIndex((index+1)%quotes.length)} aria-label="Next testimonial"><ChevronRight/></button></div>;
}
