'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEvents, CATEGORY_CONFIG, ClubEvent, EventCategory } from '../contexts/eventsContext';
import { useAuth } from '../contexts/authContext';
import { Calendar, Clock, MapPin, Plus, Pencil, Trash2, X, ExternalLink } from 'lucide-react';
import { format, parseISO } from 'date-fns';

gsap.registerPlugin(ScrollTrigger);

const EMPTY_FORM = {
  title: '', description: '', date: '', time: '', location: '',
  category: 'workshop' as EventCategory, registrationLink: '',
};

export default function Events() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { isAdmin } = useAuth();
  const sectionRef = useRef<HTMLElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [filterCat, setFilterCat] = useState<EventCategory | 'all'>('all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.events-heading',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.events-heading', start: 'top 85%' } }
      );
      gsap.fromTo('.event-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: '.events-grid', start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const sortedEvents = [...events]
    .filter(e => filterCat === 'all' || e.category === filterCat)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (event: ClubEvent) => {
    setEditingId(event.id);
    setForm({
      title: event.title, description: event.description, date: event.date,
      time: event.time, location: event.location, category: event.category,
      registrationLink: event.registrationLink || '',
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateEvent(editingId, form);
    } else {
      addEvent(form);
    }
    setShowModal(false);
  };

  return (
    <section id="events" ref={sectionRef} className="relative py-28 px-6">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(170deg, var(--bg) 0%, var(--bg-2) 100%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="events-heading flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: 'var(--amber)' }} />
              <span className="tag" style={{ color: 'var(--amber)', borderColor: 'rgba(255,170,0,0.3)' }}>
                EVENTS
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
              Upcoming <span style={{ color: 'var(--amber)' }}>Events</span>
            </h2>
          </div>

          {isAdmin && (
            <button onClick={openAdd}
              className="flex items-center gap-2 px-5 py-2.5 rounded text-sm transition-all"
              style={{
                background: 'rgba(0,212,255,0.1)',
                color: 'var(--cyan)',
                border: '1px solid var(--border-bright)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.05em',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.18)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.1)'}>
              <Plus size={16} /> ADD EVENT
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilterCat('all')}
            className="px-3 py-1.5 rounded text-xs transition-all"
            style={{
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em',
              background: filterCat === 'all' ? 'var(--cyan)' : 'var(--bg-card)',
              color: filterCat === 'all' ? 'var(--bg)' : 'var(--text-muted)',
              border: '1px solid',
              borderColor: filterCat === 'all' ? 'var(--cyan)' : 'var(--border)',
            }}>
            ALL
          </button>
          {(Object.entries(CATEGORY_CONFIG) as [EventCategory, typeof CATEGORY_CONFIG[EventCategory]][]).map(([key, cfg]) => (
            <button key={key} onClick={() => setFilterCat(key)}
              className="px-3 py-1.5 rounded text-xs transition-all"
              style={{
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.06em',
                background: filterCat === key ? cfg.color : 'var(--bg-card)',
                color: filterCat === key ? 'var(--bg)' : 'var(--text-muted)',
                border: '1px solid',
                borderColor: filterCat === key ? cfg.color : 'var(--border)',
              }}>
              {cfg.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <div className="events-grid grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedEvents.map(event => {
            const cfg = CATEGORY_CONFIG[event.category];
            const dateObj = parseISO(event.date);
            return (
              <div key={event.id} className="event-card group relative p-6 rounded-xl flex flex-col gap-3 transition-all duration-300"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = cfg.color;
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}>
                {/* Date badge */}
                <div className="absolute top-4 right-4 text-center px-3 py-2 rounded-lg"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.color}40` }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: cfg.color, lineHeight: 1 }}>
                    {format(dateObj, 'd')}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: cfg.color, letterSpacing: '0.1em' }}>
                    {format(dateObj, 'MMM').toUpperCase()}
                  </div>
                </div>

                {/* Category tag */}
                <span className="self-start tag" style={{ color: cfg.color, borderColor: `${cfg.color}40`, fontFamily: 'var(--font-mono)' }}>
                  {cfg.label}
                </span>

                <h3 className="pr-16"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', lineHeight: 1.3 }}>
                  {event.title}
                </h3>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, flexGrow: 1 }}>
                  {event.description}
                </p>

                <div className="flex flex-col gap-1.5 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    <Clock size={11} />
                    {format(dateObj, 'EEEE, MMMM d')} · {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    <MapPin size={11} />
                    {event.location}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 mt-1">
                  {event.registrationLink && (
                    <a href={event.registrationLink}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-xs transition-all"
                      style={{
                        background: cfg.bg,
                        color: cfg.color,
                        border: `1px solid ${cfg.color}30`,
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.06em',
                      }}>
                      REGISTER <ExternalLink size={10} />
                    </a>
                  )}
                  {isAdmin && (
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(event)}
                        className="p-2 rounded transition-all"
                        style={{ background: 'rgba(0,212,255,0.08)', color: 'var(--cyan)', border: '1px solid var(--border)' }}
                        title="Edit event">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => deleteEvent(event.id)}
                        className="p-2 rounded transition-all"
                        style={{ background: 'rgba(255,68,102,0.08)', color: 'var(--red)', border: '1px solid var(--border)' }}
                        title="Delete event">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {sortedEvents.length === 0 && (
          <div className="text-center py-16"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            No events in this category yet.
            {isAdmin && <span style={{ color: 'var(--cyan)' }}> Click &quot;ADD EVENT&quot; to create one.</span>}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-bright)' }}>
            <div className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>
                {editingId ? 'Edit Event' : 'New Event'}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ color: 'var(--text-dim)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              {[
                { label: 'TITLE', key: 'title', type: 'text', required: true },
                { label: 'DATE', key: 'date', type: 'date', required: true },
                { label: 'TIME', key: 'time', type: 'text', placeholder: 'e.g. 3:30 PM', required: true },
                { label: 'LOCATION', key: 'location', type: 'text', required: true },
                { label: 'REGISTRATION LINK (optional)', key: 'registrationLink', type: 'url', required: false },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs mb-1.5"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    required={field.required}
                    placeholder={(field as { placeholder?: string }).placeholder}
                    className="w-full px-4 py-2.5 rounded outline-none text-sm"
                    style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs mb-1.5"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                  CATEGORY
                </label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value as EventCategory })}
                  className="w-full px-4 py-2.5 rounded outline-none text-sm"
                  style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
                  {(Object.entries(CATEGORY_CONFIG) as [EventCategory, typeof CATEGORY_CONFIG[EventCategory]][]).map(([key, cfg]) => (
                    <option key={key} value={key}>{cfg.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs mb-1.5"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                  DESCRIPTION
                </label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  required
                  className="w-full px-4 py-2.5 rounded outline-none text-sm resize-none"
                  style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded text-sm transition-all"
                  style={{ background: 'var(--bg-2)', color: 'var(--text-muted)', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)' }}>
                  CANCEL
                </button>
                <button type="submit"
                  className="flex-1 py-2.5 rounded text-sm font-semibold transition-all"
                  style={{ background: 'var(--bg-2)', color: 'var(--text-muted)', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)' }}>
                  {editingId ? 'UPDATE' : 'CREATE'} EVENT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}