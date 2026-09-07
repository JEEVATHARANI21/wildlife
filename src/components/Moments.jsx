import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// USER'S GENUINE WILDLIFE PHOTOGRAPHS FROM D:\wildlife\images
const MOMENTS = [
  {
    id: '01',
    category: 'LATEST CATALOGUE',
    title: 'THE STARE ACROSS GRANITE',
    species: 'INDIAN LEOPARD (PANTHERA PARDUS FUSCA)',
    location: 'JAWAÏ ROCKS, RAJASTHAN',
    subtitle: 'LIGHT & SHADOWS',
    description:
      'Light and Shadows aims to magnify the withering world we live in using transitional elements of nature. Through the clouds of change and the fading mist, the leopard stands in quiet supremacy, signifying vanishing grandeur in an authentic photographic finish.',
    src: '/images/user/IMG_4761.JPG',
  },
  {
    id: '02',
    category: 'CANOPY CHRONICLES',
    title: 'FORKED PERCEPTION',
    species: 'MALABAR PIT VIPER (CRASPEDOCEPHALUS)',
    location: 'AGUMBE RAINFOREST, KARNATAKA',
    subtitle: 'SENSORY EMERGENCE',
    description:
      'Sensing vibrations through darkness — precision in miniature. Perched in absolute equilibrium amidst wet tropical foliage, tasting the monsoon air in search of thermal signatures.',
    src: '/images/user/IMG_4634.JPG',
  },
  {
    id: '03',
    category: 'RAINFOREST NOCTURNE',
    title: 'SUSPENDED GRAVITY',
    species: 'MALABAR GLIDING FROG',
    location: 'WESTERN GHATS, INDIA',
    subtitle: 'NIGHT SENTINEL',
    description:
      'Perched on a whisper of wood, waiting for monsoon droplets. An emblem of undisturbed rainforest ecosystems, adapted with luminous pigments and webbed membranes for high-canopy navigation.',
    src: '/images/user/IMG_4632.JPG',
  },
  {
    id: '04',
    category: 'PRIMEVAL CORRIDORS',
    title: 'THE ANCIENT TUSKER',
    species: 'ASIAN ELEPHANT (ELEPHAS MAXIMUS)',
    location: 'KABINI RESERVE, KARNATAKA',
    subtitle: 'TEXTURE OF TIME',
    description:
      'Decades etched into ivory and furrowed hide. Moving like smoke through towering teak groves, leaving colossal footprints that nurture micro-habitats across ancient migration corridors.',
    src: '/images/user/IMG_7965.PNG',
  },
  {
    id: '05',
    category: 'DEWPOINT MACRO',
    title: 'THE DEWDROP SENTINEL',
    species: 'BANDED GROUND GECKO',
    location: 'KUDREMUKH RAINFOREST',
    subtitle: 'LIQUID JEWELS',
    description:
      'Condensation clinging to scales finer than grains of sand. Navigating leaf litter and wet boulders with micro-lamellae in absolute silence under starless midnight skies.',
    src: '/images/user/IMG_4642.JPG',
  },
  {
    id: '06',
    category: 'VERDANT REALMS',
    title: 'THE MONOLITH EMERGES',
    species: 'WILD BULL GAUR & ELEPHANT',
    location: 'PERIYAR SANCTUARY, KERALA',
    subtitle: 'ELEMENTAL SILENCE',
    description:
      'Parting the waist-high emerald grass as morning mist burns off the lake. An emblem of undisturbed wilderness, gentle yet possessing boundless elemental strength.',
    src: '/images/user/IMG_7964.JPG',
  },
]

export default function Moments() {
  const containerRef = useRef(null)
  const pinSectionRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  // Single unified stageRef so BOTH image and description move in identical lockstep
  const stageRef = useRef(null)

  useEffect(() => {
    const total = MOMENTS.length

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinSectionRef.current,
      scrub: 0.8,
      onUpdate: (self) => {
        // Progress runs 0.0 (top) -> 1.0 (bottom)
        const progress = self.progress
        const rawIndex = progress * (total - 1)
        const newIndex = Math.min(total - 1, Math.round(rawIndex))
        setActiveIdx(newIndex)

        // USER REQUEST:
        // Down scroll (progress 0 -> 1) -> moves LEFT (-X)
        // Up scroll   (progress 1 -> 0) -> moves RIGHT (+X)
        // Both image and description are locked together in stageRef moving to the same side
        const xOffset = (0.5 - progress) * 380

        if (stageRef.current) {
          gsap.to(stageRef.current, {
            x: xOffset,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      },
    })

    return () => {
      st.kill()
    }
  }, [])

  const current = MOMENTS[activeIdx]

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{
        height: '420vh', // Smooth scrub distance
        background: '#ECE9E2', // Elegant Shaaz Jung warm editorial tone
        color: '#1A1B18',
      }}
    >
      {/* Pinned Editorial Stage */}
      <div
        ref={pinSectionRef}
        className="sticky top-0 w-full h-[100svh] overflow-hidden flex flex-col justify-between py-8 md:py-10 px-6 md:px-16 select-none"
      >
        {/* Top Editorial Header & Catalogue Breadcrumb */}
        <div className="flex justify-between items-center border-b border-[#D5D0C6] pb-4 z-20">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#888]">
              CATALOGUE {current.id} / 06
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B3874B]" />
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#B3874B] font-medium">
              {current.category}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden md:inline font-sans text-[10px] tracking-[0.18em] uppercase text-[#777]">
              [ Scroll ↓ moves left · Scroll ↑ moves right ]
            </span>
            <span className="font-serif text-lg text-[#1A1B18]">
              {current.id}
              <span className="text-[#999] text-xs font-sans"> / 06</span>
            </span>
          </div>
        </div>

        {/* Central Stage: Both Image & Description locked side-by-side in stageRef, moving together */}
        <div className="relative flex-1 flex items-center justify-center w-full my-auto overflow-visible">
          <div
            ref={stageRef}
            className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 w-full max-w-5xl mx-auto will-change-transform z-10"
          >
            {/* Left Column: Photograph */}
            <div className="w-full lg:w-[46%] flex items-center justify-center flex-shrink-0">
              <div className="relative w-[300px] sm:w-[380px] md:w-[440px] aspect-[4/5] bg-[#0E0F0D] rounded-sm overflow-hidden shadow-2xl border border-black/10">
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.title}
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
                />

                {/* Subtle vignette border */}
                <div
                  className="absolute inset-0 pointer-events-none border border-black/15"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.35) 100%)',
                  }}
                />
              </div>
            </div>

            {/* Right Column: Side-by-Side Description (Locked alongside the image, never overlaps) */}
            <div className="w-full lg:w-[54%] flex flex-col justify-center flex-shrink-0 max-w-md lg:max-w-lg">
              <h2
                className="font-serif text-[#B3874B] tracking-[0.05em] uppercase leading-tight mb-2"
                style={{
                  fontSize: 'clamp(2rem, 3.4vw, 3.2rem)',
                  fontWeight: 400,
                }}
              >
                {current.subtitle}
              </h2>

              <p className="font-sans text-[11px] tracking-[0.25em] uppercase font-semibold text-[#3A3B36] mb-4">
                {current.category}
              </p>

              <p className="font-sans text-xs md:text-sm text-[#4A4B45] font-light leading-relaxed mb-5">
                {current.description}
              </p>

              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#888] mb-6">
                LOCATION: <span className="text-[#1A1B18]">{current.location}</span>
                <br />
                SPECIES: <span className="text-[#1A1B18]">{current.species}</span>
              </p>

              <div>
                <a
                  href="#contact"
                  className="inline-block px-7 py-3 bg-[#1C1D1A] text-[#F1EFE8] font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-[#B3874B] transition-colors duration-300 shadow-md"
                >
                  Explore Catalogues
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pagination & Progress Line */}
        <div className="flex justify-between items-center pt-4 border-t border-[#D5D0C6] z-20">
          <div className="flex gap-2">
            {MOMENTS.map((m, i) => (
              <div
                key={m.id}
                className={`h-[2px] transition-all duration-500 ${
                  i === activeIdx
                    ? 'w-10 bg-[#B3874B]'
                    : 'w-3 bg-[#D5D0C6]'
                }`}
              />
            ))}
          </div>

          <span className="font-serif italic text-xs text-[#777]">
            "{current.title}"
          </span>
        </div>
      </div>
    </section>
  )
}
