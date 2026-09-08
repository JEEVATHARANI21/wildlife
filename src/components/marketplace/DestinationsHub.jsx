import { useState } from 'react'

export default function DestinationsHub({ destinations, onSelectDestination }) {
  const [selectedState, setSelectedState] = useState('all')

  const states = ['all', ...new Set(destinations.map((d) => d.state))]

  const filtered = destinations.filter((d) => {
    if (selectedState === 'all') return true
    return d.state === selectedState
  })

  return (
    <section id="destinations" className="py-20 px-4 sm:px-8 md:px-16 bg-[#0E0F0D] border-b border-[#2A2B28]/60">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#B3874B] animate-pulse" />
              <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B3874B] font-semibold">
                Protected Wilderness Hubs · India
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F1EFE8] font-light leading-tight">
              Explore India's <span className="italic text-[#B3874B] font-normal">Tiger Reserves</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-2 max-w-xl font-light">
              Detailed park logistics, prime predator zones, seasonal sighting probabilities, and licensed local fleet operators.
            </p>
          </div>

          {/* State Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {states.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-3.5 py-1.5 rounded-full font-sans text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  selectedState === st
                    ? 'bg-[#B3874B] text-[#0B0C0A] font-semibold shadow-md'
                    : 'bg-[#161814] text-[#888] border border-white/10 hover:border-white/20 hover:text-[#F1EFE8]'
                }`}
              >
                {st === 'all' ? 'All States' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              className="group rounded-2xl overflow-hidden bg-[#141613] border border-[#2A2B28]/80 hover:border-[#B3874B]/70 transition-all duration-500 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Hero Destination Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#090A09]">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141613] via-transparent to-transparent pointer-events-none" />

                  {/* Top State Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[9px] font-sans tracking-widest text-[#B3874B] uppercase border border-white/10 font-semibold">
                    {dest.state}
                  </span>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-sans text-[#F1EFE8]">
                    <span className="bg-emerald-950/80 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                      Sighting Index: {dest.sightingIndex.split('·')[0]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F1EFE8] group-hover:text-[#B3874B] transition-colors leading-snug mb-1">
                    {dest.name}
                  </h3>
                  <p className="font-serif italic text-xs text-[#B3874B]/90 mb-4">
                    {dest.tagline}
                  </p>

                  {/* Species Found */}
                  <div className="mb-4">
                    <span className="text-[9px] font-sans uppercase tracking-widest text-[#777] block mb-2">
                      Key Wildlife Species:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.wildlife.map((w, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[10px] font-sans text-[#A7A59B]"
                        >
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Logistics Specs */}
                  <div className="space-y-1.5 text-[11px] font-sans text-[#888] pt-3 border-t border-white/5">
                    <div>
                      <span className="text-[#555] uppercase tracking-wider">Best Season: </span>
                      <span className="text-[#F1EFE8]">{dest.bestSeason}</span>
                    </div>
                    <div>
                      <span className="text-[#555] uppercase tracking-wider">Permit Zones: </span>
                      <span className="text-[#F1EFE8]">{dest.safariZones}</span>
                    </div>
                    <div>
                      <span className="text-[#555] uppercase tracking-wider">Connectivity: </span>
                      <span className="text-[#A7A59B]">{dest.nearestAirport}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 sm:p-7 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    onSelectDestination(dest.id)
                    const el = document.getElementById('deals')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-[#B3874B] hover:text-[#0B0C0A] text-xs font-sans tracking-widest uppercase text-[#F1EFE8] transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>View Safaris & Deals ({dest.dealCount})</span>
                  <span>↗</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
