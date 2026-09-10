export default function Testimonials({ testimonials }) {
  return (
    <section id="testimonials" className="py-24 px-5 sm:px-8 md:px-16 bg-[#0E100D] border-b border-[#2A2B28]/60">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C5A059] font-semibold">
              Traveler Stories · Section 05
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F1EFE8] font-light leading-tight">
            Word from the <span className="italic text-[#C5A059] font-normal">Field</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-3 font-light leading-relaxed">
            Read unedited feedback from photographers, wildlife researchers, and passionate travelers who have shared our vehicles across Indian sanctuaries.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-3xl bg-[#141613] border border-[#2A2B28] hover:border-[#C5A059]/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#C5A059] text-sm mb-4">
                  {'★★★★★'}
                </div>
                <blockquote className="font-serif italic text-sm sm:text-base text-[#E5E2D9] leading-relaxed mb-6 font-normal">
                  “{item.quote}”
                </blockquote>
              </div>

              <div className="pt-4 border-t border-white/5">
                <span className="font-sans text-sm font-semibold text-[#F1EFE8] block">
                  {item.name}
                </span>
                <span className="text-[11px] font-sans text-[#C5A059] block">
                  {item.tour} · {item.location}
                </span>
                <span className="text-[10px] font-sans text-[#888] mt-1 block">
                  📷 {item.gear}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
