import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ARTICLES = [
  {
    id: '01',
    category: 'Settings & Optics',
    title: 'Low-Light Mastery in Monsoon Rainforests',
    subtitle: 'Capturing High-Definition Animal Portraits in Deep Canopy Shade',
    readTime: '5 Min Read',
    date: 'Field Notes',
    summary: 'When filming inside the dense Western Ghats canopy, available light drops by 4 to 6 stops. Learn how to calibrate auto-ISO shutter thresholds, utilize f/2.8 primes effectively, and stabilize heavy glass in rainforest humidity.',
    tips: [
      'Lock minimum shutter speed to 1/800s to eliminate animal micro-movement',
      'Expose to the right (ETTR) to retain shadow data in black panther fur',
      'Carry silica moisture gels to prevent internal lens element condensation',
    ],
    image: '/images/user/IMG_4642.JPG',
  },
  {
    id: '02',
    category: 'Fieldcraft & Ethics',
    title: 'Ethical Predator Tracking: Reading Forest Signals',
    subtitle: 'Decoding Langur Alarm Calls and Scent Corridors in Big Cat Habitats',
    readTime: '7 Min Read',
    date: 'Field Notes',
    summary: 'True wildlife photography is 90% anticipation and 10% shutter release. Understand the distinct distress pitch between a leopard on the ground versus a tiger in the grass, ensuring non-intrusive fieldcraft.',
    tips: [
      'Learn the multi-tonal staccato alarm bark of Chital deer',
      'Cut vehicle engine 100 meters prior to anticipated crossing corridors',
      'Never block natural predator escape routes or water source approaches',
    ],
    image: '/images/user/IMG_4761.JPG',
  },
  {
    id: '03',
    category: 'Macro Techniques',
    title: 'Nocturnal Macro: Revealing Rare Herpetofauna',
    subtitle: 'Off-Camera Diffusion for Rainforest Frogs and Pit Vipers',
    readTime: '6 Min Read',
    date: 'Field Notes',
    summary: 'Direct flash flattens the jewel-like scales of vipers and washes out the glistening skin of tree frogs. Discover twin-flash bracket setups with custom silicone diffusers for museum-grade macro portraits.',
    tips: [
      'Double-diffuse speedlights to eradicate specular harshness on wet skin',
      'Use 100mm f/2.8 macro lenses at f/11 for depth of field on ocular rings',
      'Maintain minimum 30cm working distance for subject tranquility',
    ],
    image: '/images/user/IMG_4637.JPG',
  },
]

export default function Blog() {
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
      id="blog"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 px-5 sm:px-8 md:px-16 overflow-hidden border-t border-[#2A2B28]/60"
      style={{ background: '#090A09' }}
    >
      {/* Editorial Header */}
      <div ref={headerRef} className="max-w-4xl mb-12 sm:mb-16">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#B3874B] animate-pulse" />
          <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B3874B] font-medium">
            Knowledge & Fieldcraft · Wildlife Photography Tips
          </p>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F1EFE8] font-light leading-tight">
          Wildlife Photography Tips <span className="italic text-[#B3874B] font-normal">& Field Insights</span>
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-4 max-w-2xl font-light leading-relaxed">
          Master the technical precision, ethical respect, and observational patience required to document India’s elusive wildlife. Pro tips directly from the jungle.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ARTICLES.map((art) => (
          <article
            key={art.id}
            className="group relative rounded-2xl overflow-hidden bg-[#111310] border border-[#2A2B28]/80 hover:border-[#B3874B]/70 transition-all duration-500 shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Featured Image */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#090A09]">
                <img
                  src={art.image}
                  alt={`${art.title} - Wildlife Photography Tips by Vijay Mathiew`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111310] via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[9px] font-sans tracking-widest text-[#B3874B] uppercase border border-white/10 font-medium">
                    {art.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-sans tracking-wider text-[#A7A59B]">
                    {art.readTime}
                  </span>
                </div>
              </div>

              {/* Text Information */}
              <div className="p-6 sm:p-7">
                <span className="font-sans text-[9px] tracking-[0.25em] text-[#888] uppercase block mb-1">
                  {art.date}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F1EFE8] group-hover:text-[#B3874B] transition-colors leading-snug mb-3">
                  {art.title}
                </h3>
                <p className="font-sans text-xs text-[#A7A59B] leading-relaxed font-light mb-5">
                  {art.summary}
                </p>

                {/* Key Takeaways */}
                <div className="pt-4 border-t border-white/5 space-y-2">
                  <span className="font-sans text-[9px] tracking-widest uppercase text-[#B3874B] block mb-1 font-medium">
                    Key Field Rules:
                  </span>
                  {art.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] font-sans text-[#888] leading-relaxed">
                      <span className="text-[#B3874B] mt-0.5">•</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Read / Inquire Footer */}
            <div className="p-6 sm:p-7 pt-0">
              <a
                href={`https://wa.me/919087394546?text=Hi%20Vijay,%20I%20read%20your%20article%20on%20${encodeURIComponent(art.title)}%20and%20would%20love%20to%20learn%20more.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#B3874B] hover:text-[#B3874B] text-xs font-sans tracking-wider text-[#F1EFE8] transition-all"
              >
                <span>Ask Photographer on WhatsApp</span>
                <span>↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
