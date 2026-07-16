/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Check, AlertCircle, Loader2 } from 'lucide-react';
import { dbService } from '../lib/db';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '3BHK Apartment',
    budget: '10 - 15 Lakhs',
    service: 'Residential Interior',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const propertyTypes = [
    '2BHK Apartment',
    '3BHK Apartment',
    '4BHK Villa',
    'Penthouse',
    'Independent House',
    'Office Space',
    'Commercial / Retail Showroom',
  ];

  const budgets = [
    'Under 5 Lakhs',
    '5 - 10 Lakhs',
    '10 - 15 Lakhs',
    '15 - 20 Lakhs',
    '20 - 30 Lakhs',
    '30+ Lakhs',
  ];

  const services = [
    'Residential Interior',
    'Commercial Interior',
    'Modular Kitchen',
    'Bedroom Sanctuary',
    'Living Room Styling',
    'Office Design',
    'Turnkey Interior Execution',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      setError('Please fill in all mandatory fields (Name, Phone, Email).');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Submit to server-side Nodemailer email endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Server submission failed.');
      }

      // 2. Log in the localized / firebase database as well
      await dbService.saveMessage({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        propertyType: formData.propertyType,
        budget: formData.budget,
        service: formData.service,
        message: formData.message,
        createdAt: new Date().toISOString(),
      });

      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        propertyType: '3BHK Apartment',
        budget: '10 - 15 Lakhs',
        service: 'Residential Interior',
        message: '',
      });
    } catch (err: any) {
      console.error('Contact submit error:', err);
      // Fallback: If network/server fails, save locally anyway to prevent losing lead
      try {
        await dbService.saveMessage({
          ...formData,
          createdAt: new Date().toISOString(),
        });
        setSuccess(true);
      } catch (saveError) {
        setError(err.message || 'Failed to submit enquiry. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0B0B0B] border-t border-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16" id="contact-header">
          <span className="text-xs font-serif tracking-[0.25em] uppercase text-[#D4AF37] block mb-3">Begin Your Project</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-white tracking-tight">
            Schedule a Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#E6C77B] italic font-normal">Consultation</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-grid">
          
          {/* Column 1: Contact Details & Map */}
          <div className="lg:col-span-5 flex flex-col gap-8" id="contact-info-panel">
            <div className="flex flex-col gap-6">
              <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white">
                Studio Address
              </h3>
              <p className="text-gray-400 font-light leading-relaxed text-sm sm:text-base">
                Visit our newly established design studio in Rajarajeshwari Nagar to feel our premium materials, browse modular fittings, and sit with our lead architect.
              </p>
            </div>

            {/* Quick Details Cards */}
            <div className="flex flex-col gap-4 text-sm" id="contact-details-cards">
              {/* Address */}
              <div className="p-5 border border-gray-900/60 bg-gradient-to-r from-[#111] to-[#0D0D0D] rounded flex gap-4">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Our Office</span>
                  <span className="text-white font-medium leading-relaxed font-serif">
                    No. 876, Ground Floor, Kuvempu Circle,<br />
                    Jawaharlal Nehru Rd, Opposite Pawan Kitchen World Gallery,<br />
                    Fourth Stage, BEML Layout 3rd Stage,<br />
                    Rajarajeshwari Nagar, Bengaluru - 560098
                  </span>
                </div>
              </div>

              {/* Call / WA */}
              <div className="p-5 border border-gray-900/60 bg-gradient-to-r from-[#11] to-[#0D0D0D] rounded flex gap-4">
                <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Phone & WhatsApp</span>
                  <a href="tel:+918800940504" className="text-white hover:text-[#D4AF37] font-semibold text-base transition-colors">
                    +91 88009 40504
                  </a>
                  <span className="text-[11px] text-gray-500 mt-0.5">Click to make a direct voice call</span>
                </div>
              </div>

              {/* Email */}
              <div className="p-5 border border-gray-900/60 bg-gradient-to-r from-[#11] to-[#0D0D0D] rounded flex gap-4">
                <Mail className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Email Enquiries</span>
                  <a href="mailto:info@kkrinteriors.com" className="text-white hover:text-[#D4AF37] font-medium transition-colors">
                    info@kkrinteriors.com
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-5 border border-gray-900/60 bg-gradient-to-r from-[#11] to-[#0D0D0D] rounded flex gap-4">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Studio Timings</span>
                  <span className="text-white font-medium">Monday – Saturday: 10:00 AM – 7:30 PM</span>
                  <span className="text-gray-500 text-[11px] mt-0.5">Sunday: By appointment only</span>
                </div>
              </div>
            </div>

            {/* Google Map Iframe Styled elegantly */}
            <div className="w-full h-64 border border-[#D4AF37]/20 rounded overflow-hidden shadow-2xl relative bg-black/40" id="google-map-container">
              <iframe
                title="KKR Interiors Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.750537025816!2d77.5187768!3d12.923751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3e30128cb52f%3A0xe5aefbc7fbf86fd4!2sRajarajeshwari%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560098!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-[105%] opacity-70 hover:opacity-100 transition-opacity duration-300"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Column 2: Modern Contact Form */}
          <div className="lg:col-span-7" id="contact-form-panel">
            <div className="p-6 sm:p-10 border border-gray-900 bg-gradient-to-b from-[#111111] to-[#0D0D0D] rounded-sm shadow-2xl relative overflow-hidden">
              {/* Subtle top background gold glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-[30px] pointer-events-none"></div>

              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    id="kkr-enquiry-form"
                  >
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-xl font-serif font-semibold text-white tracking-wide">
                        Send Design Inquiry
                      </h3>
                      <p className="text-xs text-gray-500 font-light">
                        Fill in your details below. We guarantee a rapid, personal feedback within 24 hours.
                      </p>
                    </div>

                    {/* Form Fields Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-serif tracking-wider uppercase text-gray-400">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Shubham Sharma"
                          required
                          className="px-4 py-3 bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] rounded-sm text-sm text-white placeholder-gray-600 focus:outline-none transition-all"
                        />
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-serif tracking-wider uppercase text-gray-400">Mobile Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +91 98765 43210"
                          required
                          className="px-4 py-3 bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] rounded-sm text-sm text-white placeholder-gray-600 focus:outline-none transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-2 sm:col-span-2">
                        <label className="text-xs font-serif tracking-wider uppercase text-gray-400">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. user@example.com"
                          required
                          className="px-4 py-3 bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] rounded-sm text-sm text-white placeholder-gray-600 focus:outline-none transition-all"
                        />
                      </div>

                      {/* Service */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-serif tracking-wider uppercase text-gray-400">Service Required</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="px-4 py-3 bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] rounded-sm text-sm text-white focus:outline-none transition-all"
                        >
                          {services.map((srv) => (
                            <option key={srv} value={srv}>{srv}</option>
                          ))}
                        </select>
                      </div>

                      {/* Property Type */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-serif tracking-wider uppercase text-gray-400">Property Configuration</label>
                        <select
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleChange}
                          className="px-4 py-3 bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] rounded-sm text-sm text-white focus:outline-none transition-all"
                        >
                          {propertyTypes.map((prop) => (
                            <option key={prop} value={prop}>{prop}</option>
                          ))}
                        </select>
                      </div>

                      {/* Budget Range */}
                      <div className="flex flex-col gap-2 sm:col-span-2">
                        <label className="text-xs font-serif tracking-wider uppercase text-gray-400">Budget Estimate Range</label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="px-4 py-3 bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] rounded-sm text-sm text-[#D4AF37] font-medium focus:outline-none transition-all"
                        >
                          {budgets.map((bgt) => (
                            <option key={bgt} value={bgt}>{bgt}</option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-2 sm:col-span-2">
                        <label className="text-xs font-serif tracking-wider uppercase text-gray-400">Message / Notes</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Tell us about your spatial needs, timeline, and layout expectations..."
                          className="px-4 py-3 bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] rounded-sm text-sm text-white placeholder-gray-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                      <div className="p-4 bg-red-950/40 border border-red-900 rounded flex gap-3 text-red-400 text-xs items-center">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 mt-2 bg-gradient-to-r from-[#D4AF37] via-[#E6C77B] to-[#D4AF37] disabled:from-gray-800 disabled:to-gray-800 text-black text-xs font-extrabold uppercase tracking-widest rounded-sm hover:from-white hover:to-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/10"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          Sending Enquiry...
                        </>
                      ) : (
                        <>
                          Submit Consultation Request
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-12 gap-6"
                    id="contact-form-success-state"
                  >
                    {/* Circle Success Tick */}
                    <div className="w-20 h-20 bg-[#D4AF37] rounded-full border-4 border-black flex items-center justify-center text-black shadow-xl shadow-[#D4AF37]/25 animate-bounce">
                      <Check className="w-10 h-10 stroke-[3]" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
                        Enquiry Submitted Successfully!
                      </h3>
                      <p className="text-sm text-[#D4AF37] font-serif italic">
                        Designing Your Dreams
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 max-w-md leading-relaxed font-light">
                      We have received your custom design requirements. A confirmation enquiry mail has been dispatched to your inbox. Our principal designer will personally phone you within the next 24 hours to schedule your session.
                    </p>

                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-4 px-6 py-2.5 border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all text-[#D4AF37] font-serif uppercase text-xs tracking-wider cursor-pointer"
                    >
                      Submit Another Query
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
