/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: 'Living Room' | 'Bedroom' | 'Kitchen' | 'TV Unit' | 'Wardrobe' | 'Office' | 'Commercial';
  description: string;
  image: string;
  images?: string[]; // Multiple images support
  location?: string;
  area?: string;
  budget?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  iconName: string; // Lucide icon identifier
  details?: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientImage: string;
  rating: number;
  review: string;
  location: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  budget: string;
  message: string;
  service?: string;
  createdAt: string;
}
