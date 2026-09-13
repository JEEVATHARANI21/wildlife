import { useEffect } from 'react'

export default function DestinationDetailModal({ destination, onClose, onSelectTour }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (destination) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [destination, onClose])

  if (!destination) return null

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hi Vijay, I'm interested in an expedition to ${destination.name} (${destination.state}). Please share upcoming departure dates, seasonal highlights, and customized itinerary details.`
    )
    window.open(`https://wa.me/919087394546?text=${text}`, '_blank')
  }

  return (
    <div
      className="fixed inset-0 z-[65] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#080908]/92 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0f110f] border border-[#242923] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-[#080908]/85 border border-[#242923] text-[#F2F0E8] hover:text-[#D6A85C] hover:border-[#D6A85C] flex items-center justify-center text-lg transition-all cursor-pointer shadow-xl backdrop-blur-md"
          aria-label="Close Destination Details"
        >
          ✕
        </button>

        {/* Hero Image Header */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] overflow-hidden bg-[#080908] flex-shrink-0">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover brightness-[0.88]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f110f] via-[#0f110f]/40 to-transparent" />

          <div className="absolute bottom-5 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-[#D6A85C] text-[#080908] font-sans text-[10px] font-bold tracking-widest uppercase mb-2 inline-block shadow-md">
              📍 {destination.state}, INDIA
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F2F0E8] leading-tight">
              {destination.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#D6A85C] mt-1 font-light italic">
              “{destination.tagline}”
            </p>
          </div>
        </div>

        {/* Scrollable Body Container */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-7">
          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-sans uppercase tracking-widest text-[#D6A85C] font-semibold">
              Destination Overview & Habitat
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] leading-relaxed font-light">
              {destination.overview}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#151815] border border-[#242923]">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#D6A85C] font-semibold block mb-1">
                Best Photography Season
              </span>
              <p className="text-xs sm:text-sm text-[#F2F0E8] font-medium flex items-center gap-2">
                <span>🌤</span>
                <span>{destination.bestSeason}</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#151815] border border-[#242923]">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#D6A85C] font-semibold block mb-1">
                Ecosystem & Terrain
              </span>
              <p className="text-xs sm:text-sm text-[#F2F0E8] font-medium flex items-center gap-2">
                <span>🌿</span>
                <span>{destination.terrain}</span>
              </p>
            </div>
          </div>

          {/* Key Wildlife & Birds */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Wildlife */}
            <div className="p-4 rounded-2xl bg-[#151815] border border-[#242923] space-y-2.5">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#D6A85C] font-semibold block">
                Key Apex Wildlife & Mammals
              </span>
              <div className="flex flex-wrap gap-1.5">
                {destination.keyWildlife.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#080908] border border-[#242923] text-xs text-[#F2F0E8]/90"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Birds */}
            <div className="p-4 rounded-2xl bg-[#151815] border border-[#242923] space-y-2.5">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#D6A85C] font-semibold block">
                Key Avian & Birding Jewels
              </span>
              <div className="flex flex-wrap gap-1.5">
                {destination.keyBirds.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#080908] border border-[#242923] text-xs text-[#F2F0E8]/90"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Photography Highlights */}
          <div className="space-y-3">
            <h3 className="text-xs font-sans uppercase tracking-widest text-[#D6A85C] font-semibold">
              Masterclass Photography Opportunities
            </h3>
            <ul className="space-y-2">
              {destination.photoHighlights.map((pt, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A7A59B] font-light leading-relaxed"
                >
                  <span className="text-[#D6A85C] mt-0.5">✦</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 bg-[#151815] border-t border-[#242923] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-sans uppercase tracking-wider text-[#A7A59B] block">
              Featured Expedition
            </span>
            <span className="text-xs sm:text-sm font-serif text-[#F2F0E8] font-medium">
              {destination.linkedTourName}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onClose()
                const el = document.getElementById('tours')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-[#242923] hover:bg-[#343b32] text-[#F2F0E8] hover:text-[#D6A85C] text-xs font-sans uppercase tracking-wider font-semibold transition-all cursor-pointer whitespace-nowrap"
            >
              View Scheduled Departures →
            </button>
            <button
              type="button"
              onClick={handleWhatsAppInquiry}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-sans uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(37,211,102,0.35)] whitespace-nowrap"
            >
              <span>💬</span>
              <span>Inquire via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
