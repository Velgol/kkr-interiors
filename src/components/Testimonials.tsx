/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { dbService } from '../lib/db';
import { Testimonial } from '../types';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const fetched = await dbService.getTestimonials();
        setTestimonials(fetched);
      } catch (err) {
        console.error('Failed to load testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (loading) return null;
  if (testimonials.length === 0) return null;

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-[#0B0B0B] border-t border-gray-900 overflow-hidden relative">
      {/* Decorative ambient gold flare */}
      <div className="absolute bottom-[10%] right-[15%] w-[300px] h-[300px] bg-[#D4AF37]/2 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16" id="testimonials-header">
          <span className="text-xs font-serif tracking-[0.25em] uppercase text-[#D4AF37] block mb-3">Client Experiences</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-white tracking-tight">
            Trust From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#E6C77B] italic font-normal">Clients</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[380px] sm:min-h-[320px] flex items-center justify-center" id="testimonials-slider">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="max-w-3xl mx-auto px-4 sm:px-12 flex flex-col items-center"
              id={`testimonial-slide-${current.id}`}
            >
              {/* Quote Mark */}
              <div className="p-4 rounded-full bg-white/[0.01] border border-gray-900 mb-6 text-[#D4AF37]">
                <Quote className="w-6 h-6 rotate-180 fill-current" />
              </div>

              {/* Stars */}
              <div className="flex gap-1.5 mb-6 text-[#D4AF37]" id="testimonial-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 fill-current ${i < current.rating ? 'text-[#D4AF37]' : 'text-gray-800'}`} 
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed italic mb-8 max-w-2xl">
                &ldquo;{current.review}&rdquo;
              </p>

              {/* Client Profile */}
              <div className="flex items-center gap-4">
                <img
                  src={current.clientImage}
                  alt={current.clientName}
                  className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]/40"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-white tracking-wide">
                    {current.clientName}
                  </h4>
                  <span className="text-[11px] text-gray-500 font-light block">
                    {current.location}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {testimonials.length > 1 && (
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 sm:px-0 pointer-events-none z-20">
              <button
                onClick={handlePrev}
                className="p-3 bg-black/40 border border-gray-900 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] rounded-full transition-all pointer-events-auto cursor-pointer"
                title="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 bg-black/40 border border-gray-900 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] rounded-full transition-all pointer-events-auto cursor-pointer"
                title="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel Indicators / Dots */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-8" id="testimonials-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i ? 'w-6 bg-[#D4AF37]' : 'bg-gray-800 hover:bg-gray-700'
                }`}
                title={`Go to slide ${i + 1}`}
              ></button>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
