'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MISSION_ITEMS = [
  {
    icon: <Target size={28} />,
    title: 'Our Mission',
    color: 'var(--cyan)',
    text: 'To empower every student at EHS with cybersecurity knowledge and skills. Creating the next generation of defenders, builders, and leaders in digital security.',
  },
  {
    icon: <Eye size={28} />,
    title: 'Our Vision',
    color: 'var(--green)',
    text: 'A future where every student graduates with the ability to protect themselves and others online. We believe security literacy is as important as reading and writing.',
  },
  {
    icon: <Heart size={28} />,
    title: 'Our Values',
    color: '#ff88cc',
    text: 'Inclusivity, ethics, and curiosity above all. We celebrate diversity in thought and background. Hacking is about problem-solving, not breaking things.',
  },
];

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.mission-item',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.2,
          scrollTrigger: { trigger: '.mission-grid', start: 'top 80%' },
        }
      );
      gsap.fromTo('.mission-headline',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.mission-headline', start: 'top 85%' } }
      );
      gsap.fromTo('.cta-block',
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.cta-block', start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="mission" ref={sectionRef} className="relative py-28 px-6 overflow-hidden">
      {/* Diagonal divider */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(170deg, var(--bg-2) 0%, var(--bg) 50%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12" style={{ background: 'var(--green)' }} />
          <span className="tag" style={{ color: 'var(--green)', borderColor: 'rgba(0,255,136,0.3)' }}>
            OUR PURPOSE
          </span>
        </div>

        <h2 className="mission-headline mb-16"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
          What We Stand For
        </h2>

        <div className="mission-grid grid md:grid-cols-3 gap-6 mb-20">
          {MISSION_ITEMS.map((item) => (
            <div key={item.title} className="mission-item relative p-8 rounded-xl overflow-hidden"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              {/* Glow corner */}
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${item.color}10, transparent)` }} />

              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>
                {item.icon}
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

        {/* CTA Banner */}
        <div className="cta-block relative p-10 rounded-2xl overflow-hidden text-center"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-bright)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 60%)' }} />

          <div className="relative z-10">
            <p className="mb-3" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>
              // READY TO LEVEL UP?
            </p>
            <h3 className="mb-4"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              Meetings every{' '}
              <span style={{ color: 'var(--cyan)' }}>Thursday at 3:30 PM</span>
            </h3>
            <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 2rem' }}>
              Room 632 Bring a laptop if you have one. No experience needed. Just curiosity.
            </p>
            <a href="#join"
              className="inline-block px-8 py-3 rounded text-sm font-semibold transition-all"
              style={{
                background: 'var(--cyan)',
                color: 'var(--bg)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.08em',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(0,212,255,0.5)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}>
              I&apos;M INTERESTED →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}