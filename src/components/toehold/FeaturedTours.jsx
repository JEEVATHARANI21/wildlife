export default function FeaturedTours({ tours, onSelectTour }) {
  return (
    <section id="featured" className="py-24 px-5 sm:px-8 md:px-16 bg-[#151815] border-b border-[#242923]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#D6A85C] font-semibold">
              Handpicked Expeditions · Section 01
            </span>
            <span className="w-8 h-[1.5px] bg-[#B87333]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F2F0E8] font-light leading-tight">
            Featured <span className="italic text-[#B87333] font-normal">Tours</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-3 font-light leading-relaxed">
            Our most sought-after signature departures curated for peak seasonal sightings, prime lighting angles, and unhurried wildlife photography.
          </p>
        </div>

        {/* Featured Tours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              onClick={() => onSelectTour(tour)}
              className="group relative rounded-2xl overflow-hidden bg-[#242923]/60 border border-[#242923] hover:border-[#B87333] transition-all duration-500 shadow-xl cursor-pointer flex flex-col justify-between"
            >
              {/* Tour Image Container (60-70% height with dark gradient at bottom) */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#080908]">
                <img
                  src={tour.heroImage}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-transparent to-transparent pointer-events-none" />

                {/* Duration Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#080908]/90 backdrop-blur-md text-[9px] font-sans tracking-widest text-[#D6A85C] uppercase border border-[#242923] font-medium">
                    {tour.duration}
                  </span>
                </div>

                <div className="absolute top-3.5 right-3.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#080908]/90 backdrop-blur-md text-[9px] font-sans tracking-wider text-[#D6A85C] border border-[#B87333]/40">
                    {tour.status}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-[#151815]">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#D6A85C] font-medium block mb-1">
                    📍 {tour.destination}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-snug mb-2">
                    {tour.title}
                  </h3>
                  <span className="text-xs font-sans text-[#A7A59B] block mb-4">
                    📅 {tour.dateRange}
                  </span>
                </div>

                {/* Cost Block */}
                <div className="pt-4 border-t border-[#242923] flex items-end justify-between">
                  <div>
                    <span className="text-[9px] font-sans uppercase tracking-wider text-[#A7A59B] block">
                      Starts from
                    </span>
                    <div className="flex items-baseline gap-1 text-[#F2F0E8]">
                      <span className="text-xs font-sans text-[#B87333] font-bold">INR</span>
                      <span className="font-serif text-xl font-normal text-[#F2F0E8]">
                        ₹{tour.price.toLocaleString('en-IN')}/-
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-sans text-[#B87333] group-hover:text-[#D6A85C] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    View Tour →
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
