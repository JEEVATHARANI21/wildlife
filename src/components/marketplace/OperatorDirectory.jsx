export default function OperatorDirectory({ operators }) {
  return (
    <section id="operators" className="py-20 px-4 sm:px-8 md:px-16 bg-[#0B0C0A] border-b border-[#2A2B28]/60">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#B3874B] animate-pulse" />
            <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B3874B] font-semibold">
              Ecosystem & Compliance · Operator Network
            </p>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F1EFE8] font-light leading-tight">
            Verified Safari <span className="italic text-[#B3874B] font-normal">Operators & Fleets</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-2 font-light">
            We exclusively partner with Forest Department-registered safari operators with verified Gypsy fleets, certified tribal trackers, and strict field conservation ethics.
          </p>
        </div>

        {/* Operators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {operators.map((op) => (
            <div
              key={op.id}
              className="rounded-2xl bg-[#141613] border border-[#2A2B28] p-6 sm:p-7 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Header with Verified Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center text-lg">
                    🚙
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-sans font-semibold tracking-wider flex items-center gap-1">
                    <span>✓</span> GOVT REGISTERED
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#F1EFE8] mb-1">
                  {op.name}
                </h3>
                <span className="text-xs font-sans text-[#B3874B] block mb-3">
                  📍 {op.headquarters} · {op.experienceYears} Years Field Experience
                </span>

                <p className="font-sans text-xs text-[#A7A59B] leading-relaxed font-light mb-5">
                  {op.description}
                </p>

                {/* Specs */}
                <div className="space-y-2 py-3 border-t border-white/5 text-[11px] font-sans text-[#888]">
                  <div>
                    <span className="text-[#555] uppercase tracking-wider">Fleet Specs: </span>
                    <span className="text-[#F1EFE8]">{op.fleetSize}</span>
                  </div>
                  <div>
                    <span className="text-[#555] uppercase tracking-wider">Forest License: </span>
                    <span className="text-[#B3874B] font-mono">{op.licenseNumber}</span>
                  </div>
                  <div>
                    <span className="text-[#555] uppercase tracking-wider">Rating: </span>
                    <span className="text-[#F1EFE8]">★ {op.rating} ({op.reviewsCount} verified traveler reviews)</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-5 border-t border-white/5">
                <a
                  href={`https://wa.me/919087394546?text=Hello%20Vijay,%20I'm%20interested%20in%20connecting%20with%20${encodeURIComponent(op.name)}%20for%20a%20private%20safari%20inquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl border border-white/10 hover:border-[#B3874B] bg-white/5 hover:bg-[#B3874B] hover:text-[#0B0C0A] text-xs font-sans tracking-wider uppercase text-[#F1EFE8] transition-all flex items-center justify-center gap-1.5 cursor-pointer font-medium"
                >
                  <span>Connect with Operator</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
