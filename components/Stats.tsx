"use client";

import { BadgeCheck, Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import Testimonials from "./Testimonials";

const stats = [[ShoppingBag,"5L+","Happy Customers"],[Star,"4.8/5","Average Rating"],[BadgeCheck,"100%","Secure & Safe"],[Heart,"50+","Top Brands"]] as const;

export default function Stats() {
  return <section className="trust-section" id="prizes"><div className="trust-inner"><div className="trust-title"><p>Trusted by Thousands</p><h2>This Navratri</h2><span>Real people. Real savings. Real happiness.</span></div><div className="stats-grid">{stats.map(([Icon,value,label],i)=><motion.div key={label} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}><Icon/><p><strong>{value}</strong><span>{label}</span></p></motion.div>)}</div><Testimonials/></div></section>;
}
