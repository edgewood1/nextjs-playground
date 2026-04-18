'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, Layers, BookOpen, Shield, Zap } from 'lucide-react';

const TesseractCanvas = dynamic(() => import('./TesseractCanvas'), {
  ssr: false,
  loading: () => null,
});

const features = [
  {
    icon: Layers,
    title: 'Higher Dimensions',
    description:
      'Visualize real-time 4D geometry with WebGL. Watch a tesseract rotate through axes that don\'t exist in our 3D world.',
  },
  {
    icon: BookOpen,
    title: 'Interactive Learning',
    description:
      'Master Spanish verb conjugations through smart flashcards. Spaced repetition keeps vocabulary fresh and retention high.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description:
      'Protected routes with NextAuth.js, Prisma ORM, and bcrypt hashing. Your data stays yours.',
  },
];

export default function LandingPage({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: '#050505', color: '#F0F0F0', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
    >
      {/* Grain overlay */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* ── Navigation ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between transition-all duration-300"
        style={
          scrolled
            ? { backgroundColor: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }
            : undefined
        }
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-6 h-6 rounded-sm"
            style={{ backgroundColor: '#00e5ff', transform: 'rotate(12deg)' }}
          />
          <span className="font-semibold text-base tracking-tight" style={{ color: '#F0F0F0' }}>
            Playground
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'rgba(240,240,240,0.5)' }}>
          <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
          <a href="#about" className="hover:text-white transition-colors duration-200">About</a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: '#00e5ff', color: '#050505' }}
            >
              Launch App
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm transition-colors duration-200 hover:text-white"
                style={{ color: 'rgba(240,240,240,0.6)' }}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#00e5ff', color: '#050505' }}
              >
                Launch App
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center">
        {/* Tesseract — right side canvas */}
        <div className="absolute inset-0 md:left-[38%]">
          <TesseractCanvas />
        </div>

        {/* Gradient fade: left → transparent so text stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #050505 38%, rgba(5,5,5,0.7) 60%, transparent 85%)',
          }}
        />
        {/* Top + bottom fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #050505 0%, transparent 12%, transparent 88%, #050505 100%)',
          }}
        />

        {/* Hero text */}
        <div className="relative z-10 px-6 md:px-16 max-w-2xl pt-24 pb-16">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-8"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(240,240,240,0.45)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#00e5ff', animation: 'pulse 2s infinite' }}
            />
            Next.js 15 · TypeScript · WebGL
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
            style={{ color: '#F0F0F0' }}
          >
            Explore the{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #00e5ff 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Fourth
            </span>
            <br />
            Dimension
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed mb-10"
            style={{ color: 'rgba(240,240,240,0.45)', maxWidth: '38rem' }}
          >
            A modern web playground where 4D geometry comes alive. Interactive language tools,
            real-time rendering, and secure authentication — all in one place.
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href={isLoggedIn ? '/dashboard' : '/register'}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: '#00e5ff', color: '#050505' }}
            >
              Get Started
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/spanish"
              className="px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:text-white"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(240,240,240,0.6)',
              }}
            >
              Try Demo
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none"
          style={{ color: 'rgba(240,240,240,0.2)' }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8" style={{ backgroundColor: 'rgba(255,255,255,0.15)', animation: 'pulse 2s infinite' }} />
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="px-6 py-32 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#F0F0F0' }}>
            Built for the modern web
          </h2>
          <p style={{ color: 'rgba(240,240,240,0.35)', maxWidth: '36rem', margin: '0 auto' }}>
            Every feature crafted with performance and developer experience in mind.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-8 rounded-2xl transition-all duration-300 group"
              style={{
                border: '1px solid rgba(255,255,255,0.05)',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.04)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.09)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.02)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.05)';
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: 'rgba(0,229,255,0.08)' }}
              >
                <Icon size={19} style={{ color: '#00e5ff' }} />
              </div>
              <h3 className="text-base font-semibold mb-3" style={{ color: '#F0F0F0' }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,240,240,0.38)' }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="about" className="px-6 py-32 text-center">
        <div className="max-w-xl mx-auto">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-8"
            style={{ backgroundColor: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)' }}
          >
            <Zap size={20} style={{ color: '#00e5ff' }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: '#F0F0F0' }}>
            Ready to dive in?
          </h2>
          <p className="mb-10" style={{ color: 'rgba(240,240,240,0.38)' }}>
            Create an account to unlock everything, or start exploring the demo without signing up.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href={isLoggedIn ? '/dashboard' : '/register'}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: '#00e5ff', color: '#050505' }}
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Create Account'}
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/spanish"
              className="px-7 py-3.5 rounded-xl font-medium text-base transition-all duration-200 hover:text-white"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(240,240,240,0.5)' }}
            >
              Explore Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="px-6 py-7 flex items-center justify-between text-xs"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: 'rgba(240,240,240,0.18)' }}
      >
        <span>© 2026 Playground</span>
        <span>Built with Next.js & Three.js</span>
      </footer>
    </div>
  );
}
