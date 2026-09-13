import { useState } from 'react'

const SHORT_DESCRIPTIONS = {
  'tour-tadoba-feline':
    "Immersive tiger photography opportunities across Tadoba's prime waterholes and bamboo corridors.",
  'tour-kabini-viceroy':
    "Track and photograph the legendary Black Panther, leopards, and temple elephants in Nagarhole's mist.",
  'tour-ranthambhore-solstice':
    'Photograph majestic royal tigers against ancient Rajput fort ruins, banyan trees, and lake vistas.',
  'tour-bandipur-primeval':
    'Untamed tracking of elephant herds and apex predators through ancient Western Ghats teak forests.',
  'tour-jawai-granite':
    'Cave-dwelling Indian leopards perched atop prehistoric monolithic granite boulders at golden hour.',
  'tour-western-ghats-shola':
    'High-altitude rainforest birding for rare Western Ghats endemics, Great Hornbills, and canopy jewels.',
  'tour-bharatpur-odyssey':
    'Millions of winter migratory waterfowl, Sarus Cranes, and soaring raptors in UNESCO wetland hides.',
  'tour-thattekad-munnar':
    'Intensive eye-level hide photography for Ceylon Frogmouth, Malabar Trogon, and mountain avifauna.',
  'tour-sattal-pangot':
    'High-altitude oak and rhododendron forest hides for Cheer Pheasants, laughingthrushes, and kingfishers.',
  'tour-kutch-flamingos':
    'Thousands of Greater Flamingos, Desert Foxes, and hunting harriers across the surreal white salt desert.',
}

const getCardTitle = (tour) => {
  if (tour.id === 'tour-ranthambhore-solstice') return 'Ranthambore Tiger Safari'
  if (tour.id === 'tour-tadoba-feline') return 'Corbett Tiger Safari'
  if (tour.id === 'tour-jawai-granite') return 'Jawai Leopard Safari'
  if (tour.id === 'tour-kabini-viceroy') return 'Kabini Leopard Safari'
  if (tour.id === 'tour-bandipur-primeval') return 'Bandipur Tiger Safari'
  if (tour.id === 'tour-western-ghats-shola') return 'Western Ghats Hornbill Safari'
  if (tour.id === 'tour-bharatpur-odyssey') return 'Bharatpur Wetland Safari'
  if (tour.id === 'tour-thattekad-munnar') return 'Thattekad Rainforest Safari'
  if (tour.id === 'tour-sattal-pangot') return 'Himalayan Mountain Birds Safari'
  if (tour.id === 'tour-kutch-flamingos') return 'Kutch Flamingo Safari'
  return tour.packageName || tour.title
}

export default function TourCatalog({
  animalTours = [],
  birdTours = [],
  activeCategory = 'animals',
  setActiveCategory,
  onSelectTour,
  onOpenCalendar,
}) {
  const [destinationFilter, setDestinationFilter] = useState('all')
  const [monthFilter, setMonthFilter] = useState('all')
  const [durationFilter, setDurationFilter] = useState('all')
  const [availabilityFilter, setAvailabilityFilter] = useState('all')

  const currentList = activeCategory === 'animals' ? animalTours : birdTours

  const filteredTours = currentList.filter((tour) => {
    if (destinationFilter !== 'all') {
      if (!tour.destination.toLowerCase().includes(destinationFilter.toLowerCase())) return false
    }
    if (monthFilter !== 'all') {
      if (!tour.dateRange.toLowerCase().includes(monthFilter.toLowerCase())) return false
    }
    if (durationFilter !== 'all') {
      if (!tour.duration.toLowerCase().includes(durationFilter.toLowerCase())) return false
    }
    if (availabilityFilter !== 'all') {
      if (!tour.status.toLowerCase().includes(availabilityFilter.toLowerCase())) return false
    }
    return true
  })

  // Priority order matching reference design (Ranthambore first, then Corbett, then Jawai)
  const sortedTours = [...filteredTours].sort((a, b) => {
    const priority = {
      'tour-ranthambhore-solstice': 1,
      'tour-tadoba-feline': 2,
      'tour-jawai-granite': 3,
      'tour-kabini-viceroy': 4,
      'tour-bandipur-primeval': 5,
    }
    return (priority[a.id] || 99) - (priority[b.id] || 99)
  })

  const hasActiveFilters =
    destinationFilter !== 'all' ||
    monthFilter !== 'all' ||
    durationFilter !== 'all' ||
    availabilityFilter !== 'all'

  const resetFilters = () => {
    setDestinationFilter('all')
    setMonthFilter('all')
    setDurationFilter('all')
    setAvailabilityFilter('all')
  }

  // Unique destinations for active category
  const destinations = [
    ...new Set(currentList.map((t) => t.destination.split('(')[0].split('&')[0].trim())),
  ]

  return (
    <section id="destinations" className="py-24 sm:py-28 bg-[#080908] border-b border-[#242923] select-none">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* 1. Spacious Editorial Hero / Intro */}
        <div className="relative text-center max-w-3xl mx-auto mb-16">
          <button
            type="button"
            onClick={onOpenCalendar}
            className="inline-flex items-center gap-2.5 mb-3.5 select-none group cursor-pointer"
            title="Click to view full 2026-2027 Season Calendar"
          >
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] group-hover:text-[#F2F0E8] font-semibold transition-colors flex items-center gap-1.5">
              <span>📅</span>
              <span>2026–27 EXPEDITION CALENDAR</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#D6A85C]/20 border border-[#D6A85C]/40 group-hover:bg-[#D6A85C] group-hover:text-[#080908] transition-all">
                VIEW DEPARTURES →
              </span>
            </span>
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
          </button>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight mb-4">
            Photo Tour <span className="italic text-[#D6A85C] font-normal">Schedules</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#A7A59B] font-light leading-relaxed max-w-2xl mx-auto">
            Choose your subject, select your season, and join a small-group expedition designed around exceptional wildlife encounters and photography opportunities.
          </p>

          {/* Quick Calendar Modal Trigger */}
          <div className="mt-5 flex items-center justify-center">
            <button
              type="button"
              onClick={onOpenCalendar}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#151815] border border-[#D6A85C]/40 hover:border-[#D6A85C] text-[#D6A85C] hover:text-[#F2F0E8] text-xs font-sans uppercase tracking-wider font-semibold transition-all hover:bg-[#242923] shadow-md cursor-pointer group"
            >
              <span>📅</span>
              <span>Open 2026–2027 Season Calendar</span>
              <span className="text-[#A7A59B] group-hover:text-[#D6A85C] transition-colors">(10 Confirmed Departures) →</span>
            </button>
          </div>
        </div>

        {/* 2. Large Category Selector: Two Prominent Luxury Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-12">
          {/* Animal Expeditions Tab */}
          <button
            type="button"
            onClick={() => {
              setActiveCategory && setActiveCategory('animals')
              resetFilters()
            }}
            className={`p-6 sm:p-8 rounded-2xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between border group ${
              activeCategory === 'animals'
                ? 'bg-gradient-to-br from-[#151815] to-[#242923] border-[#D6A85C] shadow-[0_10px_35px_rgba(214,168,92,0.2)] scale-[1.01]'
                : 'bg-[#151815]/70 border-[#242923] hover:border-[#D6A85C]/50 opacity-80 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#D6A85C] shadow-[0_4px_16px_rgba(214,168,92,0.3)] flex-shrink-0 relative group-hover:scale-105 transition-transform bg-[#080908]">
                  <img
                    src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&q=90&auto=format&fit=crop"
                    alt="Wild Photography"
                    className="w-full h-full object-cover object-[70%_center]"
                  />
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/30" />
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] font-normal block leading-tight">
                    Wild Photography
                  </span>
                  <span className="text-[10px] font-sans tracking-widest uppercase text-[#D6A85C] font-semibold">
                    Big Cats & Mammals
                  </span>
                </div>
              </div>
              {activeCategory === 'animals' && (
                <span className="w-3 h-3 rounded-full bg-[#D6A85C] shadow-[0_0_12px_#D6A85C] border border-[#F2F0E8]/40 flex-shrink-0" />
              )}
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] font-light">
              Wildlife tracking & predator photography across India's premier tiger reserves and big cat habitats.
            </p>
          </button>

          {/* Bird Photography Tab */}
          <button
            type="button"
            onClick={() => {
              setActiveCategory && setActiveCategory('birds')
              resetFilters()
            }}
            className={`p-6 sm:p-8 rounded-2xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between border group ${
              activeCategory === 'birds'
                ? 'bg-gradient-to-br from-[#151815] to-[#242923] border-[#D6A85C] shadow-[0_10px_35px_rgba(214,168,92,0.2)] scale-[1.01]'
                : 'bg-[#151815]/70 border-[#242923] hover:border-[#D6A85C]/50 opacity-80 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#D6A85C] shadow-[0_4px_16px_rgba(214,168,92,0.3)] flex-shrink-0 relative group-hover:scale-105 transition-transform bg-[#080908]">
                  <img
                    src="https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=90&auto=format&fit=crop"
                    alt="Birds Photography"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/30" />
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] font-normal block leading-tight">
                    Birds Photography
                  </span>
                  <span className="text-[10px] font-sans tracking-widest uppercase text-[#D6A85C] font-semibold">
                    Avian & Canopy Hides
                  </span>
                </div>
              </div>
              {activeCategory === 'birds' && (
                <span className="w-3 h-3 rounded-full bg-[#D6A85C] shadow-[0_0_12px_#D6A85C] border border-[#F2F0E8]/40 flex-shrink-0" />
              )}
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] font-light">
              Birding & avian photography across Western Ghats canopies, UNESCO wetlands, and Himalayan hides.
            </p>
          </button>
        </div>

        {/* 3. Clean Horizontal Filter Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#151815] border border-[#242923] mb-14 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
            {/* Destination */}
            <div>
              <label className="text-[10px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block mb-1">
                Destination
              </label>
              <select
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
                className="w-full bg-[#080908] border border-[#242923] hover:border-[#D6A85C]/60 rounded-xl px-3 py-2 text-xs font-sans text-[#F2F0E8] focus:outline-none focus:border-[#D6A85C] cursor-pointer"
              >
                <option value="all">All Destinations</option>
                {destinations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Month */}
            <div>
              <label className="text-[10px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block mb-1">
                Month
              </label>
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="w-full bg-[#080908] border border-[#242923] hover:border-[#D6A85C]/60 rounded-xl px-3 py-2 text-xs font-sans text-[#F2F0E8] focus:outline-none focus:border-[#D6A85C] cursor-pointer"
              >
                <option value="all">All Months</option>
                <option value="nov">November 2026</option>
                <option value="dec">December 2026</option>
                <option value="jan">January 2027</option>
                <option value="feb">February 2027</option>
                <option value="mar">March 2027</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="text-[10px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block mb-1">
                Duration
              </label>
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="w-full bg-[#080908] border border-[#242923] hover:border-[#D6A85C]/60 rounded-xl px-3 py-2 text-xs font-sans text-[#F2F0E8] focus:outline-none focus:border-[#D6A85C] cursor-pointer"
              >
                <option value="all">All Durations</option>
                <option value="2n">2N / 3D</option>
                <option value="3n">3N / 4D</option>
                <option value="4n">4N / 5D</option>
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="text-[10px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block mb-1">
                Availability
              </label>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full bg-[#080908] border border-[#242923] hover:border-[#D6A85C]/60 rounded-xl px-3 py-2 text-xs font-sans text-[#F2F0E8] focus:outline-none focus:border-[#D6A85C] cursor-pointer"
              >
                <option value="all">All Availability</option>
                <option value="open">Open for Booking</option>
                <option value="few">Few Seats Left</option>
                <option value="filling">Filling Fast</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="py-2.5 px-4 rounded-xl border border-[#D6A85C]/60 text-xs font-sans uppercase tracking-wider text-[#D6A85C] hover:bg-[#D6A85C] hover:text-[#080908] transition-all cursor-pointer whitespace-nowrap self-end md:self-center"
            >
              Reset Filters ✕
            </button>
          )}
        </div>

        {/* 4. Section Intro: Clean Contextual Heading */}
        <div className="mb-10 text-left border-l-2 border-[#D6A85C] pl-4">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] font-normal">
            {activeCategory === 'animals' ? (
              <>Animal Photography Expeditions</>
            ) : (
              <>Bird Photography Expeditions</>
            )}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#A7A59B] font-light mt-1 max-w-2xl">
            {activeCategory === 'animals'
              ? "Follow India's iconic predators and wildlife through carefully selected landscapes, seasons and photographic conditions."
              : "Explore forests, wetlands and mountain habitats in search of India's remarkable resident and migratory birds."}
          </p>
        </div>

        {/* 5. Expedition Cards: 3-Column Grid on Desktop, 2 on Tablet, 1 on Mobile */}
        {filteredTours.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[#151815] border border-[#242923]">
            <p className="font-serif text-2xl text-[#F2F0E8] mb-2">No expeditions match your filters.</p>
            <p className="font-sans text-xs text-[#A7A59B] mb-5">Try adjusting your filters or reset them to view all scheduled departures.</p>
            <button
              onClick={resetFilters}
              className="py-2.5 px-6 rounded-full bg-[#D6A85C] text-[#080908] text-xs font-sans uppercase tracking-wider font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-16 max-w-6xl mx-auto">
            {sortedTours.map((tour, index) => {
              const displayTitle = getCardTitle(tour)
              const expeditionBadge = activeCategory === 'animals' ? 'Wild Expedition' : 'Bird Expedition'

              return (
                <article
                  key={tour.id}
                  onClick={() => onSelectTour && onSelectTour(tour)}
                  className="group relative rounded-[28px] overflow-hidden bg-white shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-400 cursor-pointer flex flex-col justify-between border border-white/20 hover:-translate-y-1.5"
                >
                  {/* 1. Upper Wildlife Photo Area with Overlay Badges and Title */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0c120e]">
                    <img
                      src={tour.heroImage}
                      alt={displayTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.95] group-hover:brightness-100"
                      loading="lazy"
                    />

                    {/* Shading gradient for crisp title legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                    {/* Top Left Badge: Wild / Bird Expedition */}
                    <div className="absolute top-4 left-4 z-10 pointer-events-none">
                      <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#112419] font-sans text-[11px] font-semibold tracking-wide shadow-md backdrop-blur-sm">
                        {expeditionBadge}
                      </span>
                    </div>

                    {/* Top Right Circular Badge: 4 (Max 4 Photographers per vehicle) */}
                    <div className="absolute top-4 right-4 z-10 pointer-events-none">
                      <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 text-[#8c6b2d] font-sans font-bold text-xs sm:text-sm flex items-center justify-center shadow-md backdrop-blur-sm">
                        4
                      </span>
                    </div>

                    {/* Bottom Title Overlay on Photo */}
                    <div className="absolute bottom-4 left-5 right-5 z-10 text-left pointer-events-none">
                      <h3 className="font-serif text-xl sm:text-[23px] text-white font-normal leading-snug drop-shadow-md">
                        {displayTitle}
                      </h3>
                    </div>
                  </div>

                  {/* 2. Lower Body: Clean White with 2 Signature Action Buttons */}
                  <div className="p-5 sm:p-6 bg-white space-y-3.5">
                    {/* Button 1: VIEW ITINERARY with dropdown triangle */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectTour && onSelectTour(tour)
                      }}
                      className={`w-full py-3.5 px-6 rounded-full font-sans text-xs uppercase tracking-wider font-bold flex items-center justify-between transition-all duration-300 cursor-pointer border shadow-sm group/btn ${
                        index === 0
                          ? 'bg-[#0055c4] text-white border-[#0055c4] hover:bg-[#00429e]'
                          : 'bg-[#F2F4F2] text-[#1c2e21] border-gray-200/60 hover:bg-[#0055c4] hover:text-white hover:border-[#0055c4]'
                      }`}
                    >
                      <span>VIEW ITINERARY</span>
                      <span className="w-5 h-5 rounded-full bg-black/5 group-hover/btn:bg-white/20 flex items-center justify-center text-[9px] transition-colors">
                        ▼
                      </span>
                    </button>

                    {/* Button 2: EXPLORE THIS JOURNEY in deep forest green with gold circle arrow */}
                    <a
                      href={`https://wa.me/919087394546?text=Hello%20VM%20Wild%20Expeditions,%20I'm%20inquiring%20about%20the%20${encodeURIComponent(displayTitle)}%20(${tour.destination})%20Expedition.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full py-2.5 pl-6 pr-2 rounded-full bg-[#102216] hover:bg-[#183321] transition-all duration-300 flex items-center justify-between shadow-md cursor-pointer group/exp"
                    >
                      <span className="font-sans text-xs uppercase tracking-wider font-bold text-[#D6A85C] group-hover/exp:text-[#F2F0E8] transition-colors">
                        EXPLORE THIS JOURNEY
                      </span>
                      <span className="w-8 h-8 rounded-full bg-[#D6A85C] group-hover:bg-[#e2bb74] text-[#102216] flex items-center justify-center font-bold text-sm transition-transform group-hover/exp:translate-x-0.5 shadow-sm">
                        →
                      </span>
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        )}
        {/* 6. Final Cinematic Call to Action Banner */}
        <div className="relative rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[400px] flex flex-col items-center justify-center p-8 sm:p-14 text-center border border-[#242923] group">
          <img
            src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=1920&q=85&auto=format&fit=crop"
            alt="VM Wild Expeditions"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080908] via-[#080908]/75 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="font-sans text-[10px] sm:text-xs tracking-[0.28em] uppercase text-[#D6A85C] font-semibold block mb-3">
              YOUR EXPEDITION AWAITS
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl text-[#F2F0E8] font-light mb-4 leading-tight">
              Which story will you photograph next?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#F2F0E8]/85 font-light mb-8 max-w-xl mx-auto leading-relaxed">
              Tell us what you want to photograph. We'll help you choose the right expedition, destination and season.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/919087394546?text=Hello%20VM%20Wild%20Expeditions,%20I'm%20ready%20to%20plan%20my%20photography%20expedition.%20Please%20help%20me%20choose%20the%20right%20destination."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-4 px-9 rounded-full font-sans text-xs uppercase tracking-widest font-bold bg-[#D6A85C] text-[#080908] hover:bg-[#B87333] hover:shadow-[0_6px_30px_rgba(214,168,92,0.45)] hover:scale-105 transition-all inline-flex items-center justify-center gap-2 shadow-xl"
              >
                <span>PLAN MY EXPEDITION</span>
                <span>→</span>
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto py-4 px-9 rounded-full font-sans text-xs uppercase tracking-widest font-semibold border border-[#D6A85C]/70 text-[#F2F0E8] hover:bg-[#D6A85C]/15 transition-all text-center"
              >
                CONTACT US
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
