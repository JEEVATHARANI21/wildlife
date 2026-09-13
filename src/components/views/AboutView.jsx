import { TOURS_DATA } from '../../data/photoToursData'

export default function AboutView({ onBackToHome, onPlanTrip }) {
  const founders = TOURS_DATA.founders

  return (
    <div className="min-h-screen bg-[#080908] text-[#F2F0E8] pt-24 pb-28 select-none">
      {/* Top Back Navigation Bar */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-8 flex items-center justify-between border-b border-[#242923] pb-4">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#A7A59B] hover:text-[#D6A85C] transition-colors cursor-pointer"
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-sans text-[#D6A85C] uppercase tracking-wider font-semibold">
          Leadership & Ethics
        </span>
      </div>

      {/* Hero Intro */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center mb-16">
        <div className="inline-flex items-center gap-2.5 mb-3">
          <span className="w-7 h-[1.5px] bg-[#B87333]" />
          <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
            THE MINDS BEHIND VM WILD EXPEDITIONS
          </span>
          <span className="w-7 h-[1.5px] bg-[#B87333]" />
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#F2F0E8] font-light leading-tight mb-4">
          Meet the <span className="italic text-[#D6A85C] font-normal">Founders</span>
        </h1>
        <p className="font-sans text-xs sm:text-sm md:text-base text-[#A7A59B] font-light leading-relaxed">
          VM Wild Expeditions was established on a single principle: wildlife photography tours should not be rushed tourist safaris, but dedicated, ethical, small-group masterclasses where participants learn how to anticipate animal behavior and sculpt natural light.
        </p>
      </div>

      {/* Founders Profile Cards */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {founders.map((founder, idx) => (
            <div
              key={founder.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#151815] border border-[#242923] hover:border-[#D6A85C]/60 transition-all duration-300 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
                  {/* Portrait */}
                  <div className="relative w-32 sm:w-36 aspect-[3/4] rounded-2xl overflow-hidden bg-[#080908] border border-[#242923] shadow-lg flex-shrink-0">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080908] via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 right-2 text-center text-[9px] font-sans tracking-widest uppercase text-[#D6A85C] bg-[#080908]/90 py-0.5 rounded border border-[#242923] font-semibold">
                      Founder 0{idx + 1}
                    </span>
                  </div>

                  {/* Header info */}
                  <div className="text-center sm:text-left flex-1 min-w-0">
                    <span className="text-[9.5px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block mb-1">
                      VM Wild Expeditions
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] leading-tight mb-1">
                      {founder.name}
                    </h2>
                    <p className="font-sans text-xs text-[#A7A59B] mb-3">
                      {founder.role}
                    </p>

                    {/* Credentials */}
                    <div className="space-y-1.5 text-[11px] font-sans text-[#F2F0E8]/85">
                      {founder.credentials?.map((cred, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-[#B87333] shrink-0 text-[10px] mt-0.5">✦</span>
                          <span className="leading-tight">{cred}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="p-4 rounded-xl bg-[#080908] border-l-2 border-[#B87333] font-serif italic text-xs sm:text-sm text-[#F2F0E8]/90 leading-relaxed mb-6">
                  {founder.quote}
                </blockquote>
              </div>

              {/* Instagram link */}
              <div className="pt-4 border-t border-[#242923] flex items-center justify-between">
                <a
                  href={founder.instagram || 'https://www.instagram.com/vm_wild_expeditions'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-sans text-[#D6A85C] hover:text-[#F2F0E8] font-semibold transition-colors"
                >
                  <span>Connect on Instagram ({founder.instagramHandle})</span>
                  <span>↗</span>
                </a>
                <span className="text-[10px] font-sans text-[#A7A59B] uppercase tracking-wider">
                  Direct Field Lead
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* The 4 Tenets of Our Field Code */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#151815] border border-[#242923] mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] text-center mb-8">
            The VM Wild Expeditions <span className="italic text-[#D6A85C]">Field Code</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-[#080908] border border-[#242923]">
              <span className="text-2xl mb-3 block">🐅</span>
              <h3 className="font-serif text-lg text-[#F2F0E8] mb-1.5">Zero Disturbance Tracking</h3>
              <p className="font-sans text-xs text-[#A7A59B] leading-relaxed font-light">
                We maintain strictly mandated distances and silent engines, letting predators approach our vehicles voluntarily on their natural trajectories.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#080908] border border-[#242923]">
              <span className="text-2xl mb-3 block">📸</span>
              <h3 className="font-serif text-lg text-[#F2F0E8] mb-1.5">1-on-1 Field Coaching</h3>
              <p className="font-sans text-xs text-[#A7A59B] leading-relaxed font-light">
                No generic group tours. Vijay Mathiew works directly beside you in the Gypsy, adjusting your shutter speed, exposure compensations, and histogram in real time.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#080908] border border-[#242923]">
              <span className="text-2xl mb-3 block">🤝</span>
              <h3 className="font-serif text-lg text-[#F2F0E8] mb-1.5">Tribal Guide Empowerment</h3>
              <p className="font-sans text-xs text-[#A7A59B] leading-relaxed font-light">
                We partner with indigenous local trackers whose generations-long knowledge of forest signs guarantees sightings while directly funding grassroots conservation.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onPlanTrip}
            className="py-3.5 px-8 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] text-xs font-sans uppercase tracking-wider font-bold hover:shadow-[0_4px_22px_rgba(214,168,92,0.45)] transition-all cursor-pointer"
          >
            Plan An Expedition With The Founders →
          </button>
        </div>
      </div>
    </div>
  )
}
