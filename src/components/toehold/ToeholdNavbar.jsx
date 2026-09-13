import { useState, useEffect, useRef } from 'react'

export default function ToeholdNavbar({ onSelectCategory, onOpenCalendar }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(menu)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 180)
  }

  const handleCategoryNav = (cat) => {
    if (onSelectCategory) onSelectCategory(cat)
    setActiveDropdown(null)
    setMobileMenuOpen(false)
    const el = document.getElementById('tours')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollTo = (id) => {
    setActiveDropdown(null)
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleOpenCalendar = () => {
    setActiveDropdown(null)
    setMobileMenuOpen(false)
    if (onOpenCalendar) {
      onOpenCalendar()
    } else {
      scrollTo('tours')
    }
  }

  const handleSchedules = () => {
    setActiveDropdown(null)
    setMobileMenuOpen(false)
    const el = document.getElementById('tours')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const photoToursMenu = [
    { label: 'All Photography Expeditions', action: () => scrollTo('tours') },
    { label: 'Upcoming Expedition Schedules', action: handleSchedules },
    { label: '2026–2027 Season Calendar', action: handleOpenCalendar },
  ]

  const animalToursMenu = [
    { label: '🐅 Bandhavgarh Tigers Masterclass', action: () => handleCategoryNav('animals') },
    { label: '🐆 Kabini Black Panther & Leopard Quest', action: () => handleCategoryNav('animals') },
    { label: '🐅 Tadoba Apex Predators', action: () => handleCategoryNav('animals') },
    { label: '🐅 Ranthambore Royal Bengal', action: () => handleCategoryNav('animals') },
    { label: '🦁 Gir Asiatic Lions Habitat', action: () => handleCategoryNav('animals') },
  ]

  const birdToursMenu = [
    { label: '🦜 Valparai Western Ghats Endemics', action: () => handleCategoryNav('birds') },
    { label: '🦆 Bharatpur Keoladeo Avian Paradise', action: () => handleCategoryNav('birds') },
    { label: '🦅 Sattal & Pangot Himalayan Birding', action: () => handleCategoryNav('birds') },
    { label: '🦏 Kaziranga & Brahmaputra Avifauna', action: () => handleCategoryNav('birds') },
    { label: '🦉 Thattekad Rainforest Jewels', action: () => handleCategoryNav('birds') },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 select-none ${
        scrolled
          ? 'bg-[#080908]/96 backdrop-blur-xl border-b border-[#242923] shadow-[0_12px_32px_rgba(0,0,0,0.85)] py-3 sm:py-3.5'
          : 'bg-gradient-to-b from-[#080908]/90 via-[#080908]/40 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-4">
        {/* Left: Compact & Elegant VM Wild Expeditions Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group no-underline flex-shrink-0"
          title="VM Wild Expeditions — Beyond the Map. Into the Wild."
        >
          <img
            src="/logo-clean.png"
            alt="VM Wild Expeditions Logo"
            className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md flex-shrink-0"
          />
          <div className="hidden lg:flex flex-col border-l border-[#242923] pl-3 py-0.5 flex-shrink-0">
            <span className="font-serif text-[13px] tracking-[0.18em] uppercase text-[#D6A85C] font-semibold leading-tight whitespace-nowrap">
              VM Wild Expeditions
            </span>
            <span className="font-sans text-[8.5px] tracking-[0.24em] uppercase text-[#B87333] font-light mt-0.5 whitespace-nowrap">
              Beyond the Map. Into the Wild.
            </span>
          </div>
        </a>

        {/* Center Navigation: Clean, Simple & Attractive Words on One Line */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-[12px] font-sans tracking-[0.14em] uppercase font-medium">
          {/* PHOTO TOURS ▾ */}
          <div
            className="relative flex-shrink-0"
            onMouseEnter={() => handleMouseEnter('photo')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => scrollTo('tours')}
              className="flex items-center gap-1.5 py-2 text-[#F2F0E8]/90 hover:text-[#D6A85C] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>PHOTO TOURS</span>
              <svg
                className={`w-3 h-3 text-[#B87333] transition-transform duration-200 ${
                  activeDropdown === 'photo' ? 'rotate-180 text-[#D6A85C]' : ''
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {activeDropdown === 'photo' && (
              <div className="absolute top-full left-0 pt-2 min-w-[250px] animate-fadeIn z-50">
                <div className="p-2 rounded-2xl bg-[#151815]/98 backdrop-blur-xl border border-[#242923] shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-1">
                  {photoToursMenu.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-sans normal-case text-[#F2F0E8]/90 hover:text-[#D6A85C] hover:bg-[#242923]/60 transition-all cursor-pointer block whitespace-nowrap"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ANIMALS ▾ */}
          <div
            className="relative flex-shrink-0"
            onMouseEnter={() => handleMouseEnter('animals')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => handleCategoryNav('animals')}
              className="flex items-center gap-1.5 py-2 text-[#F2F0E8]/90 hover:text-[#D6A85C] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>ANIMALS</span>
              <svg
                className={`w-3 h-3 text-[#B87333] transition-transform duration-200 ${
                  activeDropdown === 'animals' ? 'rotate-180 text-[#D6A85C]' : ''
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {activeDropdown === 'animals' && (
              <div className="absolute top-full left-0 pt-2 min-w-[280px] animate-fadeIn z-50">
                <div className="p-2 rounded-2xl bg-[#151815]/98 backdrop-blur-xl border border-[#242923] shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-1">
                  {animalToursMenu.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-sans normal-case text-[#F2F0E8]/90 hover:text-[#D6A85C] hover:bg-[#242923]/60 transition-all cursor-pointer block whitespace-nowrap"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* BIRDS ▾ */}
          <div
            className="relative flex-shrink-0"
            onMouseEnter={() => handleMouseEnter('birds')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => handleCategoryNav('birds')}
              className="flex items-center gap-1.5 py-2 text-[#F2F0E8]/90 hover:text-[#D6A85C] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>BIRDS</span>
              <svg
                className={`w-3 h-3 text-[#B87333] transition-transform duration-200 ${
                  activeDropdown === 'birds' ? 'rotate-180 text-[#D6A85C]' : ''
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {activeDropdown === 'birds' && (
              <div className="absolute top-full left-0 pt-2 min-w-[290px] animate-fadeIn z-50">
                <div className="p-2 rounded-2xl bg-[#151815]/98 backdrop-blur-xl border border-[#242923] shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-1">
                  {birdToursMenu.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-sans normal-case text-[#F2F0E8]/90 hover:text-[#D6A85C] hover:bg-[#242923]/60 transition-all cursor-pointer block whitespace-nowrap"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SPECIES */}
          <a
            href="#species"
            className="py-2 text-[#F2F0E8]/90 hover:text-[#D6A85C] transition-colors whitespace-nowrap flex-shrink-0"
          >
            SPECIES
          </a>

          {/* WHY US */}
          <a
            href="#difference"
            className="py-2 text-[#F2F0E8]/90 hover:text-[#D6A85C] transition-colors whitespace-nowrap flex-shrink-0"
          >
            WHY US
          </a>

          {/* JOURNAL */}
          <a
            href="#journal"
            className="py-2 text-[#F2F0E8]/90 hover:text-[#D6A85C] transition-colors whitespace-nowrap flex-shrink-0"
          >
            JOURNAL
          </a>

          {/* REVIEWS */}
          <a
            href="#testimonials"
            className="py-2 text-[#F2F0E8]/90 hover:text-[#D6A85C] transition-colors whitespace-nowrap flex-shrink-0"
          >
            REVIEWS
          </a>

          {/* FAQ */}
          <a
            href="#faq"
            className="py-2 text-[#F2F0E8]/90 hover:text-[#D6A85C] transition-colors whitespace-nowrap flex-shrink-0"
          >
            FAQ
          </a>

          {/* CONTACT */}
          <a
            href="#contact"
            className="py-2 text-[#F2F0E8]/90 hover:text-[#D6A85C] transition-colors whitespace-nowrap flex-shrink-0"
          >
            CONTACT
          </a>
        </nav>

        {/* Right: Attractive Gold Pill Button */}
        <div className="hidden sm:flex items-center flex-shrink-0">
          <a
            href="#tours"
            className="py-2.5 px-5 rounded-full font-sans text-xs uppercase tracking-wider font-semibold bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] hover:shadow-[0_4px_22px_rgba(214,168,92,0.45)] hover:scale-[1.02] hover:brightness-105 transition-all duration-300 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>BOOK NOW</span>
            <span className="text-sm font-bold">→</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="xl:hidden flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-[#151815] border border-[#242923] text-[#F2F0E8] focus:outline-none cursor-pointer"
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
        className={`fixed inset-0 z-50 xl:hidden flex flex-col justify-between p-6 bg-[#080908]/98 backdrop-blur-2xl border-b border-[#242923] transition-all duration-300 ease-out overflow-y-auto ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#242923]">
          <div className="flex items-center gap-3">
            <img src="/logo-clean.png" alt="VM Wild Expeditions" className="h-9 w-auto object-contain" />
            <span className="font-serif text-xs tracking-widest uppercase text-[#D6A85C] font-semibold">
              VM Wild Expeditions
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-9 h-9 rounded-xl bg-[#151815] border border-[#242923] flex items-center justify-center text-[#F2F0E8] text-base hover:text-[#B87333]"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3 py-6 my-auto text-left">
          <div className="border-b border-[#242923]/60 pb-2">
            <button
              onClick={() => scrollTo('tours')}
              className="w-full py-1.5 font-serif text-2xl text-[#F2F0E8] hover:text-[#D6A85C] flex items-center justify-between text-left"
            >
              <span>Photo Tours</span>
              <span className="text-xs font-sans text-[#B87333]">01 →</span>
            </button>
            <div className="flex flex-col gap-2 mt-2 pl-3 pb-1">
              <button
                onClick={handleSchedules}
                className="text-left text-xs font-sans text-[#A7A59B] hover:text-[#D6A85C] flex items-center gap-2"
              >
                <span>🗓</span>
                <span>Upcoming Expedition Schedules</span>
              </button>
              <button
                onClick={handleOpenCalendar}
                className="text-left text-xs font-sans text-[#D6A85C] hover:text-[#B87333] flex items-center gap-2 font-medium"
              >
                <span>📅</span>
                <span>2026–2027 Season Calendar (10 Tours)</span>
              </button>
            </div>
          </div>
          <button
            onClick={() => handleCategoryNav('animals')}
            className="py-2.5 border-b border-[#242923]/60 font-serif text-2xl text-[#F2F0E8] hover:text-[#D6A85C] flex items-center justify-between text-left"
          >
            <span>🐅 Animals</span>
            <span className="text-xs font-sans text-[#B87333]">02 →</span>
          </button>
          <button
            onClick={() => handleCategoryNav('birds')}
            className="py-2.5 border-b border-[#242923]/60 font-serif text-2xl text-[#F2F0E8] hover:text-[#D6A85C] flex items-center justify-between text-left"
          >
            <span>🦜 Birds</span>
            <span className="text-xs font-sans text-[#B87333]">03 →</span>
          </button>
          <button
            onClick={() => scrollTo('species')}
            className="py-2.5 border-b border-[#242923]/60 font-serif text-2xl text-[#F2F0E8] hover:text-[#D6A85C] flex items-center justify-between text-left"
          >
            <span>🐾 Species</span>
            <span className="text-xs font-sans text-[#B87333]">04 →</span>
          </button>
          <button
            onClick={() => scrollTo('difference')}
            className="py-2.5 border-b border-[#242923]/60 font-serif text-2xl text-[#F2F0E8] hover:text-[#D6A85C] flex items-center justify-between text-left"
          >
            <span>Why Us</span>
            <span className="text-xs font-sans text-[#B87333]">05 →</span>
          </button>
          <button
            onClick={() => scrollTo('journal')}
            className="py-2.5 border-b border-[#242923]/60 font-serif text-2xl text-[#F2F0E8] hover:text-[#D6A85C] flex items-center justify-between text-left"
          >
            <span>📖 Journal</span>
            <span className="text-xs font-sans text-[#B87333]">06 →</span>
          </button>
          <button
            onClick={() => scrollTo('testimonials')}
            className="py-2.5 border-b border-[#242923]/60 font-serif text-2xl text-[#F2F0E8] hover:text-[#D6A85C] flex items-center justify-between text-left"
          >
            <span>Reviews</span>
            <span className="text-xs font-sans text-[#B87333]">07 →</span>
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="py-2.5 border-b border-[#242923]/60 font-serif text-2xl text-[#F2F0E8] hover:text-[#D6A85C] flex items-center justify-between text-left"
          >
            <span>FAQ Guide</span>
            <span className="text-xs font-sans text-[#B87333]">08 →</span>
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="py-2.5 border-b border-[#242923]/60 font-serif text-2xl text-[#F2F0E8] hover:text-[#D6A85C] flex items-center justify-between text-left"
          >
            <span>Contact</span>
            <span className="text-xs font-sans text-[#B87333]">09 →</span>
          </button>
        </div>

        <div className="pt-4 border-t border-[#242923] flex flex-col gap-3">
          <a
            href="#tours"
            onClick={() => setMobileMenuOpen(false)}
            className="py-3 px-6 rounded-full font-sans text-xs uppercase tracking-widest font-bold bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] text-center"
          >
            BOOK NOW →
          </a>
          <a
            href="https://wa.me/919087394546?text=Hi%20Vijay,%20I'm%20reaching%20out%20to%20inquire%20about%20VM%20Wild%20Expeditions%20Photo%20Tours."
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
