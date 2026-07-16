/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  currentView: 'site' | 'admin';
  setView: (view: 'site' | 'admin') => void;
  isAdminLoggedIn: boolean;
}

export default function Header({ currentView, setView, isAdminLoggedIn }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (currentView === 'admin') {
      setView('site');
      // Wait for layout update then scroll
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Journey', id: 'journey' },
    { label: 'FAQs', id: 'faqs' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled || currentView === 'admin'
          ? 'bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#D4AF37]/20 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="cursor-pointer" 
          onClick={() => {
            setView('site');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          id="header-logo"
        >
          <Logo size="lg" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8" id="desktop-nav-menu">
          {currentView === 'site' && navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-[#D4AF37] transition-all relative group py-2 cursor-pointer"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}

          {currentView === 'admin' && (
            <button
              onClick={() => setView('site')}
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-[#D4AF37] transition-all cursor-pointer"
            >
              ← Back to KKR Website
            </button>
          )}

          {/* Admin Dashboard Entry */}
          <button
            onClick={() => setView(currentView === 'site' ? 'admin' : 'site')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all border cursor-pointer ${
              currentView === 'admin'
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] hover:bg-white hover:text-black hover:border-white'
                : 'text-[#D4AF37] border-[#D4AF37]/30 hover:border-[#D4AF37] bg-black/40'
            }`}
            id="admin-portal-link"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            {currentView === 'admin' ? 'Exit Admin' : isAdminLoggedIn ? 'Admin Dashboard' : 'Admin Login'}
          </button>

          {/* Premium Consultation CTA */}
          {currentView === 'site' && (
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E6C77B] text-black text-xs font-bold uppercase tracking-wider rounded-sm hover:from-white hover:to-white transition-all duration-300 flex items-center gap-1.5 shadow-md shadow-[#D4AF37]/20 hover:shadow-none cursor-pointer"
              id="cta-header-consultation"
            >
              Free Consultation
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-3 lg:hidden" id="mobile-nav-toggle-container">
          <button
            onClick={() => setView(currentView === 'site' ? 'admin' : 'site')}
            className="p-2 text-[#D4AF37] border border-[#D4AF37]/30 rounded bg-black/40"
            title="Admin Login"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-[#D4AF37] focus:outline-none cursor-pointer"
            id="mobile-menu-hamburger"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0B0B0B] border-b border-[#D4AF37]/20 py-6 px-4 flex flex-col gap-5 shadow-2xl animate-fade-in" id="mobile-drawer-menu">
          {currentView === 'site' ? (
            navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-base font-semibold tracking-wide text-gray-300 hover:text-[#D4AF37] py-2 border-b border-gray-900/50 cursor-pointer"
              >
                {link.label}
              </button>
            ))
          ) : (
            <button
              onClick={() => {
                setView('site');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-base font-semibold text-gray-300 hover:text-[#D4AF37] py-2 cursor-pointer"
            >
              ← Back to Main Website
            </button>
          )}

          {currentView === 'site' && (
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full text-center py-3 bg-gradient-to-r from-[#D4AF37] to-[#E6C77B] text-black text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-white transition-all cursor-pointer"
            >
              Book Free Consultation
            </button>
          )}
        </div>
      )}
    </header>
  );
}
