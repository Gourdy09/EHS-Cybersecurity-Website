'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Mail, MessageCircle } from 'lucide-react';
import siteData from '../siteData.json';

gsap.registerPlugin(ScrollTrigger);

const d = siteData.join;

const CONTACT_ICONS: Record<string, React.ReactNode> = {
  'Email Us': <Mail size={20} />,
  'Discord': <MessageCircle size={20} />,
};

export default function Join() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.join-content',
        { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.join-content', start: 'top 80%' }
      });
      gsap.fromTo('.join-step',
        { opacity: 0, x: -30 }, {
          opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', stagger: 0.15,
        scrollTrigger: { trigger: '.join-steps', start: 'top 85%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="join" ref={sectionRef} className="relative pt-28 pb-14 px-6">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,212,255,0.06) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="join-content">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: 'var(--green)' }} />
            <span className="tag" style={{ color: 'var(--green)', borderColor: 'rgba(0,255,136,0.3)' }}>
              {d.tagLabel}
            </span>
            <div className="h-px w-12" style={{ background: 'var(--green)' }} />
          </div>
          <h2 className="mb-4"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.1 }}>
            {d.heading.replace('Join?', '')}<span style={{ color: 'var(--green)' }}>Join?</span>
          </h2>
          <p className="mb-16 mx-auto max-w-lg"
            style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            {d.subheading}
          </p>
        </div>

        <div className="join-steps grid sm:grid-cols-3 gap-4 mb-16 text-left">
          {d.steps.map(step => (
            <div key={step.num} className="join-step p-6 rounded-xl"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="mb-3" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--green)', letterSpacing: '0.1em' }}>
                STEP {step.num}
              </div>
              <h4 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--cyan)' }}>
                {step.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-lg mx-auto">
          {d.contacts.map(c => (
            <div key={c.label} className="p-5 rounded-xl flex flex-col items-center gap-2 transition-all duration-200"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = c.color}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}>
              <div style={{ color: c.color }}>{CONTACT_ICONS[c.label]}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem' }}>{c.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.03em' }}>
                {c.value}
              </div>
            </div>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)' }}>
          <CheckCircle size={14} style={{ color: 'var(--green)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--green)', letterSpacing: '0.08em' }}>
            {d.footerBadge}
          </span>
        </div>
      </div>
      <div className="flex justify-center pt-14">
        <span className="font-mono">
          Made w/
          <span className="text-red-500">
            &nbsp;&lt;3&nbsp;
          </span>
          by&nbsp;
          <a href="https://gourdy09.github.io" className="underline!">
            Om Patel
          </a>.
        </span>
      </div>
    </section>
  );
}