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

  return (
    <section id="tours" className="py-24 px-5 sm:px-8 md:px-16 bg-[#080908] border-b border-[#2A2B28]/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C5A059] font-semibold">
              Specialized Expedition Tracks · Section 02
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F1EFE8] font-light leading-tight">
            Photo Tour <span className="italic text-[#C5A059] font-normal">Schedules</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-3 font-light leading-relaxed">
            Choose your specialized photography track. Whether you seek big cats across primeval dry deciduous forests or elusive endemic avifauna in tropical rainforest canopies.
          </p>
        </div>

        {/* 🌟 TWO DISTINCT TRACKING CATEGORIES SWITCHER ("2 Trucking Plans") */}
        <div className="flex justify-center mb-12">
          <div className="p-1.5 rounded-2xl bg-[#121411] border border-white/10 shadow-2xl flex flex-col sm:flex-row gap-2 max-w-xl w-full">
            {/* Category 1: Animal & Big Cat Tracking */}
            <button
              type="button"
              id="animal-tracking"
              onClick={() => setActiveCategory('animals')}
              className={`flex-1 py-3.5 px-6 rounded-xl font-sans text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${
                activeCategory === 'animals'
                  ? 'bg-gradient-to-r from-[#C5A059] to-[#b08b43] text-[#080908] font-bold shadow-[0_4px_20px_rgba(197,160,89,0.35)]'
                  : 'text-[#A7A59B] hover:text-[#F1EFE8] hover:bg-white/[0.04]'
              }`}
            >
              <span className="text-base">🐅</span>
              <span>1. Animal Tracking Tours</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeCategory === 'animals' ? 'bg-[#080908]/20 text-[#080908]' : 'bg-white/10 text-[#888]'
              }`}>
                {animalTours.length}
              </span>
            </button>

            {/* Category 2: Avian & Bird Photography */}
            <button
              type="button"
              id="bird-photography"
              onClick={() => setActiveCategory('birds')}
              className={`flex-1 py-3.5 px-6 rounded-xl font-sans text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${
                activeCategory === 'birds'
                  ? 'bg-gradient-to-r from-[#C5A059] to-[#b08b43] text-[#080908] font-bold shadow-[0_4px_20px_rgba(197,160,89,0.35)]'
                  : 'text-[#A7A59B] hover:text-[#F1EFE8] hover:bg-white/[0.04]'
              }`}
            >
              <span className="text-base">🦅</span>
              <span>2. Bird Photography Tours</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeCategory === 'birds' ? 'bg-[#080908]/20 text-[#080908]' : 'bg-white/10 text-[#888]'
              }`}>
                {birdTours.length}
              </span>
            </button>
          </div>
        </div>

        {/* Category Description Banner */}
        <div className="mb-10 p-5 rounded-2xl bg-[#121411]/70 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {activeCategory === 'animals' ? '🐅' : '🦅'}
            </span>
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-[#F1EFE8]">
                {activeCategory === 'animals'
                  ? 'Mammal & Apex Predator Tracking Expeditions'
                  : 'Avian Endemic & Flight Photography Masterclasses'}
              </h3>
              <p className="font-sans text-xs text-[#888] font-light">
                {activeCategory === 'animals'
                  ? 'Focused on Royal Bengal Tigers, Indian Leopards, Black Panthers, Sloth Bears & Elephant Corridors.'
                  : 'Focused on Western Ghats Shola endemics, Great Hornbills, Kingfishers, Trogons & Wetland Migrants.'}
              </p>
            </div>
          </div>

          {/* Sub-filter by Duration */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-sans uppercase tracking-wider text-[#666]">Duration:</span>
            {['all', '2N/3D', '3N/4D', '4N/5D'].map((dur) => (
              <button
                key={dur}
                onClick={() => setDurationFilter(dur)}
                className={`px-3 py-1 rounded-lg text-xs font-sans transition-all cursor-pointer ${
                  durationFilter === dur
                    ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 font-semibold'
                    : 'bg-white/5 text-[#888] border border-white/5 hover:text-[#F1EFE8]'
                }`}
              >
                {dur === 'all' ? 'All Durations' : dur}
              </button>
            ))}
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <article
              key={tour.id}
              className="group rounded-2xl overflow-hidden bg-[#121411] border border-[#2A2B28] hover:border-[#C5A059]/70 transition-all duration-500 shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Image Header */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#080908]">
                  <img
                    src={tour.heroImage}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121411] via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[9px] font-sans tracking-widest text-[#C5A059] uppercase border border-white/10 font-medium">
                      {tour.duration}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[9px] font-sans tracking-wider text-emerald-400 border border-emerald-500/20">
                      {tour.status}
                    </span>
                  </div>

                  {/* Date & Destination on bottom image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-sans text-[#F1EFE8]">
                    <span>📍 {tour.destination}</span>
                    <span className="text-[#C5A059]">📅 {tour.dateRange}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A059] block mb-1">
                    {tour.badge}
                  </span>
                  <h3 className="font-serif text-2xl text-[#F1EFE8] group-hover:text-[#C5A059] transition-colors leading-snug mb-3">
                    {tour.title}
                  </h3>

                  <p className="font-sans text-xs text-[#A7A59B] leading-relaxed font-light mb-5 line-clamp-2">
                    {tour.overview}
                  </p>

                  {/* Target Species Pills */}
                  <div className="mb-5 pt-3 border-t border-white/5">
                    <span className="text-[9px] font-sans uppercase tracking-wider text-[#777] block mb-2">
                      Key Sightings Focus:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {tour.targetSpecies.slice(0, 3).map((sp, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[10px] font-sans text-[#A7A59B]"
                        >
                          ✦ {sp.split('(')[0]}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tour Specs */}
                  <div className="space-y-1.5 text-[11px] font-sans text-[#888] pt-3 border-t border-white/5">
                    <div className="flex justify-between">
                      <span className="text-[#666]">Expedition Drives:</span>
                      <span className="text-[#F1EFE8]">{tour.safariCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666]">Vehicle Setup:</span>
                      <span className="text-[#C5A059] font-medium">{tour.groupSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666]">Skipper / Mentor:</span>
                      <span className="text-[#F1EFE8]">{tour.skipper}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer (Toehold Style Pricing & Action) */}
              <div className="p-6 sm:p-7 pt-0 border-t border-white/5">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <span className="text-[9px] font-sans uppercase tracking-wider text-[#777] block">
                      Starts from
                    </span>
                    <div className="flex items-baseline gap-1 text-[#F1EFE8]">
                      <span className="text-xs font-sans text-[#C5A059]">INR</span>
                      <span className="font-serif text-2xl font-light">
                        {tour.price.toLocaleString('en-IN')}/-
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-sans text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    All-Inclusive Tour
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => onSelectTour(tour)}
                    className="py-2.5 px-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-sans uppercase tracking-wider text-[#F1EFE8] transition-all cursor-pointer text-center"
                  >
                    View Itinerary
                  </button>
                  <a
                    href={`https://wa.me/919087394546?text=Hello%20Untamed%20Trails,%20I%20am%20interested%20in%20reserving%20a%20seat%20on%20the%20${encodeURIComponent(tour.title)}%20(${tour.destination})%20Photo%20Tour.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#C5A059] hover:bg-[#d8b368] text-[#080908] text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-md text-center flex items-center justify-center gap-1"
                  >
                    <span>Enquire / Book</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
