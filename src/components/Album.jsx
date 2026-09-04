import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── USER WILDLIFE PHOTOGRAPHS FROM D:\wildlife\images ──────────────────────────
const ALBUM = [
  {
    id: 1,
    src: '/images/user/IMG_4761.JPG',
    category: 'Big Cats',
    title: 'Eyes of the Forest — Leopard Gaze',
    location: 'Jawaï Rocks, Rajasthan',
    year: '2026',
    lens: '400mm f/2.8',
    iso: 'ISO 800',
    shutter: '1/1600s',
    story: 'Observed this elusive leopard surveying the valley from ancient granite boulders. Two hours of complete silence culminated in this piercing gaze.',
  },
  {
    id: 2,
    src: '/images/user/IMG_4634.JPG',
    category: 'Reptiles',
    title: 'Emerald Pit Viper — Sensory Drift',
    location: 'Agumbe Rainforest',
    year: '2026',
    lens: '100mm Macro f/2.8',
    iso: 'ISO 640',
    shutter: '1/250s',
    story: 'Tasting the humid monsoon air with its forked tongue. The precise scales and iridescent green hue shimmer under dense tropical canopy.',
  },
  {
    id: 3,
    src: '/images/user/IMG_4632.JPG',
    category: 'Amphibians',
    title: 'Malabar Gliding Frog — Night Sentinel',
    location: 'Western Ghats, India',
    year: '2026',
    lens: '90mm Macro',
    iso: 'ISO 400',
    shutter: '1/200s',
    story: 'Perched on a solitary vine above a torrential mountain stream, waiting for nocturnal insects in absolute equilibrium.',
  },
  {
    id: 4,
    src: '/images/user/IMG_7965.PNG',
    category: 'Giants',
    title: 'Texture of Time — Bull Elephant',
    location: 'Kabini Reserve',
    year: '2026',
    lens: '600mm f/4',
    iso: 'ISO 320',
    shutter: '1/1000s',
    story: 'Every crack along the tusk and furrowed skin speaks of decades migrating across primeval forest corridors.',
  },
  {
    id: 5,
    src: '/images/user/IMG_4642.JPG',
    category: 'Macro Specimen',
    title: 'Banded Gecko — Dewdrop Crown',
    location: 'Kudremukh Forest',
    year: '2026',
    lens: '105mm Macro',
    iso: 'ISO 500',
    shutter: '1/160s',
    story: 'Microscopic water droplets cling to the scales and eyes of this rare nocturnal gecko following pre-dawn condensation.',
  },
  {
    id: 6,
    src: '/images/user/IMG_6853.PNG',
    category: 'Wildlife',
    title: 'Indian Gaur — Primeval Monolith',
    location: 'Nilgiri Foothills',
    year: '2026',
    lens: '300mm f/2.8',
    iso: 'ISO 400',
    shutter: '1/800s',
    story: 'Enormous strength framed against pure void. The curled horns tell tales of territorial clashes deep in the teak forests.',
  },
  {
    id: 7,
    src: '/images/user/IMG_4638.JPG',
    category: 'Nocturnal',
    title: 'Night Bullfrog — Marshland Guardian',
    location: 'Anamalai Foothills',
    year: '2026',
    lens: '100mm Macro',
    iso: 'ISO 800',
    shutter: '1/125s',
    story: 'Basking amidst submerged freshwater vegetation as night falls, vocal sacs vibrating to call across the swamp.',
  },
  {
    id: 8,
    src: '/images/user/IMG_7964.JPG',
    category: 'Giants',
    title: 'Emergence in Verdant Light',
    location: 'Periyar Sanctuary',
    year: '2026',
    lens: '500mm f/4',
    iso: 'ISO 250',
    shutter: '1/1250s',
    story: 'Towering elephant stepping through waist-high grassland in radiant golden morning light.',
  },
  {
    id: 9,
    src: '/images/user/IMG_4639.JPG',
    category: 'Reptiles',
    title: 'Bamboo Viper — The Coiled Path',
    location: 'Valparai Canopies',
    year: '2026',
    lens: '70-200mm f/2.8',
    iso: 'ISO 1000',
    shutter: '1/500s',
    story: 'Camouflaged seamlessly among thorny vines, motionless for hours waiting for unsuspecting tree frogs.',
  },
  {
    id: 10,
    src: '/images/user/IMG_4637.JPG',
    category: 'Macro Biology',
    title: 'Genesis — Glass Frog Embryos',
    location: 'Rainforest Stream',
    year: '2026',
    lens: '65mm 2x-5x Ultra Macro',
    iso: 'ISO 200',
    shutter: '1/100s',
    story: 'Life suspended in transparent jelly clutches beneath broad leaves, developing tadpoles visible to the naked eye.',
  },
  {
    id: 11,
    src: '/images/user/IMG_4643.JPG',
    category: 'Reptiles',
    title: 'Vine Snake Alert — Leaf Mimic',
    location: 'Coorg Valley',
    year: '2026',
    lens: '100mm Macro',
    iso: 'ISO 400',
    shutter: '1/320s',
    story: 'Slender as a whip, floating horizontally like a vine swaying in the forest breeze.',
  },
  {
    id: 12,
    src: '/images/user/IMG_4633.JPG',
    category: 'Amphibians',
    title: 'Golden Tree Frog — Luminescent Reach',
    location: 'Silent Valley',
    year: '2026',
    lens: '105mm Macro',
    iso: 'ISO 640',
    shutter: '1/180s',
    story: 'Grasping vertical bark with suction pads, throat glowing luminous yellow in the flashlight illumination.',
  },
]

export default function Album() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState(1)

  const imgRef = useRef(null)
  const metaRef = useRef(null)
  const specRef = useRef(null)

  // Drag / Swipe handling
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const isDragging = useRef(false)
  const dragDistance = useRef(0)

  const goTo = useCallback((nextIdx, dir = 1) => {
    if (animating) return
    const bounded = (nextIdx + ALBUM.length) % ALBUM.length
    if (bounded === active) return

    setAnimating(true)
    setDirection(dir)

    const tl = gsap.timeline({
      onComplete: () => setAnimating(false),
    })

    // Exit animation with subtle scale and velocity blur
    tl.to(imgRef.current, {
      x: -90 * dir,
      scale: 0.96,
      opacity: 0,
      duration: 0.38,
      ease: 'power2.in',
    })
    tl.to(
      [metaRef.current, specRef.current],
      {
        y: -20 * dir,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.in',
      },
      '-=0.3'
    )

    tl.call(() => setActive(bounded))

    // Enter animation
    tl.fromTo(
      imgRef.current,
      { x: 90 * dir, scale: 1.04, opacity: 0 },
      { x: 0, scale: 1, opacity: 1, duration: 0.55, ease: 'power3.out' }
    )
    tl.fromTo(
      [metaRef.current, specRef.current],
      { y: 25 * dir, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
      '-=0.4'
    )
  }, [active, animating])

  const next = () => goTo(active + 1, 1)
  const prev = () => goTo(active - 1, -1)

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // Swipe & Touch
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX
    const deltaY = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      deltaX > 0 ? next() : prev()
    }
  }

  // Mouse Drag
  const onMouseDown = (e) => {
    isDragging.current = true
    touchStartX.current = e.clientX
  }
  const onMouseUp = (e) => {
    if (!isDragging.current) return
    isDragging.current = false
    const deltaX = touchStartX.current - e.clientX
    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? next() : prev()
    }
  }

  const currentPhoto = ALBUM[active]

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full py-28 md:py-36 overflow-hidden"
      style={{ background: '#0B0C0A' }}
    >
      {/* Editorial Header in Pacôme Pertant style */}
      <div
        ref={headerRef}
        className="px-8 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#A7A59B]">
              Specimen Archive · Section 03
            </p>
          </div>
          <h2
            className="font-serif text-[#F1EFE8] leading-tight"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', fontWeight: 300 }}
          >
            The Collection
          </h2>
        </div>

        {/* Dynamic Counter & Swipe Tip */}
        <div className="flex items-center gap-8 font-sans text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-serif text-[#F1EFE8] font-light">
              {String(active + 1).padStart(2, '0')}
            </span>
            <span className="text-[#A7A59B]">/</span>
            <span className="text-[#A7A59B]">{String(ALBUM.length).padStart(2, '0')}</span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[#A7A59B] text-[11px] tracking-wider uppercase">
            <span>[ Click or Swipe to Change ]</span>
            <span className="flex gap-1.5">
              <kbd className="px-2 py-1 bg-[#181A16] border border-[#2A2B28] rounded text-[10px]">←</kbd>
              <kbd className="px-2 py-1 bg-[#181A16] border border-[#2A2B28] rounded text-[10px]">→</kbd>
            </span>
          </div>
        </div>
      </div>

      {/* Main Full-Width Interactive Swipe Stage */}
      <div
        className="relative w-full mx-auto px-4 md:px-16 select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <div
          className="relative w-full h-[65vh] md:h-[78vh] rounded-2xl md:rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing border border-[#2A2B28]/60 shadow-2xl bg-[#090A09]"
        >
          {/* Main Photo */}
          <img
            ref={imgRef}
            src={currentPhoto.src}
            alt={currentPhoto.title}
            draggable={false}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
          />

          {/* Cinematic Vignette and Dark Gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(11,12,10,0.92) 0%, rgba(11,12,10,0.2) 50%, rgba(11,12,10,0.4) 100%)',
            }}
          />

          {/* Left / Right Click Swipe Zones */}
          <div
            onClick={prev}
            className="absolute top-0 left-0 w-1/2 h-full z-20 cursor-w-resize flex items-center pl-6 opacity-0 hover:opacity-100 transition-opacity duration-300"
            title="Previous (Click or Swipe)"
          >
            <div className="w-12 h-12 rounded-full bg-[#0B0C0A]/80 border border-[#2A2B28] flex items-center justify-center text-[#F1EFE8] backdrop-blur-md">
              ←
            </div>
          </div>

          <div
            onClick={next}
            className="absolute top-0 right-0 w-1/2 h-full z-20 cursor-e-resize flex items-center justify-end pr-6 opacity-0 hover:opacity-100 transition-opacity duration-300"
            title="Next (Click or Swipe)"
          >
            <div className="w-12 h-12 rounded-full bg-[#0B0C0A]/80 border border-[#2A2B28] flex items-center justify-center text-[#F1EFE8] backdrop-blur-md">
              →
            </div>
          </div>

          {/* Floating Category Tag */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 z-30 pointer-events-none">
            <span className="px-3.5 py-1.5 rounded-full text-[10px] font-sans tracking-[0.25em] uppercase bg-[#0B0C0A]/70 border border-[#2A2B28] text-emerald-400 backdrop-blur-md">
              {currentPhoto.category}
            </span>
          </div>

          {/* Bottom Story & EXIF Specimen Overlay (Pacôme Pertant / Wildlife Documentary style) */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-30 pointer-events-none flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div ref={metaRef} className="max-w-2xl">
              <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#A7A59B] mb-2">
                {currentPhoto.location} · {currentPhoto.year}
              </p>
              <h3
                className="font-serif text-[#F1EFE8] mb-3 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3.2rem)', fontWeight: 300 }}
              >
                {currentPhoto.title}
              </h3>
              <p className="font-sans text-xs md:text-sm text-[#A7A59B] font-light leading-relaxed max-w-xl">
                "{currentPhoto.story}"
              </p>
            </div>

            {/* Technical EXIF Metadata Tag */}
            <div
              ref={specRef}
              className="flex items-center gap-4 bg-[#0B0C0A]/70 border border-[#2A2B28] rounded-xl px-5 py-3 backdrop-blur-md text-[11px] font-sans text-[#A7A59B]"
            >
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-[#666]">Optics</span>
                <span className="text-[#F1EFE8]">{currentPhoto.lens}</span>
              </div>
              <div className="w-[1px] h-6 bg-[#2A2B28]" />
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-[#666]">Sensitivity</span>
                <span className="text-[#F1EFE8]">{currentPhoto.iso}</span>
              </div>
              <div className="w-[1px] h-6 bg-[#2A2B28]" />
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-[#666]">Speed</span>
                <span className="text-[#F1EFE8]">{currentPhoto.shutter}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Interactive Thumbnail Reel (Click to Jump) */}
      <div className="mt-8 px-4 md:px-16 overflow-x-auto scrollbar-none flex gap-3 py-2">
        {ALBUM.map((item, index) => {
          const isCurrent = index === active
          return (
            <button
              key={item.id}
              onClick={() => goTo(index, index > active ? 1 : -1)}
              className={`flex-shrink-0 group relative w-20 md:w-28 h-14 md:h-18 rounded-lg overflow-hidden border transition-all duration-300 ${
                isCurrent
                  ? 'border-emerald-400 scale-105 shadow-lg shadow-emerald-950/40 opacity-100'
                  : 'border-[#2A2B28] opacity-40 hover:opacity-80 hover:border-[#444]'
              }`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-1 left-1.5 text-[9px] font-sans font-mono text-[#F1EFE8]">
                {String(index + 1).padStart(2, '0')}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
