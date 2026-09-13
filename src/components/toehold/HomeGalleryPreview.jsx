import { GALLERY_IMAGES } from '../../data/galleryData'

export default function HomeGalleryPreview({ onNavigateToGallery }) {
  // Take exactly 5 featured images for the home preview
  const previewImages = GALLERY_IMAGES.filter((img) => img.featuredOnHome).slice(0, 5)

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
              A sample of intimate apex predator and endemic bird encounters documented across Indian forests during our small-group expeditions.
            </p>
          </div>

          <button
            onClick={onNavigateToGallery}
            className="self-start sm:self-end px-5 py-3 rounded-full bg-[#151815] border border-[#242923] hover:border-[#D6A85C] hover:bg-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer group"
          >
            <span>VIEW FULL GALLERY</span>
            <span className="group-hover:translate-x-1 transition-transform font-bold">→</span>
          </button>
        </div>

        {/* 5-Image Curated Layout: 1 Hero landscape + 4 grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* Main Hero Card (takes 7 cols on desktop) */}
          {previewImages[0] && (
            <div
              onClick={onNavigateToGallery}
              className="md:col-span-7 group relative aspect-[16/10] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-[#151815] border border-[#242923] hover:border-[#D6A85C]/70 transition-all duration-500 shadow-2xl cursor-pointer"
            >
              <img
                src={previewImages[0].src}
                alt={previewImages[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.92] group-hover:brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080908]/90 via-[#080908]/30 to-transparent" />
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
          )}

          {/* Right Column (takes 5 cols on desktop, 2 stacked images) */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-5 sm:gap-6">
            {previewImages.slice(1, 3).map((item) => (
              <div
                key={item.id}
                onClick={onNavigateToGallery}
                className="group relative aspect-[16/10] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-[#151815] border border-[#242923] hover:border-[#D6A85C]/70 transition-all duration-500 shadow-2xl cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.92] group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080908]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <span className="text-[9px] font-sans tracking-widest uppercase text-[#D6A85C] block mb-0.5">
                    {item.location}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#A7A59B] italic truncate">{item.species}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row (2 wide images taking 6 cols each) */}
          {previewImages.slice(3, 5).map((item) => (
            <div
              key={item.id}
              onClick={onNavigateToGallery}
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
            onClick={onNavigateToGallery}
            className="py-3 px-7 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] font-sans text-xs uppercase tracking-wider font-bold hover:shadow-[0_4px_20px_rgba(214,168,92,0.4)] transition-all cursor-pointer whitespace-nowrap"
          >
            View Full Gallery ({GALLERY_IMAGES.length}+ Photos) →
          </button>
        </div>
      </div>
    </section>
  )
}
