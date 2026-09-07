import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Navbar() {
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
        className="flex items-center gap-3.5 group"
      >
        <div className="flex items-center justify-center p-1.5 rounded-lg bg-black/40 border border-white/10 group-hover:border-[#B3874B]/50 transition-all duration-300">
          <img
            src="/logo-icon.png"
            alt="UntamedTrails Logo"
            className="h-10 md:h-11 w-auto object-contain brightness-125 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col">
          <span
            className="font-sans text-base md:text-lg tracking-[0.26em] uppercase font-bold text-[#F1EFE8] leading-none"
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
      </ul>
    </nav>
  )
}

