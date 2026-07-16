/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { dbService } from '../lib/db';
import { FAQItem } from '../types';

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const fetched = await dbService.getFAQs();
        setFaqs(fetched);
      } catch (err) {
        console.error('Failed to fetch FAQs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  if (loading) return null;
  if (faqs.length === 0) return null;

  return (
    <section id="faqs" className="py-24 bg-[#0B0B0B] border-t border-gray-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16" id="faqs-header">
          <span className="text-xs font-serif tracking-[0.25em] uppercase text-[#D4AF37] block mb-3">Common Questions</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-white tracking-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#E6C77B] italic font-normal">Questions</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4" id="faqs-accordion-list">
          {faqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="border border-[#D4AF37]/10 bg-gradient-to-b from-[#111111] to-[#0D0D0D] hover:border-[#D4AF37]/30 rounded transition-all duration-300"
              >
                {/* Accordion Header Trigger */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 text-white focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors shrink-0" />
                    <span className="text-sm sm:text-base font-serif font-medium tracking-wide group-hover:text-[#E6C77B] transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Indicator Symbol */}
                  <div className="p-1.5 rounded-full bg-white/[0.02] border border-gray-800 text-gray-400 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/40 transition-all shrink-0">
                    {isExpanded ? (
                      <Minus className="w-4 h-4 text-[#D4AF37]" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Animated Body panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-gray-900 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
