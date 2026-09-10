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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#111310] border border-[#2A2B28] shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-[#F1EFE8] hover:text-[#C5A059] hover:border-[#C5A059] flex items-center justify-center text-lg transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* 1. Hero Image Header */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] overflow-hidden bg-black">
          <img
            src={tour.heroImage}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111310] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-[#C5A059] text-[#080908] font-sans text-[10px] font-bold tracking-widest uppercase mb-2 inline-block">
              {tour.badge} · {tour.duration}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F1EFE8] leading-tight">
              {tour.title}
            </h2>
            <span className="text-xs font-sans text-[#A7A59B]">
              📍 {tour.destination} ({tour.state}) · 📅 {tour.dateRange}
            </span>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* 2. Key Specs Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-xs font-sans">
            <div>
              <span className="text-[10px] text-[#777] uppercase tracking-wider block">Duration</span>
              <span className="text-[#F1EFE8] font-medium">{tour.duration}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#777] uppercase tracking-wider block">Field Drives</span>
              <span className="text-[#C5A059] font-semibold">{tour.safariCount}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#777] uppercase tracking-wider block">Vehicle Setup</span>
              <span className="text-[#F1EFE8] font-medium">{tour.groupSize}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#777] uppercase tracking-wider block">Tour Skipper</span>
              <span className="text-emerald-400 font-medium">{tour.skipper}</span>
            </div>
          </div>

          {/* 3. Expedition Overview */}
          <div>
            <h3 className="font-serif text-xl text-[#F1EFE8] mb-2 font-normal">
              Expedition Overview
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] leading-relaxed font-light">
              {tour.overview}
            </p>
          </div>

          {/* 4. Target Species Checklist */}
          <div>
            <h3 className="font-serif text-xl text-[#F1EFE8] mb-3 font-normal">
              Key Wildlife & Sightings Target
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tour.targetSpecies.map((sp, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141613] border border-white/5 text-xs font-sans text-[#E5E2D9]">
                  <span className="text-[#C5A059]">✦</span>
                  <span>{sp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Day-by-Day Field Itinerary */}
          <div>
            <h3 className="font-serif text-xl text-[#F1EFE8] mb-4 font-normal">
              Day-by-Day Field Itinerary
            </h3>
            <div className="space-y-4">
              {tour.itinerary.map((it, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-[#141613] border border-white/5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center font-serif text-sm font-bold">
                    0{it.day}
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-[#F1EFE8] mb-1">
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
          <div className="p-5 rounded-2xl bg-[#141613] border border-[#C5A059]/30">
            <h4 className="font-sans text-xs uppercase tracking-widest text-[#C5A059] font-semibold mb-3 flex items-center gap-2">
              <span>📷</span> Recommended Camera Gear Checklist
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#A7A59B]">
              {tour.recommendedGear.map((gear, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#C5A059]">•</span>
                  <span>{gear}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 7. Inclusions vs Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
            <div>
              <h4 className="font-sans text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3 flex items-center gap-1.5">
                <span>✓</span> Inclusions
              </h4>
              <ul className="space-y-1.5 text-xs font-sans text-[#A7A59B]">
                {tour.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-xs uppercase tracking-widest text-[#C5A059] font-semibold mb-3 flex items-center gap-1.5">
                <span>✕</span> Exclusions
              </h4>
              <ul className="space-y-1.5 text-xs font-sans text-[#888]">
                {tour.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#666] font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 8. Sticky Action Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-sans text-[#888] uppercase tracking-wider block">
                All-Inclusive Expedition Cost / Person
              </span>
              <div className="flex items-baseline gap-1 text-[#F1EFE8]">
                <span className="text-sm font-sans text-[#C5A059]">INR</span>
                <span className="text-3xl font-serif font-light">
                  {tour.price.toLocaleString('en-IN')}/-
                </span>
                <span className="text-xs font-sans text-emerald-400 ml-2 font-medium">
                  {tour.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/919087394546?text=Hello%20Untamed%20Trails,%20I'm%20ready%20to%20register%20for%20the%20${encodeURIComponent(tour.title)}%20(${tour.destination})%20Photo%20Tour%20(INR%20${tour.price}).%20Please%20guide%20the%20booking%20steps.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3 px-8 rounded-full bg-[#C5A059] hover:bg-[#d8b368] text-[#080908] font-sans text-xs font-bold tracking-widest uppercase transition-all shadow-[0_4px_20px_rgba(197,160,89,0.35)] text-center"
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
