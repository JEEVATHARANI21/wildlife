import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// USER'S GENUINE WILDLIFE PHOTOGRAPHS FROM D:\wildlife\images
const MOMENTS = [
  {
    id: '01',
    title: 'The Stare Across Granite',
    quote: 'Before sound travels through the valley, the eyes make contact.',
    src: '/images/user/IMG_4761.JPG',
    species: 'Indian Leopard (Panthera pardus fusca)',
    location: 'Jawaï Rocks, Rajasthan',
    description:
      'High upon the sheer sun-baked granite escarpments, this solitary leopard perched in complete stillness. Every muscle taut, reading the thermal winds before disappearing into shadowed ravines.',
  },
  {
    id: '02',
    title: 'Forked Perception',
    quote: 'Sensing vibrations through darkness — precision in miniature.',
    src: '/images/user/IMG_4634.JPG',
    species: 'Malabar Pit Viper (Craspedocephalus malabaricus)',
    location: 'Agumbe Rainforest',
    description:
      'A master of arboreal ambush. Under the steady monsoon drip, its heat-sensing loreal pits and iridescent emerald scales remain imperceptible until the forked tongue tests the humid night air.',
  },
  {
    id: '03',
    title: 'Suspended Gravity',
    quote: 'Perched on a whisper of wood, waiting for monsoon droplets.',
    src: '/images/user/IMG_4632.JPG',
    species: 'Gliding Frog (Rhacophorus malabaricus)',
    location: 'Western Ghats, India',
    description:
      'Balancing effortlessly on a solitary dangling liana above a torrent. Webbed extremities adapted for high canopy flight, holding absolute stillness amidst nocturnal rainforest choir.',
  },
  {
    id: '04',
    title: 'The Primeval Silhouette',
    quote: 'Tusks that carved migration tracks across centuries.',
    src: '/images/user/IMG_7965.PNG',
    species: 'Asian Elephant (Elephas maximus)',
    location: 'Kabini Reserve',
    description:
      'Decades etched into ivory and furrowed hide. Moving like smoke through towering teak groves, leaving colossal footprints that nurture micro-habitats across primeval corridors.',
  },
  {
    id: '05',
    title: 'The Dewdrop Sentinel',
    quote: 'Condensation clinging to scales finer than grains of sand.',
    src: '/images/user/IMG_4642.JPG',
    species: 'Banded Ground Gecko (Cyrtodactylus)',
    location: 'Kudremukh Forest',
    description:
      'Pre-dawn condensation adorns the nocturnal hunter like liquid diamonds. Navigating leaf litter and wet boulders with adhesive lamellae in complete silence.',
  },
  {
    id: '06',
    title: 'The Verdant Giant',
    quote: 'A colossal shadow emerging into golden morning light.',
    src: '/images/user/IMG_7964.JPG',
    species: 'Wild Bull Elephant (Elephas maximus)',
    location: 'Periyar Sanctuary',
    description:
      'Parting the waist-high emerald grass as morning mist burns off the lake. An emblem of undisturbed wilderness, gentle yet possessing boundless elemental power.',
  },
]

export default function Moments() {
  const containerRef = useRef(null)
  const pinWrapRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  // Motion container refs for left/right directional animation
  const imageBoxRef = useRef(null)
  const textBoxRef = useRef(null)

  useEffect(() => {
    const totalMoments = MOMENTS.length

    // ScrollTrigger to scrub through the moments
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinWrapRef.current,
      scrub: 0.6,
      onUpdate: (self) => {
        // Calculate current active moment based on scroll progress
        const rawIdx = self.progress * (totalMoments - 1)
        const newIdx = Math.min(totalMoments - 1, Math.round(rawIdx))
        setActiveIdx(newIdx)

        // As user scrolls down: image moves to the RIGHT (+X), description moves to the LEFT (-X)
        // As user scrolls up: image returns to the LEFT (-X), description returns to the RIGHT (+X)
        // self.direction: 1 = scrolling down, -1 = scrolling up
        const moveOffset = (self.progress - 0.5) * 60

        if (imageBoxRef.current) {
          gsap.to(imageBoxRef.current, {
            x: moveOffset,
            duration: 0.4,
            ease: 'power1.out',
            overwrite: 'auto',
          })
        }

        if (textBoxRef.current) {
          gsap.to(textBoxRef.current, {
            x: -moveOffset * 0.75,
            duration: 0.4,
            ease: 'power1.out',
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
        height: '380vh', // Provides ample scroll distance for smooth scrubbing
        background: '#0B0C0A',
      }}
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinWrapRef}
        className="sticky top-0 w-full h-[100svh] overflow-hidden flex flex-col justify-center px-8 md:px-16"
      >
        {/* Subtle background gradient glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 70% 50%, rgba(16,185,129,0.12) 0%, transparent 60%)',
          }}
        />

        {/* Section Header */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 pt-16 md:pt-0">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-emerald-400 font-medium">
                Field Encounters · Section 04
              </p>
            </div>
            <h2
              className="font-serif text-[#F1EFE8] leading-none"
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
              }}
            >
              Moments That Last
              <br />
              <span className="italic font-light opacity-90">1/1000 Second</span>
            </h2>
          </div>

          {/* Scroll Direction Guide & Counter */}
          <div className="flex items-center gap-6 font-sans text-xs text-[#A7A59B]">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif text-[#F1EFE8] font-light">
                {current.id}
              </span>
              <span>/</span>
              <span>06</span>
            </div>
            <span className="hidden md:inline text-[11px] tracking-widest uppercase text-[#777]">
              [ Scroll ↓ moves right · Scroll ↑ moves left ]
            </span>
          </div>
        </div>

        {/* Dynamic Interactive Stage: Side-by-Side Image & Description */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full max-w-7xl mx-auto">
          {/* Left: Titles List & Dynamic Detailed Description (Moves Left/Right on Scroll) */}
          <div
            ref={textBoxRef}
            className="w-full lg:w-5/12 flex flex-col justify-center transition-all duration-300"
          >
            {/* Quick selector numbers */}
            <div className="flex gap-2 mb-6">
              {MOMENTS.map((m, i) => (
                <div
                  key={m.id}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === activeIdx
                      ? 'w-10 bg-emerald-400'
                      : 'w-3 bg-[#2A2B28]'
                  }`}
                />
              ))}
            </div>

            {/* Specimen details */}
            <p className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-emerald-400 mb-2 font-medium">
              {current.species}
            </p>

            <h3
              key={current.title}
              className="font-serif text-[#F1EFE8] mb-4 leading-tight transition-opacity duration-300"
              style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
                fontWeight: 300,
              }}
            >
              {current.title}
            </h3>

            <p className="font-sans text-xs text-[#A7A59B] uppercase tracking-wider mb-4">
              📍 {current.location}
            </p>

            <blockquote className="border-l border-emerald-500/60 pl-4 my-3">
              <p className="font-serif italic text-base md:text-lg text-[#F1EFE8]/90 leading-relaxed font-light">
                "{current.quote}"
              </p>
            </blockquote>

            <p className="font-sans text-xs md:text-sm text-[#A7A59B] font-light leading-relaxed mt-2 max-w-lg">
              {current.description}
            </p>
          </div>

          {/* Right: Dynamic High-Res Specimen Photograph (Moves Right on Scroll Down, Left on Scroll Up) */}
          <div
            ref={imageBoxRef}
            className="w-full lg:w-7/12 transition-transform duration-300 ease-out"
          >
            <div className="relative w-full h-[38vh] md:h-[54vh] rounded-2xl md:rounded-3xl overflow-hidden border border-[#2A2B28] shadow-2xl bg-[#090A09] group">
              <img
                key={current.src}
                src={current.src}
                alt={current.title}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
              />

              {/* Edge Gradient & Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(11,12,10,0.8) 0%, transparent 55%)',
                }}
              />

              {/* Top Tag */}
              <div className="absolute top-5 left-5 z-20">
                <span className="px-3 py-1 rounded-full text-[10px] font-sans tracking-[0.2em] uppercase bg-black/60 border border-[#2A2B28] text-emerald-400 backdrop-blur-md">
                  Field Specimen {current.id}
                </span>
              </div>

              {/* Bottom Subtle Bar */}
              <div className="absolute bottom-5 left-6 right-6 z-20 flex justify-between items-center text-[10px] font-sans text-[#A7A59B]">
                <span className="uppercase tracking-widest">
                  1/1000s High Speed Capture
                </span>
                <span className="text-[#F1EFE8] font-mono">
                  {activeIdx + 1} of {MOMENTS.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
