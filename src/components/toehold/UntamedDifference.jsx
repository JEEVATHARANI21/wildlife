export default function UntamedDifference({ features }) {
  return (
    <section id="difference" className="py-24 px-5 sm:px-8 md:px-16 bg-[#080908] border-b border-[#2A2B28]/60">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C5A059] font-semibold">
              The Untamed Edge · Section 04
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F1EFE8] font-light leading-tight">
            Why Travel with <span className="italic text-[#C5A059] font-normal">Untamed Trails</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-3 font-light leading-relaxed">
            We don’t run tourist safaris. We design high-intensity photographic masterclasses crafted around animal behavior, optimal lighting conditions, and respectful fieldcraft.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-[#121411] border border-[#2A2B28] hover:border-[#C5A059]/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center text-3xl mb-6 shadow-inner">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F1EFE8] mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#A7A59B] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-[10px] font-sans tracking-widest text-[#C5A059] uppercase font-semibold">
                Pillar 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
