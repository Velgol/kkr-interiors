/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, PencilRuler, ClipboardCheck, Hammer, Key } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Free Consultation',
      description: 'Discuss your vision, lifestyle needs, and investment budget during our initial design workshop.',
      icon: MessageSquare,
      accent: '₹0 Fee'
    },
    {
      number: '02',
      title: 'Design & Planning',
      description: 'We curate meticulous space layout alternatives, color palettes, textures, and gorgeous photo-realistic 3D drafts.',
      icon: PencilRuler,
      accent: '3D Walkthroughs'
    },
    {
      number: '03',
      title: 'Final Approval',
      description: 'You select the precise laminates, veneer blocks, and quartz grades, signing off on our absolute itemized pricing quote.',
      icon: ClipboardCheck,
      accent: 'Itemized Bill'
    },
    {
      number: '04',
      title: 'On-Site Execution',
      description: 'Our certified engineering craftsmen install modular setups and handle all civil modifications under rigorous inspection.',
      icon: Hammer,
      accent: '10-Yr Warranty'
    },
    {
      number: '05',
      title: 'Project Handover',
      description: 'Experience your dream home, completed and cleaned to perfection. Handed over right on time, exactly as promised.',
      icon: Key,
      accent: 'Timely Turnkey'
    }
  ];

  return (
    <section id="journey" className="py-24 bg-[#0B0B0B] border-t border-gray-900 relative">
      <div className="absolute top-[20%] left-0 w-[500px] h-[500px] bg-[#D4AF37]/2 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-20" id="journey-header-section">
          <span className="text-xs font-serif tracking-[0.25em] uppercase text-[#D4AF37] block mb-3">Our Work System</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-white tracking-tight">
            A Journey From Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#E6C77B] italic font-normal">Dream To Reality</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        {/* Desktop HORIZONTAL Timeline */}
        <div className="hidden lg:block relative py-12" id="journey-desktop-timeline">
          {/* Central Connecting horizontal line */}
          <div className="absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/40 to-[#D4AF37]/10 z-0"></div>

          <div className="grid grid-cols-5 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  className="flex flex-col items-center text-center relative z-10 group"
                  id={`journey-step-${step.number}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                >
                  {/* Circle Step Bubble */}
                  <div className="w-16 h-16 rounded-full bg-[#111111] border-2 border-[#D4AF37]/30 flex items-center justify-center text-white mb-6 group-hover:border-[#D4AF37] group-hover:shadow-lg group-hover:shadow-[#D4AF37]/20 transition-all duration-300 relative">
                    <Icon className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-mono">
                      {step.number}
                    </span>
                  </div>

                  {/* Text Details */}
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#D4AF37]/60 mb-1">
                    {step.accent}
                  </span>
                  <h3 className="text-base font-serif font-semibold text-white mb-3 group-hover:text-[#E6C77B] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed max-w-[180px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet VERTICAL Timeline */}
        <div className="block lg:hidden relative" id="journey-mobile-timeline">
          {/* Vertical central line */}
          <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-[#D4AF37]/20 z-0"></div>

          <div className="flex flex-col gap-12 pl-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  className="flex gap-6 relative z-10"
                  id={`journey-step-mobile-${step.number}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  {/* Connecting Circle Bubble */}
                  <div className="w-12 h-12 rounded-full bg-[#111111] border border-[#D4AF37]/40 flex items-center justify-center text-white shrink-0 relative">
                    <Icon className="w-4 h-4 text-[#D4AF37]" />
                    <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-mono">
                      {step.number}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-[#D4AF37]/60 uppercase tracking-widest leading-none">
                      {step.accent}
                    </span>
                    <h3 className="text-base font-serif font-semibold text-white mt-1">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mt-2 max-w-md">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
