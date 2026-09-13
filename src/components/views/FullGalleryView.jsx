import { useState, useRef } from 'react'
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
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16 // -8 to +8 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16
    setSpatialTilt({ x, y, hovered: true })
  }

  const handleSpatialLeave = () => {
    setSpatialTilt({ x: 0, y: 0, hovered: false })
  }

  return (
    <div className="min-h-screen bg-[#080908] text-[#F2F0E8] pt-24 pb-28">
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
          Test the interactive animations on cards 1 to 4 below!
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

        {/* Live Animation Test Guide Banner */}
        <div className="mt-8 p-3.5 rounded-2xl bg-[#111411] border border-[#D6A85C]/30 inline-flex flex-wrap items-center justify-center gap-4 text-xs">
          <span className="text-[#D6A85C] font-bold uppercase tracking-wider text-[10px]">
            ⚡ Live Animation Laboratory:
          </span>
          <span className="text-[#F2F0E8]/90 text-[11px]">
            <strong className="text-[#D6A85C]">Card 1:</strong> Aperture Iris ·{' '}
            <strong className="text-[#D6A85C]">Card 2:</strong> 35mm Filmstrip ·{' '}
            <strong className="text-[#D6A85C]">Card 3:</strong> Magnetic Loupe ·{' '}
            <strong className="text-[#D6A85C]">Card 4:</strong> Spatial 3D
          </span>
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
                  {/* Photo area with Viewfinder Reticle & Iris blades */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#080908]">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover filter blur-[1.5px] group-hover:blur-0 transition-all duration-700 group-hover:scale-108 brightness-[0.88] group-hover:brightness-100"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-transparent to-transparent pointer-events-none" />

                    {/* Idea 1 Lab Badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2.5 py-1 rounded-full bg-[#080908]/90 text-[#D6A85C] text-[8.5px] font-sans tracking-widest uppercase font-bold border border-[#D6A85C]/60 shadow-lg flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85C] animate-ping" />
                        <span>Idea 1: Aperture Iris & AF</span>
                      </span>
                    </div>

                    {/* Camera Optical Viewfinder HUD Brackets */}
                    <div className="absolute inset-4 pointer-events-none z-10 transition-opacity duration-500 opacity-60 group-hover:opacity-100">
                      {/* Top-Left Corner */}
                      <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D6A85C]" />
                      {/* Top-Right Corner */}
                      <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D6A85C]" />
                      {/* Bottom-Left Corner */}
                      <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D6A85C]" />
                      {/* Bottom-Right Corner */}
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D6A85C]" />

                      {/* Center Viewfinder Reticle & Iris Ring */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border border-dashed border-[#D6A85C]/60 group-hover:border-[#D6A85C] group-hover:scale-125 group-hover:rotate-45 transition-all duration-700 flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-[#D6A85C]/70 group-hover:bg-[#D6A85C] transition-colors" />
                        </div>
                      </div>

                      {/* HUD Exposure Readout */}
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
                  {/* Top 35mm Sprocket Strip */}
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

                  {/* Parallax Photo Canvas */}
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

                    {/* Film grain vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101310] via-transparent to-[#080908]/60 pointer-events-none" />

                    {/* Idea 2 Lab Badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2.5 py-1 rounded-full bg-[#080908]/90 text-[#D6A85C] text-[8.5px] font-sans tracking-widest uppercase font-bold border border-[#B87333]/60 shadow-lg flex items-center gap-1.5">
                        <span>🎞️</span>
                        <span>Idea 2: 35mm Film Parallax</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-3">
                      <span className="text-[8.5px] font-mono text-[#D6A85C] bg-[#080908]/80 px-2 py-0.5 rounded border border-[#242923]">
                        Move Cursor for Multi-Plane Shift
                      </span>
                    </div>
                  </div>

                  {/* Bottom 35mm Sprocket Strip */}
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
                  {/* Photo area with Optical Loupe follower */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#080908]">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 brightness-[0.92] group-hover:brightness-100"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-transparent to-transparent pointer-events-none" />

                    {/* Idea 3 Lab Badge */}
                    <div className="absolute top-3 left-3 z-20 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-[#080908]/90 text-[#D6A85C] text-[8.5px] font-sans tracking-widest uppercase font-bold border border-[#D6A85C]/60 shadow-lg flex items-center gap-1.5">
                        <span>🔍</span>
                        <span>Idea 3: Optical Loupe Magnifier</span>
                      </span>
                    </div>

                    {/* Floating Magnifying Loupe Window */}
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
                        {/* Precision Loupe Reticle Crosshairs */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="w-full h-[0.5px] bg-[#D6A85C]/50" />
                          <span className="h-full w-[0.5px] bg-[#D6A85C]/50 absolute" />
                          <span className="w-3 h-3 rounded-full border border-[#D6A85C] absolute" />
                        </div>

                        {/* Loupe magnification tag */}
                        <div className="absolute bottom-1 inset-x-0 text-center">
                          <span className="px-1.5 py-0.5 rounded bg-[#080908]/90 text-[#D6A85C] text-[7.5px] font-mono font-bold">
                            3.2x LOUPE
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-2 left-3 pointer-events-none">
                      <span className="text-[8.5px] font-mono text-[#D6A85C] bg-[#080908]/80 px-2 py-0.5 rounded border border-[#242923]">
                        Hover image to reveal 3.2x Loupe
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

                    {/* Diagonal Studio Sheen Sweep on Hover */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 45%, transparent 100%)',
                        opacity: spatialTilt.hovered ? 1 : 0,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-transparent to-transparent pointer-events-none" />

                    {/* Idea 4 Lab Badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2.5 py-1 rounded-full bg-[#080908]/90 text-[#D6A85C] text-[8.5px] font-sans tracking-widest uppercase font-bold border border-[#D6A85C]/60 shadow-lg flex items-center gap-1.5">
                        <span>🏛️</span>
                        <span>Idea 4: Spatial 3D Wall</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-3">
                      <span className="text-[8.5px] font-mono text-[#D6A85C] bg-[#080908]/80 px-2 py-0.5 rounded border border-[#242923]">
                        Spatial Gyro Lift & Exhibition Sheen
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
            // REMAINING IMAGES (Cards 5+): Clean Standard Design
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
