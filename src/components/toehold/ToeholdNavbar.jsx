import { useState, useEffect } from 'react'

export default function ToeholdNavbar({
  currentView = 'home',
  onNavigate,
  onOpenEnquire,
}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (target) => {
    setMobileMenuOpen(false)
    if (target === 'gallery') {
      if (onNavigate) onNavigate('gallery')
      return
    }
    if (target === 'about') {
      if (onNavigate) onNavigate('about')
      return
    }

    // Anchor navigation on home view (destinations, faq, contact)
    if (currentView !== 'home') {
      if (onNavigate) onNavigate('home', target)
    } else {
      const el = document.getElementById(target)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else if (target === 'destinations') {
        const toursEl = document.getElementById('tours')
        if (toursEl) toursEl.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (onNavigate) {
      onNavigate('home')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 select-none ${
        scrolled
          ? 'bg-[#080908]/96 backdrop-blur-xl border-b border-[#242923] shadow-[0_12px_32px_rgba(0,0,0,0.85)] py-3 sm:py-3.5'
          : 'bg-gradient-to-b from-[#080908]/90 via-[#080908]/40 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-4">
        {/* 1. Logo, Name & Tagline */}
        <a
          href="#"
          onClick={handleLogoClick}
          className="flex items-center gap-3 group no-underline flex-shrink-0"
          title="VM Wild Expeditions — Beyond the Map. Into the Wild."
        >
          <img
            src="/logo-clean.png"
            alt="VM Wild Expeditions Logo"
            className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md flex-shrink-0"
          />
          <div className="flex flex-col border-l border-[#242923] pl-3 py-0.5 flex-shrink-0">
            <span className="font-serif text-[13px] sm:text-[14px] tracking-[0.18em] uppercase text-[#D6A85C] font-semibold leading-tight whitespace-nowrap">
              VM Wild Expeditions
            </span>
            <span className="font-sans text-[8.5px] sm:text-[9.5px] tracking-[0.24em] uppercase text-[#B87333] font-light mt-0.5 whitespace-nowrap">
              Beyond the Map. Into the Wild.
            </span>
          </div>
        </a>

        {/* 2. Exact User Requested Navigation: Destinations, Gallery, About, FAQ, Contact */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[12px] font-sans tracking-[0.16em] uppercase font-medium">
          <button
            type="button"
            onClick={() => handleNav('destinations')}
            className={`py-2 transition-colors cursor-pointer whitespace-nowrap ${
              currentView === 'home'
                ? 'text-[#F2F0E8]/90 hover:text-[#D6A85C]'
                : 'text-[#A7A59B] hover:text-[#F2F0E8]'
            }`}
          >
            DESTINATIONS
          </button>

          <button
            type="button"
            onClick={() => handleNav('gallery')}
            className={`py-2 transition-colors cursor-pointer whitespace-nowrap relative ${
              currentView === 'gallery'
                ? 'text-[#D6A85C] font-semibold'
                : 'text-[#F2F0E8]/90 hover:text-[#D6A85C]'
            }`}
          >
            <span>GALLERY</span>
            {currentView === 'gallery' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6A85C] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNav('about')}
            className={`py-2 transition-colors cursor-pointer whitespace-nowrap relative ${
              currentView === 'about'
                ? 'text-[#D6A85C] font-semibold'
                : 'text-[#F2F0E8]/90 hover:text-[#D6A85C]'
            }`}
          >
            <span>ABOUT</span>
            {currentView === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6A85C] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNav('faq')}
            className="py-2 text-[#F2F0E8]/90 hover:text-[#D6A85C] transition-colors cursor-pointer whitespace-nowrap"
          >
            FAQ
          </button>

          <button
            type="button"
            onClick={() => handleNav('contact')}
            className="py-2 text-[#F2F0E8]/90 hover:text-[#D6A85C] transition-colors cursor-pointer whitespace-nowrap"
          >
            CONTACT
          </button>
        </nav>

        {/* 3. Right Action: ENQUIRE Gold Pill Button */}
        <div className="hidden sm:flex items-center flex-shrink-0">
          <button
            type="button"
            onClick={() => onOpenEnquire && onOpenEnquire()}
            className="py-2.5 px-6 rounded-full font-sans text-xs uppercase tracking-widest font-bold bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] hover:shadow-[0_4px_22px_rgba(214,168,92,0.45)] hover:scale-[1.02] hover:brightness-105 transition-all duration-300 cursor-pointer flex items-center gap-2 whitespace-nowrap"
          >
            <span>ENQUIRE</span>
            <span className="text-sm font-bold">→</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-[#151815] border border-[#242923] text-[#F2F0E8] focus:outline-none cursor-pointer"
        >
          <span
            className={`block w-5 h-0.5 bg-[#F2F0E8] transition-transform duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-[#B87333]' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#F2F0E8] my-1 transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#F2F0E8] transition-transform duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-[#B87333]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden flex flex-col justify-between p-6 bg-[#080908]/98 backdrop-blur-2xl border-b border-[#242923] transition-all duration-300 ease-out overflow-y-auto ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#242923]">
          <div className="flex items-center gap-3">
            <img src="/logo-clean.png" alt="VM Wild Expeditions" className="h-9 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="font-serif text-xs tracking-widest uppercase text-[#D6A85C] font-semibold">
                VM Wild Expeditions
              </span>
              <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-[#B87333]">
                Beyond the Map. Into the Wild.
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-9 h-9 rounded-xl bg-[#151815] border border-[#242923] flex items-center justify-center text-[#F2F0E8] text-base hover:text-[#B87333] cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3 py-6 my-auto text-left">
          <button
            onClick={() => handleNav('destinations')}
            className="py-3 border-b border-[#242923]/60 font-serif text-2xl text-[#F2F0E8] hover:text-[#D6A85C] flex items-center justify-between text-left cursor-pointer"
          >
            <span>Destinations</span>
            <span className="text-xs font-sans text-[#B87333]">01 →</span>
          </button>
          <button
            onClick={() => handleNav('gallery')}
            className={`py-3 border-b border-[#242923]/60 font-serif text-2xl flex items-center justify-between text-left cursor-pointer ${
              currentView === 'gallery' ? 'text-[#D6A85C]' : 'text-[#F2F0E8] hover:text-[#D6A85C]'
            }`}
          >
            <span>Gallery</span>
            <span className="text-xs font-sans text-[#B87333]">02 →</span>
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`py-3 border-b border-[#242923]/60 font-serif text-2xl flex items-center justify-between text-left cursor-pointer ${
              currentView === 'about' ? 'text-[#D6A85C]' : 'text-[#F2F0E8] hover:text-[#D6A85C]'
            }`}
          >
            <span>About</span>
            <span className="text-xs font-sans text-[#B87333]">03 →</span>
          </button>
          <button
            onClick={() => handleNav('faq')}
            className="py-3 border-b border-[#242923]/60 font-serif text-2xl text-[#F2F0E8] hover:text-[#D6A85C] flex items-center justify-between text-left cursor-pointer"
          >
            <span>FAQ</span>
            <span className="text-xs font-sans text-[#B87333]">04 →</span>
          </button>
          <button
            onClick={() => handleNav('contact')}
            className="py-3 border-b border-[#242923]/60 font-serif text-2xl text-[#F2F0E8] hover:text-[#D6A85C] flex items-center justify-between text-left cursor-pointer"
          >
            <span>Contact</span>
            <span className="text-xs font-sans text-[#B87333]">05 →</span>
          </button>
        </div>

        <div className="pt-4 border-t border-[#242923] flex flex-col gap-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              if (onOpenEnquire) onOpenEnquire()
            }}
            className="py-3 px-6 rounded-full font-sans text-xs uppercase tracking-widest font-bold bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] text-center cursor-pointer shadow-lg"
          >
            ENQUIRE NOW →
          </button>
          <a
            href="https://wa.me/919087394546?text=Hi%20Vijay,%20I'm%20reaching%20out%20to%20inquire%20about%20VM%20Wild%20Expeditions."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="py-3 rounded-xl bg-[#242923] text-[#F2F0E8] text-xs font-sans uppercase tracking-widest text-center flex items-center justify-center gap-2"
          >
            <span>💬 WhatsApp Concierge (+91 90873 94546)</span>
          </a>
        </div>
      </div>
    </header>
  )
}
