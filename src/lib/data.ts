/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Service, Testimonial, FAQItem, ContactMessage } from '../types';

// Premium high-resolution luxury interior design photos
export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'The Italian Villa Living Room',
    category: 'Living Room',
    description: 'A modern luxury living room design featuring custom brass detailing, premium Italian marble accent walls, bespoke warm gold ambient lighting, and imported velvet lounge seating.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200'
    ],
    location: 'Sadashivanagar, Bengaluru',
    area: '1,200 sq. ft.',
    budget: '₹18 Lakhs',
    createdAt: '2026-01-10T10:00:00.000Z'
  },
  {
    id: 'proj-2',
    title: 'Bespoke Warm Master Suite',
    category: 'Bedroom',
    description: 'An elegant, eye-soothing luxury bedroom designed with custom fluted wooden headboards, integrated cove lighting, warm beige upholstery, and walk-in tinted glass wardrobe systems.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200'
    ],
    location: 'Indiranagar, Bengaluru',
    area: '450 sq. ft.',
    budget: '₹8.5 Lakhs',
    createdAt: '2026-02-15T10:00:00.000Z'
  },
  {
    id: 'proj-3',
    title: 'Minimalist Premium Kitchen',
    category: 'Kitchen',
    description: 'State-of-the-art modular kitchen utilizing quartz countertops, high-gloss PU lacquered custom shutters, built-in premium appliances, and sophisticated smart cabinet solutions.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200'
    ],
    location: 'Rajarajeshwari Nagar, Bengaluru',
    area: '250 sq. ft.',
    budget: '₹12 Lakhs',
    createdAt: '2026-03-01T10:00:00.000Z'
  },
  {
    id: 'proj-4',
    title: 'The Brass Accent TV Lounge',
    category: 'TV Unit',
    description: 'An architectural media center highlighting a large book-matched Italian marble back panel, floating veneer cabinets, hidden gold LED backlight strips, and dynamic shelving panels.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200'
    ],
    location: 'Jayanagar, Bengaluru',
    area: '350 sq. ft.',
    budget: '₹4.5 Lakhs',
    createdAt: '2026-03-18T10:00:00.000Z'
  },
  {
    id: 'proj-5',
    title: 'Master Walk-In Wardrobe',
    category: 'Wardrobe',
    description: 'A luxurious custom wardrobe system featuring high-end tinted glass doors, inner leather-lined jewelry drawers, dynamic sensor-activated profile lights, and premium metal hardware.',
    image: 'https://images.unsplash.com/photo-1558882224-cca166733360?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1558882224-cca166733360?auto=format&fit=crop&q=80&w=1200'
    ],
    location: 'Whitefield, Bengaluru',
    area: '180 sq. ft.',
    budget: '₹6 Lakhs',
    createdAt: '2026-04-05T10:00:00.000Z'
  },
  {
    id: 'proj-6',
    title: 'Executive Suite Office',
    category: 'Office',
    description: 'Sophisticated corporate leadership office featuring an executive solid wood desk, acoustic velvet wall panels, dynamic architectural light grids, and custom display shelving.',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
    ],
    location: 'Lavelle Road, Bengaluru',
    area: '600 sq. ft.',
    budget: '₹14 Lakhs',
    createdAt: '2026-04-20T10:00:00.000Z'
  },
  {
    id: 'proj-7',
    title: 'Luxury Commercial Lobby',
    category: 'Commercial',
    description: 'Stunning commercial lounge reception presenting double-height ceiling custom light installations, warm wood paneled columns, and luxury marble reception counter desk.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
    ],
    location: 'Koramangala, Bengaluru',
    area: '1,500 sq. ft.',
    budget: '₹25 Lakhs',
    createdAt: '2026-05-02T10:00:00.000Z'
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    name: 'Residential Interior',
    description: 'Complete luxury home transformations from concepts to bespoke modular systems, tailored to your premium lifestyle.',
    iconName: 'Home',
    details: ['Bespoke Villa Styling', 'Apartment Interiors', 'Space Optimization', 'Color Scheme Consultation']
  },
  {
    id: 'srv-2',
    name: 'Commercial Interior',
    description: 'Stunning luxury retail, showroom, and hospitality interior setups designed to boost visual impact and comfort.',
    iconName: 'Briefcase',
    details: ['Boutique Showrooms', 'Luxury Lounges', 'Hospitality Design', 'Retail Spaces']
  },
  {
    id: 'srv-3',
    name: 'Modular Kitchen',
    description: 'State-of-the-art German and Italian-inspired modular kitchen environments built with waterproof marine-grade materials.',
    iconName: 'ChefHat',
    details: ['PU Lacquer Shutters', 'Quartz Countertops', 'Smart Cabinet Organizers', 'Soft-Close Hardware']
  },
  {
    id: 'srv-4',
    name: 'Bedroom Sanctuary',
    description: 'Creating exquisite personal chambers prioritizing comfort, elegant acoustic paneling, and custom lighting layers.',
    iconName: 'Bed',
    details: ['Upholstered Headboards', 'Custom Wardrobes', 'Bespoke Dressing Units', 'Warm Ambient Lighting']
  },
  {
    id: 'srv-5',
    name: 'Living Room Styling',
    description: 'Designing high-impact social layouts with luxury marble paneling, premium wood overlays, and cozy custom seating.',
    iconName: 'Compass',
    details: ['Marble Accent Panels', 'Bespoke Wall Panelings', 'Custom Seating Arrangements', 'Decorative Light Curation']
  },
  {
    id: 'srv-6',
    name: 'Luxury Wardrobe',
    description: 'Premium customized sliding, swing, and walk-in wardrobe designs made with imported finishes and glass elements.',
    iconName: 'Layers',
    details: ['Walk-in Glass Closets', 'Profile LED Lighting', 'Leather Accessories Trays', 'Anti-dust Seals']
  },
  {
    id: 'srv-7',
    name: 'TV Entertainment Units',
    description: 'Elegant custom media consoles integrating storage, luxury cladding, wire management, and backlighting.',
    iconName: 'Tv',
    details: ['Book-matched Claddings', 'Floating Console Units', 'Backlit Shelvings', 'Concealed Wiring Systems']
  },
  {
    id: 'srv-8',
    name: 'Bespoke False Ceiling',
    description: 'Architectural ceiling plans specifying premium gypsum panels, hidden LED channels, and custom wooden highlights.',
    iconName: 'Grid',
    details: ['Gypsum Floating Design', 'Wooden Accent Sections', 'Magnetic Track Lighting', 'Cove Strip Integration']
  },
  {
    id: 'srv-9',
    name: 'Premium Office Interior',
    description: 'Ergonomic, stylish, and high-performance workplaces boosting focus, brand consistency, and structural ergonomics.',
    iconName: 'Building',
    details: ['Executive Boardrooms', 'Acoustic Wall Paneling', 'Smart Conference Tables', 'Ergonomic Workstation Layouts']
  },
  {
    id: 'srv-10',
    name: '3D Photo-Realistic Design',
    description: 'Vivid, ultra-realistic 3D walkthroughs and visual renders detailing every material, finish, and lighting beforehand.',
    iconName: 'Cpu',
    details: ['3D Rendering Walkthroughs', 'Accurate Lighting Previews', 'Material Texture Matching', 'Panoramic 360 Views']
  },
  {
    id: 'srv-11',
    name: 'Detailed 2D Floor Planning',
    description: 'Precise architectural blueprints, working elevations, electrical plumbing diagrams, and spatial schematics.',
    iconName: 'Map',
    details: ['Space Flow Optimization', 'Electrical Plumbing Diagrams', 'Wall Elevation Schematics', 'Accurate Material Dimensions']
  },
  {
    id: 'srv-12',
    name: 'Turnkey Handover',
    description: 'Complete hands-free execution from civil layout to final decor styling, delivered on-time with zero-stress.',
    iconName: 'Award',
    details: ['Single Point of Contact', 'Rigorous Quality Checks', 'Material Sourcing Oversight', 'Assured Handover Guarantee']
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Vikram & Priya Nair',
    clientImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    review: 'KKR Interiors completely transformed our 4BHK villa in Rajarajeshwari Nagar. Their attention to detail with the Italian marble paneling and bespoke wardrobe designs exceeded our expectations. The absolute transparency in pricing was very refreshing.',
    location: 'Rajarajeshwari Nagar, Bengaluru'
  },
  {
    id: 'test-2',
    clientName: 'Sanjay Deshmukh',
    clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    review: 'Newly founded but highly professional! Their design and execution of our modular kitchen and living room TV unit is spectacular. They used premium, high-quality materials and provided personal attention at every step.',
    location: 'Indiranagar, Bengaluru'
  },
  {
    id: 'test-3',
    clientName: 'Meera Krishnan',
    clientImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    review: 'Working with KKR Interiors was a stress-free journey. From the very first free consultation to the detailed 3D plans and final turnkey execution, their process is robust. A true luxury aesthetic with beautiful gold warm accents.',
    location: 'Sadashivanagar, Bengaluru'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is the design process at KKR Interiors?',
    answer: 'We follow a seamless 5-step journey: 1) Free Consultation to understand your requirements, 2) Design & Spatial Planning, 3) Detailed 3D Renders and Material Approval, 4) Rigorous On-Site Execution, and 5) Thorough Quality Inspection followed by Project Handover.'
  },
  {
    id: 'faq-2',
    question: 'Do you charge for the initial consultation?',
    answer: 'No, our initial spatial consultation is completely free of charge. You can visit our studio or we can schedule an on-site visit in Bengaluru to discuss your vision, budget, and requirements.'
  },
  {
    id: 'faq-3',
    question: 'Which materials do you use for modular kitchens and wardrobes?',
    answer: 'We use exclusively premium, water-resistant marine-grade plywood (BWP) with high-gloss PU lacquered shutters, acrylic coatings, or matte laminate overlays. All hardware components are sourced from top-tier brands like Hettich and Blum with lifetime guarantees.'
  },
  {
    id: 'faq-4',
    question: 'How long does a typical home interior project take?',
    answer: 'A modular setup typically takes 40–45 days, while a comprehensive premium turnkey villa interior project is executed and handed over within 75–90 days, depending on custom details and approvals.'
  },
  {
    id: 'faq-5',
    question: 'Do you offer a warranty on your designs?',
    answer: 'Yes, we stand behind our workmanship and premium materials. We provide a comprehensive 10-year warranty on all modular woodwork and structural systems.'
  }
];

// Helper to handle local persistence elegantly
export function loadFromStorage<T>(key: string, initialData: T): T {
  try {
    const data = localStorage.getItem(`kkr_${key}`);
    return data ? JSON.parse(data) : initialData;
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    return initialData;
  }
}

export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(`kkr_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}
