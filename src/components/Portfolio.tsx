/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, MapPin, Minimize2, Eye } from 'lucide-react';
import { dbService } from '../lib/db';
import { Project } from '../types';

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetched = await dbService.getProjects();
        setProjects(fetched);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = [
    'All',
    'Living Room',
    'Bedroom',
    'Kitchen',
    'TV Unit',
    'Wardrobe',
    'Office',
    'Commercial',
  ];

  // Filter projects based on active filter
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const openLightbox = (project: Project) => {
    // Find the index of this project within the currently filtered list
    const index = filteredProjects.findIndex(p => p.id === project.id);
    if (index !== -1) {
      setSelectedProjectIndex(index);
    }
  };

  const closeLightbox = () => {
    setSelectedProjectIndex(null);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedProjectIndex === null) return;
    const newIdx = selectedProjectIndex === 0 ? filteredProjects.length - 1 : selectedProjectIndex - 1;
    setSelectedProjectIndex(newIdx);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedProjectIndex === null) return;
    const newIdx = selectedProjectIndex === filteredProjects.length - 1 ? 0 : selectedProjectIndex + 1;
    setSelectedProjectIndex(newIdx);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProjectIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectIndex, filteredProjects]);

  const activeProject = selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null;

  return (
    <section id="portfolio" className="py-24 bg-[#0B0B0B] border-t border-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12" id="portfolio-header-section">
          <span className="text-xs font-serif tracking-[0.25em] uppercase text-[#D4AF37] block mb-3">Our Work Showcase</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-white tracking-tight">
            Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#E6C77B] italic">Portfolio</span>
          </h2>
          <p className="text-gray-400 font-light mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Take inspiration from modern, luxurious layouts. Scroll through real, completed residential and commercial spaces.
          </p>
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        {/* Categories Tab Filters */}
        <div 
          className="flex flex-wrap justify-center items-center gap-3 mb-16 px-4" 
          id="portfolio-category-filters"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setSelectedProjectIndex(null);
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-serif tracking-wider uppercase transition-all duration-300 rounded-sm border cursor-pointer ${
                activeCategory === category
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-semibold'
                  : 'text-gray-400 border-gray-800 hover:border-[#D4AF37]/50 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20" id="portfolio-loading">
            <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 text-gray-400" id="portfolio-empty-state">
            No projects found in this category. Use the Admin Dashboard to add new projects.
          </div>
        ) : (
          /* Premium Masonry Grid - flow down columns elegantly */
          <div 
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-6 space-y-6 [column-fill:balance]"
            id="portfolio-masonry-container"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                id={`project-card-${project.id}`}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="break-inside-avoid bg-gradient-to-b from-[#111111] to-[#0B0B0B] border border-gray-900 rounded-sm overflow-hidden group relative cursor-pointer shadow-lg"
                onClick={() => openLightbox(project)}
              >
                {/* Image Container with golden aspect ratio styling */}
                <div className="relative overflow-hidden w-full bg-black/50">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Premium Hover Overlay effect */}
                  <div className="absolute inset-0 bg-[#0B0B0B]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6">
                    <div className="absolute top-4 right-4 p-2 bg-[#D4AF37] text-black rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-400">
                      <Eye className="w-4 h-4" />
                    </div>

                    <span className="text-[10px] font-serif tracking-widest uppercase text-[#D4AF37] mb-1">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-serif font-semibold text-white tracking-tight leading-snug mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-300 font-light line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    {project.location && (
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 font-light">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {project.location}
                      </div>
                    )}
                  </div>
                </div>

                {/* Always-visible brief label block for smooth scroll accessibility */}
                <div className="p-4 border-t border-gray-900/50 flex justify-between items-center bg-[#111111]/80 backdrop-blur-sm sm:hidden lg:flex">
                  <div>
                    <h4 className="text-sm font-semibold text-white tracking-wide">{project.title}</h4>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">{project.category}</span>
                  </div>
                  <span className="text-xs font-serif text-[#D4AF37]">{project.location?.split(',')[0]}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Fullscreen Luxury Lightbox */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0B0B0B]/98 flex flex-col justify-between p-4 sm:p-6 select-none"
            onClick={closeLightbox}
            id="portfolio-lightbox-overlay"
          >
            {/* Lightbox Header Controls */}
            <div className="flex items-center justify-between w-full relative z-10 max-w-7xl mx-auto py-2">
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs tracking-widest uppercase text-[#D4AF37]">
                  {activeProject.category}
                </span>
                <h3 className="text-base sm:text-xl font-serif text-white tracking-tight font-semibold">
                  {activeProject.title}
                </h3>
              </div>
              
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="p-3 bg-white/5 border border-white/10 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] rounded-full transition-all cursor-pointer"
                title="Close Gallery (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Main Stage Container */}
            <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 max-w-7xl mx-auto w-full overflow-hidden my-4">
              {/* Image Canvas Panel */}
              <div className="relative flex-1 h-full max-h-[65vh] lg:max-h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Arrow Nav Left */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 z-20 p-4 bg-black/60 border border-white/5 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] rounded-full transition-all cursor-pointer"
                  title="Previous Project (Left Arrow)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Image itself */}
                <motion.img
                  key={activeProject.id}
                  src={activeProject.image}
                  alt={activeProject.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="max-h-full max-w-full object-contain shadow-2xl border border-gray-900/60 rounded"
                  onClick={(e) => e.stopPropagation()}
                  referrerPolicy="no-referrer"
                />

                {/* Arrow Nav Right */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 z-20 p-4 bg-black/60 border border-white/5 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] rounded-full transition-all cursor-pointer"
                  title="Next Project (Right Arrow)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Rich Project Metadata Panel */}
              <div 
                className="w-full lg:w-80 bg-[#111111] border border-gray-900 rounded p-6 flex flex-col gap-5 text-left relative z-10"
                onClick={(e) => e.stopPropagation()}
                id="lightbox-meta-panel"
              >
                <div>
                  <h4 className="text-xs tracking-widest text-[#D4AF37] uppercase font-serif mb-2">Project Brief</h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                    {activeProject.description}
                  </p>
                </div>

                <div className="h-[1px] bg-gray-900"></div>

                <div className="grid grid-cols-2 gap-4">
                  {activeProject.location && (
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Location</span>
                      <span className="text-xs text-white font-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#D4AF37]" />
                        {activeProject.location.split(',')[0]}
                      </span>
                    </div>
                  )}

                  {activeProject.area && (
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Total Area</span>
                      <span className="text-xs text-white font-medium block mt-0.5">
                        {activeProject.area}
                      </span>
                    </div>
                  )}

                  {activeProject.budget && (
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Investment Range</span>
                      <span className="text-xs text-white font-serif font-bold text-[#D4AF37] block mt-0.5">
                        {activeProject.budget}
                      </span>
                    </div>
                  )}
                </div>

                <div className="h-[1px] bg-gray-900"></div>

                {activeProject.images && activeProject.images.length > 1 && (
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-2">Alternative Views</span>
                    <div className="flex gap-2 overflow-x-auto pb-1" id="lightbox-alt-views">
                      {activeProject.images.map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          onClick={() => {
                            // Update the main image of the active project
                            setProjects(prev => prev.map(p => p.id === activeProject.id ? { ...p, image: img } : p));
                          }}
                          className={`w-12 h-12 rounded overflow-hidden cursor-pointer border shrink-0 transition-all ${
                            activeProject.image === img ? 'border-[#D4AF37]' : 'border-gray-800 hover:border-gray-600'
                          }`}
                        >
                          <img src={img} alt="Alternative view" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Lightbox Footer Progress */}
            <div className="text-center text-xs text-gray-500 py-2">
              Project {selectedProjectIndex + 1} of {filteredProjects.length} — Tap arrows to browse
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
