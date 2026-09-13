export default function FoundersSection({ founders }) {
  return (
    <section id="founders" className="py-24 px-5 sm:px-8 md:px-16 bg-[#151815] border-b border-[#242923]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#D6A85C] font-semibold">
              Leadership & Field Mentorship · Section 03
            </span>
            <span className="w-8 h-[1.5px] bg-[#B87333]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight">
            Meet the <span className="italic text-[#B87333] font-normal">Founders</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-3 font-light leading-relaxed">
            VM Wild Expeditions was founded on a shared obsession: to take passionate photographers deeper into the wild with uncompromised field ethics, intimate group sizes, and world-class mentorship.
          </p>
        </div>

        {/* The Two Founders Grid - Small & Sleek Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 max-w-5xl mx-auto">
          {founders.map((founder, idx) => (
            <div
              key={founder.id}
              className="group rounded-2xl bg-[#242923]/50 border border-[#242923] hover:border-[#B87333] p-5 sm:p-6 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Portrait & Info Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-4">
                  {/* Compact Portrait Frame */}
                  <div className="relative w-28 sm:w-32 aspect-[3/4] rounded-xl overflow-hidden bg-[#080908] border border-[#242923] group-hover:border-[#D6A85C] transition-colors shadow-lg flex-shrink-0">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080908] via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-1.5 left-1.5 right-1.5 text-center text-[8.5px] font-sans tracking-widest uppercase text-[#D6A85C] bg-[#080908]/90 backdrop-blur-sm py-0.5 rounded border border-[#242923] font-semibold">
                      Founder 0{idx + 1}
                    </span>
                  </div>

                  {/* Title, Role & Credentials */}
                  <div className="text-center sm:text-left flex-1 min-w-0">
                    <span className="font-sans text-[9px] tracking-widest uppercase text-[#D6A85C] font-semibold block mb-0.5">
                      Leadership
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#F2F0E8] mb-0.5 leading-snug">
                      {founder.name}
                    </h3>
                    <p className="font-sans text-[11px] text-[#A7A59B] mb-2.5 leading-tight">
                      {founder.role}
                    </p>

                    {/* Compact Credentials List */}
                    <div className="space-y-1 text-[10.5px] font-sans text-[#F2F0E8]/85">
                      {founder.credentials.map((cred, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-[#B87333] shrink-0 text-[10px]">✦</span>
                          <span className="leading-tight">{cred}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Compact Quote Box */}
                <blockquote className="p-3 rounded-xl bg-[#151815] border-l-2 border-[#B87333] font-serif italic text-[11px] sm:text-xs text-[#F2F0E8]/90 leading-relaxed mb-4">
                  {founder.quote}
                </blockquote>
              </div>

              {/* Action Link */}
              <div className="pt-3 border-t border-[#242923] flex items-center justify-between">
                <a
                  href={founder.instagram || "https://www.instagram.com/vm_wild_expeditions?stkn=OTU3MGI0bHR6OWZz"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-sans text-[#B87333] hover:text-[#D6A85C] font-semibold transition-colors"
                >
                  <span>Connect ({founder.instagramHandle})</span>
                  <span>↗</span>
                </a>
                <span className="text-[9px] font-sans text-[#A7A59B] tracking-wider uppercase">
                  VM Wild Expeditions
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
