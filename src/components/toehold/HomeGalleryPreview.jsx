import { useState } from 'react'
import { GALLERY_IMAGES } from '../../data/galleryData'

export default function HomeGalleryPreview({ onViewFullGallery, onNavigateToGallery }) {
  const handleViewGallery = onViewFullGallery || onNavigateToGallery
  // Take exactly 5 featured images for the home preview
  const previewImages = GALLERY_IMAGES.filter((img) => img.featuredOnHome).slice(0, 5)

  // State for 1st Image: 3D Card Flip (Idea 1)
  const [isFlipped, setIsFlipped] = useState(false)

  // State for 2nd Image: 3D Gyroscope / Magnetic Tilt (Idea 2)
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    glare: { opacity: 0, x: 50, y: 50 },
  })

  const handleTiltMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -10 // -10deg to +10deg
    const rotateY = ((x - centerX) / centerX) * 10  // -10deg to +10deg
    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`,
      glare: { opacity: 0.25, x: glareX, y: glareY },
    })
  }

  const handleTiltLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      glare: { opacity: 0, x: 50, y: 50 },
    })
  }

  return (
    <section id="gallery-preview" className="py-24 sm:py-28 bg-[#0a0c0a] border-b border-[#242923] select-none relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-[#B87333]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* Header with Title and 'View Full Gallery' Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="w-7 h-[1.5px] bg-[#B87333]" />
              <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
                CURATED IN-FIELD PORTFOLIO
              </span>
              <span className="w-7 h-[1.5px] bg-[#B87333]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight">
              Wilderness <span className="italic text-[#D6A85C] font-normal">Moments</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] font-light leading-relaxed mt-2 max-w-xl">
              Hover, tilt, and flip our frames to inspect field techniques, camera optics, and raw encounters documented across Indian sanctuaries.
            </p>
          </div>

          <button
            onClick={handleViewGallery}
            className="self-start sm:self-end px-5 py-3 rounded-full bg-[#151815] border border-[#242923] hover:border-[#D6A85C] hover:bg-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer group"
          >
            <span>VIEW FULL GALLERY</span>
            <span className="group-hover:translate-x-1 transition-transform font-bold">→</span>
          </button>
        </div>

        {/* 5-Image Curated Layout: 1 Hero landscape + 4 grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* ============================================================ */}
          {/* 1st IMAGE: IDEA 1 -> 3D DUAL-SIDED FLIP CARD (Y-Axis 180°) */}
          {/* ============================================================ */}
          {previewImages[0] && (
            <div
              className="md:col-span-7 group relative aspect-[16/10] sm:aspect-[16/11] rounded-3xl cursor-pointer"
              style={{ perspective: '1200px' }}
              onMouseEnter={() => setIsFlipped(true)}
              onMouseLeave={() => setIsFlipped(false)}
              onClick={() => setIsFlipped((prev) => !prev)}
            >
              {/* Flipping Inner Container */}
              <div
                className="relative w-full h-full rounded-3xl transition-transform duration-700 ease-out shadow-2xl"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* --- FRONT FACE --- */}
                <div
                  className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-[#151815] border border-[#242923] group-hover:border-[#D6A85C]/70 transition-colors duration-500"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <img
                    src={previewImages[0].src}
                    alt={previewImages[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.92] group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080908]/90 via-[#080908]/30 to-transparent" />

                  {/* Interactive Flip Badge on Top Right */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 rounded-full bg-[#080908]/90 backdrop-blur-md text-[#D6A85C] border border-[#D6A85C]/50 text-[9px] font-sans tracking-wider uppercase font-bold shadow-lg flex items-center gap-1.5 animate-pulse">
                      <span>↻</span>
                      <span>Hover to Flip EXIF</span>
                    </span>
                  </div>

                  {/* Bottom Metadata */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#080908]/85 text-[#D6A85C] border border-[#242923] text-[9.5px] font-sans tracking-wider uppercase font-semibold mb-2 inline-block">
                        {previewImages[0].location}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-tight">
                        {previewImages[0].title}
                      </h3>
                      <p className="font-sans text-xs text-[#A7A59B] mt-1 italic">
                        {previewImages[0].species}
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex text-[11px] font-mono text-[#D6A85C]/80 bg-[#151815]/90 px-3 py-1 rounded-lg border border-[#242923]">
                      {previewImages[0].gear}
                    </span>
                  </div>
                </div>

                {/* --- BACK FACE (Darkroom EXIF & Behind-The-Scenes Field Story) --- */}
                <div
                  className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#181c18] via-[#0d100d] to-[#080908] border-2 border-[#D6A85C] p-6 sm:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(214,168,92,0.25)]"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div>
                    {/* Darkroom Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#242923]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#D6A85C] animate-ping" />
                        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#D6A85C] font-bold">
                          PHOTOGRAPHIC EXIF & FIELD ARCHIVE
                        </span>
                      </div>
                      <span className="text-[9px] font-sans uppercase tracking-widest text-[#A7A59B] bg-[#080908] px-2.5 py-0.5 rounded-full border border-[#242923]">
                        Master Specimen 01
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] mt-4 mb-1">
                      {previewImages[0].title}
                    </h3>
                    <p className="font-sans text-xs text-[#D6A85C] italic mb-4">
                      {previewImages[0].species} · {previewImages[0].location}
                    </p>

                    {/* Field Story */}
                    <div className="p-3.5 rounded-2xl bg-[#080908]/80 border border-[#242923] mb-4">
                      <span className="text-[9px] font-sans uppercase tracking-widest text-[#A7A59B] block mb-1 font-semibold">
                        BEHIND THE CAPTURE:
                      </span>
                      <p className="font-serif italic text-xs sm:text-[13px] text-[#F2F0E8]/90 leading-relaxed font-light">
                        "{previewImages[0].caption}"
                      </p>
                    </div>

                    {/* Optical & Technical Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      <div className="p-2 rounded-xl bg-[#121412] border border-[#242923]">
                        <span className="text-[8px] font-sans text-[#A7A59B] uppercase block">Focal Length</span>
                        <span className="font-mono text-xs text-[#D6A85C] font-semibold">400mm Prime</span>
                      </div>
                      <div className="p-2 rounded-xl bg-[#121412] border border-[#242923]">
                        <span className="text-[8px] font-sans text-[#A7A59B] uppercase block">Aperture</span>
                        <span className="font-mono text-xs text-[#D6A85C] font-semibold">f/2.8 Wide</span>
                      </div>
                      <div className="p-2 rounded-xl bg-[#121412] border border-[#242923]">
                        <span className="text-[8px] font-sans text-[#A7A59B] uppercase block">Shutter Speed</span>
                        <span className="font-mono text-xs text-[#D6A85C] font-semibold">1/800 sec</span>
                      </div>
                      <div className="p-2 rounded-xl bg-[#121412] border border-[#242923]">
                        <span className="text-[8px] font-sans text-[#A7A59B] uppercase block">Sensitivity</span>
                        <span className="font-mono text-xs text-[#D6A85C] font-semibold">ISO 400</span>
                      </div>
                    </div>
                  </div>

                  {/* Back Action Button */}
                  <div className="pt-4 border-t border-[#242923] flex items-center justify-between">
                    <span className="text-[10px] font-sans text-[#A7A59B] flex items-center gap-1.5">
                      <span>✦</span>
                      <span>Tracked with Vijay Mathiew</span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewGallery()
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] text-[10.5px] font-sans uppercase tracking-wider font-bold shadow-lg hover:brightness-110 transition-all cursor-pointer"
                    >
                      View in Full Gallery →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Column (takes 5 cols on desktop, 2 stacked images) */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-5 sm:gap-6">
            {/* ============================================================ */}
            {/* 2nd IMAGE: IDEA 2 -> 3D MAGNETIC GYROSCOPE TILT WITH GLARE   */}
            {/* ============================================================ */}
            {previewImages[1] && (
              <div
                onClick={handleViewGallery}
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
                className="group relative aspect-[16/10] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-[#151815] border border-[#242923] hover:border-[#D6A85C] shadow-2xl cursor-pointer transition-transform duration-200 ease-out"
                style={{
                  transform: tiltStyle.transform,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              >
                <img
                  src={previewImages[1].src}
                  alt={previewImages[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.92] group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080908]/90 via-transparent to-transparent pointer-events-none" />

                {/* 3D Specular Light Glare Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: tiltStyle.glare.opacity,
                    background: `radial-gradient(circle at ${tiltStyle.glare.x}% ${tiltStyle.glare.y}%, rgba(255, 230, 180, 0.45) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 80%)`,
                  }}
                />

                {/* 3D Floating Tilt Indicator on Top Right */}
                <div
                  className="absolute top-3 right-3 pointer-events-none transition-transform duration-200"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  <span className="px-2.5 py-0.5 rounded-full bg-[#080908]/85 backdrop-blur-md text-[#D6A85C] border border-[#D6A85C]/40 text-[8.5px] font-sans tracking-wider uppercase font-semibold shadow-md flex items-center gap-1">
                    <span>🧭</span>
                    <span>3D Gyro Tilt</span>
                  </span>
                </div>

                <div
                  className="absolute bottom-4 left-5 right-5 transition-transform duration-200"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <span className="text-[9px] font-sans tracking-widest uppercase text-[#D6A85C] block mb-0.5">
                    {previewImages[1].location}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-tight">
                    {previewImages[1].title}
                  </h4>
                  <p className="text-[11px] text-[#A7A59B] italic truncate">{previewImages[1].species}</p>
                </div>
              </div>
            )}

            {/* 3rd Image (Normal clean card) */}
            {previewImages[2] && (
              <div
                onClick={handleViewGallery}
                className="group relative aspect-[16/10] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-[#151815] border border-[#242923] hover:border-[#D6A85C]/70 transition-all duration-500 shadow-2xl cursor-pointer"
              >
                <img
                  src={previewImages[2].src}
                  alt={previewImages[2].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.92] group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080908]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <span className="text-[9px] font-sans tracking-widest uppercase text-[#D6A85C] block mb-0.5">
                    {previewImages[2].location}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-tight">
                    {previewImages[2].title}
                  </h4>
                  <p className="text-[11px] text-[#A7A59B] italic truncate">{previewImages[2].species}</p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Row (2 wide images taking 6 cols each) */}
          {previewImages.slice(3, 5).map((item) => (
            <div
              key={item.id}
              onClick={handleViewGallery}
              className="md:col-span-6 group relative aspect-[16/9] rounded-3xl overflow-hidden bg-[#151815] border border-[#242923] hover:border-[#D6A85C]/70 transition-all duration-500 shadow-2xl cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.92] group-hover:brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080908]/90 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[9.5px] font-sans tracking-widest uppercase text-[#D6A85C] block mb-0.5">
                    {item.location}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#A7A59B] italic mt-0.5">{item.species}</p>
                </div>
                <span className="text-xs font-sans text-[#D6A85C] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Big Bottom Callout */}
        <div className="mt-12 p-8 rounded-3xl bg-[#151815]/90 border border-[#242923] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-xl sm:text-2xl text-[#F2F0E8] mb-1">
              Looking for our complete photographic archive?
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] font-light">
              Explore big cats, primates, raptors, and Western Ghats night macro collections with camera shooting metadata.
            </p>
          </div>

          <button
            onClick={handleViewGallery}
            className="py-3 px-7 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] font-sans text-xs uppercase tracking-wider font-bold hover:shadow-[0_4px_20px_rgba(214,168,92,0.4)] transition-all cursor-pointer whitespace-nowrap"
          >
            View Full Gallery ({GALLERY_IMAGES.length}+ Photos) →
          </button>
        </div>
      </div>
    </section>
  )
}
