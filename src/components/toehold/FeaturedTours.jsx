import { useState } from 'react'

export default function FeaturedTours({
  animalTours = [],
  birdTours = [],
  tours = [],
  onSelectTour,
  onSelectCategory,
}) {
  const [activeTab, setActiveTab] = useState('all')

  // Resolve pool of tours
  const allAnimals = animalTours.length > 0 ? animalTours : tours.filter(t => !t.id.includes('bird') && !t.id.includes('western') && !t.id.includes('bharatpur') && !t.id.includes('thattekad') && !t.id.includes('sattal') && !t.id.includes('kutch'))
  const allBirds = birdTours.length > 0 ? birdTours : tours.filter(t => t.id.includes('bird') || t.id.includes('western') || t.id.includes('bharatpur') || t.id.includes('thattekad') || t.id.includes('sattal') || t.id.includes('kutch'))

  // 6 Flagship expeditions for 'all': 3 animals + 3 birds
  const curatedAll = [
    allAnimals[0] || tours[0],
    allAnimals[1] || tours[1],
    allBirds[0] || tours[2],
    allBirds[1] || tours[3],
    allAnimals[2] || allAnimals[0],
    allBirds[2] || allBirds[0],
  ].filter(Boolean)

  const displayedTours =
    activeTab === 'animals'
      ? allAnimals
      : activeTab === 'birds'
      ? allBirds
      : curatedAll

  const handleCategoryNavigation = (category) => {
    if (onSelectCategory) onSelectCategory(category)
    const el = document.getElementById('tours')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="featured" className="py-24 sm:py-28 px-5 sm:px-8 md:px-16 bg-[#151815] border-b border-[#242923]">
      <div className="max-w-7xl mx-auto">
        {/* 1. Spacious Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2.5 mb-3.5 select-none">
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
              HANDPICKED EXPEDITIONS · 2026–27
            </span>
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight mb-4">
            Featured <span className="italic text-[#D6A85C] font-normal">Expeditions</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#A7A59B] font-light leading-relaxed max-w-xl mx-auto">
            Discover our most sought-after wildlife photography journeys, selected for exceptional wildlife encounters, beautiful light and unforgettable field experiences.
          </p>
        </div>

        {/* 2. Category Filter Tabs: ALL / ANIMALS / BIRDS */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-14 select-none">
          {[
            { key: 'all', label: 'ALL' },
            { key: 'animals', label: 'ANIMALS' },
            { key: 'birds', label: 'BIRDS' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 sm:px-6 py-2 rounded-full font-sans text-xs tracking-[0.16em] uppercase font-bold transition-all duration-300 cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-[#D6A85C] text-[#080908] shadow-[0_4px_20px_rgba(214,168,92,0.35)] scale-105'
                  : 'bg-[#080908]/70 text-[#A7A59B] border border-[#242923] hover:text-[#F2F0E8] hover:border-[#D6A85C]/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3. Tour Cards: 3-Column Grid on Desktop, 2 on Tablet, 1 on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9 mb-24">
          {displayedTours.map((tour) => (
            <article
              key={tour.id}
              onClick={() => onSelectTour && onSelectTour(tour)}
              className="group relative rounded-2xl overflow-hidden bg-[#151815] border border-[#242923] hover:border-[#D6A85C] transition-all duration-500 shadow-2xl cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* 1. Large High-Quality Wildlife Photograph (50-55% of card height) */}
                <div className="relative w-full aspect-[16/11] overflow-hidden bg-[#080908]">
                  <img
                    src={tour.heroImage}
                    alt={tour.packageName || tour.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out brightness-[0.92] group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-transparent to-transparent pointer-events-none" />

                  {/* 2. Small Status Badge (Subtle dark translucent background with gold text) */}
                  <div className="absolute top-3.5 right-3.5 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-[#080908]/85 backdrop-blur-md text-[9.5px] font-sans tracking-wider uppercase font-semibold text-[#D6A85C] border border-[#D6A85C]/35 shadow-md">
                      {tour.status || 'OPEN FOR BOOKING'}
                    </span>
                  </div>
                </div>

                {/* Card Editorial Information */}
                <div className="p-6 sm:p-7 space-y-4">
                  {/* 3. Category / Location */}
                  <div className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase text-[#D6A85C] font-semibold flex items-center gap-1.5">
                    <span>📍</span>
                    <span>{tour.destination}</span>
                  </div>

                  {/* 4. Package Name */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-tight font-normal">
                    {tour.packageName || tour.title}
                  </h3>

                  {/* 5. Date & Duration */}
                  <div className="flex items-center gap-2 text-xs font-sans text-[#A7A59B]">
                    <span>📅</span>
                    <span>{tour.dateRange}</span>
                    <span className="text-[#242923]">•</span>
                    <span>{tour.duration}</span>
                  </div>

                  {/* 6. Photography Highlights */}
                  <div className="pt-2 border-t border-[#242923]/70">
                    <div className="text-xs font-sans leading-relaxed">
                      <span className="text-[#A7A59B] text-[11px] block uppercase tracking-wider mb-0.5">
                        Target Species
                      </span>
                      <span className="text-[#F2F0E8]/95 font-medium">
                        {tour.targetSpeciesLine ||
                          (tour.targetSpecies && tour.targetSpecies.slice(0, 3).join(' · ')) ||
                          'Apex Predators & Rare Endemics'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7 & 8. Cost & Explore CTA Footer */}
              <div className="p-6 sm:p-7 pt-4 border-t border-[#242923] flex items-end justify-between gap-4 bg-[#151815]">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#A7A59B] block">
                    Starts From
                  </span>
                  <div className="flex items-baseline gap-1 text-[#F2F0E8]">
                    <span className="font-serif text-2xl sm:text-3xl font-light text-[#F2F0E8]">
                      ₹{tour.price.toLocaleString('en-IN')}/-
                    </span>
                    <span className="text-[10px] font-sans text-[#A7A59B] ml-1">/ person</span>
                  </div>
                </div>

                <div className="text-xs font-sans uppercase tracking-widest font-bold text-[#D6A85C] group-hover:text-[#B87333] flex items-center gap-1.5 transition-colors">
                  <span>Explore Expedition</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 4. Choose Your Wild: Two Large Visual Panels */}
        <div className="mb-24 pt-12 border-t border-[#242923]">
          <div className="text-center max-w-xl mx-auto mb-10 select-none">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold block mb-2">
              TWO DISTINCT HORIZONS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#F2F0E8] font-light">
              Choose Your <span className="italic text-[#D6A85C]">Wild</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {/* Panel 1: Animal Expeditions */}
            <div className="relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[420px] flex flex-col justify-end p-8 sm:p-10 border border-[#242923] group">
              <img
                src="https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200&q=80&auto=format&fit=crop"
                alt="Animal Expeditions"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080908] via-[#080908]/60 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <span className="text-[10.5px] font-sans tracking-[0.25em] uppercase text-[#D6A85C] font-semibold block mb-2">
                  BIG CATS & APEX PREDATORS
                </span>
                <h4 className="font-serif text-3xl sm:text-4xl text-[#F2F0E8] font-light mb-3 leading-tight">
                  Animal Expeditions
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#F2F0E8]/85 font-light max-w-md mb-6 leading-relaxed">
                  Track, observe and photograph India's most iconic wildlife across Bandhavgarh, Kabini, Tadoba, Ranthambore, and Gir.
                </p>
                <button
                  type="button"
                  onClick={() => handleCategoryNavigation('animals')}
                  className="py-3.5 px-7 rounded-full font-sans text-xs uppercase tracking-widest font-bold bg-[#D6A85C] text-[#080908] hover:bg-[#B87333] hover:shadow-[0_4px_25px_rgba(214,168,92,0.4)] transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>EXPLORE ANIMAL EXPEDITIONS</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Panel 2: Birding Tours */}
            <div className="relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[420px] flex flex-col justify-end p-8 sm:p-10 border border-[#242923] group">
              <img
                src="https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=1200&q=80&auto=format&fit=crop"
                alt="Birding Tours"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080908] via-[#080908]/60 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <span className="text-[10.5px] font-sans tracking-[0.25em] uppercase text-[#D6A85C] font-semibold block mb-2">
                  AVIFAUNA & RAINFOREST CANOPIES
                </span>
                <h4 className="font-serif text-3xl sm:text-4xl text-[#F2F0E8] font-light mb-3 leading-tight">
                  Birding Tours
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#F2F0E8]/85 font-light max-w-md mb-6 leading-relaxed">
                  Discover India's extraordinary birds, from endemic Western Ghats species to winter waterfowl migrants and Himalayan raptors.
                </p>
                <button
                  type="button"
                  onClick={() => handleCategoryNavigation('birds')}
                  className="py-3.5 px-7 rounded-full font-sans text-xs uppercase tracking-widest font-bold bg-[#D6A85C] text-[#080908] hover:bg-[#B87333] hover:shadow-[0_4px_25px_rgba(214,168,92,0.4)] transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>EXPLORE BIRDING TOURS</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Why Photographers Travel With Us (Minimal Trust Section) */}
        <div className="mb-20 pt-12 border-t border-[#242923]">
          <div className="text-center max-w-xl mx-auto mb-10 select-none">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold block mb-2">
              THE VM WILD COMMITMENT
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] font-light">
              Why Photographers Travel With Us
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'MAX 4 PHOTOGRAPHERS',
                desc: 'Small groups for better field experience, spacious lens freedom and guaranteed window seats.',
              },
              {
                title: 'PHOTOGRAPHY-FOCUSED',
                desc: 'Trips designed around prime shooting angles, animal behavior, dust conditions and golden hours.',
              },
              {
                title: 'EXPERT FIELD GUIDES',
                desc: 'Local naturalists and dedicated photo skippers with deep tracking knowledge and wildlife expertise.',
              },
              {
                title: 'CURATED DEPARTURES',
                desc: 'Carefully selected destinations and peak sighting seasons with guaranteed forest core permits.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#080908]/60 border border-[#242923] hover:border-[#D6A85C]/60 transition-all text-left"
              >
                <span className="text-[11px] font-sans tracking-widest text-[#D6A85C] font-bold block mb-2">
                  {item.title}
                </span>
                <p className="text-xs font-sans text-[#A7A59B] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Final Editorial CTA Banner */}
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-14 bg-gradient-to-r from-[#080908] via-[#151815] to-[#080908] border border-[#242923] text-center max-w-4xl mx-auto shadow-2xl">
          <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#F2F0E8] font-light mb-3 leading-tight">
            “Your next great photograph is out there.”
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#D6A85C] uppercase tracking-widest font-semibold mb-7">
            Let’s plan the expedition.
          </p>
          <a
            href="https://wa.me/919087394546?text=Hello%20VM%20Wild%20Expeditions,%20I'm%20ready%20to%20plan%20my%20photography%20expedition.%20Please%20guide%20me%20on%20upcoming%20schedules."
            target="_blank"
            rel="noopener noreferrer"
            className="py-4 px-9 rounded-full font-sans text-xs uppercase tracking-widest font-bold bg-[#D6A85C] text-[#080908] hover:bg-[#B87333] hover:shadow-[0_6px_30px_rgba(214,168,92,0.45)] hover:scale-105 transition-all inline-flex items-center gap-2 shadow-xl"
          >
            <span>PLAN MY EXPEDITION</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
