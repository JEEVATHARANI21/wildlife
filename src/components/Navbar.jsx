import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Navbar() {
  const navRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Only show navbar after scrolling past the 700vh hero section
      const threshold = window.innerHeight * 7
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
        background: 'linear-gradient(to bottom, rgba(11,12,10,0.95), transparent)',
        transition: 'background 0.5s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <a
        href="#"
        className="flex items-center gap-3.5 group"
      >
        <img
          src="/logo.png"
          alt="UntamedTrails Logo"
          className="w-9 h-9 object-contain brightness-110 drop-shadow-md group-hover:scale-105 transition-transform duration-300"
        />
        <span
          className="font-sans text-sm tracking-[0.25em] uppercase font-medium"
          style={{ color: 'var(--text)' }}
        >
          UNTAMED<span style={{ color: 'var(--muted)', fontWeight: 300 }}>TRAILS</span>
        </span>
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

