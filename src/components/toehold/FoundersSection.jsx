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
            Untamed Trails was founded on a shared obsession: to take passionate photographers deeper into the wild with uncompromised field ethics, intimate group sizes, and world-class mentorship.
          </p>
        </div>

        {/* The Two Founders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {founders.map((founder, idx) => (
            <div
              key={founder.id}
              className="group rounded-3xl bg-[#242923]/60 border border-[#242923] hover:border-[#B87333] p-7 sm:p-9 transition-all duration-500 shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Portrait Frame */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-7">
                  <div className="relative w-40 sm:w-44 aspect-[3/4] rounded-2xl overflow-hidden bg-[#080908] border border-[#242923] group-hover:border-[#D6A85C] transition-colors shadow-2xl flex-shrink-0">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080908] via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2.5 left-2.5 right-2.5 text-center text-[9px] font-sans tracking-widest uppercase text-[#D6A85C] bg-[#080908]/85 backdrop-blur-sm py-1 rounded-md border border-[#242923] font-semibold">
                      Founder 0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Role */}
                  <div className="text-center sm:text-left flex-1">
                    <span className="font-sans text-[10px] tracking-widest uppercase text-[#D6A85C] font-semibold block mb-1">
                      Untamed Trails Leadership
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] mb-1">
                      {founder.name}
                    </h3>
                    <p className="font-sans text-xs text-[#A7A59B] mb-4">
                      {founder.role}
                    </p>

                    {/* Credentials List */}
                    <div className="space-y-1.5 text-[11px] font-sans text-[#F2F0E8]/80">
                      {founder.credentials.map((cred, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[#B87333] mt-0.5">✦</span>
                          <span>{cred}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Founder Bio */}
                <p className="font-sans text-xs sm:text-sm text-[#A7A59B] leading-relaxed font-light mb-6">
                  {founder.bio}
                </p>

                {/* Founder Quote */}
                <blockquote className="p-4 rounded-xl bg-[#151815] border-l-2 border-[#B87333] font-serif italic text-xs sm:text-sm text-[#F2F0E8]/90 leading-relaxed mb-6">
                  {founder.quote}
                </blockquote>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-[#242923] flex items-center justify-between">
                <a
                  href="https://www.instagram.com/untamed__trails__?stkn=OTU3MGI0bHR6OWZz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-sans text-[#B87333] hover:text-[#D6A85C] font-semibold transition-colors"
                >
                  <span>Connect with Founder on Instagram</span>
                  <span>↗</span>
                </a>
                <span className="text-[10px] font-sans text-[#A7A59B] tracking-wider uppercase">
                  Untamed Trails
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
