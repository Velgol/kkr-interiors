/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Sparkles, CheckCircle, FileText, Compass } from 'lucide-react';

export default function About() {
  const coreValues = [
    {
      title: 'Uncompromised Quality',
      description: 'Rigorous engineering standards, solid core materials, and a 10-year written warranty on modular systems.',
      icon: Shield,
    },
    {
      title: 'Absolute Transparency',
      description: 'Zero hidden costs. Direct, itemized pricing structures and explicit grade certifications on wood, glass, and metals.',
      icon: FileText,
    },
    {
      title: 'Personal Attention',
      description: 'Every project is personally curated and supervised by our principal designer, ensuring your custom needs are met.',
      icon: Sparkles,
    },
    {
      title: 'Premium Materials',
      description: 'Only water-resistant BWP marine-grade plywood and high-gloss PU lacquered shutters from elite trusted suppliers.',
      icon: CheckCircle,
    },
    {
      title: 'Modern Architecture',
      description: 'Clean geometry, functional flow, Italian textures, and balanced layouts for high-end modern living.',
      icon: Compass,
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#0B0B0B] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16" id="about-header-section">
          <span className="text-xs font-serif tracking-[0.25em] uppercase text-[#D4AF37] block mb-3">Our Core Philosophy</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-white tracking-tight">
            A Studio Founded on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#E6C77B] italic">Trust</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center" id="about-content-grid">
          
          {/* Left Block - Text Introduction */}
          <div className="lg:col-span-5 flex flex-col gap-6" id="about-introduction-text">
            <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white leading-relaxed">
              Who We Are
            </h3>
            <p className="text-gray-300 leading-relaxed font-light text-base sm:text-lg">
              <strong>KKR Interiors</strong> is a newly established premium interior design studio dedicated to creating beautiful, functional, and timeless interiors. Based in Rajarajeshwari Nagar, Bengaluru, we bring a fresh, modern perspective to luxury home styling.
            </p>
            <p className="text-gray-400 leading-relaxed font-light">
              We bypass the crowded, commercialized mass production models to offer a high-fidelity, tailor-made client experience. We believe that true luxury is found in the perfect convergence of quality craftsmanship and honest client collaboration.
            </p>

            {/* Accent Highlight Banner */}
            <div className="mt-4 p-5 border-l-2 border-[#D4AF37] bg-white/[0.02] backdrop-blur-sm rounded-r">
              <p className="italic font-serif text-[#E6C77B] text-sm leading-relaxed">
                &ldquo;We don&apos;t just decorate spaces; we draft a highly tailored lifestyle narrative using the world&apos;s finest materials and textures.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Block - Core Values Grid (Bento style) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5" id="about-core-values-grid">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 border border-[#D4AF37]/10 bg-[#0B0B0B] hover:border-[#D4AF37]/40 transition-all duration-300 rounded flex flex-col gap-4 relative group overflow-hidden ${
                    idx === 4 ? 'md:col-span-2' : ''
                  }`}
                  id={`about-value-card-${idx}`}
                >
                  {/* Hover radial gold glow */}
                  <div className="absolute inset-0 bg-[#D4AF37]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded bg-white/[0.03] border border-[#D4AF37]/20 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#D4AF37] group-hover:text-black" />
                    </div>
                    <h4 className="text-md font-serif font-bold text-white group-hover:text-[#E6C77B] transition-colors">
                      {value.title}
                    </h4>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
