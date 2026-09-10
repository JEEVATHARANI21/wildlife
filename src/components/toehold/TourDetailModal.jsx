import { useEffect } from 'react'

export default function TourDetailModal({ tour, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!tour) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#080908]/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#151815] border border-[#242923] shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#080908]/80 border border-[#242923] text-[#F2F0E8] hover:text-[#B87333] hover:border-[#B87333] flex items-center justify-center text-lg transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* 1. Hero Image Header */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] overflow-hidden bg-[#080908]">
          <img
            src={tour.heroImage}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-[#B87333] text-[#080908] font-sans text-[10px] font-bold tracking-widest uppercase mb-2 inline-block">
              {tour.badge} · {tour.duration}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F2F0E8] leading-tight">
              {tour.title}
            </h2>
            <span className="text-xs font-sans text-[#D6A85C]">
              📍 {tour.destination} ({tour.state}) · 📅 {tour.dateRange}
            </span>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* 2. Key Specs Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#242923]/40 border border-[#242923] text-xs font-sans">
            <div>
              <span className="text-[10px] text-[#A7A59B] uppercase tracking-wider block">Duration</span>
              <span className="text-[#F2F0E8] font-semibold">{tour.duration}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#A7A59B] uppercase tracking-wider block">Field Drives</span>
              <span className="text-[#D6A85C] font-semibold">{tour.safariCount}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#A7A59B] uppercase tracking-wider block">Vehicle Setup</span>
              <span className="text-[#F2F0E8] font-semibold">{tour.groupSize}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#A7A59B] uppercase tracking-wider block">Tour Skipper</span>
              <span className="text-[#D6A85C] font-semibold">{tour.skipper}</span>
            </div>
          </div>

          {/* 3. Expedition Overview */}
          <div>
            <h3 className="font-serif text-xl text-[#F2F0E8] mb-2 font-normal">
              Expedition Overview
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] leading-relaxed font-light">
              {tour.overview}
            </p>
          </div>

          {/* 4. Target Species Checklist */}
          <div>
            <h3 className="font-serif text-xl text-[#F2F0E8] mb-3 font-normal">
              Key Wildlife & Sightings Target
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tour.targetSpecies.map((sp, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#242923]/40 border border-[#242923] text-xs font-sans text-[#F2F0E8]">
                  <span className="text-[#B87333]">✦</span>
                  <span>{sp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Day-by-Day Field Itinerary */}
          <div>
            <h3 className="font-serif text-xl text-[#F2F0E8] mb-4 font-normal">
              Day-by-Day Field Itinerary
            </h3>
            <div className="space-y-3">
              {tour.itinerary.map((it, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-[#242923]/40 border border-[#242923]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#B87333]/20 text-[#D6A85C] border border-[#B87333]/40 flex items-center justify-center font-serif text-sm font-bold">
                    0{it.day}
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-[#F2F0E8] mb-1">
                      Day {it.day}: {it.title}
                    </h4>
                    <p className="font-sans text-xs text-[#A7A59B] leading-relaxed font-light">
                      {it.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Recommended Photography Gear */}
          <div className="p-5 rounded-2xl bg-[#242923]/40 border border-[#B87333]/30">
            <h4 className="font-sans text-xs uppercase tracking-widest text-[#D6A85C] font-semibold mb-3 flex items-center gap-2">
              <span className="text-[#B87333]">📷</span> Recommended Camera Gear Checklist
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#A7A59B]">
              {tour.recommendedGear.map((gear, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#B87333]">•</span>
                  <span>{gear}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 7. Inclusions vs Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-2xl bg-[#242923]/20 border border-[#242923]">
            <div>
              <h4 className="font-sans text-xs uppercase tracking-widest text-[#D6A85C] font-semibold mb-3 flex items-center gap-1.5">
                <span className="text-[#B87333]">✓</span> Inclusions
              </h4>
              <ul className="space-y-1.5 text-xs font-sans text-[#A7A59B]">
                {tour.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#D6A85C] font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-xs uppercase tracking-widest text-[#A7A59B] font-semibold mb-3 flex items-center gap-1.5">
                <span>✕</span> Exclusions
              </h4>
              <ul className="space-y-1.5 text-xs font-sans text-[#A7A59B]/70">
                {tour.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#A7A59B] font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 8. Action Footer */}
          <div className="pt-6 border-t border-[#242923] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-sans text-[#A7A59B] uppercase tracking-wider block">
                All-Inclusive Expedition Cost / Person
              </span>
              <div className="flex items-baseline gap-1 text-[#F2F0E8]">
                <span className="text-sm font-sans text-[#B87333] font-bold">INR</span>
                <span className="text-3xl font-serif font-light text-[#F2F0E8]">
                  ₹{tour.price.toLocaleString('en-IN')}/-
                </span>
                <span className="text-xs font-sans text-[#D6A85C] ml-2 font-medium">
                  {tour.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/919087394546?text=Hello%20Untamed%20Trails,%20I'm%20ready%20to%20register%20for%20the%20${encodeURIComponent(tour.title)}%20(${tour.destination})%20Photo%20Tour%20(INR%20${tour.price}).%20Please%20guide%20the%20booking%20steps.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-copper-primary w-full sm:w-auto py-3 px-8 rounded-full font-sans text-xs uppercase tracking-widest shadow-[0_4px_20px_rgba(184,115,51,0.35)] text-center cursor-pointer"
              >
                Register on WhatsApp (+91 90873 94546)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
