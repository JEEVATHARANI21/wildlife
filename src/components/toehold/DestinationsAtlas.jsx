import { useState } from 'react'
import { DESTINATIONS_DATA } from '../../data/destinationsData'
import DestinationDetailModal from './DestinationDetailModal'

export default function DestinationsAtlas({ onSelectTour }) {
  const [selectedDestination, setSelectedDestination] = useState(null)

  return (
    <section id="destinations" className="py-24 sm:py-28 bg-[#080908] border-b border-[#242923] select-none relative overflow-hidden">
      {/* Background atmospheric ambient light */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[300px] bg-[#B87333]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
              WILDLIFE SANCTUARIES & HABITATS
            </span>
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight mb-4">
            Destinations <span className="italic text-[#D6A85C] font-normal">Atlas</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#A7A59B] font-light leading-relaxed max-w-2xl mx-auto">
            From misty high-altitude rainforest canopies to ancient granite kopjes and central tiger corridors. Discover the wildernesses where we lead our small-group expeditions.
          </p>
        </div>

        {/* Destination Cards Grid (5 Landscapes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DESTINATIONS_DATA.map((dest, idx) => (
            <div
              key={dest.id}
              onClick={() => setSelectedDestination(dest)}
              className={`group relative rounded-3xl bg-[#151815] border border-[#242923] hover:border-[#D6A85C]/60 transition-all duration-400 overflow-hidden cursor-pointer flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_60px_rgba(214,168,92,0.18)] hover:-translate-y-1 ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Image Container */}
              <div className={`relative w-full overflow-hidden bg-[#080908] ${idx === 0 ? 'aspect-[21/9] sm:aspect-[16/8]' : 'aspect-[16/10]'}`}>
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.88] group-hover:brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-[#151815]/30 to-transparent" />

                {/* State Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#080908]/85 backdrop-blur-md border border-[#242923] text-[#D6A85C] font-sans text-[9.5px] font-bold tracking-[0.2em] uppercase">
                    📍 {dest.state}
                  </span>
                </div>

                {/* Best Season Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-[#080908]/85 backdrop-blur-md border border-[#242923] text-[#F2F0E8] font-sans text-[9.5px] tracking-wider uppercase">
                    🌤 {dest.bestSeason.split('(')[0]}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-snug">
                    {dest.name}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#D6A85C] font-light italic">
                    “{dest.tagline}”
                  </p>

                  <p className="font-sans text-xs sm:text-sm text-[#A7A59B] font-light leading-relaxed line-clamp-2">
                    {dest.terrain}
                  </p>

                  {/* Wildlife Strip */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="text-[10px] uppercase font-sans tracking-widest text-[#B87333] mr-1">
                      Key Sightings:
                    </span>
                    {dest.keyWildlife.slice(0, 3).map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#080908] border border-[#242923] text-[11px] text-[#F2F0E8]/85"
                      >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-[#242923] flex items-center justify-between">
                  <span className="font-sans text-xs uppercase tracking-widest font-semibold text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors flex items-center gap-2">
                    <span>Explore Habitat & Safaris</span>
                    <span className="text-base transition-transform group-hover:translate-x-1">→</span>
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[#242923] group-hover:bg-[#D6A85C] group-hover:text-[#080908] text-[#F2F0E8] flex items-center justify-center text-xs transition-all">
                    ↗
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destination Modal */}
      {selectedDestination && (
        <DestinationDetailModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onSelectTour={onSelectTour}
        />
      )}
    </section>
  )
}
