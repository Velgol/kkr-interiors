/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, Trash2, Edit, Check, Eye, Mail, Lock, LogIn, LogOut, 
  Settings, FolderKanban, Star, HelpCircle, Briefcase, RefreshCw, UploadCloud
} from 'lucide-react';
import { isFirebaseConfigured, auth } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { dbService } from '../lib/db';
import { Project, Service, Testimonial, FAQItem, ContactMessage } from '../types';

interface AdminPanelProps {
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (status: boolean) => void;
}

export default function AdminPanel({ isAdminLoggedIn, setIsAdminLoggedIn }: AdminPanelProps) {
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard Tabs: 'projects' | 'services' | 'testimonials' | 'faqs' | 'leads'
  const [activeTab, setActiveTab] = useState<'projects' | 'services' | 'testimonials' | 'faqs' | 'leads'>('projects');

  // Database lists
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [leads, setLeads] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Form Editing States
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [editingFAQ, setEditingFAQ] = useState<Partial<FAQItem> | null>(null);

  // Image Upload helper
  const [uploadProgress, setUploadProgress] = useState(false);

  // Load active tab data
  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'projects') {
        const data = await dbService.getProjects();
        setProjects(data);
      } else if (activeTab === 'services') {
        const data = await dbService.getServices();
        setServices(data);
      } else if (activeTab === 'testimonials') {
        const data = await dbService.getTestimonials();
        setTestimonials(data);
      } else if (activeTab === 'faqs') {
        const data = await dbService.getFAQs();
        setFaqs(data);
      } else if (activeTab === 'leads') {
        const data = await dbService.getMessages();
        setLeads(data);
      }
    } catch (err) {
      console.error('Error loading tab data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      loadData();
    }
  }, [isAdminLoggedIn, activeTab]);

  // Auth observer
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setIsAdminLoggedIn(true);
        } else {
          setIsAdminLoggedIn(false);
        }
      });
      return () => unsubscribe();
    }
  }, [setIsAdminLoggedIn]);

  // Handle Login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('Please enter both email and password.');
      return;
    }

    setLoginLoading(true);
    setLoginError(null);

    if (isFirebaseConfigured && auth) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setIsAdminLoggedIn(true);
      } catch (err: any) {
        console.error('Firebase Auth error:', err);
        setLoginError(err.message || 'Authentication failed. Please check credentials.');
      } finally {
        setLoginLoading(false);
      }
    } else {
      // Sandbox Mode: Check standard credential
      setTimeout(() => {
        if (email.toLowerCase() === 'admin@kkr.com' && password === 'admin123') {
          setIsAdminLoggedIn(true);
          setLoginError(null);
        } else {
          // Fallback to allow any sandbox log in, but guide the user
          setIsAdminLoggedIn(true);
          console.log('Sandbox login successful with mock credentials.');
        }
        setLoginLoading(false);
      }, 800);
    }
  };

  const handleLogout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    setIsAdminLoggedIn(false);
    // Reset states
    setEditingProject(null);
    setEditingService(null);
    setEditingTestimonial(null);
    setEditingFAQ(null);
  };

  // Convert File to Base64 instantly for offline sandbox image mock upload!
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, targetField: 'image' | 'clientImage') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (editingProject && targetField === 'image') {
        setEditingProject(prev => ({ 
          ...prev, 
          image: base64String,
          images: prev?.images ? [...prev.images, base64String] : [base64String]
        }));
      } else if (editingTestimonial && targetField === 'clientImage') {
        setEditingTestimonial(prev => ({ ...prev, clientImage: base64String }));
      }
      setUploadProgress(false);
    };
    reader.readAsDataURL(file);
  };

  // --- PROJECT CRUD ---
  const handleAddProject = () => {
    setEditingProject({
      title: '',
      category: 'Living Room',
      description: '',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
      location: 'Bengaluru',
      area: '1000 sq. ft.',
      budget: '10 Lakhs',
      images: []
    });
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.image) return;

    setLoading(true);
    try {
      await dbService.saveProject(editingProject as any);
      setEditingProject(null);
      loadData();
    } catch (err) {
      console.error('Error saving project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio project?')) return;
    setLoading(true);
    try {
      await dbService.deleteProject(id);
      loadData();
    } catch (err) {
      console.error('Error deleting project:', err);
    } finally {
      setLoading(false);
    }
  };

  // --- SERVICE CRUD ---
  const handleAddService = () => {
    setEditingService({
      name: '',
      description: '',
      iconName: 'LayoutGrid',
      details: []
    });
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.name || !editingService?.description) return;
    setLoading(true);
    try {
      await dbService.saveService(editingService as any);
      setEditingService(null);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    setLoading(true);
    try {
      await dbService.deleteService(id);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- TESTIMONIAL CRUD ---
  const handleAddTestimonial = () => {
    setEditingTestimonial({
      clientName: '',
      clientImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      rating: 5,
      review: '',
      location: 'Bengaluru'
    });
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial?.clientName || !editingTestimonial?.review) return;
    setLoading(true);
    try {
      await dbService.saveTestimonial(editingTestimonial as any);
      setEditingTestimonial(null);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    setLoading(true);
    try {
      await dbService.deleteTestimonial(id);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- FAQ CRUD ---
  const handleAddFAQ = () => {
    setEditingFAQ({
      question: '',
      answer: ''
    });
  };

  const handleSaveFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFAQ?.question || !editingFAQ?.answer) return;
    setLoading(true);
    try {
      await dbService.saveFAQ(editingFAQ as any);
      setEditingFAQ(null);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    setLoading(true);
    try {
      await dbService.deleteFAQ(id);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- LEADS CRUD ---
  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to archive/delete this message lead?')) return;
    setLoading(true);
    try {
      await dbService.deleteMessage(id);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white pt-24 pb-16 px-4" id="admin-root-view">
      
      {/* 1. LOGIN SCREEN PANEL */}
      {!isAdminLoggedIn ? (
        <div className="max-w-md mx-auto my-12" id="admin-login-card-container">
          <div className="p-8 border border-[#D4AF37]/30 bg-gradient-to-b from-[#111] to-[#050505] rounded shadow-2xl relative">
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif text-white tracking-widest uppercase">KKR Studio Portal</h2>
              <p className="text-xs text-[#D4AF37] italic mt-1 font-serif">Designing Your Dreams — Secure Staff Login</p>
              <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4"></div>
            </div>

            {!isFirebaseConfigured && (
              <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[11px] text-[#E6C77B] rounded mb-6 leading-relaxed">
                <strong>Sandbox Active:</strong> Firebase is offline. Enter any username/password to log in instantly, or use <strong>admin@kkr.com</strong> and <strong>admin123</strong>.
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-5" id="admin-login-form">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-gray-400">Security Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/60" />
                  <input
                    type="email"
                    placeholder="e.g. admin@kkrinteriors.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] rounded-sm text-sm text-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-gray-400">Master Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/60" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] rounded-sm text-sm text-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-red-950/40 border border-red-900 rounded text-red-400 text-xs flex gap-2 items-center">
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 bg-[#D4AF37] text-black font-extrabold uppercase tracking-widest text-xs rounded-sm hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loginLoading ? 'Authenticating...' : 'Establish Secure Connection'}
                <LogIn className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        
        /* 2. MAIN LOGGED-IN STAFF DASHBOARD */
        <div className="max-w-7xl mx-auto flex flex-col gap-8" id="admin-dashboard-panel">
          
          {/* Dashboard Header Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-900">
            <div>
              <h2 className="text-3xl font-serif text-white tracking-wider flex items-center gap-2">
                KKR <span className="text-[#D4AF37]">Studio Dashboard</span>
              </h2>
              <span className="text-xs text-gray-500 block mt-1 font-light">
                {isFirebaseConfigured ? 'Connected to live Firebase Cloud' : 'Running locally in Sandbox Mode (Changes persist in browser Cache)'}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-red-900/60 text-red-400 hover:bg-red-950/20 text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>

          {/* Navigation Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-gray-900/40 pb-4" id="admin-dashboard-tabs">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'text-gray-400 border-gray-800 hover:border-gray-700 hover:text-white'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              Portfolio Projects ({projects.length})
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'text-gray-400 border-gray-800 hover:border-gray-700 hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4" />
              Customer Leads ({leads.length})
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'text-gray-400 border-gray-800 hover:border-gray-700 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Services Offerings ({services.length})
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border transition-all cursor-pointer ${
                activeTab === 'testimonials'
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'text-gray-400 border-gray-800 hover:border-gray-700 hover:text-white'
              }`}
            >
              <Star className="w-4 h-4" />
              Client Testimonials ({testimonials.length})
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border transition-all cursor-pointer ${
                activeTab === 'faqs'
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'text-gray-400 border-gray-800 hover:border-gray-700 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Accordion FAQs ({faqs.length})
            </button>
          </div>

          {/* Subediting Overlay Drawer Forms */}

          {/* 1. PROJECT CREATOR / EDTIOR FORM */}
          {editingProject && (
            <div className="p-6 border border-[#D4AF37] bg-[#111] rounded shadow-2xl flex flex-col gap-5">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-xl font-serif text-[#D4AF37]">
                  {editingProject.id ? 'Edit Portfolio Project' : 'Upload New Design Project'}
                </h3>
                <button
                  onClick={() => setEditingProject(null)}
                  className="px-3 py-1 bg-gray-900 border border-gray-800 text-gray-400 text-xs uppercase cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-serif uppercase tracking-wider">Project Name *</label>
                  <input
                    type="text"
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, title: e.target.value }))}
                    required
                    className="px-4 py-2.5 bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] rounded text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-serif uppercase tracking-wider">Portfolio Category *</label>
                  <select
                    value={editingProject.category || 'Living Room'}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, category: e.target.value as any }))}
                    className="px-4 py-2.5 bg-[#0B0B0B] border border-gray-800 rounded text-sm text-white"
                  >
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="TV Unit">TV Unit</option>
                    <option value="Wardrobe">Wardrobe</option>
                    <option value="Office">Office</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-serif uppercase tracking-wider">Geographical Location (In Bengaluru)</label>
                  <input
                    type="text"
                    placeholder="e.g. Indiranagar, Bengaluru"
                    value={editingProject.location || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, location: e.target.value }))}
                    className="px-4 py-2.5 bg-[#0B0B0B] border border-gray-800 rounded text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-serif uppercase tracking-wider">Project Area / Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 1,450 sq. ft."
                    value={editingProject.area || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, area: e.target.value }))}
                    className="px-4 py-2.5 bg-[#0B0B0B] border border-gray-800 rounded text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-serif uppercase tracking-wider">Budget Range</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹15 Lakhs"
                    value={editingProject.budget || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, budget: e.target.value }))}
                    className="px-4 py-2.5 bg-[#0B0B0B] border border-gray-800 rounded text-sm text-[#D4AF37] focus:outline-none"
                  />
                </div>

                {/* File Upload section - handles offline base64 conversion */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-serif uppercase tracking-wider flex items-center gap-1">
                    Upload/Replace Project Image
                    <UploadCloud className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'image')}
                    className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-gray-800 file:text-[#D4AF37] hover:file:bg-[#D4AF37] hover:file:text-black cursor-pointer file:cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-500">Paste an Unsplash image URL below OR select a file from your computer to upload immediately.</span>
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs text-gray-400 font-serif uppercase tracking-wider">Direct Image URL</label>
                  <input
                    type="text"
                    value={editingProject.image || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, image: e.target.value }))}
                    required
                    className="px-4 py-2.5 bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] rounded text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs text-gray-400 font-serif uppercase tracking-wider">Project Description / Details</label>
                  <textarea
                    rows={4}
                    value={editingProject.description || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, description: e.target.value }))}
                    required
                    className="px-4 py-2.5 bg-[#0B0B0B] border border-gray-800 rounded text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#D4AF37] text-black font-bold uppercase tracking-wider text-xs rounded hover:bg-white transition-all cursor-pointer"
                  >
                    Save Portfolio Item
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 2. TESTIMONIAL CREATOR / EDTIOR FORM */}
          {editingTestimonial && (
            <div className="p-6 border border-[#D4AF37] bg-[#111] rounded shadow-2xl flex flex-col gap-5">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-xl font-serif text-[#D4AF37]">
                  {editingTestimonial.id ? 'Edit Testimonial' : 'Add Client Review'}
                </h3>
                <button onClick={() => setEditingTestimonial(null)} className="px-3 py-1 bg-gray-900 border text-xs">Cancel</button>
              </div>

              <form onSubmit={handleSaveTestimonial} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400">Client Name *</label>
                  <input
                    type="text"
                    value={editingTestimonial.clientName || ''}
                    onChange={(e) => setEditingTestimonial(prev => ({ ...prev, clientName: e.target.value }))}
                    required
                    className="px-4 py-2 bg-[#0B0B0B] border border-gray-800 text-white rounded text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400">Client Location (Bengaluru)</label>
                  <input
                    type="text"
                    value={editingTestimonial.location || ''}
                    onChange={(e) => setEditingTestimonial(prev => ({ ...prev, location: e.target.value }))}
                    className="px-4 py-2 bg-[#0B0B0B] border border-gray-800 text-white rounded text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400">Rating Scale (1-5 Stars)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editingTestimonial.rating || 5}
                    onChange={(e) => setEditingTestimonial(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                    className="px-4 py-2 bg-[#0B0B0B] border border-gray-800 text-[#D4AF37] rounded text-sm font-bold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400">Client Avatar / Profile Picture File</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'clientImage')}
                    className="text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs text-gray-400">Client Avatar Image URL</label>
                  <input
                    type="text"
                    value={editingTestimonial.clientImage || ''}
                    onChange={(e) => setEditingTestimonial(prev => ({ ...prev, clientImage: e.target.value }))}
                    className="px-4 py-2 bg-[#0B0B0B] border border-gray-800 text-white text-xs font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs text-gray-400">Review Summary *</label>
                  <textarea
                    rows={3}
                    value={editingTestimonial.review || ''}
                    onChange={(e) => setEditingTestimonial(prev => ({ ...prev, review: e.target.value }))}
                    required
                    className="px-4 py-2 bg-[#0B0B0B] border border-gray-800 text-white rounded text-sm"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <button type="submit" className="px-6 py-2.5 bg-[#D4AF37] text-black text-xs font-bold uppercase rounded">
                    Save Testimonial
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 3. FAQ CREATOR / EDITOR FORM */}
          {editingFAQ && (
            <div className="p-6 border border-[#D4AF37] bg-[#111] rounded shadow-2xl flex flex-col gap-5">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-xl font-serif text-[#D4AF37]">
                  {editingFAQ.id ? 'Edit FAQ' : 'Add FAQ'}
                </h3>
                <button onClick={() => setEditingFAQ(null)} className="px-3 py-1 bg-gray-900 border text-xs">Cancel</button>
              </div>

              <form onSubmit={handleSaveFAQ} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400">Question *</label>
                  <input
                    type="text"
                    value={editingFAQ.question || ''}
                    onChange={(e) => setEditingFAQ(prev => ({ ...prev, question: e.target.value }))}
                    required
                    className="px-4 py-2 bg-[#0B0B0B] border border-gray-800 text-white rounded text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400">Answer *</label>
                  <textarea
                    rows={4}
                    value={editingFAQ.answer || ''}
                    onChange={(e) => setEditingFAQ(prev => ({ ...prev, answer: e.target.value }))}
                    required
                    className="px-4 py-2 bg-[#0B0B0B] border border-gray-800 text-white rounded text-sm"
                  />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="px-6 py-2.5 bg-[#D4AF37] text-black text-xs font-bold uppercase rounded">
                    Save FAQ
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* --- ACTIVE TAB GRID LISTS --- */}

          {loading ? (
            <div className="flex justify-center py-20" id="admin-tab-loading">
              <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div id="admin-active-tab-render-block">
              {/* --- PORTFOLIO TAB --- */}
              {activeTab === 'projects' && (
                <div className="flex flex-col gap-6" id="admin-projects-grid-list">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-serif">Portfolio Elements ({projects.length})</h3>
                    <button
                      onClick={handleAddProject}
                      className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Project
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {projects.map((proj) => (
                      <div 
                        key={proj.id} 
                        className="border border-gray-900 bg-gradient-to-b from-[#111] to-[#0A0A0A] rounded overflow-hidden flex flex-col justify-between"
                      >
                        <div className="aspect-video w-full overflow-hidden bg-black relative">
                          <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <span className="absolute top-2 left-2 bg-[#D4AF37] text-black text-[9px] font-bold px-2 py-0.5 rounded uppercase font-serif">
                            {proj.category}
                          </span>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                          <div>
                            <h4 className="font-semibold text-white tracking-wide text-sm">{proj.title}</h4>
                            <span className="text-[10px] text-gray-500 font-light block mt-1">{proj.location} • {proj.budget}</span>
                          </div>
                          <div className="flex justify-end gap-2 border-t border-gray-900/50 pt-3 mt-1">
                            <button
                              onClick={() => setEditingProject(proj)}
                              className="p-1.5 bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white rounded border border-gray-800 transition-colors cursor-pointer"
                              title="Edit Project"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-1.5 bg-gray-900 hover:bg-red-950/20 text-gray-400 hover:text-red-400 rounded border border-gray-800 hover:border-red-900/40 transition-colors cursor-pointer"
                              title="Delete Project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- CUSTOMER LEADS TAB --- */}
              {activeTab === 'leads' && (
                <div className="flex flex-col gap-6" id="admin-leads-list">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-serif">Customer Inquiries CRM ({leads.length})</h3>
                    <button
                      onClick={loadData}
                      className="p-2 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-[#D4AF37] rounded"
                      title="Reload leads"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  {leads.length === 0 ? (
                    <div className="text-center py-16 text-gray-500 border border-dashed border-gray-900">
                      No customer leads received yet. Submit the contact form on the home page to test.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {leads.map((lead) => (
                        <div 
                          key={lead.id}
                          className="p-6 border border-gray-900 bg-[#111111] rounded flex flex-col lg:flex-row justify-between gap-6"
                        >
                          <div className="flex-1 flex flex-col gap-3">
                            <div className="flex flex-wrap items-center gap-3">
                              <h4 className="text-base font-bold text-white tracking-wide">{lead.name}</h4>
                              <span className="text-[10px] bg-[#D4AF37]/10 text-[#E6C77B] font-bold border border-[#D4AF37]/20 px-2.5 py-0.5 rounded uppercase">
                                {lead.propertyType}
                              </span>
                              <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded">
                                {lead.createdAt ? new Date(lead.createdAt).toLocaleString('en-IN') : 'Just now'}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-1 gap-x-4 text-xs font-light text-gray-400">
                              <div><strong>Phone:</strong> <a href={`tel:${lead.phone}`} className="hover:text-[#D4AF37] underline">{lead.phone}</a></div>
                              <div><strong>Email:</strong> <a href={`mailto:${lead.email}`} className="hover:text-[#D4AF37] underline">{lead.email}</a></div>
                              <div><strong>Service Required:</strong> <span className="text-white">{lead.service || 'Residential'}</span></div>
                              <div><strong>Est. Budget:</strong> <span className="text-[#D4AF37] font-serif font-bold">{lead.budget}</span></div>
                            </div>

                            <div className="mt-2 p-3 bg-black/40 border-l-2 border-[#D4AF37] text-xs leading-relaxed text-gray-300">
                              {lead.message || 'No additional message provided.'}
                            </div>
                          </div>

                          <div className="flex items-end justify-end self-end lg:self-center">
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="px-3 py-1.5 bg-gray-900 border border-gray-800 text-red-400 hover:bg-red-950/20 rounded text-xs uppercase flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Archive Lead
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- TESTIMONIALS TAB --- */}
              {activeTab === 'testimonials' && (
                <div className="flex flex-col gap-6" id="admin-testimonials-tab">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-serif">Client Reviews ({testimonials.length})</h3>
                    <button
                      onClick={handleAddTestimonial}
                      className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Review
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((test) => (
                      <div 
                        key={test.id} 
                        className="p-5 border border-gray-900 bg-[#111] rounded flex flex-col justify-between gap-4"
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex gap-1 text-[#D4AF37]">
                            {Array.from({ length: test.rating }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <p className="text-xs text-gray-300 italic leading-relaxed">
                            &ldquo;{test.review}&rdquo;
                          </p>
                        </div>

                        <div className="flex justify-between items-center border-t border-gray-900/60 pt-4">
                          <div className="flex items-center gap-3">
                            <img src={test.clientImage} alt={test.clientName} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                            <div>
                              <h5 className="text-xs font-semibold text-white">{test.clientName}</h5>
                              <span className="text-[10px] text-gray-500 font-light block">{test.location}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingTestimonial(test)} className="p-1 bg-gray-900 text-gray-400 hover:text-white rounded border border-gray-800 cursor-pointer">
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleDeleteTestimonial(test.id)} className="p-1 bg-gray-900 text-gray-400 hover:text-red-400 rounded border border-gray-800 cursor-pointer">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- FAQS TAB --- */}
              {activeTab === 'faqs' && (
                <div className="flex flex-col gap-6" id="admin-faqs-tab">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-serif">Accordion FAQs ({faqs.length})</h3>
                    <button
                      onClick={handleAddFAQ}
                      className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add FAQ
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                    {faqs.map((faq) => (
                      <div 
                        key={faq.id} 
                        className="p-5 border border-gray-900 bg-[#111] rounded flex flex-col sm:flex-row justify-between items-start gap-4"
                      >
                        <div className="flex-1 flex flex-col gap-2">
                          <h4 className="text-sm font-semibold text-white tracking-wide">Q: {faq.question}</h4>
                          <p className="text-xs text-gray-400 leading-relaxed font-light">A: {faq.answer}</p>
                        </div>
                        <div className="flex gap-2 shrink-0 self-end sm:self-start">
                          <button onClick={() => setEditingFAQ(faq)} className="p-1.5 bg-gray-900 text-gray-400 hover:text-white rounded border border-gray-800 cursor-pointer">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteFAQ(faq.id)} className="p-1.5 bg-gray-900 text-gray-400 hover:text-red-400 rounded border border-gray-800 cursor-pointer">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- SERVICES TAB --- */}
              {activeTab === 'services' && (
                <div className="flex flex-col gap-6" id="admin-services-tab">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-serif">Services Offerings ({services.length})</h3>
                    <button
                      onClick={handleAddService}
                      className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Service
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {services.map((srv) => (
                      <div 
                        key={srv.id} 
                        className="p-5 border border-gray-900 bg-[#111] rounded flex flex-col justify-between gap-4"
                      >
                        <div>
                          <span className="text-[10px] text-[#D4AF37] font-mono block mb-1">Icon: {srv.iconName}</span>
                          <h4 className="text-sm font-bold text-white tracking-wide">{srv.name}</h4>
                          <p className="text-xs text-gray-400 mt-2 leading-relaxed font-light line-clamp-3">{srv.description}</p>
                        </div>
                        <div className="flex justify-end gap-2 border-t border-gray-900/40 pt-3 mt-1">
                          <button onClick={() => setEditingService(srv)} className="p-1 bg-gray-900 text-gray-400 hover:text-white rounded border border-gray-800 cursor-pointer">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteService(srv.id)} className="p-1 bg-gray-900 text-gray-400 hover:text-red-400 rounded border border-gray-800 cursor-pointer">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
}
