/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-[#0B0B0B] overflow-hidden"
    >
      {/* Absolute background image with high-end luxury dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
          alt="KKR Luxury Interior Design Background"
          className="w-full h-full object-cover object-center opacity-50 scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Luxury radial gold glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/75 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_#0B0B0B_100%)]"></div>
        
        {/* Subtle decorative gold light flare */}
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none"></div>

        {/* Highly elegant golden architectural blueprint grid lines to fill empty top space */}
        <div className="absolute inset-x-0 top-0 h-[50%] opacity-25 pointer-events-none z-10">
          <svg width="100%" height="100%" className="text-[#D4AF37]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="45" height="45" patternUnits="userSpaceOnUse">
                <path d="M 45 0 L 0 0 0 45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.12" />
                <circle cx="45" cy="0" r="1" fill="currentColor" fillOpacity="0.3" />
              </pattern>
              <radialGradient id="gold-top-fade" cx="50%" cy="0%" r="60%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#0B0B0B" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Ambient golden top gradient flare */}
            <rect width="100%" height="100%" fill="url(#gold-top-fade)" />
            {/* Grid pattern overlay */}
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Elegant curves representing architectural arcs & elevations */}
            <path d="M -100,60 Q 300,200 700,80 T 1500,140 T 2300,60" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3,3" strokeOpacity="0.25" />
            <path d="M 120,0 L 120,240 M 380,0 L 380,160 M 800,0 L 800,280 M 1200,0 L 1200,190 M 1600,0 L 1600,240" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
            <circle cx="120" cy="240" r="3.5" fill="currentColor" fillOpacity="0.4" />
            <circle cx="800" cy="280" r="3.5" fill="currentColor" fillOpacity="0.4" />
            <circle cx="1200" cy="190" r="3.5" fill="currentColor" fillOpacity="0.4" />
            {/* Concentric dimensioning circles */}
            <circle cx="50%" cy="0" r="200" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4,4" strokeOpacity="0.2" />
            <circle cx="50%" cy="0" r="400" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />
          </svg>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12">
        {/* Premium Interior Design Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          className="flex items-center justify-center text-[#D4AF37] uppercase tracking-[0.2em] text-[11px] sm:text-xs font-serif mb-6 font-semibold text-center"
          id="hero-premium-banner"
        >
          <span>Premium Interior Design &middot; Bengaluru</span>
        </motion.div>

        {/* Main Luxurious Headline matching the screenshot exactly */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: 'easeOut' }}
          className="text-5xl sm:text-7xl md:text-8xl font-serif font-medium text-white tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto"
          id="hero-main-title"
        >
          We Design <span className="text-[#D4AF37] italic font-serif">Spaces</span><br />
          That Tell <span className="text-[#D4AF37] italic font-serif">Your</span><br />
          <span className="text-[#D4AF37] italic font-serif">Story.</span>
        </motion.h1>

        {/* Precise description paragraph from the screenshot */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed mb-12"
          id="hero-description"
        >
          KKR Interiors crafts thoughtful, premium interiors for homes and workspaces in Bengaluru &mdash; where every detail is intentional, every space is personal.
        </motion.p>

        {/* Hero Actions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          id="hero-cta-buttons"
        >
          {/* Main Book Consultation Button */}
          <button
            onClick={() => handleScrollTo('contact')}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B38F1F] text-black text-sm font-extrabold uppercase tracking-widest rounded-sm hover:from-white hover:to-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/10 cursor-pointer"
          >
            Book Free Consultation
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Secondary Explore Services Button */}
          <button
            onClick={() => handleScrollTo('services')}
            className="w-full sm:w-auto px-8 py-4 border border-gray-600 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] text-sm font-extrabold uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-black/30 backdrop-blur-sm"
          >
            Explore Services
          </button>
        </motion.div>
      </div>

      {/* Floating Animated Scroll Down Indicator aligned to screenshot styling */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1">
        <span className="text-[9px] font-serif tracking-[0.25em] uppercase text-gray-400">Designing Your Dreams</span>
        <span className="text-[9px] font-serif tracking-[0.15em] uppercase text-gray-500">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-[#D4AF37] mt-1 cursor-pointer"
          onClick={() => handleScrollTo('services')}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
}
