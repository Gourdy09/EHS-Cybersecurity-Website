'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Trophy, Brain, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    icon: <Brain size={24} />,
    title: 'Learn',
    desc: 'Hands-on workshops in ethical hacking, malware analysis, and digital forensics taught by students and professionals.',
    color: 'var(--cyan)',
  },
  {
    icon: <Trophy size={24} />,
    title: 'Compete',
    desc: 'Represent EHS in Capture The Flag competitions, CyberPatriot, and national cybersecurity championships.',
    color: 'var(--green)',
  },
  {
    icon: <Code2 size={24} />,
    title: 'Build',
    desc: 'Create real security tools, contribute to open source projects, and develop a portfolio that opens doors.',
    color: 'var(--amber)',
  },
  {
    icon: <Users size={24} />,
    title: 'Connect',
    desc: 'Network with industry professionals, mentors, and a community of passionate students who share your interests.',
    color: '#ff88cc',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-heading', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-heading', start: 'top 85%' } }
      );

      gsap.fromTo('.about-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2,
          scrollTrigger: { trigger: '.about-text', start: 'top 85%' } }
      );

      gsap.fromTo('.pillar-card',
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.pillars-grid', start: 'top 80%' } }
      );

      gsap.fromTo('.image-placeholder',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.image-placeholder', start: 'top 80%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: 'var(--cyan)' }} />
            <span className="tag" style={{ color: 'var(--cyan)', borderColor: 'var(--border-bright)' }}>
              ABOUT US
            </span>
          </div>
          <h2 className="about-heading mb-4"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
            Why Join the{' '}
            <span style={{ color: 'var(--cyan)' }}>EHS Cyber Club?</span>
          </h2>
          <p className="about-text max-w-2xl"
            style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Cybersecurity is one of the fastest-growing fields in tech — and you don't need to wait until college to get started. 
            We're a student-led club that makes security skills accessible to everyone, regardless of background.
          </p>
        </div>

        {/* Two-column: image + stats */}
        <div className="grid md:grid-cols-2 gap-10 mb-20 items-center">
          {/* Image placeholder */}
          <div className="image-placeholder">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden"
              style={{ border: '1px solid var(--border)' }}>
              {/* Placeholder image area */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                style={{ background: 'linear-gradient(135deg, var(--bg-card), var(--bg-2))' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid var(--border-bright)' }}>
                  <Users size={32} style={{ color: 'var(--cyan)' }} />
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', textAlign: 'center', maxWidth: '200px' }}>
                  📸 Drop your club photo here<br />
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>(Replace with actual image)</span>
                </p>
              </div>
              {/* Corner decorations */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: 'var(--cyan)' }} />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: 'var(--cyan)' }} />
            </div>
          </div>

          {/* Stats + text */}
          <div className="flex flex-col gap-6">
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              Founded in 2019, EHS Cybersecurity Club has grown from a handful of students to one of the largest tech clubs in the district. 
              We meet weekly to learn, practice, and build skills that matter.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '2019', label: 'Founded' },
                { num: '80+', label: 'Active Members' },
                { num: '15+', label: 'Competitions Won' },
                { num: '100%', label: 'Free to Join' },
              ].map(stat => (
                <div key={stat.label} className="p-4 rounded-lg"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--cyan)' }}>
                    {stat.num}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Four pillars */}
        <div className="pillars-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((p) => (
            <div key={p.title}
              className="pillar-card p-6 rounded-xl group cursor-default transition-all duration-300"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = p.color;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${p.color}18`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: `${p.color}18`, color: p.color }}>
                {p.icon}
              </div>
              <h3 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: p.color }}>
                {p.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}