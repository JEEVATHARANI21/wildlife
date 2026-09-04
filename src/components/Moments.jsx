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
  },
  {
    id: '02',
    title: 'Forked Perception',
    quote: 'Sensing vibrations through darkness — precision in miniature.',
    src: '/images/user/IMG_4634.JPG',
    species: 'Malabar Pit Viper (Craspedocephalus malabaricus)',
    location: 'Agumbe Rainforest',
  },
  {
    id: '03',
    title: 'Suspended Gravity',
    quote: 'Perched on a whisper of wood, waiting for monsoon droplets.',
    src: '/images/user/IMG_4632.JPG',
    species: 'Gliding Frog (Rhacophorus malabaricus)',
    location: 'Western Ghats, India',
  },
  {
    id: '04',
    title: 'The Primeval Silhouette',
    quote: 'Tusks that carved migration tracks across centuries.',
    src: '/images/user/IMG_7965.PNG',
    species: 'Asian Elephant (Elephas maximus)',
    location: 'Kabini Reserve',
  },
  {
    id: '05',
    title: 'The Dewdrop Sentinel',
    quote: 'Condensation clinging to scales finer than grains of sand.',
    src: '/images/user/IMG_4642.JPG',
    species: 'Banded Ground Gecko (Cyrtodactylus)',
    location: 'Kudremukh Forest',
  },
  {
    id: '06',
    title: 'The Verdant Giant',
    quote: 'A colossal shadow emerging into golden morning light.',
    src: '/images/user/IMG_7964.JPG',
    species: 'Wild Bull Elephant (Elephas maximus)',
    location: 'Periyar Sanctuary',
  },
]

export default function Moments() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const itemRefs = useRef([])
  const imgRef = useRef(null)

  useEffect(() => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(
        el,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    })
  }, [])

  const handleActivate = (i) => {
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      )
    }
    setActive(i)
  }

  return (
    <section
      ref={sectionRef}
      className="px-8 md:px-16 py-24 md:py-40"
      style={{ background: 'var(--bg)' }}
    >
      {/* Header */}
      <div className="mb-16">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-3 text-emerald-400">
          Field Encounters · Section 04
        </p>
        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 300,
            color: 'var(--text)',
          }}
        >
          Moments That Last<br />1/1000 Second
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-12 md:gap-20">
        {/* Left: list */}
        <div className="flex flex-col gap-0 md:w-5/12">
          {MOMENTS.map((m, i) => (
            <button
              key={m.id}
              ref={(el) => (itemRefs.current[i] = el)}
              onClick={() => handleActivate(i)}
              className="text-left py-6 flex items-start gap-6 transition-all duration-300"
              style={{
                borderBottom: '1px solid var(--border)',
                opacity: i === active ? 1 : 0.45,
              }}
            >
              <span
                className="font-sans text-xs tabular-nums mt-1 shrink-0"
                style={{ color: i === active ? 'var(--text)' : 'var(--muted)' }}
              >
                {m.id}
              </span>
              <div>
                <h3
                  className="font-serif mb-1"
                  style={{
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                    fontWeight: 300,
                    color: i === active ? 'var(--text)' : 'var(--muted)',
                  }}
                >
                  {m.title}
                </h3>
                {i === active && (
                  <div className="mt-2">
                    <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-emerald-400">
                      {m.species} — {m.location}
                    </p>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Right: image + quote */}
        <div className="md:w-7/12 flex flex-col gap-8">
          <div
            className="overflow-hidden rounded-2xl border border-[#2A2B28]/80 bg-[#090A09]"
            style={{ aspectRatio: '4/3', position: 'relative' }}
          >
            <img
              ref={imgRef}
              src={MOMENTS[active].src}
              alt={MOMENTS[active].title}
              className="w-full h-full object-cover"
              style={{ display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(11,12,10,0.6) 0%, transparent 60%)',
              }}
            />
          </div>

          <blockquote>
            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.6,
                borderLeft: '1px solid var(--border)',
                paddingLeft: '1.5rem',
              }}
            >
              "{MOMENTS[active].quote}"
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
