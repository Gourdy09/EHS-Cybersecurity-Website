'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Terminal, Cpu, Wifi } from 'lucide-react';

const TYPING_TEXT = 'Defend. Hack. Secure.';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Staggered reveal
    tl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      .fromTo(headlineRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .fromTo(terminalRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');

    // Floating particles
    gsap.utils.toArray<HTMLElement>('.particle').forEach((el, i) => {
      gsap.to(el, {
        y: `random(-20, 20)`,
        x: `random(-10, 10)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      });
    });

    // Typing effect
    const text = TYPING_TEXT;
    let i = 0;
    const typeInterval = setInterval(() => {
      if (typedRef.current && i <= text.length) {
        typedRef.current.textContent = text.slice(0, i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: '64px' }}
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%)' }} />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="particle absolute rounded-full pointer-events-none"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${8 + i * 7.5}%`,
            top: `${15 + (i % 5) * 15}%`,
            background: i % 3 === 0 ? 'var(--cyan)' : i % 3 === 1 ? 'var(--green)' : 'var(--border-bright)',
            opacity: 0.4 + (i % 4) * 0.1,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-20">
        {/* Left: Text */}
        <div>
          <div className="hero-badge inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded"
            style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--green)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--cyan)', letterSpacing: '0.12em' }}>
              RECRUITING — FALL 2026
            </span>
          </div>

          <h1 ref={headlineRef}
            className="mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}>
            EHS{' '}
            <span className="glow-cyan" style={{ color: 'var(--cyan)' }}>Cyber</span>
            <br />Security
            <br />Club
          </h1>

          <p ref={subtitleRef}
            className="mb-8 max-w-md"
            style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Learn ethical hacking, compete in CTFs, and build real-world security skills.
            Open to all students. no experience required.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-3">
            <a href="#join"
              className="px-6 py-3 rounded text-sm font-semibold transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, var(--cyan), var(--cyan-dim))',
                color: 'var(--bg)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.06em',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
              JOIN THE CLUB
            </a>
            <a href="#events"
              className="px-6 py-3 rounded text-sm transition-all duration-200"
              style={{
                color: 'var(--cyan)',
                border: '1px solid var(--border-bright)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.06em',
                background: 'rgba(0,212,255,0.04)',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.1)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.04)'}>
              VIEW EVENTS
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10">
            {[
              { value: '80+', label: 'Members' },
              { value: '12', label: 'CTFs / Year' },
              { value: '#1', label: 'State Ranking' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--cyan)' }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Terminal window */}
        <div ref={terminalRef} className="hidden md:block">
          <div className="rounded-xl overflow-hidden animate-pulse-glow"
            style={{ border: '1px solid var(--border-bright)', background: 'var(--bg-card)' }}>
            {/* Terminal bar */}
            <div className="flex items-center gap-2 px-4 py-3"
              style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              <span className="ml-3 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                ehs-cyber ~ bash
              </span>
            </div>
            {/* Terminal content */}
            <div className="p-6" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', lineHeight: 1.8 }}>
              <p style={{ color: 'var(--text-dim)' }}>$ whoami</p>
              <p style={{ color: 'var(--green)' }}>ehs_cyber_club</p>
              <br />
              <p style={{ color: 'var(--text-dim)' }}>$ cat mission.txt</p>
              <p style={{ color: 'var(--text)' }}><span ref={typedRef}></span><span className="cursor-blink" style={{ color: 'var(--cyan)' }}>|</span></p>
              <br />
              <p style={{ color: 'var(--text-dim)' }}>$ ls ./skills/</p>
              <div className="grid grid-cols-2 gap-x-4">
                {['ethical-hacking/', 'cryptography/', 'ctf-solving/', 'network-sec/', 'osint/', 'web-exploit/'].map(s => (
                  <p key={s} style={{ color: 'var(--cyan)' }}>{s}</p>
                ))}
              </div>
              <br />
              <p style={{ color: 'var(--text-dim)' }}>$ nmap -sV localhost</p>
              <p style={{ color: 'var(--amber)' }}>PORT     STATE  SERVICE</p>
              <p style={{ color: 'var(--text)' }}>80/tcp   open   http</p>
              <p style={{ color: 'var(--text)' }}>443/tcp  open   https</p>
              <p style={{ color: 'var(--text)' }}>22/tcp   open   ssh</p>
              <br />
              <p style={{ color: 'var(--text-dim)' }}>$ <span className="cursor-blink" style={{ color: 'var(--cyan)' }}>█</span></p>
            </div>
          </div>

          {/* Floating badges */}
          <div className="flex justify-end gap-3 mt-4">
            {[
              { icon: <Terminal size={14} />, label: 'Kali Linux' },
              { icon: <Cpu size={14} />, label: 'CTF Ready' },
              { icon: <Wifi size={14} />, label: 'Network Sec' },
            ].map(b => (
              <div key={b.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded animate-float"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                }}>
                <span style={{ color: 'var(--cyan)' }}>{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>
          SCROLL
        </span>
        <ChevronDown size={16} style={{ color: 'var(--text-dim)' }} />
      </div>
    </section>
  );
}