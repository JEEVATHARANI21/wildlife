import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOURS = [
  {
    id: '01',
    title: 'Valparai & Anamalai Rainforest Expedition',
    subtitle: 'Canopy Endemics & Tropical Rainforest Tracking',
    location: 'Anamalai Tiger Reserve, Tamil Nadu',
    duration: '4 Days / 3 Nights',
    groupSize: 'Max 4 Photographers',
    highlights: [
      'Lion-tailed Macaque & Malabar Hornbill tracking',
      'Nocturnal rainforest herpetology & macro field sessions',
      'Custom vehicle positioning in tea estate forest corridors',
    ],
    season: 'September – February',
    image: '/images/user/IMG_4634.JPG',
  },
  {
    id: '02',
    title: 'Kabini & Nilgiri Tiger Corridor',
    subtitle: 'Apex Predators & Ancient Teak Corridors',
    location: 'Kabini & Mudumalai Sanctuary, Tamil Nadu Border',
    duration: '5 Days / 4 Nights',
    groupSize: 'Exclusive 4x4 Jeep',
    highlights: [
      'Black Panther & Indian Leopard tracking along river backwaters',
      'Asiatic elephant matriarchal herds in golden hour mist',
      '1-on-1 telephoto low-light exposure mentoring',
    ],
    season: 'October – May',
    image: '/images/user/IMG_4761.JPG',
  },
  {
    id: '03',
    title: 'Western Ghats Macro & Stream Ecology',
    subtitle: 'Monsoon Mist & Rare Amphibian Biology',
    location: 'Agumbe Shola Rainforests, Western Ghats',
    duration: '3 Days / 2 Nights',
    groupSize: 'Max 3 Photographers',
    highlights: [
      'Malabar Pit Viper and bush frog behavioral lighting',
      'Dual-flash macro diffusion techniques in tropical drizzle',
      'Ethical non-invasive nocturnal habitat exploration',
    ],
    season: 'June – October (Monsoon)',
    image: '/images/user/IMG_4632.JPG',
  },
]

export default function Tours() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    )
  }, [])

  return (
    <section
      id="tours"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 px-5 sm:px-8 md:px-16 overflow-hidden border-t border-[#2A2B28]/60"
      style={{ background: '#0B0C0A' }}
    >
      {/* Editorial Header */}
      <div ref={headerRef} className="max-w-4xl mb-12 sm:mb-16">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#B3874B] animate-pulse" />
          <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B3874B] font-medium">
            Guided Expeditions · Wildlife Photography Tours
          </p>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F1EFE8] font-light leading-tight">
          Wildlife Photography Tours <span className="italic text-[#B3874B] font-normal">in Tamil Nadu & Beyond</span>
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-4 max-w-2xl font-light leading-relaxed">
          Embark on small-group masterclasses led by Vijay Mathiew. Master the art of anticipation, ethical predator tracking, and atmospheric storytelling in the wildest sanctuaries of South India.
        </p>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {TOURS.map((tour) => (
          <article
            key={tour.id}
            className="group relative rounded-2xl overflow-hidden bg-[#111310] border border-[#2A2B28]/80 hover:border-[#B3874B]/70 transition-all duration-500 shadow-2xl flex flex-col justify-between"
          >
            <div>
              {/* Tour Cover Image */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#090A09]">
                <img
                  src={tour.image}
                  alt={`${tour.title} - Wildlife Photography Tours Tamil Nadu`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111310] via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[9px] font-sans tracking-widest text-[#B3874B] uppercase border border-white/10 font-medium">
                    {tour.duration}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-sans tracking-wider text-emerald-400 border border-emerald-500/20">
                    {tour.groupSize}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7">
                <span className="font-sans text-[9px] tracking-[0.25em] text-[#888] uppercase block mb-1">
                  {tour.location}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F1EFE8] group-hover:text-[#B3874B] transition-colors leading-snug mb-2">
                  {tour.title}
                </h3>
                <p className="font-serif italic text-xs text-[#B3874B]/90 mb-4">
                  {tour.subtitle}
                </p>

                {/* Itinerary Highlights */}
                <div className="space-y-2 pt-3 border-t border-white/5 mb-6">
                  {tour.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-sans text-[#A7A59B] leading-relaxed">
                      <span className="text-[#B3874B] mt-0.5">✦</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] font-sans text-[#777] mb-6">
                  <span className="uppercase tracking-wider text-[#555]">Prime Season: </span>
                  <span className="text-[#F1EFE8]">{tour.season}</span>
                </div>
              </div>
            </div>

            {/* Direct Booking CTA */}
            <div className="p-6 sm:p-7 pt-0">
              <a
                href={`https://wa.me/919087394546?text=Hello%20Vijay,%20I%20am%20interested%20in%20the%20${encodeURIComponent(tour.title)}%20Wildlife%20Photography%20Tour.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#B3874B]/50 bg-[#B3874B]/10 hover:bg-[#B3874B] text-[#F1EFE8] hover:text-[#0B0C0A] font-sans text-xs tracking-widest uppercase transition-all duration-300 font-medium group-hover:shadow-[0_0_20px_rgba(179,135,75,0.25)]"
              >
                <span>Reserve Tour Slot</span>
                <span>↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Custom Expedition Banner */}
      <div className="mt-12 sm:mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#141512] to-[#1a1c18] border border-[#2A2B28] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="font-serif text-xl sm:text-2xl text-[#F1EFE8] mb-1 font-light">
            Need a Bespoke Private Wildlife Photography Expedition?
          </h4>
          <p className="font-sans text-xs sm:text-sm text-[#A7A59B] font-light max-w-xl">
            Custom-tailored 1-on-1 itineraries designed around specific target species across Tamil Nadu, Karnataka, and Kerala with private dedicated 4x4 safari vehicles.
          </p>
        </div>
        <a
          href="https://wa.me/919087394546?text=Hi%20Vijay,%20I'd%20like%20to%20plan%20a%20Custom%20Private%20Wildlife%20Photography%20Tour."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-[#B3874B] hover:text-[#0B0C0A] hover:border-[#B3874B] text-[#F1EFE8] font-sans text-xs tracking-widest uppercase transition-all duration-300"
        >
          Inquire Custom Tour
        </a>
      </div>
    </section>
  )
}
