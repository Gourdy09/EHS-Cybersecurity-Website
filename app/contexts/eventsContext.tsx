'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type EventCategory = 'ctf' | 'workshop' | 'meeting' | 'wwc' | 'social' | 'competition';

export interface ClubEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  imageUrl?: string;
  registrationLink?: string;
}

interface EventsContextType {
  events: ClubEvent[];
  loading: boolean;
  addEvent: (event: Omit<ClubEvent, 'id'>) => Promise<void>;
  updateEvent: (id: string, event: Partial<ClubEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

const EventsContext = createContext<EventsContextType>({
  events: [],
  loading: true,
  addEvent: async () => {},
  updateEvent: async () => {},
  deleteEvent: async () => {},
});

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Load events from API on mount
  useEffect(() => {
    fetch('/api/events')
      .then(r => r.json())
      .then(data => {
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const addEvent = async (event: Omit<ClubEvent, 'id'>) => {
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    const newEvent: ClubEvent = await res.json();
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = async (id: string, update: Partial<ClubEvent>) => {
    const res = await fetch(`/api/events/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update),
    });
    const updated: ClubEvent = await res.json();
    setEvents(prev => prev.map(e => e.id === id ? updated : e));
  };

  const deleteEvent = async (id: string) => {
    await fetch(`/api/events/${id}`, { method: 'DELETE' });
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <EventsContext.Provider value={{ events, loading, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export const useEvents = () => useContext(EventsContext);

export const CATEGORY_CONFIG: Record<EventCategory, { label: string; color: string; bg: string }> = {
  ctf:         { label: 'CTF',            color: '#00d4ff', bg: 'rgba(0,212,255,0.1)' },
  workshop:    { label: 'Workshop',       color: '#00ff88', bg: 'rgba(0,255,136,0.1)' },
  meeting:     { label: 'Meeting',        color: '#7aa3c0', bg: 'rgba(122,163,192,0.1)' },
  wwc:         { label: 'Women Who Code', color: '#ff88cc', bg: 'rgba(255,136,204,0.1)' },
  social:      { label: 'Social',        color: '#ffaa00', bg: 'rgba(255,170,0,0.1)' },
  competition: { label: 'Competition',   color: '#ff6644', bg: 'rgba(255,102,68,0.1)' },
};