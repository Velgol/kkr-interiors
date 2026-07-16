/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { Project, Service, Testimonial, FAQItem, ContactMessage } from '../types';
import {
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
  loadFromStorage,
  saveToStorage
} from './data';

// Generic CRUD Interface
export const dbService = {
  // --- PROJECTS ---
  async getProjects(): Promise<Project[]> {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const projects: Project[] = [];
        querySnapshot.forEach((docSnap) => {
          projects.push({ id: docSnap.id, ...docSnap.data() } as Project);
        });
        if (projects.length > 0) return projects;
      } catch (error) {
        console.error('Error fetching projects from Firestore, falling back to LocalStorage:', error);
      }
    }
    return loadFromStorage<Project[]>('projects', INITIAL_PROJECTS);
  },

  async saveProject(project: Omit<Project, 'id'> & { id?: string }): Promise<Project> {
    const id = project.id || `proj-${Date.now()}`;
    const newProject: Project = {
      ...project,
      id,
      createdAt: project.createdAt || new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
      try {
        if (project.id) {
          // Update
          const docRef = doc(db, 'projects', project.id);
          await updateDoc(docRef, { ...newProject });
        } else {
          // Create
          const docRef = await addDoc(collection(db, 'projects'), { ...newProject });
          newProject.id = docRef.id;
        }
      } catch (error) {
        console.error('Error saving project to Firestore:', error);
      }
    }

    // Always keep LocalStorage in sync or fallback
    const localProjects = loadFromStorage<Project[]>('projects', INITIAL_PROJECTS);
    const index = localProjects.findIndex((p) => p.id === id);
    if (index >= 0) {
      localProjects[index] = newProject;
    } else {
      localProjects.unshift(newProject);
    }
    saveToStorage('projects', localProjects);
    return newProject;
  },

  async deleteProject(id: string): Promise<void> {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'projects', id));
      } catch (error) {
        console.error('Error deleting project from Firestore:', error);
      }
    }

    const localProjects = loadFromStorage<Project[]>('projects', INITIAL_PROJECTS);
    const updated = localProjects.filter((p) => p.id !== id);
    saveToStorage('projects', updated);
  },

  // --- SERVICES ---
  async getServices(): Promise<Service[]> {
    if (isFirebaseConfigured && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'services'));
        const services: Service[] = [];
        querySnapshot.forEach((docSnap) => {
          services.push({ id: docSnap.id, ...docSnap.data() } as Service);
        });
        if (services.length > 0) return services;
      } catch (error) {
        console.error('Error fetching services from Firestore, falling back:', error);
      }
    }
    return loadFromStorage<Service[]>('services', INITIAL_SERVICES);
  },

  async saveService(service: Omit<Service, 'id'> & { id?: string }): Promise<Service> {
    const id = service.id || `srv-${Date.now()}`;
    const newService: Service = { ...service, id };

    if (isFirebaseConfigured && db) {
      try {
        if (service.id) {
          await updateDoc(doc(db, 'services', service.id), { ...newService });
        } else {
          const docRef = await addDoc(collection(db, 'services'), { ...newService });
          newService.id = docRef.id;
        }
      } catch (error) {
        console.error('Error saving service to Firestore:', error);
      }
    }

    const localServices = loadFromStorage<Service[]>('services', INITIAL_SERVICES);
    const index = localServices.findIndex((s) => s.id === id);
    if (index >= 0) {
      localServices[index] = newService;
    } else {
      localServices.push(newService);
    }
    saveToStorage('services', localServices);
    return newService;
  },

  async deleteService(id: string): Promise<void> {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'services', id));
      } catch (error) {
        console.error('Error deleting service from Firestore:', error);
      }
    }

    const localServices = loadFromStorage<Service[]>('services', INITIAL_SERVICES);
    const updated = localServices.filter((s) => s.id !== id);
    saveToStorage('services', updated);
  },

  // --- TESTIMONIALS ---
  async getTestimonials(): Promise<Testimonial[]> {
    if (isFirebaseConfigured && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'testimonials'));
        const testimonials: Testimonial[] = [];
        querySnapshot.forEach((docSnap) => {
          testimonials.push({ id: docSnap.id, ...docSnap.data() } as Testimonial);
        });
        if (testimonials.length > 0) return testimonials;
      } catch (error) {
        console.error('Error fetching testimonials from Firestore:', error);
      }
    }
    return loadFromStorage<Testimonial[]>('testimonials', INITIAL_TESTIMONIALS);
  },

  async saveTestimonial(testimonial: Omit<Testimonial, 'id'> & { id?: string }): Promise<Testimonial> {
    const id = testimonial.id || `test-${Date.now()}`;
    const newTestimonial: Testimonial = { ...testimonial, id };

    if (isFirebaseConfigured && db) {
      try {
        if (testimonial.id) {
          await updateDoc(doc(db, 'testimonials', testimonial.id), { ...newTestimonial });
        } else {
          const docRef = await addDoc(collection(db, 'testimonials'), { ...newTestimonial });
          newTestimonial.id = docRef.id;
        }
      } catch (error) {
        console.error('Error saving testimonial to Firestore:', error);
      }
    }

    const localTestimonials = loadFromStorage<Testimonial[]>('testimonials', INITIAL_TESTIMONIALS);
    const index = localTestimonials.findIndex((t) => t.id === id);
    if (index >= 0) {
      localTestimonials[index] = newTestimonial;
    } else {
      localTestimonials.push(newTestimonial);
    }
    saveToStorage('testimonials', localTestimonials);
    return newTestimonial;
  },

  async deleteTestimonial(id: string): Promise<void> {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'testimonials', id));
      } catch (error) {
        console.error('Error deleting testimonial from Firestore:', error);
      }
    }

    const localTestimonials = loadFromStorage<Testimonial[]>('testimonials', INITIAL_TESTIMONIALS);
    const updated = localTestimonials.filter((t) => t.id !== id);
    saveToStorage('testimonials', updated);
  },

  // --- FAQS ---
  async getFAQs(): Promise<FAQItem[]> {
    if (isFirebaseConfigured && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'faqs'));
        const faqs: FAQItem[] = [];
        querySnapshot.forEach((docSnap) => {
          faqs.push({ id: docSnap.id, ...docSnap.data() } as FAQItem);
        });
        if (faqs.length > 0) return faqs;
      } catch (error) {
        console.error('Error fetching FAQs from Firestore:', error);
      }
    }
    return loadFromStorage<FAQItem[]>('faqs', INITIAL_FAQS);
  },

  async saveFAQ(faq: Omit<FAQItem, 'id'> & { id?: string }): Promise<FAQItem> {
    const id = faq.id || `faq-${Date.now()}`;
    const newFAQ: FAQItem = { ...faq, id };

    if (isFirebaseConfigured && db) {
      try {
        if (faq.id) {
          await updateDoc(doc(db, 'faqs', faq.id), { ...newFAQ });
        } else {
          const docRef = await addDoc(collection(db, 'faqs'), { ...newFAQ });
          newFAQ.id = docRef.id;
        }
      } catch (error) {
        console.error('Error saving FAQ to Firestore:', error);
      }
    }

    const localFAQs = loadFromStorage<FAQItem[]>('faqs', INITIAL_FAQS);
    const index = localFAQs.findIndex((f) => f.id === id);
    if (index >= 0) {
      localFAQs[index] = newFAQ;
    } else {
      localFAQs.push(newFAQ);
    }
    saveToStorage('faqs', localFAQs);
    return newFAQ;
  },

  async deleteFAQ(id: string): Promise<void> {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'faqs', id));
      } catch (error) {
        console.error('Error deleting FAQ from Firestore:', error);
      }
    }

    const localFAQs = loadFromStorage<FAQItem[]>('faqs', INITIAL_FAQS);
    const updated = localFAQs.filter((f) => f.id !== id);
    saveToStorage('faqs', updated);
  },

  // --- CONTACT MESSAGES ---
  async getMessages(): Promise<ContactMessage[]> {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const messages: ContactMessage[] = [];
        querySnapshot.forEach((docSnap) => {
          messages.push({ id: docSnap.id, ...docSnap.data() } as ContactMessage);
        });
        if (messages.length > 0) return messages;
      } catch (error) {
        console.error('Error fetching messages from Firestore:', error);
      }
    }
    return loadFromStorage<ContactMessage[]>('messages', []);
  },

  async saveMessage(message: Omit<ContactMessage, 'id'>): Promise<ContactMessage> {
    const id = `msg-${Date.now()}`;
    const newMessage: ContactMessage = {
      ...message,
      id,
      createdAt: new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, 'messages'), { ...newMessage });
        newMessage.id = docRef.id;
      } catch (error) {
        console.error('Error saving message to Firestore:', error);
      }
    }

    const localMessages = loadFromStorage<ContactMessage[]>('messages', []);
    localMessages.unshift(newMessage);
    saveToStorage('messages', localMessages);
    return newMessage;
  },

  async deleteMessage(id: string): Promise<void> {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'messages', id));
      } catch (error) {
        console.error('Error deleting message from Firestore:', error);
      }
    }

    const localMessages = loadFromStorage<ContactMessage[]>('messages', []);
    const updated = localMessages.filter((m) => m.id !== id);
    saveToStorage('messages', updated);
  }
};
