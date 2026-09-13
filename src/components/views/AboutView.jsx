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

              {/* Social Links: Instagram and WhatsApp */}
              <div className="pt-4 border-t border-[#242923] flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <a
                    href={founder.instagram || 'https://www.instagram.com/vm_wild_expeditions'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#080908] border border-[#242923] hover:border-[#E1306C] text-xs font-sans text-[#F2F0E8] hover:text-[#E1306C] transition-all group"
                    title="Instagram Profile"
                  >
                    <svg className="w-3.5 h-3.5 text-[#E1306C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span>{founder.instagramHandle}</span>
                  </a>

                  <a
                    href={`https://wa.me/919087394546?text=Hi%20${encodeURIComponent(founder.displayName || founder.name)},%20I'm%20reaching%20out%20from%20the%20About%20Page%20of%20VM%20Wild%20Expeditions.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#080908] border border-[#242923] hover:border-[#25D366] text-xs font-sans text-[#F2F0E8] hover:text-[#25D366] transition-all group"
                    title="Direct WhatsApp"
                  >
                    <svg className="w-3.5 h-3.5 text-[#25D366] fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
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
              <span className="text-2xl mb-3 block">🐾</span>
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
