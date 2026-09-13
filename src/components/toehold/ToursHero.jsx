export default function ToursHero() {
  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center overflow-hidden bg-[#080908] select-none">
      {/* Background High-Impact Cinematic Wildlife Photography Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=2400&q=90&auto=format&fit=crop"
          alt="Wild Bengal Tiger — VM Wild Expeditions"
          className="w-full h-full object-cover object-[72%_center] md:object-[80%_center] lg:object-[84%_center] brightness-[0.88] contrast-[1.05]"
        />

        {/* Cinematic Left-to-Right Negative Space Gradient for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080908] via-[#080908]/85 md:via-[#080908]/60 to-transparent pointer-events-none" />

        {/* Subtle Top Gradient to Support Transparent Sticky Header */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#080908]/80 to-transparent pointer-events-none" />

        {/* Subtle Bottom Gradient to Seamlessly Transition into Next Section */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#080908] to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container (Aligned Left in Negative Space) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 sm:pt-36 md:pt-40 pb-24 flex flex-col justify-center">
        <div className="max-w-2xl text-left">
          {/* Small Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10.5px] sm:text-xs tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
              WILDLIFE PHOTOGRAPHY EXPEDITIONS
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-light text-[#F2F0E8] leading-[1.04] tracking-tight mb-6">
            <span className="block">Beyond the Map.</span>
            <span className="block italic text-[#D6A85C] font-normal mt-1">
              Into the Wild.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#F2F0E8]/85 max-w-xl font-light leading-relaxed mb-9">
            Small-group wildlife photography expeditions to extraordinary destinations, led by expert naturalists.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-9 w-full sm:w-auto">
            {/* Primary CTA */}
            <a
              href="#tours"
              className="py-4 px-8 rounded-full font-sans text-xs uppercase tracking-widest font-bold bg-[#D6A85C] text-[#080908] hover:bg-[#B87333] hover:shadow-[0_6px_30px_rgba(214,168,92,0.4)] hover:scale-[1.02] transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer shadow-xl"
            >
              <span>EXPLORE EXPEDITIONS</span>
              <span>→</span>
            </a>

            {/* Secondary CTA */}
            <a
              href="#tours"
              className="py-4 px-8 rounded-full font-sans text-xs uppercase tracking-widest font-semibold border border-[#D6A85C]/70 text-[#F2F0E8] hover:border-[#D6A85C] hover:bg-[#D6A85C]/10 transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
            >
              <span>VIEW 2026–27 SCHEDULES</span>
              <span>→</span>
            </a>
          </div>

          {/* Premium Information Line */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-[#A7A59B]/90 font-medium">
            <span>MAX 4 PHOTOGRAPHERS</span>
            <span className="text-[#B87333] font-bold">•</span>
            <span>FOREST CORE PERMITS</span>
            <span className="text-[#B87333] font-bold">•</span>
            <span>FIELD MENTORING</span>
          </div>
        </div>
      </div>

      {/* Bottom Center Minimal Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none select-none opacity-75 hover:opacity-100 transition-opacity">
        <span className="font-sans text-[9px] tracking-[0.28em] uppercase text-[#A7A59B] font-medium">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-8 rounded-full border border-[#D6A85C]/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#D6A85C] animate-bounce" />
        </div>
      </div>
    </section>
  )
}
