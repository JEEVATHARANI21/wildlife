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
        {/* Exact Overlay: rgba(8, 9, 8, 0.55) as specified by user */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: 'rgba(8, 9, 8, 0.55)' }}
        />
        {/* Subtle radial vignette blending into #080908 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 35%, #080908 90%)',
          }}
        />
        {/* Bottom soft gradient to merge with next section #151815 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080908] to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Eyebrow Pill: text #D6A85C, dot #B87333, border #B87333/40 */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#151815]/90 border border-[#B87333]/40 backdrop-blur-md mb-6 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#B87333] animate-pulse" />
          <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.26em] uppercase text-[#D6A85C] font-semibold">
            Untamed Trails · Photography Expeditions
          </span>
        </div>

        {/* Main Title: #F2F0E8 with Copper highlight #B87333 */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#F2F0E8] leading-[1.02] tracking-tight mb-6">
          Photography <span className="italic text-[#B87333] font-normal">Tours</span>
        </h1>

        {/* Toehold Philosophy Quotation */}
        <p className="font-serif italic text-base sm:text-xl md:text-2xl text-[#F2F0E8]/90 max-w-3xl leading-relaxed mb-4 font-normal">
          “Don’t taste a bit. Taste it all. Don’t live a little. Live fully. Starting now. And let us plan it. So the pain is not for you, but the joy is all yours.”
        </p>

        <p className="font-sans text-xs sm:text-sm text-[#A7A59B] max-w-2xl font-light leading-relaxed mb-10">
          Curated small-group wildlife photography masterclasses led by dedicated skippers. Maximum 4 photographers per vehicle, guaranteed forest core permits, and immersive field mentoring.
        </p>

        {/* Action Buttons: Primary Copper #B87333 + Secondary Border #D6A85C */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
          {/* Primary Button */}
          <a
            href="#featured"
            className="btn-copper-primary w-full sm:w-auto py-3.5 px-8 rounded-full font-sans text-xs uppercase tracking-widest shadow-[0_4px_25px_rgba(184,115,51,0.35)] cursor-pointer text-center"
          >
            Explore Tours →
          </a>

          {/* Secondary Button */}
          <a
            href="#tours"
            className="btn-copper-secondary w-full sm:w-auto py-3.5 px-8 rounded-full font-sans text-xs uppercase tracking-widest backdrop-blur-md cursor-pointer text-center"
          >
            View Schedules
          </a>
        </div>

        {/* The Two Distinct Tracking Tracks Switcher Cards: Background #151815, Border #242923 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <button
            type="button"
            onClick={() => {
              onSelectCategory && onSelectCategory('animals')
              const el = document.getElementById('tours')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group p-4 rounded-2xl bg-[#151815]/95 border border-[#242923] hover:border-[#B87333] transition-all duration-300 backdrop-blur-md flex items-center justify-between text-left cursor-pointer shadow-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🐅</span>
              <div>
                <span className="font-serif text-base text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors block leading-tight">
                  Animal Tracking Tours
                </span>
                <span className="font-sans text-[10px] text-[#A7A59B] tracking-wider uppercase">
                  Tigers, Leopards, Elephants & Apex Predators
                </span>
              </div>
            </div>
            <span className="text-[#B87333] text-sm group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectCategory && onSelectCategory('birds')
              const el = document.getElementById('tours')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group p-4 rounded-2xl bg-[#151815]/95 border border-[#242923] hover:border-[#B87333] transition-all duration-300 backdrop-blur-md flex items-center justify-between text-left cursor-pointer shadow-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🦅</span>
              <div>
                <span className="font-serif text-base text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors block leading-tight">
                  Bird Photography Tours
                </span>
                <span className="font-sans text-[10px] text-[#A7A59B] tracking-wider uppercase">
                  Western Ghats Endemics, Hornbills & Raptors
                </span>
              </div>
            </div>
            <span className="text-[#B87333] text-sm group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Trust Stats Ribbon: Border #242923, Numbers in #F2F0E8 & #B87333 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 border-t border-[#242923] w-full max-w-4xl text-center">
          <div>
            <span className="font-serif text-3xl text-[#F2F0E8] font-light block">12+</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-[#A7A59B]">Years in the Field</span>
          </div>
          <div>
            <span className="font-serif text-3xl text-[#B87333] font-light block">40+</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-[#A7A59B]">National Parks</span>
          </div>
          <div>
            <span className="font-serif text-3xl text-[#F2F0E8] font-light block">250+</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-[#A7A59B]">Photo Tours Led</span>
          </div>
          <div>
            <span className="font-serif text-3xl text-[#D6A85C] font-light block">Max 4</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-[#A7A59B]">Photographers / Gypsy</span>
          </div>
        </div>
      </div>
    </section>
  )
}
