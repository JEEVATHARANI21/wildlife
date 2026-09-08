import { useEffect } from 'react'

export default function PackageDetailModal({ pkg, onClose }) {
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

  if (!pkg) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111310] border border-[#2A2B28] shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-[#F1EFE8] hover:text-[#B3874B] hover:border-[#B3874B] flex items-center justify-center text-lg transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* 1. Hero Cover */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] overflow-hidden bg-black">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111310] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-[#B3874B] text-[#0B0C0A] font-sans text-[10px] font-bold tracking-widest uppercase mb-2 inline-block">
              {pkg.badge}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F1EFE8] leading-tight">
              {pkg.title}
            </h2>
            <span className="text-xs font-sans text-[#B3874B]">
              📍 {pkg.destinationName} · ⭐ {pkg.rating} ({pkg.reviewsCount} reviews)
            </span>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* 2. Key Specs Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-sans">
            <div>
              <span className="text-[10px] text-[#777] uppercase tracking-wider block">Duration</span>
              <span className="text-[#F1EFE8] font-medium">{pkg.duration}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#777] uppercase tracking-wider block">Game Drives</span>
              <span className="text-[#B3874B] font-semibold">{pkg.safariCount} Safaris</span>
            </div>
            <div>
              <span className="text-[10px] text-[#777] uppercase tracking-wider block">Accommodation</span>
              <span className="text-[#F1EFE8] font-medium">{pkg.accommodationTier}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#777] uppercase tracking-wider block">Meals Included</span>
              <span className="text-emerald-400 font-medium">{pkg.meals}</span>
            </div>
          </div>

          {/* 3. Overview & Naturalist Narrative */}
          <div>
            <h3 className="font-serif text-xl text-[#F1EFE8] mb-2 font-normal">
              Expedition Overview
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] leading-relaxed font-light">
              {pkg.overview}
            </p>
          </div>

          {/* 4. Day-by-Day Detailed Itinerary */}
          <div>
            <h3 className="font-serif text-xl text-[#F1EFE8] mb-4 font-normal">
              Day-by-Day Safari Itinerary
            </h3>
            <div className="space-y-4">
              {pkg.itinerary.map((it) => (
                <div key={it.day} className="flex gap-4 p-4 rounded-xl bg-[#141613] border border-white/5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#B3874B]/20 text-[#B3874B] flex items-center justify-center font-serif text-sm font-bold">
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

          {/* 5. Inclusions vs Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <div>
              <h4 className="font-sans text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3 flex items-center gap-1.5">
                <span>✓</span> What is Included
              </h4>
              <ul className="space-y-1.5 text-xs font-sans text-[#A7A59B]">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-xs uppercase tracking-widest text-[#B3874B] font-semibold mb-3 flex items-center gap-1.5">
                <span>✕</span> What is Excluded
              </h4>
              <ul className="space-y-1.5 text-xs font-sans text-[#888]">
                {pkg.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#666] font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 6. Forest Permit Regulations */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-sans text-amber-200/90 leading-relaxed">
            <span className="font-bold uppercase tracking-wider block mb-1">
              ⚠️ Official Forest Department Compliance Notice:
            </span>
            {pkg.forestPermitRules}
          </div>

          {/* 7. Operator Profile Card */}
          <div className="p-4 rounded-xl bg-[#141613] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-lg border border-white/10">
                🛡️
              </div>
              <div>
                <span className="font-sans text-sm font-semibold text-[#F1EFE8] block">
                  Hosted by {pkg.operator.name}
                </span>
                <span className="font-sans text-[10px] text-[#888]">
                  {pkg.operator.badge} · {pkg.operator.tripsOrganized}+ expeditions hosted
                </span>
              </div>
            </div>
            <span className="text-xs font-sans text-emerald-400">
              ⚡ Response Time: {pkg.operator.responseTime}
            </span>
          </div>

          {/* 8. Sticky Action Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-sans text-[#888] uppercase tracking-wider block">
                Total All-Inclusive Package Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-serif text-[#F1EFE8]">
                  ₹{pkg.priceDiscounted.toLocaleString('en-IN')}
                </span>
                <span className="text-sm font-sans text-[#666] line-through">
                  ₹{pkg.priceOriginal.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-sans text-emerald-400 font-semibold ml-2">
                  Save ₹{pkg.savings.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/919087394546?text=Hi%20Vijay,%20I'm%20ready%20to%20book/request%20quote%20for%20${encodeURIComponent(pkg.title)}%20at%20₹${pkg.priceDiscounted}.%20Please%20guide%20the%20booking%20steps.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3 px-8 rounded-xl bg-[#B3874B] hover:bg-[#c99955] text-[#0B0C0A] font-sans text-xs font-semibold tracking-widest uppercase transition-all shadow-lg text-center"
              >
                Request Quote on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
