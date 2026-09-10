export default function FeaturedTours({ tours, onSelectTour }) {
  return (
    <section id="featured" className="py-20 px-5 sm:px-8 md:px-16 bg-[#0E100D] border-b border-[#2A2B28]/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C5A059] font-semibold">
              Handpicked Expeditions · Section 01
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F1EFE8] font-light leading-tight">
            Featured <span className="italic text-[#C5A059] font-normal">Tours</span>
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
              className="group relative rounded-2xl overflow-hidden bg-[#141613] border border-[#2A2B28] hover:border-[#C5A059]/70 transition-all duration-500 shadow-xl cursor-pointer flex flex-col justify-between"
            >
              {/* Tour Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#080908]">
                <img
                  src={tour.heroImage}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141613] via-transparent to-transparent pointer-events-none" />

                {/* Duration Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[9px] font-sans tracking-widest text-[#C5A059] uppercase border border-white/10 font-medium">
                    {tour.duration}
                  </span>
                </div>

                <div className="absolute top-3.5 right-3.5">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 backdrop-blur-md text-[9px] font-sans tracking-wider text-emerald-400 border border-emerald-500/30">
                    {tour.status}
                  </span>
                </div>
              </div>

              {/* Card Details (Toehold Style) */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#888] block mb-1">
                    📍 {tour.destination}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F1EFE8] group-hover:text-[#C5A059] transition-colors leading-snug mb-2">
                    {tour.title}
                  </h3>
                  <span className="text-xs font-sans text-[#A7A59B] block mb-4">
                    📅 {tour.dateRange}
                  </span>
                </div>

                {/* Cost Block (Toehold style) */}
                <div className="pt-4 border-t border-white/5 flex items-end justify-between">
                  <div>
                    <span className="text-[9px] font-sans uppercase tracking-wider text-[#777] block">
                      Starts from
                    </span>
                    <div className="flex items-baseline gap-1 text-[#F1EFE8]">
                      <span className="text-xs font-sans text-[#C5A059]">INR</span>
                      <span className="font-serif text-lg font-normal">
                        {tour.price.toLocaleString('en-IN')}/-
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-sans text-[#C5A059] group-hover:translate-x-1 transition-transform">
                    Explore →
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
