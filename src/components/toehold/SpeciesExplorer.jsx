import { useState } from 'react'
import { SPECIES_DATA } from '../../data/speciesData'

export default function SpeciesExplorer({ onSelectTour }) {
  const [activeCategory, setActiveCategory] = useState('all') // 'all' | 'Big Cats & Mammals' | 'Rare & Endemic Birds'

  const filteredSpecies = SPECIES_DATA.filter((item) => {
    if (activeCategory === 'all') return true
    return item.category === activeCategory
  })

  const handleSpeciesClick = (species) => {
    const el = document.getElementById('tours')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="species" className="py-24 sm:py-28 bg-[#0a0c0a] border-b border-[#242923] select-none relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[300px] bg-[#D6A85C]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
              WILDLIFE & AVIAN ENCOUNTERS
            </span>
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight mb-4">
            Target Species <span className="italic text-[#D6A85C] font-normal">Showcase</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#A7A59B] font-light leading-relaxed max-w-2xl mx-auto">
            Every expedition is engineered around the behavioral rhythms and prime lighting angles of specific wildlife subjects. Choose your dream species and join us in the field.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#D6A85C] text-[#080908] font-bold shadow-[0_2px_12px_rgba(214,168,92,0.3)]'
                  : 'bg-[#151815] text-[#A7A59B] hover:text-[#F2F0E8] border border-[#242923]'
              }`}
            >
              All Species ({SPECIES_DATA.length})
            </button>
            <button
              onClick={() => setActiveCategory('Big Cats & Mammals')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'Big Cats & Mammals'
                  ? 'bg-[#D6A85C] text-[#080908] font-bold shadow-[0_2px_12px_rgba(214,168,92,0.3)]'
                  : 'bg-[#151815] text-[#A7A59B] hover:text-[#F2F0E8] border border-[#242923]'
              }`}
            >
              <span>🐅</span>
              <span>Big Cats & Mammals</span>
            </button>
            <button
              onClick={() => setActiveCategory('Rare & Endemic Birds')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'Rare & Endemic Birds'
                  ? 'bg-[#D6A85C] text-[#080908] font-bold shadow-[0_2px_12px_rgba(214,168,92,0.3)]'
                  : 'bg-[#151815] text-[#A7A59B] hover:text-[#F2F0E8] border border-[#242923]'
              }`}
            >
              <span>🦜</span>
              <span>Rare & Endemic Birds</span>
            </button>
          </div>
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSpecies.map((species) => (
            <div
              key={species.id}
              onClick={() => handleSpeciesClick(species)}
              className="group relative rounded-3xl bg-[#151815] border border-[#242923] hover:border-[#D6A85C]/60 transition-all duration-400 overflow-hidden cursor-pointer flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(214,168,92,0.15)] hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#080908]">
                <img
                  src={species.image}
                  alt={species.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.88] group-hover:brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-[#151815]/30 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#080908]/85 backdrop-blur-md border border-[#242923] text-[#D6A85C] font-sans text-[9px] font-bold tracking-wider uppercase">
                    {species.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-snug">
                      {species.name}
                    </h3>
                    <span className="text-xl">{species.icon}</span>
                  </div>

                  <p className="font-sans text-[11px] text-[#A7A59B] italic font-light">
                    {species.scientificName}
                  </p>

                  <div className="pt-2 space-y-1 text-xs">
                    <p className="text-[#A7A59B]">
                      <strong className="text-[#D6A85C] font-medium">Prime Habitat:</strong>{' '}
                      {species.bestDestination}
                    </p>
                    <p className="text-[#A7A59B]">
                      <strong className="text-[#D6A85C] font-medium">Best Season:</strong>{' '}
                      {species.bestSeason}
                    </p>
                  </div>

                  <p className="font-sans text-[11.5px] text-[#A7A59B] font-light leading-relaxed pt-1 line-clamp-3">
                    <span className="text-[#B87333] font-medium">Photo Tip:</span> {species.photoTips}
                  </p>
                </div>

                {/* Direct Action linking to Tour */}
                <div className="pt-3 border-t border-[#242923] flex items-center justify-between">
                  <span className="text-[11px] font-sans uppercase tracking-wider text-[#D6A85C] font-semibold flex items-center gap-1.5 group-hover:text-[#F2F0E8] transition-colors">
                    <span>Explore {species.linkedTourTitle.split('—')[0]}</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                  <span className="text-xs text-[#A7A59B] group-hover:text-[#D6A85C] transition-colors">
                    From ₹XX,XXX
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
