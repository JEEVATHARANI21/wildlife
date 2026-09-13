import { useState } from 'react'
import { GALLERY_IMAGES } from '../../data/galleryData'

export default function FullGalleryView({ onBackToHome, onPlanTrip }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activePhoto, setActivePhoto] = useState(null)

  // State for Idea 2: 35mm Filmstrip Parallax (Card 2)
  const [filmstripParallax, setFilmstripParallax] = useState({ x: 0, y: 0 })

  // State for Idea 3: Magnetic Field Loupe (Card 3)
  const [loupeState, setLoupeState] = useState({
    active: false,
    x: 0,
    y: 0,
    bgX: 50,
    bgY: 50,
  })

  // State for Idea 4: Spatial 3D Exhibition Card (Card 4)
  const [spatialTilt, setSpatialTilt] = useState({ x: 0, y: 0, hovered: false })

  // State for Classy Idea 3: Split-Screen Telemetry (Card 7)
  const [card7Tab, setCard7Tab] = useState('optical')

  const categories = ['All', 'Big Cats', 'Avian', 'Mammals', 'Macro & Nocturne']

  const filteredPhotos = GALLERY_IMAGES.filter((photo) => {
    if (activeCategory === 'All') return true
    return photo.category === activeCategory
  })

  // Mouse handlers for Card 2 (Filmstrip Parallax)
  const handleFilmstripMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setFilmstripParallax({ x: x * 14, y: y * 14 })
  }

  const handleFilmstripLeave = () => {
    setFilmstripParallax({ x: 0, y: 0 })
  }

  // Mouse handlers for Card 3 (Loupe Magnifier)
  const handleLoupeMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const bgX = (x / rect.width) * 100
    const bgY = (y / rect.height) * 100
    setLoupeState({
      active: true,
      x,
      y,
      bgX,
      bgY,
    })
  }

  const handleLoupeLeave = () => {
    setLoupeState((prev) => ({ ...prev, active: false }))
  }

  // Mouse handlers for Card 4 (Spatial 3D Exhibition)
  const handleSpatialMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16
    setSpatialTilt({ x, y, hovered: true })
  }

  const handleSpatialLeave = () => {
    setSpatialTilt({ x: 0, y: 0, hovered: false })
  }

  return (
    <div className="min-h-screen bg-[#080908] text-[#F2F0E8] pt-24 pb-28">
      {/* Custom Keyframe animation style for Card 8 (Liquid Gold Perimeter Beam) */}
      <style>{`
        @keyframes liquidBorderSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .liquid-border-beam {
          animation: liquidBorderSpin 4s linear infinite;
        }
      `}</style>

      {/* Top Breadcrumb / Back Bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 mb-8 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-[#A7A59B] hover:text-[#D6A85C] transition-colors cursor-pointer py-2"
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>

        <span className="text-[11px] font-sans text-[#D6A85C] uppercase tracking-widest font-semibold">
          {filteredPhotos.length} Master Photographs
        </span>
      </div>

      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-[1.5px] bg-[#B87333]" />
          <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
            VM WILD EXPEDITIONS ARCHIVE
          </span>
          <span className="w-8 h-[1.5px] bg-[#B87333]" />
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#F2F0E8] font-light leading-tight mb-4">
          The Photographic <span className="italic text-[#D6A85C] font-normal">Archive</span>
        </h1>
        <p className="font-sans text-xs sm:text-sm md:text-base text-[#A7A59B] font-light leading-relaxed max-w-2xl mx-auto">
          Every frame represents countless hours of vehicle tracking, anticipation, and field ethics under natural light.
          Test the interactive animations on cards 1 through 8 below!
        </p>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] font-bold shadow-[0_4px_16px_rgba(214,168,92,0.35)]'
                  : 'bg-[#151815] text-[#A7A59B] hover:text-[#F2F0E8] border border-[#242923] hover:border-[#D6A85C]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Navigator Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-[#0f120f] border border-[#D6A85C]/30 text-left sm:text-center space-y-2">
          <div className="text-[#D6A85C] font-bold uppercase tracking-wider text-[11px] flex items-center justify-center gap-2">
            <span>✦</span>
            <span>Interactive Animation Showcase (Cards 1 to 8)</span>
            <span>✦</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[10.5px] text-[#A7A59B] pt-1 border-t border-[#242923]">
            <div><strong className="text-[#F2F0E8]">1:</strong> Aperture Iris AF</div>
            <div><strong className="text-[#F2F0E8]">2:</strong> 35mm Film Parallax</div>
            <div><strong className="text-[#F2F0E8]">3:</strong> 3.2x Field Loupe</div>
            <div><strong className="text-[#F2F0E8]">4:</strong> Spatial 3D Tilt</div>
            <div><strong className="text-[#D6A85C]">5:</strong> Classy Fluid Curtain</div>
            <div><strong className="text-[#D6A85C]">6:</strong> Classy Museum Matte</div>
            <div><strong className="text-[#D6A85C]">7:</strong> Classy Split Horizon</div>
            <div><strong className="text-[#D6A85C]">8:</strong> Classy Prism Beam</div>
          </div>
        </div>
      </div>

      {/* Full Photo Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredPhotos.map((photo, index) => {
            // ==========================================================
            // 1st IMAGE: IDEA 1 -> APERTURE IRIS & OPTICAL VIEWFINDER
            // ==========================================================
            if (index === 0) {
              return (
                <div
                  key={photo.id}
                  onClick={() => setActivePhoto(photo)}
                  className="group relative rounded-2xl overflow-hidden bg-[#151815] border-2 border-[#D6A85C]/80 hover:border-[#D6A85C] transition-all duration-500 shadow-2xl cursor-pointer flex flex-col justify-between hover:shadow-[0_15px_40px_rgba(214,168,92,0.25)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#080908]">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover filter blur-[1.5px] group-hover:blur-0 transition-all duration-700 group-hover:scale-108 brightness-[0.88] group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2.5 py-1 rounded-full bg-[#080908]/90 text-[#D6A85C] text-[8.5px] font-sans tracking-widest uppercase font-bold border border-[#D6A85C]/60 shadow-lg flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85C] animate-ping" />
                        <span>Card 1: Aperture Iris & AF</span>
                      </span>
                    </div>

                    <div className="absolute inset-4 pointer-events-none z-10 transition-opacity duration-500 opacity-60 group-hover:opacity-100">
                      <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D6A85C]" />
                      <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D6A85C]" />
                      <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D6A85C]" />
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D6A85C]" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border border-dashed border-[#D6A85C]/60 group-hover:border-[#D6A85C] group-hover:scale-125 group-hover:rotate-45 transition-all duration-700 flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-[#D6A85C]/70 group-hover:bg-[#D6A85C] transition-colors" />
                        </div>
                      </div>

                      <div className="absolute bottom-1 right-1 flex items-center gap-2 bg-[#080908]/80 px-2 py-0.5 rounded text-[8.5px] font-mono text-[#D6A85C]">
                        <span>AF-C [ON]</span>
                        <span>•</span>
                        <span>f/2.8 WIDE</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[10px] font-sans tracking-wider uppercase text-[#D6A85C] block mb-0.5">
                        {photo.location}
                      </span>
                      <h3 className="font-serif text-xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-snug">
                        {photo.title}
                      </h3>
                      <p className="font-sans text-xs text-[#A7A59B] italic mt-0.5">{photo.species}</p>
                      <p className="font-sans text-[11px] text-[#A7A59B] font-light leading-relaxed mt-2 line-clamp-2">
                        {photo.caption}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#242923] flex items-center justify-between text-[10px] font-mono text-[#A7A59B]">
                      <span className="text-[#D6A85C]">📷 {photo.gear}</span>
                      <span className="text-[#D6A85C] group-hover:translate-x-1 transition-transform font-bold">
                        Shutter View ↗
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            // ==========================================================
            // 2nd IMAGE: IDEA 2 -> 35MM FILMSTRIP & PARALLAX DEPTH
            // ==========================================================
            if (index === 1) {
              return (
                <div
                  key={photo.id}
                  onClick={() => setActivePhoto(photo)}
                  onMouseMove={handleFilmstripMove}
                  onMouseLeave={handleFilmstripLeave}
                  className="group relative rounded-2xl overflow-hidden bg-[#101310] border-2 border-[#B87333]/70 hover:border-[#D6A85C] transition-all duration-400 shadow-2xl cursor-pointer flex flex-col justify-between hover:shadow-[0_15px_40px_rgba(184,115,51,0.25)]"
                >
                  <div className="h-4 bg-[#080908] border-b border-[#242923] flex items-center justify-between px-3 text-[7.5px] font-mono text-[#A7A59B]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-2 rounded-[1px] bg-[#242923]" />
                      <span className="w-1.5 h-2 rounded-[1px] bg-[#242923]" />
                      <span className="w-1.5 h-2 rounded-[1px] bg-[#242923]" />
                      <span className="text-[#D6A85C] uppercase tracking-widest font-bold">
                        KODAK VISION3 500T
                      </span>
                    </div>
                    <span>EXP #02</span>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-2 rounded-[1px] bg-[#242923]" />
                      <span className="w-1.5 h-2 rounded-[1px] bg-[#242923]" />
                    </div>
                  </div>

                  <div className="relative aspect-[4/3] overflow-hidden bg-[#050605]">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-200 ease-out brightness-[0.92] group-hover:brightness-100"
                      style={{
                        transform: `scale(1.1) translate3d(${filmstripParallax.x}px, ${filmstripParallax.y}px, 0)`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101310] via-transparent to-[#080908]/60 pointer-events-none" />

                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2.5 py-1 rounded-full bg-[#080908]/90 text-[#D6A85C] text-[8.5px] font-sans tracking-widest uppercase font-bold border border-[#B87333]/60 shadow-lg flex items-center gap-1.5">
                        <span>🎞️</span>
                        <span>Card 2: 35mm Film Parallax</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-3">
                      <span className="text-[8.5px] font-mono text-[#D6A85C] bg-[#080908]/80 px-2 py-0.5 rounded border border-[#242923]">
                        Cursor Multi-Plane Shift
                      </span>
                    </div>
                  </div>

                  <div className="h-4 bg-[#080908] border-t border-b border-[#242923] flex items-center justify-between px-3 text-[7px] font-mono text-[#A7A59B]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-2 rounded-[1px] bg-[#242923]" />
                      <span className="w-1.5 h-2 rounded-[1px] bg-[#242923]" />
                    </div>
                    <span>VM ARCHIVE 2026</span>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-2 rounded-[1px] bg-[#242923]" />
                      <span className="w-1.5 h-2 rounded-[1px] bg-[#242923]" />
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[10px] font-sans tracking-wider uppercase text-[#D6A85C] block mb-0.5">
                        {photo.location}
                      </span>
                      <h3 className="font-serif text-xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-snug">
                        {photo.title}
                      </h3>
                      <p className="font-sans text-xs text-[#A7A59B] italic mt-0.5">{photo.species}</p>
                      <p className="font-sans text-[11px] text-[#A7A59B] font-light leading-relaxed mt-2 line-clamp-2">
                        {photo.caption}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#242923] flex items-center justify-between text-[10px] font-mono text-[#A7A59B]">
                      <span>🎞️ {photo.gear}</span>
                      <span className="text-[#D6A85C] group-hover:translate-x-1 transition-transform font-bold">
                        Inspect Negative ↗
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            // ==========================================================
            // 3rd IMAGE: IDEA 3 -> MAGNETIC FIELD LOUPE & ULTRA-ZOOM
            // ==========================================================
            if (index === 2) {
              return (
                <div
                  key={photo.id}
                  onClick={() => setActivePhoto(photo)}
                  onMouseMove={handleLoupeMove}
                  onMouseLeave={handleLoupeLeave}
                  className="group relative rounded-2xl overflow-hidden bg-[#151815] border-2 border-[#D6A85C]/70 hover:border-[#D6A85C] transition-all duration-400 shadow-2xl cursor-crosshair flex flex-col justify-between hover:shadow-[0_15px_40px_rgba(214,168,92,0.25)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#080908]">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 brightness-[0.92] group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 z-20 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-[#080908]/90 text-[#D6A85C] text-[8.5px] font-sans tracking-widest uppercase font-bold border border-[#D6A85C]/60 shadow-lg flex items-center gap-1.5">
                        <span>🔍</span>
                        <span>Card 3: Optical Loupe Magnifier</span>
                      </span>
                    </div>

                    {loupeState.active && (
                      <div
                        className="absolute w-28 h-28 rounded-full border-2 border-[#D6A85C] pointer-events-none shadow-[0_0_25px_rgba(0,0,0,0.9),0_0_15px_rgba(214,168,92,0.4)] overflow-hidden z-30 transition-opacity duration-150 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${loupeState.x}px`,
                          top: `${loupeState.y}px`,
                          backgroundImage: `url(${photo.src})`,
                          backgroundSize: '350%',
                          backgroundPosition: `${loupeState.bgX}% ${loupeState.bgY}%`,
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="w-full h-[0.5px] bg-[#D6A85C]/50" />
                          <span className="h-full w-[0.5px] bg-[#D6A85C]/50 absolute" />
                          <span className="w-3 h-3 rounded-full border border-[#D6A85C] absolute" />
                        </div>
                        <div className="absolute bottom-1 inset-x-0 text-center">
                          <span className="px-1.5 py-0.5 rounded bg-[#080908]/90 text-[#D6A85C] text-[7.5px] font-mono font-bold">
                            3.2x LOUPE
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-2 left-3 pointer-events-none">
                      <span className="text-[8.5px] font-mono text-[#D6A85C] bg-[#080908]/80 px-2 py-0.5 rounded border border-[#242923]">
                        Hover image for 3.2x Loupe
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[10px] font-sans tracking-wider uppercase text-[#D6A85C] block mb-0.5">
                        {photo.location}
                      </span>
                      <h3 className="font-serif text-xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-snug">
                        {photo.title}
                      </h3>
                      <p className="font-sans text-xs text-[#A7A59B] italic mt-0.5">{photo.species}</p>
                      <p className="font-sans text-[11px] text-[#A7A59B] font-light leading-relaxed mt-2 line-clamp-2">
                        {photo.caption}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#242923] flex items-center justify-between text-[10px] font-mono text-[#A7A59B]">
                      <span>🔬 {photo.gear}</span>
                      <span className="text-[#D6A85C] group-hover:translate-x-1 transition-transform font-bold">
                        Full Resolution ↗
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            // ==========================================================
            // 4th IMAGE: IDEA 4 -> SPATIAL 3D EXHIBITION WALL
            // ==========================================================
            if (index === 3) {
              return (
                <div
                  key={photo.id}
                  onClick={() => setActivePhoto(photo)}
                  onMouseMove={handleSpatialMove}
                  onMouseLeave={handleSpatialLeave}
                  className="group relative rounded-2xl overflow-hidden bg-[#151815] border-2 border-[#D6A85C]/70 hover:border-[#D6A85C] transition-all duration-300 shadow-2xl cursor-pointer flex flex-col justify-between"
                  style={{
                    perspective: '1000px',
                    transform: spatialTilt.hovered
                      ? `perspective(1000px) rotateX(${spatialTilt.y}deg) rotateY(${spatialTilt.x}deg) translateZ(25px) translateY(-6px)`
                      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0) translateY(0)',
                    boxShadow: spatialTilt.hovered
                      ? '0 25px 50px -10px rgba(214, 168, 92, 0.35)'
                      : '0 10px 25px -5px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#080908]">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 brightness-[0.92] group-hover:brightness-100"
                    />

                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 45%, transparent 100%)',
                        opacity: spatialTilt.hovered ? 1 : 0,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2.5 py-1 rounded-full bg-[#080908]/90 text-[#D6A85C] text-[8.5px] font-sans tracking-widest uppercase font-bold border border-[#D6A85C]/60 shadow-lg flex items-center gap-1.5">
                        <span>🏛️</span>
                        <span>Card 4: Spatial 3D Wall</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-3">
                      <span className="text-[8.5px] font-mono text-[#D6A85C] bg-[#080908]/80 px-2 py-0.5 rounded border border-[#242923]">
                        Spatial Gyro Lift & Sheen
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[10px] font-sans tracking-wider uppercase text-[#D6A85C] block mb-0.5">
                        {photo.location}
                      </span>
                      <h3 className="font-serif text-xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-snug">
                        {photo.title}
                      </h3>
                      <p className="font-sans text-xs text-[#A7A59B] italic mt-0.5">{photo.species}</p>
                      <p className="font-sans text-[11px] text-[#A7A59B] font-light leading-relaxed mt-2 line-clamp-2">
                        {photo.caption}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#242923] flex items-center justify-between text-[10px] font-mono text-[#A7A59B]">
                      <span>🏛️ {photo.gear}</span>
                      <span className="text-[#D6A85C] group-hover:translate-x-1 transition-transform font-bold">
                        Exhibit View ↗
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            // ==========================================================
            // 5th IMAGE: CLASSY IDEA 1 -> EDITORIAL FLUID CURTAIN & KEN BURNS
            // ==========================================================
            if (index === 4) {
              return (
                <div
                  key={photo.id}
                  onClick={() => setActivePhoto(photo)}
                  className="group relative rounded-2xl overflow-hidden bg-[#121612] border border-[#2e372e] hover:border-[#D6A85C] transition-all duration-700 shadow-2xl cursor-pointer flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.95)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#060806]">
                    {/* Slow, Silky Ken Burns Drift */}
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover brightness-[0.90] group-hover:brightness-105 transition-all duration-[3000ms] ease-out group-hover:scale-115 group-hover:translate-x-[-1.5%] group-hover:translate-y-[-1.5%]"
                    />

                    {/* Fluid Editorial Curtain Shading (Softly rolls back on hover) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121612] via-[#080a08]/40 to-transparent transition-opacity duration-700 group-hover:opacity-75" />

                    {/* Monolithic Editorial Badge */}
                    <div className="absolute top-3.5 left-3.5 z-20">
                      <span className="px-3 py-1 rounded-full bg-[#080a08]/90 text-[#D6A85C] text-[8.5px] font-sans tracking-[0.25em] uppercase font-bold border border-[#D6A85C]/50 shadow-md backdrop-blur-md flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85C]" />
                        <span>Card 5: Editorial Fluid Curtain</span>
                      </span>
                    </div>

                    {/* Vertical Monograph Ribbon (slides out smoothly) */}
                    <div className="absolute top-3.5 right-3.5 z-20">
                      <span className="text-[8px] font-mono tracking-widest text-[#A7A59B] uppercase bg-[#080a08]/85 px-2 py-0.5 rounded border border-[#242923]">
                        EDITION N° 05
                      </span>
                    </div>

                    {/* GPS Coordinates Tag */}
                    <div className="absolute bottom-3 left-4 transition-transform duration-500 group-hover:translate-y-[-2px]">
                      <span className="text-[9px] font-mono tracking-wider text-[#D6A85C]/90 bg-[#080a08]/90 px-2.5 py-1 rounded-md border border-[#242923]">
                        20°58'N 79°18'E · TADOBA
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-4 h-[1px] bg-[#D6A85C]" />
                        <span className="text-[9.5px] font-sans tracking-[0.25em] uppercase text-[#D6A85C] font-semibold">
                          FINE ART MONOGRAPH
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors duration-500 leading-tight">
                        {photo.title}
                      </h3>
                      <p className="font-sans text-xs text-[#A7A59B] italic mt-1 font-light">
                        {photo.species}
                      </p>
                      <p className="font-serif text-xs text-[#C8C5B9] font-light leading-relaxed mt-2.5 italic">
                        "{photo.caption}"
                      </p>
                    </div>

                    <div className="pt-3.5 border-t border-[#242923] flex items-center justify-between text-[10.5px] font-mono text-[#A7A59B]">
                      <span>✦ {photo.gear}</span>
                      <span className="text-[#D6A85C] font-sans text-xs uppercase tracking-wider font-semibold group-hover:translate-x-1 transition-transform">
                        Read Story →
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            // ==========================================================
            // 6th IMAGE: CLASSY IDEA 2 -> ARCHIVAL MATTE & MUSEUM FLOAT
            // ==========================================================
            if (index === 5) {
              return (
                <div
                  key={photo.id}
                  onClick={() => setActivePhoto(photo)}
                  className="group relative rounded-2xl overflow-hidden bg-[#0d100d] border border-[#252c25] hover:border-[#D6A85C]/80 p-4 sm:p-5 transition-all duration-500 shadow-2xl cursor-pointer flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_25px_rgba(214,168,92,0.12)]"
                >
                  {/* Museum Double-Matting Frame Inner Container */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#040504] border border-[#1e241e] shadow-inner">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104 brightness-[0.93] group-hover:brightness-100"
                    />

                    {/* Diagonal Warm Gallery Light Ray Sweep on Hover */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                      style={{
                        background:
                          'linear-gradient(115deg, transparent 20%, rgba(214, 168, 92, 0.15) 45%, transparent 70%)',
                      }}
                    />

                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2.5 py-1 rounded-full bg-[#080a08]/90 text-[#D6A85C] text-[8.5px] font-sans tracking-widest uppercase font-bold border border-[#D6A85C]/50 shadow-lg">
                        Card 6: Museum Archival Matte
                      </span>
                    </div>
                  </div>

                  {/* Museum Archival Blind-Embossed Plaque */}
                  <div className="pt-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-[9px] font-mono text-[#A7A59B] uppercase tracking-widest pb-1 border-b border-[#1c221c]">
                        <span>PROVENANCE: AGUMBE RAINFOREST</span>
                        <span className="text-[#D6A85C] font-bold">PROOF N° 06 / 25</span>
                      </div>

                      <h3 className="font-serif text-xl text-[#F2F0E8] mt-2 group-hover:text-[#D6A85C] transition-colors leading-snug">
                        {photo.title}
                      </h3>
                      <p className="font-sans text-xs text-[#A7A59B] italic mt-0.5">
                        {photo.species}
                      </p>
                      <p className="font-sans text-[11px] text-[#A7A59B] font-light leading-relaxed mt-2 line-clamp-2">
                        {photo.caption}
                      </p>
                    </div>

                    {/* Blind Embossed Signature Seal */}
                    <div className="pt-3 border-t border-[#1c221c] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full border border-[#D6A85C]/60 flex items-center justify-center text-[9px] text-[#D6A85C] font-serif font-bold">
                          VM
                        </span>
                        <span className="text-[9px] font-sans tracking-wider uppercase text-[#A7A59B]">
                          Certified Archival Pigment Print
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#D6A85C]">
                        {photo.gear}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            // ==========================================================
            // 7th IMAGE: CLASSY IDEA 3 -> SPLIT-SCREEN TELEMETRY
            // ==========================================================
            if (index === 6) {
              return (
                <div
                  key={photo.id}
                  onClick={() => setActivePhoto(photo)}
                  className="group relative rounded-2xl overflow-hidden bg-[#131713] border border-[#273027] hover:border-[#D6A85C] transition-all duration-500 shadow-2xl cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.9)]"
                >
                  {/* Photo area */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#070907]">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 brightness-[0.92] group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131713] via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2.5 py-1 rounded-full bg-[#080a08]/90 text-[#D6A85C] text-[8.5px] font-sans tracking-widest uppercase font-bold border border-[#D6A85C]/50 shadow-lg">
                        Card 7: Split-Screen Telemetry
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-3 z-20">
                      <span className="px-2 py-0.5 rounded bg-[#080a08]/85 text-[#D6A85C] text-[9px] font-mono border border-[#242923]">
                        EXPEDITION LOG #07
                      </span>
                    </div>
                  </div>

                  {/* Interactive Split Telemetry Switcher Tabs */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Telemetry Tabs */}
                      <div className="flex items-center gap-1 mb-2.5 bg-[#0a0d0a] p-1 rounded-xl border border-[#202720]">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setCard7Tab('visual')
                          }}
                          className={`flex-1 py-1 rounded-lg text-[9px] font-sans uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                            card7Tab === 'visual'
                              ? 'bg-[#D6A85C] text-[#080908]'
                              : 'text-[#A7A59B] hover:text-[#F2F0E8]'
                          }`}
                        >
                          Overview
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setCard7Tab('optical')
                          }}
                          className={`flex-1 py-1 rounded-lg text-[9px] font-sans uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                            card7Tab === 'optical'
                              ? 'bg-[#D6A85C] text-[#080908]'
                              : 'text-[#A7A59B] hover:text-[#F2F0E8]'
                          }`}
                        >
                          Optics
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setCard7Tab('field')
                          }}
                          className={`flex-1 py-1 rounded-lg text-[9px] font-sans uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                            card7Tab === 'field'
                              ? 'bg-[#D6A85C] text-[#080908]'
                              : 'text-[#A7A59B] hover:text-[#F2F0E8]'
                          }`}
                        >
                          Field Notes
                        </button>
                      </div>

                      <h3 className="font-serif text-xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-snug">
                        {photo.title}
                      </h3>
                      <p className="font-sans text-xs text-[#A7A59B] italic mt-0.5">{photo.species}</p>

                      {/* Dynamic Content based on selected Telemetry Tab */}
                      <div className="mt-2.5 min-h-[48px] text-xs">
                        {card7Tab === 'visual' && (
                          <p className="font-sans text-[11px] text-[#A7A59B] font-light leading-relaxed">
                            Captured at {photo.location} during midnight precipitation scan.
                          </p>
                        )}
                        {card7Tab === 'optical' && (
                          <div className="p-2 rounded-lg bg-[#0a0d0a] border border-[#202720] font-mono text-[10.5px] text-[#D6A85C] flex items-center justify-between">
                            <span>OPTICAL: {photo.gear}</span>
                            <span>RAW 14-BIT</span>
                          </div>
                        )}
                        {card7Tab === 'field' && (
                          <p className="font-serif text-xs text-[#C8C5B9] italic leading-relaxed">
                            "{photo.caption}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#242923] flex items-center justify-between text-[10px] font-mono text-[#A7A59B]">
                      <span>KUDREMUKH EXPEDITION</span>
                      <span className="text-[#D6A85C] font-sans text-xs font-semibold group-hover:translate-x-1 transition-transform">
                        Examine ↗
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            // ==========================================================
            // 8th IMAGE: CLASSY IDEA 4 -> PRISM HAIRLINE & LIQUID GOLD
            // ==========================================================
            if (index === 7) {
              return (
                <div
                  key={photo.id}
                  onClick={() => setActivePhoto(photo)}
                  className="group relative rounded-2xl overflow-hidden bg-[#121512] transition-all duration-500 shadow-2xl cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(214,168,92,0.25)] p-[1.5px]"
                >
                  {/* Liquid Gold Traveling Perimeter Beam (Animated gradient behind the card) */}
                  <div className="absolute inset-[-100%] liquid-border-beam bg-[conic-gradient(from_0deg,#242923_0%,#242923_70%,#D6A85C_85%,#FFF_92%,#D6A85C_96%,#242923_100%)] opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Inner Content Card (blocks out the center of the beam, leaving fine 1.5px prism border) */}
                  <div className="relative w-full h-full rounded-[14px] bg-[#121512] overflow-hidden flex flex-col justify-between z-10">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#080908]">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 brightness-[0.92] group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121512] via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-3 left-3 z-20">
                        <span className="px-2.5 py-1 rounded-full bg-[#080a08]/90 text-[#D6A85C] text-[8.5px] font-sans tracking-widest uppercase font-bold border border-[#D6A85C]/60 shadow-lg flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85C] animate-pulse" />
                          <span>Card 8: Prism Liquid Gold</span>
                        </span>
                      </div>

                      <div className="absolute bottom-2 right-3">
                        <span className="text-[8.5px] font-mono text-[#D6A85C] bg-[#080908]/85 px-2 py-0.5 rounded border border-[#242923]">
                          Active Laser Perimeter
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <span className="text-[10px] font-sans tracking-wider uppercase text-[#D6A85C] block mb-0.5">
                          {photo.location}
                        </span>
                        <h3 className="font-serif text-xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-snug">
                          {photo.title}
                        </h3>
                        <p className="font-sans text-xs text-[#A7A59B] italic mt-0.5">{photo.species}</p>
                        <p className="font-sans text-[11px] text-[#A7A59B] font-light leading-relaxed mt-2 line-clamp-2">
                          {photo.caption}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#242923] flex items-center justify-between text-[10px] font-mono text-[#A7A59B]">
                        <span>📷 {photo.gear}</span>
                        <span className="text-[#D6A85C] group-hover:translate-x-1 transition-transform font-bold">
                          Inspect Prism ↗
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            // ==========================================================
            // REMAINING IMAGES (Cards 9+): Clean Standard Design
            // ==========================================================
            return (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="group relative rounded-2xl overflow-hidden bg-[#151815] border border-[#242923] hover:border-[#D6A85C] transition-all duration-400 shadow-xl cursor-pointer flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#080908]">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 brightness-[0.92] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#080908]/85 text-[#D6A85C] text-[9px] font-sans tracking-wider uppercase font-semibold border border-[#242923]">
                      {photo.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] font-sans tracking-wider uppercase text-[#D6A85C] block mb-0.5">
                      {photo.location}
                    </span>
                    <h3 className="font-serif text-xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-snug">
                      {photo.title}
                    </h3>
                    <p className="font-sans text-xs text-[#A7A59B] italic mt-0.5">{photo.species}</p>
                    <p className="font-sans text-[11px] text-[#A7A59B] font-light leading-relaxed mt-2 line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#242923] flex items-center justify-between text-[10px] font-mono text-[#A7A59B]">
                    <span>📷 {photo.gear}</span>
                    <span className="text-[#D6A85C] group-hover:translate-x-0.5 transition-transform">
                      Expand ↗
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#080908]/95 backdrop-blur-2xl animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col lg:flex-row rounded-3xl bg-[#151815] border border-[#242923] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-[#080908]/85 border border-[#242923] text-[#F2F0E8] hover:text-[#D6A85C] flex items-center justify-center text-lg cursor-pointer"
            >
              ✕
            </button>

            {/* Photo Container */}
            <div className="lg:w-3/5 bg-[#080908] flex items-center justify-center overflow-hidden min-h-[300px] lg:min-h-[500px]">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="w-full h-full object-contain max-h-[75vh]"
              />
            </div>

            {/* Sidebar Details */}
            <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#242923] text-[#D6A85C] text-[9.5px] font-sans tracking-widest uppercase font-semibold">
                    {activePhoto.location}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] mt-2 leading-tight">
                    {activePhoto.title}
                  </h2>
                  <p className="font-sans text-xs text-[#A7A59B] italic mt-1">
                    {activePhoto.species}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#080908]/80 border border-[#242923] space-y-2 text-xs">
                  <div className="text-[10px] uppercase tracking-wider text-[#D6A85C] font-semibold">
                    Technical Specifications:
                  </div>
                  <div className="font-mono text-[#F2F0E8]/90 text-[11px]">
                    {activePhoto.gear}
                  </div>
                </div>

                <div className="space-y-1 text-xs sm:text-sm text-[#A7A59B] font-light leading-relaxed">
                  <span className="text-[#F2F0E8] font-medium block">Field Notes:</span>
                  <p>{activePhoto.caption}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#242923] space-y-3">
                <button
                  onClick={() => {
                    setActivePhoto(null)
                    onPlanTrip && onPlanTrip()
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] font-sans text-xs uppercase tracking-wider font-bold text-center cursor-pointer hover:brightness-110 transition-all"
                >
                  Plan Expedition to Photograph This Subject →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Banner */}
      <div className="max-w-4xl mx-auto px-5 mt-20 text-center p-8 sm:p-12 rounded-3xl bg-[#151815] border border-[#242923]">
        <h3 className="font-serif text-2xl sm:text-4xl text-[#F2F0E8] mb-3">
          Ready to make your own portfolio in the wild?
        </h3>
        <p className="text-xs sm:text-sm text-[#A7A59B] max-w-xl mx-auto mb-6">
          Join Expedition Leader Vijay Mathiew on our upcoming small-group safaris with 1-on-1 field coaching.
        </p>
        <button
          onClick={onPlanTrip}
          className="py-3 px-8 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] text-xs font-sans uppercase tracking-wider font-bold hover:shadow-[0_4px_22px_rgba(214,168,92,0.45)] transition-all cursor-pointer"
        >
          Plan Your Safari With Vijay →
        </button>
      </div>
    </div>
  )
}
