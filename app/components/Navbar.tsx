'use client';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/authContext';
import { Shield, Lock, LogOut, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#mission', label: 'Mission' },
  { href: '#wwc', label: 'Women Who Code' },
  { href: '#events', label: 'Events' },
  { href: '#calendar', label: 'Calendar' },
  { href: '#join', label: 'Join' },
];

export default function Navbar() {
  const { isAdmin, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const { login } = useAuth();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setShowLoginModal(false);
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Invalid password');
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#fafaf9] w-screen"
        style={{
          boxShadow: scrolled ? '0px 14px 50px -1px rgba(87,87,87,0.3)' : 'none'
        }}
      >
        <div className="px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
              <Shield size={32} style={{ color: 'var(--cyan)' }} className="group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.8)] transition-all" />
            </div>
            <div className="flex flex-col leading-none">
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text)' }}>
                EHS CYBER
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--cyan)', letterSpacing: '0.1em' }}>
                SECURITY CLUB
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-12">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm transition-all duration-200 rounded"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--cyan)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.06)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Admin / Login */}
          <div className="hidden md:flex items-center">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <span className="tag" style={{ color: 'var(--green)', borderColor: 'var(--green)', fontFamily: 'var(--font-mono)' }}>
                  ADMIN
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm transition-all"
                  style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-body)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--red)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-dim)'}
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 px-4 py-1.5 text-sm border rounded transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.05em',
                  color: 'var(--cyan)',
                  borderColor: 'var(--border-bright)',
                  background: 'rgba(0,212,255,0.04)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.1)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(0,212,255,0.2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.04)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <Lock size={12} /> ADMIN
              </button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            style={{ color: 'var(--cyan)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-2">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                {link.label}
              </a>
            ))}
            {!isAdmin && (
              <button onClick={() => { setShowLoginModal(true); setMobileOpen(false); }}
                className="mt-2 py-2 text-sm text-left"
                style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>
                Admin Login
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
          onClick={e => { if (e.target === e.currentTarget) setShowLoginModal(false); }}>
          <div className="w-full max-w-sm p-8 rounded-lg"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-bright)' }}>
            <div className="flex items-center gap-3 mb-6">
              <Lock size={20} style={{ color: 'var(--cyan)' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem' }}>
                Admin Access
              </h3>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                  PASSWORD
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded outline-none text-sm"
                  style={{
                    background: 'var(--bg-2)',
                    border: `1px solid ${loginError ? 'var(--red)' : 'var(--border)'}`,
                    color: 'var(--text)',
                    fontFamily: 'var(--font-mono)',
                  }}
                  placeholder="Enter admin password"
                  autoFocus
                />
                {loginError && <p className="mt-1 text-xs" style={{ color: 'var(--red)', fontFamily: 'var(--font-mono)' }}>{loginError}</p>}
              </div>
              <button type="submit"
                className="w-full py-3 rounded text-sm font-semibold transition-all"
                style={{
                  background: 'linear-gradient(135deg, var(--cyan), var(--cyan-dim))',
                  color: 'var(--bg)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.08em',
                }}>
                ACCESS GRANTED
              </button>
              <p className="text-center text-xs" style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                Demo password: <span style={{ color: 'var(--cyan)' }}>cyber2025</span>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}