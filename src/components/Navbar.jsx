import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Navbar({ openLegal }) {
  const navRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Only show navbar after scrolling past the hero section
      const threshold = window.innerHeight * 1.8
      setVisible(window.scrollY > threshold)
      setScrolled(window.scrollY > threshold + 80)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.to(navRef.current, {
      y: visible ? 0 : -30,
      opacity: visible ? 1 : 0,
      duration: 0.6,
      ease: 'power3.out',
    })
  }, [visible])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6"
      style={{
        opacity: 0,
        background: scrolled
          ? 'rgba(11, 12, 10, 0.88)'
          : 'linear-gradient(to bottom, rgba(11,12,10,0.9), transparent)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(42, 43, 40, 0.6)' : 'none',
        transition: 'all 0.4s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <a
        href="#"
        className="flex items-center gap-3.5 group logo-brand-group"
      >
        <div className="flex items-center justify-center p-1.5 rounded-lg bg-black/40 border border-white/10 group-hover:border-[#B3874B]/50 transition-all duration-300">
          <img
            src="/logo-icon.png"
            alt="UntamedTrails Logo"
            className="h-10 md:h-11 w-auto object-contain brightness-125 logo-icon-img animate-leopard-prowl"
            style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease' }}
          />
        </div>
        <div className="flex flex-col">
          <span
            className="font-sans text-base md:text-lg tracking-[0.26em] uppercase font-bold text-[#F1EFE8] leading-none logo-brand-title shimmer-gold-text"
            style={{ transition: 'letter-spacing 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            UNTAMED<span className="text-[#B3874B] font-light">TRAILS</span>
          </span>
          <span className="font-sans text-[8px] tracking-[0.35em] uppercase text-[#888] mt-1 hidden sm:inline">
            Wildlife Photography Studio
          </span>
        </div>
      </a>

      <ul className="hidden md:flex items-center gap-10">
        {['WORK', 'ABOUT', 'CONTACT'].map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="nav-link font-sans text-xs tracking-[0.18em] uppercase"
              style={{ color: 'var(--muted)', transition: 'color 0.3s ease' }}
              onMouseEnter={e => e.target.style.color = 'var(--text)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >
              {link}
            </a>
          </li>
        ))}
        <li>
          <a
            href="https://www.instagram.com/vijaymathiew_photography?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#B3874B] text-[10px] tracking-[0.18em] uppercase text-[#F1EFE8] hover:text-[#B3874B] transition-all bg-white/5"
            title="Follow @vijaymathiew_photography on Instagram"
          >
            <svg
              className="w-3.5 h-3.5 text-[#B3874B]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span>Instagram</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

