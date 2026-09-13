import { useState } from 'react'
import { GALLERY_IMAGES } from '../../data/galleryData'

export default function FullGalleryView({ onBackToHome, onPlanTrip }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activePhoto, setActivePhoto] = useState(null)

  const categories = ['All', 'Big Cats', 'Avian', 'Mammals', 'Macro & Nocturne']

  const filteredPhotos = GALLERY_IMAGES.filter((photo) => {
    if (activeCategory === 'All') return true
    return photo.category === activeCategory
  })

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
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center mb-12">
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
          Every frame represents countless hours of vehicle tracking, anticipation, and field ethics under natural light. Click any image to view camera settings and field notes.
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
      </div>

      {/* Full Photo Grid (Masonry feel with varied aspect ratios) */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredPhotos.map((photo) => (
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
                  <p className="font-sans text-xs text-[#A7A59B] italic mt-0.5">
                    {photo.species}
                  </p>
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
          ))}
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
