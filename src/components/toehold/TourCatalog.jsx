import { useState } from 'react'

export default function TourCatalog({
  animalTours,
  birdTours,
  activeCategory,
  setActiveCategory,
  onSelectTour,
}) {
  const [durationFilter, setDurationFilter] = useState('all')

  const currentList = activeCategory === 'animals' ? animalTours : birdTours

  const filteredTours = currentList.filter((tour) => {
    if (durationFilter === 'all') return true
    return tour.duration.toLowerCase().includes(durationFilter.toLowerCase())
  })

  // Render a single photography-first tour card
  const renderTourCard = (tour) => (
    <article
      key={tour.id}
      className="group rounded-3xl overflow-hidden bg-[#151815] border border-[#242923] hover:border-[#B87333] transition-all duration-500 shadow-2xl flex flex-col justify-between"
    >
      <div>
        {/* 1. Large Wildlife Photograph (55-60% height visual hero) */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#080908]">
          <img
            src={tour.heroImage}
            alt={tour.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-transparent to-transparent pointer-events-none" />

          {/* Single Punchy Badge (Top Left) */}
          <div className="absolute top-3.5 left-3.5 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-[#080908]/92 backdrop-blur-md text-[9.5px] font-sans tracking-widest text-[#D6A85C] uppercase border border-[#B87333]/60 font-semibold shadow-lg flex items-center gap-1.5">
              <span className="text-[#B87333]">★</span>
              <span>{tour.badge}</span>
            </span>
          </div>

          {/* Status Pill (Top Right) */}
          <div className="absolute top-3.5 right-3.5 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full bg-[#080908]/90 backdrop-blur-md text-[9px] font-sans tracking-wider text-[#F2F0E8] border border-[#242923]">
              {tour.status}
            </span>
          </div>

          {/* Photo Baseline: Location & Duration */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-sans text-[#F2F0E8] pointer-events-none">
            <span className="text-[#D6A85C] font-medium flex items-center gap-1 drop-shadow-md">
              <span>📍</span>
              <span>{tour.destination}</span>
            </span>
            <span className="text-[#F2F0E8]/80 text-[11px] bg-[#080908]/75 px-2 py-0.5 rounded-md border border-[#242923]">
              ⏱ {tour.duration}
            </span>
          </div>
        </div>

        {/* 2. Card Content Body */}
        <div className="p-6 sm:p-7">
          {/* Package Title */}
          <h3 className="font-serif text-2xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-snug mb-2 font-medium">
            {tour.title}
          </h3>

          {/* Best Season & Field Setup Meta */}
          <div className="flex items-center gap-3 text-xs font-sans text-[#A7A59B] mb-4 pb-3 border-b border-[#242923]">
            <span>
              📅 Best Season:{' '}
              <strong className="text-[#F2F0E8] font-medium">
                {tour.bestSeason || 'Oct – May'}
              </strong>
            </span>
            <span>·</span>
            <span>
              👥 <strong className="text-[#D6A85C] font-medium">Max 4 / Gypsy</strong>
            </span>
          </div>

          {/* Short Overview */}
          <p className="font-sans text-xs text-[#A7A59B] leading-relaxed font-light mb-4 line-clamp-2">
            {tour.overview}
          </p>

          {/* 🔥 3. Target Species Strip (The Photography Differentiator) */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9.5px] font-sans uppercase tracking-[0.22em] text-[#B87333] font-bold flex items-center gap-1.5">
                <span>🎯</span>
                <span>Target Species</span>
              </span>
              <span className="text-[10px] font-sans text-[#A7A59B]">
                {tour.skillLevel || 'Beginner → Pro'}
              </span>
            </div>

            {/* Species Pills */}
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {tour.targetSpeciesStrip && tour.targetSpeciesStrip.length > 0 ? (
                tour.targetSpeciesStrip.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-[#242923]/80 border border-[#242923] text-xs font-sans text-[#F2F0E8] flex items-center gap-1.5"
                  >
                    <span>{item.icon}</span>
                    <span className="text-[#F2F0E8]/90 font-medium">{item.name}</span>
                  </span>
                ))
              ) : (
                tour.targetSpecies.slice(0, 4).map((sp, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-[#242923]/60 border border-[#242923] text-[11px] font-sans text-[#F2F0E8]"
                  >
                    ✦ {sp.split('(')[0]}
                  </span>
                ))
              )}
            </div>

            {/* Field Photographic Opportunity Note */}
            <div className="p-2.5 rounded-xl bg-[#080908]/70 border border-[#242923] flex items-start gap-2 text-[11px] font-sans text-[#D6A85C]/95 leading-relaxed">
              <span className="text-[#B87333] not-italic text-sm leading-none mt-0.5">📸</span>
              <span className="italic">
                {tour.photoHighlight ||
                  'High probability of golden-hour action and eye-level portraits.'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Card Pricing & Powerful CTAs */}
      <div className="p-6 sm:p-7 pt-0 border-t border-[#242923]">
        <div className="flex items-end justify-between mb-4 pt-4">
          <div>
            <span className="text-[9px] font-sans uppercase tracking-wider text-[#A7A59B] block">
              All-Inclusive Expedition
            </span>
            <div className="flex items-baseline gap-1 text-[#F2F0E8]">
              <span className="text-xs font-sans text-[#B87333] font-bold">INR</span>
              <span className="font-serif text-2xl font-light text-[#F2F0E8]">
                ₹{tour.price.toLocaleString('en-IN')}/-
              </span>
              <span className="text-[10px] font-sans text-[#A7A59B] ml-1">/ person</span>
            </div>
          </div>
          <span className="text-[10px] font-sans text-[#D6A85C] bg-[#242923] px-2.5 py-1 rounded-full border border-[#B87333]/30 font-medium">
            Core Permits Incl.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onSelectTour(tour)}
            className="btn-copper-secondary py-3 px-3 rounded-xl text-xs font-sans uppercase tracking-wider cursor-pointer text-center"
          >
            View Package
          </button>
          <a
            href={`https://wa.me/919087394546?text=Hello%20VM%20Wild%20Expeditions,%20I%20want%20to%20photograph%20on%20the%20${encodeURIComponent(tour.title)}%20(${tour.destination})%20Photo%20Tour.%20Please%20guide%20the%20booking%20steps.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-copper-primary py-3 px-3.5 rounded-xl text-xs font-sans uppercase tracking-wider shadow-md text-center flex items-center justify-center gap-1.5"
          >
            <span>📸 I Want to Photograph This</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </article>
  )

  return (
    <section id="tours" className="py-24 px-5 sm:px-8 md:px-16 bg-[#080908] border-b border-[#242923]">
      <div className="max-w-7xl mx-auto">
        {/* Dynamic Category Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#D6A85C] font-semibold">
              Curated Expedition Tracks · Section 02
            </span>
            <span className="w-8 h-[1.5px] bg-[#B87333]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight mb-3">
            {activeCategory === 'animals' ? (
              <>
                Wildlife Photography{' '}
                <span className="italic text-[#B87333] font-normal">Adventures</span>
              </>
            ) : (
              <>
                Bird Photography{' '}
                <span className="italic text-[#B87333] font-normal">Escapes</span>
              </>
            )}
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-[#D6A85C]/90 font-normal mb-2">
            {activeCategory === 'animals'
              ? '“Get closer to the wild. Capture moments that last forever.”'
              : '“From tiny rainforest jewels to powerful raptors — discover India’s incredible avifauna.”'}
          </p>

          <p className="font-sans text-xs sm:text-sm text-[#A7A59B] font-light leading-relaxed">
            {activeCategory === 'animals'
              ? 'High-intensity predator tracking masterclasses designed around animal behavior, optimal lighting, and guaranteed core forest Gypsy permits.'
              : 'Specialized canopy walks, silent wetland boats, and private studio hides crafted for eye-level perches and razor-sharp flight captures.'}
          </p>
        </div>

        {/* 🌟 TWO DISTINCT TRACKING CATEGORIES SWITCHER ("2 Trucking Plans") */}
        <div className="flex justify-center mb-12">
          <div className="p-1.5 rounded-2xl bg-[#151815] border border-[#242923] shadow-2xl flex flex-col sm:flex-row gap-2 max-w-xl w-full">
            {/* Category 1: Animal & Big Cat Tracking */}
            <button
              type="button"
              id="animal-tracking"
              onClick={() => {
                setActiveCategory('animals')
                setDurationFilter('all')
              }}
              className={`flex-1 py-3.5 px-6 rounded-xl font-sans text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${
                activeCategory === 'animals'
                  ? 'btn-copper-primary shadow-[0_4px_20px_rgba(184,115,51,0.35)]'
                  : 'text-[#A7A59B] hover:text-[#F2F0E8] hover:bg-[#242923]/50'
              }`}
            >
              <span className="text-base">🐅</span>
              <span>1. Animals (5 Packages)</span>
            </button>

            {/* Category 2: Avian & Bird Photography */}
            <button
              type="button"
              id="bird-photography"
              onClick={() => {
                setActiveCategory('birds')
                setDurationFilter('all')
              }}
              className={`flex-1 py-3.5 px-6 rounded-xl font-sans text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${
                activeCategory === 'birds'
                  ? 'btn-copper-primary shadow-[0_4px_20px_rgba(184,115,51,0.35)]'
                  : 'text-[#A7A59B] hover:text-[#F2F0E8] hover:bg-[#242923]/50'
              }`}
            >
              <span className="text-base">🦜</span>
              <span>2. Birds (5 Packages)</span>
            </button>
          </div>
        </div>

        {/* Sub-filter by Duration */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-4 border-b border-[#242923]">
          <div className="text-xs font-sans text-[#A7A59B]">
            Showing{' '}
            <strong className="text-[#F2F0E8] font-semibold">{filteredTours.length}</strong>{' '}
            curated photography expeditions
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-sans uppercase tracking-wider text-[#A7A59B]">
              Filter Duration:
            </span>
            {['all', '2N/3D', '3N/4D', '4N/5D'].map((dur) => (
              <button
                key={dur}
                onClick={() => setDurationFilter(dur)}
                className={`px-3 py-1 rounded-lg text-xs font-sans transition-all cursor-pointer ${
                  durationFilter === dur
                    ? 'bg-[#B87333]/20 text-[#D6A85C] border border-[#B87333] font-semibold'
                    : 'bg-[#151815] text-[#A7A59B] border border-[#242923] hover:text-[#F2F0E8] hover:border-[#D6A85C]/50'
                }`}
              >
                {dur === 'all' ? 'All Durations' : dur}
              </button>
            ))}
          </div>
        </div>

        {/* 🌟 3 + 2 GRID LAYOUT FOR THE 5 PACKAGES */}
        {filteredTours.length <= 3 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => renderTourCard(tour))}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Top Row: 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.slice(0, 3).map((tour) => renderTourCard(tour))}
            </div>

            {/* Bottom Row: 2 Cards Centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {filteredTours.slice(3).map((tour) => renderTourCard(tour))}
            </div>
          </div>
        )}

        {/* 💬 MINI ENQUIRY TRIGGER */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#151815] via-[#242923]/80 to-[#151815] border border-[#B87333]/40 shadow-2xl text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#080908] border border-[#B87333]/50 flex items-center justify-center text-3xl mb-4 shadow-inner">
            🧭
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl text-[#F2F0E8] font-normal mb-3">
            Not sure which wildlife experience is right for you?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#A7A59B] max-w-xl font-light mb-8 leading-relaxed">
            Tell us what species you dream of photographing and our principal expedition skippers
            will personally recommend the ideal sanctuary, season, and lens focal lengths.
          </p>
          <a
            href="https://wa.me/919087394546?text=Hello%20VM%20Wild%20Expeditions,%20I'm%20not%20sure%20which%20photography%20tour%20is%20right%20for%20me.%20I%20have%20specific%20target%20species%20in%20mind.%20Please%20guide%20me."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-copper-primary py-4 px-8 rounded-full font-sans text-xs uppercase tracking-widest shadow-[0_4px_25px_rgba(184,115,51,0.45)] flex items-center gap-2.5 cursor-pointer hover:scale-105 transition-transform"
          >
            <span>🧭 Help Me Choose My Photography Safari →</span>
          </a>
        </div>
      </div>
    </section>
  )
}
