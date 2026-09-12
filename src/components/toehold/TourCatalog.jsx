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
    <section id="tours" className="py-24 px-5 sm:px-8 md:px-16 bg-[#080908] border-b border-[#242923]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#D6A85C] font-semibold">
              Specialized Expedition Tracks · Section 02
            </span>
            <span className="w-8 h-[1.5px] bg-[#B87333]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight">
            Photo Tour <span className="italic text-[#B87333] font-normal">Schedules</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-3 font-light leading-relaxed">
            Choose your specialized photography track. Whether you seek big cats across primeval dry deciduous forests or elusive endemic avifauna in tropical rainforest canopies.
          </p>
        </div>

        {/* 🌟 TWO DISTINCT TRACKING CATEGORIES SWITCHER ("2 Trucking Plans") */}
        <div className="flex justify-center mb-12">
          <div className="p-1.5 rounded-2xl bg-[#151815] border border-[#242923] shadow-2xl flex flex-col sm:flex-row gap-2 max-w-xl w-full">
            {/* Category 1: Animal & Big Cat Tracking */}
            <button
              type="button"
              id="animal-tracking"
              onClick={() => setActiveCategory('animals')}
              className={`flex-1 py-3.5 px-6 rounded-xl font-sans text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${
                activeCategory === 'animals'
                  ? 'btn-copper-primary shadow-[0_4px_20px_rgba(184,115,51,0.35)]'
                  : 'text-[#A7A59B] hover:text-[#F2F0E8] hover:bg-[#242923]/50'
              }`}
            >
              <span className="text-base">🐅</span>
              <span>1. Animal Tracking Tours</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeCategory === 'animals' ? 'bg-[#080908]/30 text-[#080908] font-bold' : 'bg-[#242923] text-[#A7A59B]'
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
                  ? 'btn-copper-primary shadow-[0_4px_20px_rgba(184,115,51,0.35)]'
                  : 'text-[#A7A59B] hover:text-[#F2F0E8] hover:bg-[#242923]/50'
              }`}
            >
              <span className="text-base">🦅</span>
              <span>2. Bird Photography Tours</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeCategory === 'birds' ? 'bg-[#080908]/30 text-[#080908] font-bold' : 'bg-[#242923] text-[#A7A59B]'
              }`}>
                {birdTours.length}
              </span>
            </button>
          </div>
        </div>

        {/* Category Description Banner */}
        <div className="mb-10 p-5 rounded-2xl bg-[#151815] border border-[#242923] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {activeCategory === 'animals' ? '🐅' : '🦅'}
            </span>
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-[#F2F0E8]">
                {activeCategory === 'animals'
                  ? 'Mammal & Apex Predator Tracking Expeditions'
                  : 'Avian Endemic & Flight Photography Masterclasses'}
              </h3>
              <p className="font-sans text-xs text-[#A7A59B] font-light">
                {activeCategory === 'animals'
                  ? 'Focused on Royal Bengal Tigers, Indian Leopards, Black Panthers, Sloth Bears & Elephant Corridors.'
                  : 'Focused on Western Ghats Shola endemics, Great Hornbills, Kingfishers, Trogons & Wetland Migrants.'}
              </p>
            </div>
          </div>

          {/* Sub-filter by Duration */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-sans uppercase tracking-wider text-[#A7A59B]">Duration:</span>
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

        {/* Tours Grid: Cards with #151815 background and #242923 border */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <article
              key={tour.id}
              className="group rounded-2xl overflow-hidden bg-[#151815] border border-[#242923] hover:border-[#B87333] transition-all duration-500 shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Image Header: 60-70% height with dark bottom gradient */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#080908]">
                  <img
                    src={tour.heroImage}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-[#080908]/90 backdrop-blur-md text-[9px] font-sans tracking-widest text-[#D6A85C] uppercase border border-[#242923] font-medium">
                      {tour.duration}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#080908]/90 backdrop-blur-md text-[9px] font-sans tracking-wider text-[#D6A85C] border border-[#B87333]/40">
                      {tour.status}
                    </span>
                  </div>

                  {/* Date & Destination */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-sans text-[#F2F0E8]">
                    <span className="text-[#D6A85C]">📍 {tour.destination}</span>
                    <span className="text-[#A7A59B]">📅 {tour.dateRange}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#B87333] font-bold block mb-1">
                    {tour.badge}
                  </span>
                  <h3 className="font-serif text-2xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-snug mb-3">
                    {tour.title}
                  </h3>

                  <p className="font-sans text-xs text-[#A7A59B] leading-relaxed font-light mb-5 line-clamp-2">
                    {tour.overview}
                  </p>

                  {/* Target Species Pills */}
                  <div className="mb-5 pt-3 border-t border-[#242923]">
                    <span className="text-[9px] font-sans uppercase tracking-wider text-[#A7A59B] block mb-2 font-medium">
                      Key Sightings Focus:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {tour.targetSpecies.slice(0, 3).map((sp, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#242923]/60 border border-[#242923] text-[10px] font-sans text-[#F2F0E8]"
                        >
                          <span className="text-[#B87333] mr-1">✦</span>
                          {sp.split('(')[0]}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tour Specs */}
                  <div className="space-y-1.5 text-[11px] font-sans text-[#A7A59B] pt-3 border-t border-[#242923]">
                    <div className="flex justify-between">
                      <span className="text-[#A7A59B]">Expedition Drives:</span>
                      <span className="text-[#F2F0E8]">{tour.safariCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A7A59B]">Vehicle Setup:</span>
                      <span className="text-[#D6A85C] font-medium">{tour.groupSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A7A59B]">Skipper / Mentor:</span>
                      <span className="text-[#F2F0E8]">{tour.skipper}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 sm:p-7 pt-0 border-t border-[#242923]">
                <div className="flex items-end justify-between mb-4 pt-4">
                  <div>
                    <span className="text-[9px] font-sans uppercase tracking-wider text-[#A7A59B] block">
                      Starts from
                    </span>
                    <div className="flex items-baseline gap-1 text-[#F2F0E8]">
                      <span className="text-xs font-sans text-[#B87333] font-bold">INR</span>
                      <span className="font-serif text-2xl font-light text-[#F2F0E8]">
                        ₹{tour.price.toLocaleString('en-IN')}/-
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-sans text-[#D6A85C] bg-[#242923] px-2 py-0.5 rounded border border-[#B87333]/30">
                    All-Inclusive
                  </span>
                </div>

                {/* Button actions with Secondary & Primary Copper */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => onSelectTour(tour)}
                    className="btn-copper-secondary py-2.5 px-3 rounded-xl text-xs font-sans uppercase tracking-wider cursor-pointer text-center"
                  >
                    View Itinerary
                  </button>
                  <a
                    href={`https://wa.me/919087394546?text=Hello%20VM%20Wild%20Expeditions,%20I%20am%20interested%20in%20reserving%20a%20seat%20on%20the%20${encodeURIComponent(tour.title)}%20(${tour.destination})%20Photo%20Tour.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-copper-primary py-2.5 px-3 rounded-xl text-xs font-sans uppercase tracking-wider shadow-md text-center flex items-center justify-center gap-1"
                  >
                    <span>Enquire</span>
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
