'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type EventCategory = 'ctf' | 'workshop' | 'meeting' | 'wwc' | 'social' | 'competition';

export interface ClubEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
  time: string;
  location: string;
  category: EventCategory;
  imageUrl?: string;
  registrationLink?: string;
}

interface EventsContextType {
  events: ClubEvent[];
  addEvent: (event: Omit<ClubEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<ClubEvent>) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextType>({
  events: [],
  addEvent: () => {},
  updateEvent: () => {},
  deleteEvent: () => {},
});

const DEFAULT_EVENTS: ClubEvent[] = [
  {
    id: '1',
    title: 'Capture The Flag — Spring 2025',
    description: 'Compete in teams to solve cybersecurity challenges across web exploitation, cryptography, reverse engineering, and forensics.',
    date: '2025-05-15',
    time: '9:00 AM',
    location: 'EHS Computer Lab B',
    category: 'ctf',
    registrationLink: '#',
  },
  {
    id: '2',
    title: 'Intro to Ethical Hacking',
    description: 'Hands-on workshop covering Kali Linux basics, network scanning, and responsible disclosure.',
    date: '2025-05-22',
    time: '3:30 PM',
    location: 'Room 214',
    category: 'workshop',
  },
  {
    id: '3',
    title: 'Women Who Code — Networking Night',
    description: 'Connect with women professionals in cybersecurity and tech. Panel discussion, Q&A, and resume review.',
    date: '2025-06-03',
    time: '5:00 PM',
    location: 'EHS Auditorium',
    category: 'wwc',
    registrationLink: '#',
  },
  {
    id: '4',
    title: 'Monthly Club Meeting',
    description: 'General meeting: updates, upcoming competition prep, and member showcase.',
    date: '2025-05-08',
    time: '3:30 PM',
    location: 'Room 214',
    category: 'meeting',
  },
  {
    id: '5',
    title: 'CyberPatriot Prep Session',
    description: 'Practice rounds for the national CyberPatriot competition. Open to all skill levels.',
    date: '2025-06-12',
    time: '4:00 PM',
    location: 'EHS Computer Lab A',
    category: 'competition',
  },
  {
    id: '6',
    title: 'Women Who Code — Beginner Coding Night',
    description: 'A safe, supportive space to learn Python basics. No experience needed — laptops provided.',
    date: '2025-06-18',
    time: '3:30 PM',
    location: 'Library Tech Room',
    category: 'wwc',
  },
];

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<ClubEvent[]>(DEFAULT_EVENTS);

  useEffect(() => {
    const stored = localStorage.getItem('ehsCyberEvents');
    if (stored) {
      try { setEvents(JSON.parse(stored)); } catch {}
    }
  }, []);

  const persist = (evts: ClubEvent[]) => {
    setEvents(evts);
    localStorage.setItem('ehsCyberEvents', JSON.stringify(evts));
  };

  const addEvent = (event: Omit<ClubEvent, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    persist([...events, newEvent]);
  };

  const updateEvent = (id: string, update: Partial<ClubEvent>) => {
    persist(events.map(e => e.id === id ? { ...e, ...update } : e));
  };

  const deleteEvent = (id: string) => {
    persist(events.filter(e => e.id !== id));
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export const useEvents = () => useContext(EventsContext);

export const CATEGORY_CONFIG: Record<EventCategory, { label: string; color: string; bg: string }> = {
  ctf: { label: 'CTF', color: '#00d4ff', bg: 'rgba(0,212,255,0.1)' },
  workshop: { label: 'Workshop', color: '#00ff88', bg: 'rgba(0,255,136,0.1)' },
  meeting: { label: 'Meeting', color: '#7aa3c0', bg: 'rgba(122,163,192,0.1)' },
  wwc: { label: 'Women Who Code', color: '#ff88cc', bg: 'rgba(255,136,204,0.1)' },
  social: { label: 'Social', color: '#ffaa00', bg: 'rgba(255,170,0,0.1)' },
  competition: { label: 'Competition', color: '#ff6644', bg: 'rgba(255,102,68,0.1)' },
};