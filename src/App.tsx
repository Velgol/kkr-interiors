import { auth } from "./lib/firebase"; // apna sahi path check kar lena
console.log("Firebase connected:", auth.app.name, auth.app.options.projectId);
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsAppButton';
import AdminPanel from './components/AdminPanel';
import Logo from './components/Logo';

export default function App() {
  const [currentView, setView] = useState<'site' | 'admin'>('site');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#0B0B0B] min-h-screen text-white font-sans antialiased overflow-x-hidden selection:bg-[#D4AF37] selection:text-black" id="kkr-app-root">
      
      {/* Sticky Header Nav */}
      <Header 
        currentView={currentView} 
        setView={setView} 
        isAdminLoggedIn={isAdminLoggedIn} 
      />

      {/* Main View Router */}
      {currentView === 'site' ? (
        <main id="main-landing-view">
          {/* Hero Landing banner */}
          <Hero />

          {/* About Segment */}
          <About />

          {/* Services Offered element */}
          <Services />

          {/* Masonry Scrolling Gallery and lightbox */}
          <Portfolio />

          {/* 5-Step Journey process timeline */}
          <Process />

          {/* Customer Reviews and star slider */}
          <Testimonials />

          {/* Accordion FAQ block */}
          <FAQ />

          {/* Contact maps and modern form */}
          <Contact />

          {/* Floating Actions */}
          <WhatsAppButton />

          {/* Premium Footer */}
          <footer className="bg-[#050505] border-t border-gray-900 py-16 text-xs sm:text-sm text-gray-500 font-light" id="site-footer">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
              
              {/* Brand Col */}
              <div className="md:col-span-5 flex flex-col gap-4">
                <Logo size="lg" />
                <p className="text-gray-400 max-w-sm mt-2 leading-relaxed">
                  Bengaluru&apos;s premier luxury interior design studio. We bring timeless Italian craftsmanship, state-of-the-art modular technology, and unmatched personal dedication right to your property.
                </p>
                <div className="flex gap-4 mt-2">
                  <a href="#" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider font-semibold text-[10px]">Instagram</a>
                  <a href="#" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider font-semibold text-[10px]">Pinterest</a>
                  <a href="#" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider font-semibold text-[10px]">Houzz</a>
                </div>
              </div>

              {/* Quick Links Col */}
              <div className="md:col-span-3 flex flex-col gap-4">
                <h4 className="text-sm font-serif font-bold text-[#D4AF37] tracking-wider uppercase">Quick Navigation</h4>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <button onClick={() => handleScrollTo('hero')} className="hover:text-white transition-colors cursor-pointer text-left">
                      Home Stage
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleScrollTo('about')} className="hover:text-white transition-colors cursor-pointer text-left">
                      Our Philosophy
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleScrollTo('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                      Bespoke Services
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleScrollTo('portfolio')} className="hover:text-white transition-colors cursor-pointer text-left">
                      Curated Gallery
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleScrollTo('journey')} className="hover:text-white transition-colors cursor-pointer text-left">
                      Timeline Journey
                    </button>
                  </li>
                </ul>
              </div>

              {/* Office Location Col */}
              <div className="md:col-span-4 flex flex-col gap-4">
                <h4 className="text-sm font-serif font-bold text-[#D4AF37] tracking-wider uppercase">Studio Contact</h4>
                <div className="flex flex-col gap-2 leading-relaxed text-gray-400">
                  <p>
                    <strong>Address:</strong> No. 876, Ground Floor, Kuvempu Circle, Jawaharlal Nehru Rd, Rajarajeshwari Nagar, Bengaluru - 560098
                  </p>
                  <p className="mt-1">
                    <strong>Enquiries:</strong> <a href="tel:+918800940504" className="hover:text-[#D4AF37]">+91 88009 40504</a>
                  </p>
                  <p>
                    <strong>Email:</strong> <a href="mailto:info@kkrinteriors.com" className="hover:text-[#D4AF37]">info@kkrinteriors.com</a>
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Copyright line */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-900/60 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-600">
              <p>&copy; {new Date().getFullYear()} KKR Interiors. All rights reserved. Designed for Premium Timeless Interiors.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Work</a>
              </div>
            </div>
          </footer>
        </main>
      ) : (
        /* Secured Administrative Staff Workspace */
        <AdminPanel 
          isAdminLoggedIn={isAdminLoggedIn} 
          setIsAdminLoggedIn={setIsAdminLoggedIn} 
        />
      )}

    </div>
  );
}
