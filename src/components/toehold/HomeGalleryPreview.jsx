import { useState, useEffect, useRef, useCallback } from 'react'
import { GALLERY_IMAGES } from '../../data/galleryData'

export default function HomeGalleryPreview({ onViewFullGallery, onNavigateToGallery }) {
  const handleViewGallery = onViewFullGallery || onNavigateToGallery

  // Filter 5 curated featured images for the home preview
  const previewImages = GALLERY_IMAGES.filter((img) => img.featuredOnHome).slice(0, 5)

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragDeltaX, setDragDeltaX] = useState(0)

  const total = previewImages.length
  const activeItem = previewImages[activeIndex] || previewImages[0]
  const containerRef = useRef(null)

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total)
  }, [total])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  const goToIndex = (idx) => {
    setActiveIndex(idx)
  }

  // Autoplay timer (4.2 seconds) - pauses on hover or during drag
  useEffect(() => {
    if (isPaused || isDragging) return

    const interval = setInterval(() => {
      handleNext()
    }, 4200)

    return () => clearInterval(interval)
  }, [isPaused, isDragging, handleNext])

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      if (!inView) return

      if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev])

  // Mouse Drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStartX(e.clientX)
    setDragDeltaX(0)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    setDragDeltaX(e.clientX - dragStartX)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    if (dragDeltaX < -45) {
      handleNext()
    } else if (dragDeltaX > 45) {
      handlePrev()
    }
    setIsDragging(false)
    setDragDeltaX(0)
  }

  // Touch Swipe handlers
  const handleTouchStart = (e) => {
    setIsDragging(true)
    setDragStartX(e.touches[0].clientX)
    setDragDeltaX(0)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    setDragDeltaX(e.touches[0].clientX - dragStartX)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    if (dragDeltaX < -40) {
      handleNext()
    } else if (dragDeltaX > 40) {
      handlePrev()
    }
    setIsDragging(false)
    setDragDeltaX(0)
  }

  // Compute 3D Coverflow geometry for each card relative to activeIndex
  const getCardStyle = (index) => {
    let offset = (index - activeIndex + total) % total
    if (offset > total / 2) {
      offset -= total
    }

    // Offset mapping: -2, -1, 0, 1, 2
    if (offset === 0) {
      // CENTER CARD: Lifted forward in 3D, elegant gold accent border and deep stage shadow
      return {
        transform: `translate3d(-50%, -50%, 0) translate3d(0px, -18px, 120px) rotateY(0deg) scale(1.08)`,
        zIndex: 30,
        opacity: 1,
        filter: 'brightness(1.02)',
        pointerEvents: 'auto',
        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px 0 rgba(214, 168, 92, 0.22)',
        borderColor: '#D6A85C',
      }
    } else if (offset === -1) {
      // IMMEDIATE LEFT WING
      return {
        transform: `translate3d(-50%, -50%, 0) translate3d(-62%, 0px, -40px) rotateY(32deg) scale(0.86)`,
        zIndex: 20,
        opacity: 0.85,
        filter: 'brightness(0.68)',
        pointerEvents: 'auto',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.85)',
        borderColor: '#242923',
      }
    } else if (offset === 1) {
      // IMMEDIATE RIGHT WING
      return {
        transform: `translate3d(-50%, -50%, 0) translate3d(62%, 0px, -40px) rotateY(-32deg) scale(0.86)`,
        zIndex: 20,
        opacity: 0.85,
        filter: 'brightness(0.68)',
        pointerEvents: 'auto',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.85)',
        borderColor: '#242923',
      }
    } else if (offset === -2) {
      // FAR LEFT WING
      return {
        transform: `translate3d(-50%, -50%, 0) translate3d(-112%, 12px, -140px) rotateY(46deg) scale(0.72)`,
        zIndex: 10,
        opacity: 0.45,
        filter: 'brightness(0.45)',
        pointerEvents: 'auto',
        boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.9)',
        borderColor: '#181c18',
      }
    } else {
      // FAR RIGHT WING (offset === 2)
      return {
        transform: `translate3d(-50%, -50%, 0) translate3d(112%, 12px, -140px) rotateY(-46deg) scale(0.72)`,
        zIndex: 10,
        opacity: 0.45,
        filter: 'brightness(0.45)',
        pointerEvents: 'auto',
        boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.9)',
        borderColor: '#181c18',
      }
    }
  }

  return (
    <section
      id="gallery-preview"
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false)
        handleMouseUp()
      }}
      className="py-24 sm:py-32 bg-[#0a0c0a] border-b border-[#20251f] select-none relative overflow-hidden"
    >
      {/* Subtle warm bronze ambient depth (matching luxury dark brand, NO blue/green colors) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[350px] sm:h-[450px] bg-[#B87333]/[0.04] blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        {/* ============================================================ */}
        {/* SECTION HEADER                                               */}
        {/* ============================================================ */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="w-7 h-[1.5px] bg-[#B87333]" />
              <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
                CURATED 3D COVERFLOW GALLERY
              </span>
              <span className="w-7 h-[1.5px] bg-[#B87333]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight">
              Wilderness <span className="italic text-[#D6A85C] font-normal">Moments</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-end">
            {/* Autoplay status indicator */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111411] border border-[#242923] text-[10px] font-sans text-[#A7A59B]">
              <span
                className={`w-2 h-2 rounded-full ${isPaused ? 'bg-[#D6A85C]' : 'bg-[#D6A85C] animate-pulse'}`}
              />
              <span>{isPaused ? 'Paused (Hovered)' : 'Autoplaying'}</span>
            </div>

            <button
              onClick={handleViewGallery}
              className="px-5 py-3 rounded-full bg-[#151815] border border-[#242923] hover:border-[#D6A85C] hover:bg-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer group"
            >
              <span>VIEW FULL GALLERY</span>
              <span className="group-hover:translate-x-1 transition-transform font-bold">→</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. THE 3D COVERFLOW STAGE CONTAINER                           */}
        {/* ============================================================ */}
        <div
          className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{
            perspective: '1250px',
            transformStyle: 'preserve-3d',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Coverflow Cards */}
          {previewImages.map((item, index) => {
            let offset = (index - activeIndex + total) % total
            if (offset > total / 2) offset -= total
            const isCenter = offset === 0
            const style = getCardStyle(index)

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isCenter) {
                    goToIndex(index)
                  } else {
                    handleViewGallery()
                  }
                }}
                className="absolute top-1/2 left-1/2 w-[270px] sm:w-[380px] md:w-[460px] aspect-[16/11] rounded-3xl overflow-hidden border transition-all duration-700 ease-out cursor-pointer select-none group"
                style={{
                  ...style,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity, filter, box-shadow',
                }}
              >
                {/* Photo Only */}
                <img
                  src={item.src}
                  alt={item.title || 'Wild photograph'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                  draggable={false}
                  loading="lazy"
                />
              </div>
            )
          })}

          {/* ============================================================ */}
          {/* 3. STAGE NAVIGATION CONTROLS                                 */}
          {/* ============================================================ */}
          {/* Left Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            aria-label="Previous frame"
            className="absolute left-2 sm:left-6 md:left-10 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#0c0f0d]/85 hover:bg-[#181d19] border border-[#242923] hover:border-[#D6A85C] text-[#F2F0E8] flex items-center justify-center text-lg sm:text-xl transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer group active:scale-95"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform font-bold">‹</span>
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            aria-label="Next frame"
            className="absolute right-2 sm:right-6 md:right-10 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#0c0f0d]/85 hover:bg-[#181d19] border border-[#242923] hover:border-[#D6A85C] text-[#F2F0E8] flex items-center justify-center text-lg sm:text-xl transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer group active:scale-95"
          >
            <span className="group-hover:translate-x-0.5 transition-transform font-bold">›</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* 4. PAGINATION INDICATORS                                     */}
        {/* ============================================================ */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-[#1a1f1a]">
          {/* Pill Indicators in brand gold */}
          <div className="flex items-center gap-2.5">
            {previewImages.map((img, i) => {
              const isActive = i === activeIndex
              return (
                <button
                  key={img.id}
                  onClick={() => goToIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                    isActive
                      ? 'w-10 sm:w-12 bg-[#D6A85C] shadow-[0_0_12px_rgba(214,168,92,0.5)]'
                      : 'w-2.5 bg-[#242923] hover:bg-[#3a4239]'
                  }`}
                  title={img.location}
                  aria-label={`Go to slide ${i + 1}`}
                />
              )
            })}
          </div>

          {/* Active Frame Info */}
          <div className="flex items-center gap-2 text-center sm:text-right">
            <span className="text-[11px] font-sans text-[#A7A59B]">Featured Location:</span>
            <span className="text-xs font-sans font-semibold tracking-wide text-[#D6A85C]">
              {activeItem.location}
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 5. BOTTOM ARCHIVE BANNER                                      */}
        {/* ============================================================ */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#0e120f]/90 border border-[#20251f] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h4 className="font-serif text-xl sm:text-2xl text-[#F2F0E8] mb-1">
              Want to see our full 40+ species field collection?
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] font-light">
              Explore big cats, Western Ghats primates, raptors, and nocturnal venomous macro archives with full EXIF data.
            </p>
          </div>

          <button
            onClick={handleViewGallery}
            className="py-3 px-7 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] font-sans text-xs uppercase tracking-wider font-bold hover:shadow-[0_4px_25px_rgba(214,168,92,0.45)] hover:scale-102 active:scale-98 transition-all cursor-pointer whitespace-nowrap"
          >
            Open Full Gallery Collection →
          </button>
        </div>
      </div>
    </section>
  )
}
