export default function ToursHero({ onSelectCategory }) {
  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center pt-28 pb-16 px-5 sm:px-8 md:px-16 overflow-hidden bg-[#080908]">
      {/* Background High-Impact Photography Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=1920&q=85&auto=format&fit=crop"
          alt="Untamed Trails Wildlife Photo Tours"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 brightness-75"
        />
        {/* Cinematic Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080908] via-[#080908]/60 to-[#080908]/75 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, #080908 90%)',
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Gold Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-[#C5A059]/40 backdrop-blur-md mb-6 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
          <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.26em] uppercase text-[#C5A059] font-medium">
            Untamed Trails · Photography Expeditions & Masterclasses
          </span>
        </div>

        {/* Main Title (Toehold Style) */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#F1EFE8] leading-[1.02] tracking-tight mb-6">
          Photography <span className="italic text-[#C5A059] font-normal">Tours</span>
        </h1>

        {/* Famous Toehold Philosophy Quotation */}
        <p className="font-serif italic text-base sm:text-xl md:text-2xl text-[#E5E2D9] max-w-3xl leading-relaxed mb-4 font-normal">
          “Don’t taste a bit. Taste it all. Don’t live a little. Live fully. Starting now. And let us plan it. So the pain is not for you, but the joy is all yours.”
        </p>

        <p className="font-sans text-xs sm:text-sm text-[#A7A59B] max-w-2xl font-light leading-relaxed mb-10">
          Curated small-group wildlife photography masterclasses led by dedicated skippers. Maximum 4 photographers per vehicle, guaranteed forest core permits, and immersive field mentoring.
        </p>

        {/* Quick CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
          <a
            href="#featured"
            className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-[#C5A059] hover:bg-[#d8b368] active:scale-95 text-[#080908] font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(197,160,89,0.35)] cursor-pointer"
          >
            Featured Tours
          </a>
          <a
            href="#tours"
            className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 active:scale-95 text-[#F1EFE8] font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-300 backdrop-blur-md cursor-pointer"
          >
            All Photo Tours
          </a>
        </div>

        {/* The Two Distinct Tracking Tracks Highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <button
            type="button"
            onClick={() => {
              onSelectCategory && onSelectCategory('animals')
              const el = document.getElementById('tours')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group p-4 rounded-2xl bg-[#121411]/90 border border-white/10 hover:border-[#C5A059] transition-all duration-300 backdrop-blur-md flex items-center justify-between text-left cursor-pointer shadow-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🐅</span>
              <div>
                <span className="font-serif text-base text-[#F1EFE8] group-hover:text-[#C5A059] transition-colors block leading-tight">
                  Animal Tracking Tours
                </span>
                <span className="font-sans text-[10px] text-[#888] tracking-wider uppercase">
                  Tigers, Leopards, Elephants & Apex Predators
                </span>
              </div>
            </div>
            <span className="text-[#C5A059] text-sm group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectCategory && onSelectCategory('birds')
              const el = document.getElementById('tours')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group p-4 rounded-2xl bg-[#121411]/90 border border-white/10 hover:border-[#C5A059] transition-all duration-300 backdrop-blur-md flex items-center justify-between text-left cursor-pointer shadow-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🦅</span>
              <div>
                <span className="font-serif text-base text-[#F1EFE8] group-hover:text-[#C5A059] transition-colors block leading-tight">
                  Bird Photography Tours
                </span>
                <span className="font-sans text-[10px] text-[#888] tracking-wider uppercase">
                  Western Ghats Endemics, Hornbills & Raptors
                </span>
              </div>
            </div>
            <span className="text-[#C5A059] text-sm group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Trust Stats Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 border-t border-white/10 w-full max-w-4xl text-center">
          <div>
            <span className="font-serif text-3xl text-[#F1EFE8] font-light block">12+</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-[#888]">Years in the Field</span>
          </div>
          <div>
            <span className="font-serif text-3xl text-[#C5A059] font-light block">40+</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-[#888]">National Parks</span>
          </div>
          <div>
            <span className="font-serif text-3xl text-[#F1EFE8] font-light block">250+</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-[#888]">Photo Tours Led</span>
          </div>
          <div>
            <span className="font-serif text-3xl text-emerald-400 font-light block">Max 4</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-[#888]">Photographers / Gypsy</span>
          </div>
        </div>
      </div>
    </section>
  )
}
