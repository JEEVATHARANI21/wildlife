import { useState } from 'react'

export default function SafariDeals({ packages, onSelectPackage, selectedDest }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredPackages = packages.filter((pkg) => {
    if (selectedDest && selectedDest !== 'all' && pkg.destinationId !== selectedDest) {
      return false
    }
    if (activeFilter === 'all') return true
    if (activeFilter === 'tiger') return pkg.title.toLowerCase().includes('tiger') || pkg.overview.toLowerCase().includes('tiger')
    if (activeFilter === 'panther') return pkg.title.toLowerCase().includes('panther') || pkg.destinationId === 'kabini'
    if (activeFilter === 'budget') return pkg.priceDiscounted < 30000
    if (activeFilter === 'luxury') return pkg.priceDiscounted >= 30000
    return true
  })

  return (
    <section id="deals" className="py-20 px-4 sm:px-8 md:px-16 bg-[#0E0F0D] border-b border-[#2A2B28]/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#B3874B] animate-pulse" />
              <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B3874B] font-semibold">
                Curated Safari Packages · Handpicked Operators
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F1EFE8] font-light leading-tight">
              Discover the <span className="italic text-[#B3874B] font-normal">Best Safari Deals</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-2 max-w-xl font-light">
              All-inclusive multi-day expeditions with confirmed forest gate permits, custom 4x4 Gypsys, luxury stays, and certified master naturalists.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Packages' },
              { id: 'tiger', label: '🐅 Tiger Expeditions' },
              { id: 'panther', label: '🐆 Black Panther & Leopards' },
              { id: 'budget', label: 'Under ₹30k' },
              { id: 'luxury', label: 'Premium Luxury' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full font-sans text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#B3874B] text-[#0B0C0A] font-semibold shadow-md'
                    : 'bg-[#161814] text-[#888] border border-white/10 hover:border-white/20 hover:text-[#F1EFE8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Deals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPackages.map((pkg) => (
            <article
              key={pkg.id}
              className="group rounded-2xl overflow-hidden bg-[#141613] border border-[#2A2B28]/80 hover:border-[#B3874B]/60 transition-all duration-500 shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Image Header with Live Badges */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0B0C0A]">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141613] via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[9px] font-sans tracking-widest text-[#B3874B] uppercase border border-white/10 font-medium">
                      {pkg.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-[9px] font-sans tracking-wider text-emerald-400 border border-emerald-500/30">
                      Save ₹{pkg.savings.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Bottom Image Stats */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-sans text-[#A7A59B]">
                    <span className="flex items-center gap-1.5">
                      <span className="text-[#B3874B]">📍</span> {pkg.destinationName}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-[#B3874B]">★</span> {pkg.rating} ({pkg.reviewsCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F1EFE8] group-hover:text-[#B3874B] transition-colors leading-snug mb-3">
                    {pkg.title}
                  </h3>

                  {/* Quick Feature Specs Ribbon */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 py-3 border-y border-white/5 mb-4 text-xs font-sans">
                    <div className="bg-white/[0.02] p-2 rounded-lg border border-white/5">
                      <span className="text-[9px] text-[#777] uppercase tracking-wider block">Duration</span>
                      <span className="text-[#F1EFE8] font-medium">{pkg.duration}</span>
                    </div>
                    <div className="bg-white/[0.02] p-2 rounded-lg border border-white/5">
                      <span className="text-[9px] text-[#777] uppercase tracking-wider block">Game Drives</span>
                      <span className="text-[#B3874B] font-semibold">{pkg.safariCount} Safaris</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1 bg-white/[0.02] p-2 rounded-lg border border-white/5">
                      <span className="text-[9px] text-[#777] uppercase tracking-wider block">Vehicle Type</span>
                      <span className="text-[#F1EFE8] font-medium truncate block">{pkg.safariType}</span>
                    </div>
                  </div>

                  {/* Highlights Bullet points */}
                  <ul className="space-y-1.5 mb-5 text-xs font-sans text-[#A7A59B] leading-relaxed">
                    {pkg.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#B3874B] mt-0.5 text-[10px]">✦</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Operator Micro-Badge */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 mb-6 text-[11px] font-sans">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#B3874B]/20 text-[#B3874B] flex items-center justify-center font-bold text-[9px]">
                        ✓
                      </div>
                      <div>
                        <span className="text-[#F1EFE8] font-medium block">{pkg.operator.name}</span>
                        <span className="text-[9px] text-[#888]">{pkg.operator.badge}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">⚡ {pkg.operator.responseTime}</span>
                  </div>
                </div>
              </div>

              {/* Pricing & CTA Footer */}
              <div className="p-6 sm:p-7 pt-0 border-t border-white/5">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-sans text-[#777] uppercase tracking-wider block">Total Price / Person</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-serif text-[#F1EFE8] font-light">
                        ₹{pkg.priceDiscounted.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-sans text-[#666] line-through">
                        ₹{pkg.priceOriginal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-sans text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Forest Tax & GST Incl.
                  </span>
                </div>

                {/* Dual Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg)}
                    className="py-3 px-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-sans tracking-wider uppercase text-[#F1EFE8] transition-all cursor-pointer text-center"
                  >
                    View Details
                  </button>
                  <a
                    href={`https://wa.me/919087394546?text=Hi%20Vijay,%20I'm%20inquiring%20about%20the%20${encodeURIComponent(pkg.title)}%20(Deal:%20₹${pkg.priceDiscounted}).%20Please%20share%20availability.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-[#B3874B] hover:bg-[#c99955] text-xs font-sans font-semibold tracking-wider uppercase text-[#0B0C0A] transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>Instant Quote</span>
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
