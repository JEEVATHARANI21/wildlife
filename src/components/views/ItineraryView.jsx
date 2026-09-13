import { useState } from 'react'

export default function ItineraryView({ tour, onBack, onPlanTrip }) {
  if (!tour) return null

  const handleWhatsAppInquiry = () => {
    const tourTitle = tour.packageName || tour.title || 'Safari'
    const dest = tour.destination || 'India'
    const msg = `Hi Vijay, I'm reviewing the "${tourTitle}" (${dest}) itinerary on your website. I'd like to discuss customized departure dates and reserve a seat.`
    window.open(`https://wa.me/919087394546?text=${encodeURIComponent(msg)}`, '_blank')
  }

  // Fallback Day-by-Day if itinerary array is compact
  const days = tour.itinerary && tour.itinerary.length > 0 ? tour.itinerary : [
    {
      day: 1,
      title: 'Arrival, Forest Check-in & Orientation Drive',
      desc: `Meet our private expedition vehicle and transfer to luxury jungle lodge near ${tour.destination || 'the park'}. Afternoon gear setup, camera calibration, and first twilight game drive.`,
      photoTip: 'Golden hour dust backlight and animal silhouettes.',
    },
    {
      day: 2,
      title: 'Deep Core Safaris — Dawn & Dusk Tracking',
      desc: `Full day tracking ${tour.targetSpecies?.[0] || 'wildlife'} across prime territories. Morning drive followed by midday file reviews, histogram analysis, and afternoon field vigil.`,
      photoTip: 'Eye-level vehicle beanbag perspective at known watering holes.',
    },
    {
      day: 3,
      title: 'Predator Corridors & Avian Canopies',
      desc: 'Morning safari exploring remote boundary tracks for elusive leopards, tuskers, and rare birds. Afternoon game drive dedicated to dramatic light sculpting.',
      photoTip: 'High shutter speed (1/1600s+) for sudden bursts of movement.',
    },
    {
      day: 4,
      title: 'Final Morning Game Drive & Departure',
      desc: 'One last dawn drive through misty teak groves. Return for hot breakfast, portfolio review with Vijay Mathiew, and airport transfer.',
      photoTip: 'Misty landscape compositions and parting portraits.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#080908] text-[#F2F0E8] pt-20 pb-24 select-none">
      {/* Top Back Navigation Bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-4 flex items-center justify-between border-b border-[#242923]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#A7A59B] hover:text-[#D6A85C] transition-colors cursor-pointer"
        >
          <span>←</span>
          <span>Back to All Expeditions</span>
        </button>

        <span className="text-xs font-sans text-[#D6A85C] uppercase tracking-wider font-semibold">
          {tour.duration} · {tour.destination}
        </span>
      </div>

      {/* Hero Banner Section (fototrails 365 style) */}
      <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        <img
          src={tour.heroImage}
          alt={tour.packageName || tour.title}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080908] via-[#080908]/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pb-14 w-full">
          <span className="inline-block bg-[#D6A85C] text-[#080908] text-[10.5px] font-sans font-bold px-3 py-1 uppercase tracking-wider mb-3.5 rounded-full shadow-lg">
            Sample Itinerary — All Tours Customised
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] leading-tight mb-2">
            {tour.packageName || tour.title}
          </h1>
          <p className="font-sans text-[#A7A59B] text-sm sm:text-lg max-w-2xl font-light">
            {tour.photoHighlight || tour.overview?.split('.')[0] + '.'}
          </p>
        </div>
      </section>

      {/* Quick Specs Ribbon (Duration, Group Size, Best Season, From Price) */}
      <section className="bg-[#121412] border-y border-[#242923]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-sans text-[10px] text-[#A7A59B] uppercase tracking-widest mb-1 font-semibold">
                Duration
              </p>
              <p className="font-serif text-base sm:text-lg text-[#F2F0E8]">{tour.duration}</p>
            </div>
            <div>
              <p className="font-sans text-[10px] text-[#A7A59B] uppercase tracking-widest mb-1 font-semibold">
                Group Size
              </p>
              <p className="font-serif text-base sm:text-lg text-[#F2F0E8]">Max 4 per Gypsy</p>
            </div>
            <div>
              <p className="font-sans text-[10px] text-[#A7A59B] uppercase tracking-widest mb-1 font-semibold">
                Best Photographic Season
              </p>
              <p className="font-serif text-base sm:text-lg text-[#D6A85C]">{tour.bestSeason}</p>
            </div>
            <div>
              <p className="font-sans text-[10px] text-[#A7A59B] uppercase tracking-widest mb-1 font-semibold">
                Investment
              </p>
              <p className="font-serif text-base sm:text-lg text-[#F2F0E8]">
                From ₹XX,XXX <span className="text-[10px] text-[#A7A59B] font-sans">(Per Person)</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout: 2-Column fototrails 365 format */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Overview + Day by Day */}
          <div className="lg:col-span-8 space-y-12">
            {/* About This Tour */}
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-6 h-[1.5px] bg-[#B87333]" />
                <span className="font-sans text-[10px] tracking-[0.26em] uppercase text-[#D6A85C] font-semibold">
                  OVERVIEW
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#F2F0E8] mb-4 font-light">
                About This Tour
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#A7A59B] leading-relaxed font-light">
                {tour.overview}
              </p>
            </div>

            {/* Target Species Strip */}
            <div className="p-5 rounded-2xl bg-[#151815] border border-[#242923]">
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block mb-2">
                PRIMARY TARGET SPECIES
              </span>
              <div className="flex flex-wrap gap-2">
                {tour.targetSpecies?.map((sp, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-[#080908] border border-[#242923] text-xs text-[#F2F0E8] font-sans"
                  >
                    🐾 {sp}
                  </span>
                ))}
              </div>
            </div>

            {/* Day by Day Section */}
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] mb-8 font-light flex items-center gap-3">
                <span>Day by Day Itinerary</span>
                <span className="text-xs font-sans text-[#D6A85C] font-normal uppercase tracking-wider bg-[#242923] px-3 py-1 rounded-full">
                  {days.length} Days Breakdown
                </span>
              </h3>

              <div className="space-y-6">
                {days.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 sm:gap-6 group">
                    {/* Day Number Badge */}
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#151815] border border-[#D6A85C]/50 flex items-center justify-center group-hover:border-[#D6A85C] group-hover:bg-[#D6A85C] transition-colors shadow-lg">
                      <span className="font-serif text-[#D6A85C] group-hover:text-[#080908] font-bold text-sm sm:text-base transition-colors">
                        {item.day || idx + 1}
                      </span>
                    </div>

                    {/* Day Content */}
                    <div className="flex-1 pb-6 border-b border-[#242923] last:border-0">
                      <h4 className="font-serif text-lg sm:text-xl text-[#F2F0E8] mb-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-[#A7A59B] leading-relaxed font-light mb-3">
                        {item.desc}
                      </p>
                      <p className="font-sans text-xs text-[#D6A85C] italic flex items-center gap-1.5">
                        <span>📷</span>
                        <span>
                          {item.photoTip ||
                            'Golden hour field technique: Low vehicle perspective with 1-on-1 mentorship by Vijay Mathiew.'}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: fototrails 365 Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Customise This Safari Box */}
            <div className="bg-[#151815] rounded-3xl border border-[#242923] p-6 sm:p-7 text-center shadow-xl">
              <p className="font-sans text-[10px] text-[#D6A85C] uppercase tracking-widest mb-2 font-semibold">
                CUSTOMISE THIS EXPEDITION
              </p>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F2F0E8] mb-2">
                Plan With Vijay Mathiew
              </h3>
              <p className="font-sans text-xs text-[#A7A59B] mb-5 font-light leading-relaxed">
                Tell us your preferred travel window and photography goals — we'll tailor every detail, permit, and vehicle setup.
              </p>

              <button
                onClick={onPlanTrip}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] font-sans text-xs uppercase tracking-wider font-bold hover:shadow-[0_4px_20px_rgba(214,168,92,0.4)] transition-all cursor-pointer mb-3"
              >
                Plan This Safari →
              </button>

              <button
                onClick={handleWhatsAppInquiry}
                className="w-full py-3 px-4 rounded-xl bg-[#080908] border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-[#080908] font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp Vijay Mathiew</span>
              </button>
            </div>

            {/* 2. Where You'll Stay */}
            <div className="bg-[#151815] rounded-3xl border border-[#242923] p-6 sm:p-7 shadow-lg">
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block mb-2">
                WHERE YOU'LL STAY
              </span>
              <h4 className="font-serif text-lg text-[#F2F0E8] mb-2">
                Luxury Eco-Lodges & Heritage Tented Camps
              </h4>
              <p className="text-xs text-[#A7A59B] leading-relaxed font-light mb-3">
                All accommodation is handpicked for proximity to park gates, hot-water en-suite bathrooms, high-speed charging stations, and delicious chef-prepared meals.
              </p>
              <span className="text-[11px] text-[#B87333] italic block">
                Confirmed based on your dates and room preferences during the booking process.
              </span>
            </div>

            {/* 3. Included Checklist (✓) */}
            <div className="bg-[#151815] rounded-3xl border border-[#242923] p-6 sm:p-7 shadow-lg">
              <span className="text-[10px] font-sans uppercase tracking-widest text-emerald-400 font-semibold block mb-3">
                WHAT'S INCLUDED
              </span>
              <ul className="space-y-2.5">
                {tour.inclusions?.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#F2F0E8]/85 font-light">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span className="leading-tight">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Not Included Checklist (—) */}
            <div className="bg-[#151815] rounded-3xl border border-[#242923] p-6 sm:p-7 shadow-lg">
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#A7A59B] font-semibold block mb-3">
                NOT INCLUDED
              </span>
              <ul className="space-y-2">
                {tour.exclusions?.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#A7A59B] font-light">
                    <span className="text-[#A7A59B]/50 shrink-0">—</span>
                    <span className="leading-tight">{exc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. What to Bring (✦) */}
            <div className="bg-[#151815] rounded-3xl border border-[#242923] p-6 sm:p-7 shadow-lg">
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block mb-3">
                RECOMMENDED PHOTOGRAPHIC GEAR
              </span>
              <ul className="space-y-2.5">
                {tour.recommendedGear?.map((gear, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#D6A85C]/90 font-light">
                    <span className="text-[#B87333] shrink-0">✦</span>
                    <span className="leading-tight">{gear}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
