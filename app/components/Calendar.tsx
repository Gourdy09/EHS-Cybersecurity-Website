'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEvents, CATEGORY_CONFIG } from '../contexts/eventsContext';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  addDays, isSameMonth, isSameDay, addMonths, subMonths, parseISO
} from 'date-fns';

gsap.registerPlugin(ScrollTrigger);

export default function Calendar() {
  const { events } = useEvents();
  const sectionRef = useRef<HTMLElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.calendar-container',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.calendar-container', start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);

  // Build rows
  const weeks: Date[][] = [];
  let day = calStart;
  while (day <= calEnd) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(day);
      day = addDays(day, 1);
    }
    weeks.push(week);
  }

  const getEventsForDay = (date: Date) =>
    events.filter(e => isSameDay(parseISO(e.date), date));

  const selectedEvents = selectedDate ? getEventsForDay(selectedDate) : [];

  return (
    <section id="calendar" ref={sectionRef} className="relative py-28 px-6">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(170deg, var(--bg-2) 0%, var(--bg) 100%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12" style={{ background: 'var(--cyan)' }} />
          <span className="tag" style={{ color: 'var(--cyan)', borderColor: 'var(--border-bright)' }}>
            SCHEDULE
          </span>
        </div>
        <h2 className="mb-12"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
          Event <span style={{ color: 'var(--cyan)' }}>Calendar</span>
        </h2>

        <div className="calendar-container grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Calendar grid */}
          <div className="rounded-xl overflow-hidden"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            {/* Month header */}
            <div className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-2)' }}>
              <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-2 rounded transition-all"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--cyan)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>
                <ChevronLeft size={18} />
              </button>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-2 rounded transition-all"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--cyan)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}>
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 px-2 pt-3 pb-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="text-center py-1"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.08em' }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="px-2 pb-3">
              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7 gap-0.5">
                  {week.map((date, di) => {
                    const dayEvents = getEventsForDay(date);
                    const inMonth = isSameMonth(date, currentMonth);
                    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
                    const isToday = isSameDay(date, new Date());

                    return (
                      <button
                        key={di}
                        onClick={() => setSelectedDate(isSelected ? null : date)}
                        className="relative flex flex-col items-center py-2 rounded-lg transition-all duration-150 min-h-[56px]"
                        style={{
                          opacity: inMonth ? 1 : 0.25,
                          background: isSelected
                            ? 'rgba(0,212,255,0.15)'
                            : isToday
                            ? 'rgba(0,212,255,0.06)'
                            : 'transparent',
                          border: isSelected
                            ? '1px solid var(--cyan)'
                            : isToday
                            ? '1px solid rgba(0,212,255,0.3)'
                            : '1px solid transparent',
                        }}
                        onMouseEnter={e => {
                          if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                        }}
                        onMouseLeave={e => {
                          if (!isSelected) (e.currentTarget as HTMLElement).style.background = isToday ? 'rgba(0,212,255,0.06)' : 'transparent';
                        }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          fontWeight: isToday || isSelected ? 700 : 400,
                          color: isSelected ? 'var(--cyan)' : isToday ? 'var(--cyan)' : 'var(--text)',
                        }}>
                          {format(date, 'd')}
                        </span>
                        {/* Event dots */}
                        {dayEvents.length > 0 && (
                          <div className="flex gap-0.5 mt-1 flex-wrap justify-center max-w-[40px]">
                            {dayEvents.slice(0, 3).map(e => (
                              <div key={e.id}
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: CATEGORY_CONFIG[e.category].color }}
                              />
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 px-6 py-4"
              style={{ borderTop: '1px solid var(--border)' }}>
              {(Object.entries(CATEGORY_CONFIG) as [string, typeof CATEGORY_CONFIG[keyof typeof CATEGORY_CONFIG]][]).map(([, cfg]) => (
                <div key={cfg.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.06em' }}>
                    {cfg.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected day sidebar */}
          <div className="flex flex-col gap-4">
            <div className="p-5 rounded-xl"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', minHeight: '200px' }}>
              {selectedDate ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <CalendarIcon size={16} style={{ color: 'var(--cyan)' }} />
                    <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--cyan)' }}>
                      {format(selectedDate, 'MMMM d, yyyy')}
                    </h4>
                  </div>
                  {selectedEvents.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {selectedEvents.map(event => {
                        const cfg = CATEGORY_CONFIG[event.category];
                        return (
                          <div key={event.id} className="p-3 rounded-lg"
                            style={{ background: cfg.bg, border: `1px solid ${cfg.color}30` }}>
                            <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: cfg.color, letterSpacing: '0.06em' }}>
                              {cfg.label}
                            </span>
                            <p className="mt-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem' }}>
                              {event.title}
                            </p>
                            <p className="mt-0.5 text-xs" style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                              {event.time} · {event.location}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      No events on this day.
                    </p>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                  <CalendarIcon size={28} style={{ color: 'var(--border-bright)', marginBottom: '8px' }} />
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    Click a date to see events
                  </p>
                </div>
              )}
            </div>

            {/* Upcoming list */}
            <div className="p-5 rounded-xl"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <h4 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem' }}>
                Next Up
              </h4>
              <div className="flex flex-col gap-2">
                {events
                  .filter(e => new Date(e.date) >= new Date())
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 4)
                  .map(event => {
                    const cfg = CATEGORY_CONFIG[event.category];
                    return (
                      <div key={event.id} className="flex items-center gap-3 py-2"
                        style={{ borderBottom: '1px solid var(--border)' }}>
                        <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
                        <div className="flex-1 min-w-0">
                          <p className="truncate" style={{ fontSize: '0.8rem', fontWeight: 600 }}>{event.title}</p>
                          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)' }}>
                            {format(parseISO(event.date), 'MMM d')} · {event.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}