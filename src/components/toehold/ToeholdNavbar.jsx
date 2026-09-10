import { useState, useEffect } from 'react'

export default function ToeholdNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Photo Tours', href: '#tours' },
    { label: '🐅 Animal Expeditions', href: '#animal-tracking' },
    { label: '🦅 Birding Tours', href: '#bird-photography' },
    { label: 'Founders', href: '#founders' },
    { label: 'The Difference', href: '#difference' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-400 select-none">
      {/* 1. Top Secondary Bar (Toehold Style utility bar) */}
      <div className={`hidden md:flex justify-between items-center px-6 lg:px-16 py-1.5 text-[11px] font-sans transition-all duration-300 ${
        scrolled ? 'bg-[#080908]/95 border-b border-white/5 py-1' : 'bg-black/60 backdrop-blur-md border-b border-white/10'
      }`}>
        <div className="flex items-center gap-5 text-[#A7A59B]">
          <span className="flex items-center gap-1.5 text-[#C5A059]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Official Photo Tour Schedules 2026–2027</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="hover:text-[#F1EFE8] transition-colors">
            Maximum 4 Photographers per Vehicle
          </span>
        </div>

        <div className="flex items-center gap-6 text-[#A7A59B]">
          {/* Direct Phone Call */}
          <a
            href="tel:+919087394546"
            className="flex items-center gap-1.5 hover:text-[#C5A059] transition-colors"
          >
            <span>📞</span>
            <span>+91 90873 94546</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/919087394546?text=Hello%20Untamed%20Trails,%20I'm%20interested%20in%20your%20upcoming%20Photo%20Tours."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors"
          >
            <span className="text-[#25D366]">💬</span>
            <span>WhatsApp Us</span>
          </a>

          {/* Instagram Link explicitly to untamed__trails__ */}
          <a
            href="https://www.instagram.com/untamed__trails__?stkn=OTU3MGI0bHR6OWZz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#C5A059] transition-colors"
            title="Follow @untamed__trails__ on Instagram"
          >
            <svg className="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span>@untamed__trails__</span>
          </a>
        </div>
      </div>

      {/* 2. Main Primary Navbar */}
      <nav className={`flex items-center justify-between px-5 sm:px-8 lg:px-16 py-3.5 sm:py-4 transition-all duration-400 ${
        scrolled
          ? 'bg-[#080908]/95 backdrop-blur-xl border-b border-[#2A2B28]/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-[#080908]/90 via-[#080908]/50 to-transparent'
      }`}>
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group no-underline">
          <div className="flex items-center justify-center p-1.5 rounded-xl bg-black/50 border border-white/10 group-hover:border-[#C5A059]/60 transition-all duration-300 shadow-md">
            <img
              src="/logo-icon.png"
              alt="Untamed Trails Logo"
              className="h-8 sm:h-9 w-auto object-contain brightness-125 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base sm:text-xl tracking-[0.18em] uppercase font-semibold text-[#F1EFE8] leading-tight">
              UNTAMED <span className="text-[#C5A059] font-normal">TRAILS</span>
            </span>
            <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-[#888] font-medium">
              Photo Tours & Expeditions
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden xl:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="font-sans text-xs tracking-[0.14em] uppercase text-[#A7A59B] hover:text-[#F1EFE8] hover:border-b-2 hover:border-[#C5A059] pb-1 transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Button & Social */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://www.instagram.com/untamed__trails__?stkn=OTU3MGI0bHR6OWZz"
            target="_blank"
            rel="noopener noreferrer"
            className="xl:hidden p-2 rounded-lg border border-white/10 text-[#C5A059] hover:bg-white/5 transition-all"
            title="Instagram @untamed__trails__"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>

          <a
            href="#tours"
            className="py-2.5 px-5 rounded-full bg-[#C5A059] hover:bg-[#d8b368] active:scale-95 text-[#080908] font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(197,160,89,0.3)] cursor-pointer"
          >
            Book Expedition
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="xl:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-[#141613]/90 border border-white/15 text-[#F1EFE8] focus:outline-none cursor-pointer"
        >
          <span className={`block w-5 h-0.5 bg-[#F1EFE8] transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-[#C5A059]' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#F1EFE8] my-1 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#F1EFE8] transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-[#C5A059]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Fullscreen Drawer Menu */}
      <div className={`fixed inset-0 z-50 xl:hidden flex flex-col justify-between p-6 sm:p-8 bg-[#080908]/98 backdrop-blur-2xl border-b border-[#2A2B28] transition-all duration-300 ease-out overflow-y-auto ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
      }`}>
        {/* Drawer Top */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/logo-icon.png" alt="Untamed Trails" className="h-8 w-auto object-contain brightness-125" />
            <span className="font-serif text-lg tracking-widest uppercase text-[#F1EFE8]">
              UNTAMED <span className="text-[#C5A059]">TRAILS</span>
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#F1EFE8] text-lg hover:text-[#C5A059]"
          >
            ✕
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col gap-4 my-auto py-6">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="group flex items-center justify-between py-2 border-b border-white/5 text-left"
            >
              <span className="font-serif text-2xl text-[#F1EFE8] group-hover:text-[#C5A059] transition-colors">
                {link.label}
              </span>
              <span className="text-xs font-sans text-[#C5A059] opacity-70 group-hover:opacity-100">
                0{idx + 1} →
              </span>
            </a>
          ))}
        </div>

        {/* Drawer Bottom Actions */}
        <div className="flex flex-col gap-3 pt-5 border-t border-white/10">
          <a
            href="https://www.instagram.com/untamed__trails__?stkn=OTU3MGI0bHR6OWZz"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/15 bg-white/5 text-xs font-sans uppercase tracking-widest text-[#F1EFE8] hover:text-[#C5A059] transition-all"
          >
            <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span>Follow @untamed__trails__</span>
          </a>

          <a
            href="https://wa.me/919087394546?text=Hi%20Vijay,%20I'm%20reaching%20out%20to%20inquire%20about%20Untamed%20Trails%20Photo%20Tours."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-xs font-sans uppercase tracking-widest text-[#25D366] font-semibold"
          >
            <span>WhatsApp Support (+91 90873 94546)</span>
          </a>
        </div>
      </div>
    </header>
  )
}
