/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { dbService } from '../lib/db';
import { Service } from '../types';

// Map icon name string to Lucide component dynamically
const IconRenderer = ({ iconName, className }: { iconName: string; className?: string }) => {
  const IconComponent = (LucideIcons as any)[iconName];
  if (!IconComponent) {
    return <LucideIcons.LayoutGrid className={className} />;
  }
  return <IconComponent className={className} />;
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const fetched = await dbService.getServices();
        setServices(fetched);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  return (
    <section id="services" className="py-24 bg-[#0B0B0B] border-t border-gray-900 relative">
      {/* Absolute decorative glow background */}
      <div className="absolute top-[50%] right-0 w-[400px] h-[400px] bg-[#D4AF37]/2 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16" id="services-header-section">
          <span className="text-xs font-serif tracking-[0.25em] uppercase text-[#D4AF37] block mb-3">Our Bespoke Offerings</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-white tracking-tight">
            Premium Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#E6C77B] italic">Services</span>
          </h2>
          <p className="text-gray-400 font-light mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Crafting elegant, modern, and highly-engineered structural elements suited for high-end properties.
          </p>
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center py-20" id="services-loading-state">
            <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="services-cards-grid">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                whileHover={{ y: -6, borderColor: 'rgba(212, 175, 55, 0.5)' }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-gradient-to-b from-[#111111] to-[#0D0D0D] border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 rounded-sm shadow-xl flex flex-col justify-between group overflow-hidden relative"
              >
                {/* Accent border at top of card */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                <div>
                  {/* Icon & Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/[0.02] border border-[#D4AF37]/20 rounded-sm text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                      <IconRenderer iconName={service.iconName} className="w-5 h-5 text-[#D4AF37] group-hover:text-black" />
                    </div>
                    <h3 className="text-base sm:text-lg font-serif font-semibold text-white tracking-wide group-hover:text-[#E6C77B] transition-colors">
                      {service.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Subdetails list, visible on hover/focus */}
                {service.details && service.details.length > 0 && (
                  <div className="border-t border-gray-900 pt-4 mt-2" id={`service-subdetails-${service.id}`}>
                    <ul className="flex flex-col gap-1.5">
                      {service.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2 text-[11px] text-gray-400 font-light">
                          <span className="w-1 h-1 rounded-full bg-[#D4AF37]"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
