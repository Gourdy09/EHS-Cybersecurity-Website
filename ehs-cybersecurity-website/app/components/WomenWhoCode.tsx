'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Star, ArrowRight, UserCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WWC_FEATURES = [
  { title: 'Safe Space', desc: 'A welcoming environment designed specifically to support women and non-binary students in tech.' },
  { title: 'Mentorship', desc: 'Connect with women professionals in cybersecurity, software engineering, and tech leadership.' },
  { title: 'Networking', desc: 'Build connections with peers and industry mentors who understand your experience.' },
  { title: 'Skill Workshops', desc: 'Coding nights, resume reviews, and interview prep tailored for women entering tech.' },
];

const QUOTES = [
  { text: '"This club showed me that cybersecurity isn\'t just for guys. I found my community here."', name: 'Sarah K., Junior' },
  { text: '"The WWC events helped me land my first tech internship. The connections are real."', name: 'Maya R., Senior' },
];

export default function WomenWhoCode() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.wwc-header',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.wwc-header', start: 'top 85%' } }
      );
      gsap.fromTo('.wwc-feature',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: '.wwc-features', start: 'top 80%' } }
      );
      gsap.fromTo('.wwc-quote',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', stagger: 0.2,
          scrollTrigger: { trigger: '.wwc-quotes', start: 'top 85%' } }
      );
      gsap.fromTo('.wwc-image',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: '.wwc-image', start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="wwc" ref={sectionRef} className="relative py-28 px-6">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,136,204,0.03) 0%, transparent 50%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="wwc-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: '#ff88cc' }} />
              <span className="tag" style={{ color: '#ff88cc', borderColor: 'rgba(255,136,204,0.3)' }}>
                WOMEN WHO CODE
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
              Breaking Barriers<br />
              in <span style={{ color: '#ff88cc' }}>Cybersecurity</span>
            </h2>
          </div>
          <p className="max-w-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Women are drastically underrepresented in cybersecurity — just 24% of the workforce. 
            We're changing that, starting right here at EHS.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left column */}
          <div>
            {/* Stats banner */}
            <div className="p-6 rounded-xl mb-8"
              style={{ background: 'linear-gradient(135deg, rgba(255,136,204,0.1), rgba(255,136,204,0.04))', border: '1px solid rgba(255,136,204,0.25)' }}>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { val: '24%', label: 'Women in Cybersecurity' },
                  { val: '3M+', label: 'Global Talent Gap' },
                  { val: '$0', label: 'Cost to Join' },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: '#ff88cc' }}>
                      {s.val}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features list */}
            <div className="wwc-features flex flex-col gap-4 mb-8">
              {WWC_FEATURES.map(f => (
                <div key={f.title} className="wwc-feature flex gap-4 p-4 rounded-lg transition-all duration-200 group cursor-default"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,136,204,0.3)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}>
                  <div className="mt-0.5 flex-shrink-0">
                    <Star size={16} style={{ color: '#ff88cc' }} />
                  </div>
                  <div>
                    <div className="mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: '#ff88cc' }}>
                      {f.title}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a href="#join"
              className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold transition-all"
              style={{
                background: 'rgba(255,136,204,0.12)',
                color: '#ff88cc',
                border: '1px solid rgba(255,136,204,0.3)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.06em',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,136,204,0.2)';
                (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,136,204,0.12)';
                (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
              }}>
              <UserCheck size={16} /> JOIN WWC CHAPTER <ArrowRight size={14} />
            </a>
          </div>

          {/* Right column: image + quotes */}
          <div className="flex flex-col gap-6">
            {/* Image placeholder */}
            <div className="wwc-image relative w-full aspect-[4/3] rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,136,204,0.25)' }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                style={{ background: 'linear-gradient(135deg, rgba(255,136,204,0.08), var(--bg-2))' }}>
                <Sparkles size={40} style={{ color: '#ff88cc', opacity: 0.6 }} />
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,136,204,0.5)', textAlign: 'center' }}>
                  📸 Women Who Code event photo<br />
                  <span style={{ fontSize: '0.6rem', opacity: 0.7 }}>(Replace with real image)</span>
                </p>
              </div>
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: 'rgba(255,136,204,0.5)' }} />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: 'rgba(255,136,204,0.5)' }} />
              {/* Badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(255,136,204,0.15)', border: '1px solid rgba(255,136,204,0.3)', backdropFilter: 'blur(8px)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#ff88cc', letterSpacing: '0.1em' }}>
                  #WOMENWHOCODE
                </span>
              </div>
            </div>

            {/* Testimonials */}
            <div className="wwc-quotes flex flex-col gap-4">
              {QUOTES.map(q => (
                <div key={q.name} className="wwc-quote p-5 rounded-xl"
                  style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,136,204,0.15)' }}>
                  <p className="mb-3" style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>
                    {q.text}
                  </p>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#ff88cc', letterSpacing: '0.06em' }}>
                    — {q.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}