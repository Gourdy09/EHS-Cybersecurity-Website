'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye, Heart } from 'lucide-react';
import siteData from '../siteData.json';

gsap.registerPlugin(ScrollTrigger);

const d = siteData.mission;

const ITEM_ICONS = [
  <Target size={28} key="target" />,
  <Eye size={28} key="eye" />,
  <Heart size={28} key="heart" />,
];

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.mission-item',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.2,
          scrollTrigger: { trigger: '.mission-grid', start: 'top 80%' } });
      gsap.fromTo('.mission-headline',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.mission-headline', start: 'top 85%' } });
      gsap.fromTo('.cta-block',
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.cta-block', start: 'top 85%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="mission" ref={sectionRef} className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(170deg, var(--bg-2) 0%, var(--bg) 50%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12" style={{ background: 'var(--green)' }} />
          <span className="tag" style={{ color: 'var(--green)', borderColor: 'rgba(0,255,136,0.3)' }}>
            {d.tagLabel}
          </span>
        </div>

        <h2 className="mission-headline mb-16"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.1 }}>
          {d.heading}
        </h2>

        <div className="mission-grid grid md:grid-cols-3 gap-6 mb-20">
          {d.items.map((item, i) => (
            <div key={item.title} className="mission-item relative p-8 rounded-xl overflow-hidden"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${item.color}10, transparent)` }} />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>
                {ITEM_ICONS[i]}
              </div>
              <h3 className="mb-4"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: item.color }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="cta-block relative p-10 rounded-2xl overflow-hidden text-center"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-bright)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 60%)' }} />
          <div className="relative z-10">
            <p className="mb-3" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>
              {d.cta.preText}
            </p>
            <h3 className="mb-4"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem,3vw,2.5rem)' }}>
              {d.cta.heading.split('Thursday').map((part, i) =>
                i === 0 ? <span key={i}>{part}<span style={{ color: 'var(--cyan)' }}>Thursday</span></span> : <span key={i}>{part}</span>
              )}
            </h3>
            <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 2rem' }}>
              {d.cta.subtext}
            </p>
            <a href={d.cta.buttonHref}
              className="inline-block px-8 py-3 rounded text-sm font-semibold transition-all"
              style={{ background: 'var(--cyan)', color: 'var(--bg)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(0,212,255,0.5)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}>
              {d.cta.buttonLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}