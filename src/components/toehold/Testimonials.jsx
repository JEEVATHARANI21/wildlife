export default function Testimonials({ testimonials }) {
  return (
    <section id="testimonials" className="py-24 px-5 sm:px-8 md:px-16 bg-[#080908] border-b border-[#242923]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#D6A85C] font-semibold">
              Traveler Stories · Section 05
            </span>
            <span className="w-8 h-[1.5px] bg-[#B87333]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight">
            Word from the <span className="italic text-[#B87333] font-normal">Field</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-3 font-light leading-relaxed">
            Read unedited feedback from photographers, wildlife researchers, and passionate travelers who have shared our vehicles across Indian sanctuaries.
          </p>
        </div>

        {/* Testimonials Cards: #151815 cards with #242923 border */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-3xl bg-[#151815] border border-[#242923] hover:border-[#B87333] transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#B87333] text-sm mb-4">
                  {'★★★★★'}
                </div>
                <blockquote className="font-serif italic text-sm sm:text-base text-[#F2F0E8] leading-relaxed mb-6 font-normal">
                  “{item.quote}”
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[#242923]">
                <span className="font-sans text-sm font-semibold text-[#F2F0E8] block">
                  {item.name}
                </span>
                <span className="text-[11px] font-sans text-[#D6A85C] block font-medium mt-0.5">
                  {item.tour} · {item.location}
                </span>
                <span className="text-[10px] font-sans text-[#A7A59B] mt-1.5 block">
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
