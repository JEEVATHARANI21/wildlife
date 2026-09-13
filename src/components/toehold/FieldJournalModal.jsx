import { useEffect } from 'react'

export default function FieldJournalModal({ article, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (article) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [article, onClose])

  if (!article) return null

  const handleWhatsAppConsult = () => {
    const text = encodeURIComponent(
      `Hi Vijay, I read your field journal article "${article.title}". I'd like to ask a few questions about your field skippering and upcoming expeditions.`
    )
    window.open(`https://wa.me/919087394546?text=${text}`, '_blank')
  }

  return (
    <div
      className="fixed inset-0 z-[65] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#080908]/92 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0f110f] border border-[#242923] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-[#080908]/85 border border-[#242923] text-[#F2F0E8] hover:text-[#D6A85C] hover:border-[#D6A85C] flex items-center justify-center text-lg transition-all cursor-pointer shadow-xl backdrop-blur-md"
          aria-label="Close Article"
        >
          ✕
        </button>

        {/* Hero Image Header */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] overflow-hidden bg-[#080908] flex-shrink-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover brightness-[0.88]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f110f] via-[#0f110f]/40 to-transparent" />

          <div className="absolute bottom-5 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-[#D6A85C] text-[#080908] font-sans text-[10px] font-bold tracking-widest uppercase mb-2 inline-block shadow-md">
              {article.category} · {article.readTime}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F2F0E8] leading-tight">
              {article.title}
            </h2>
            <p className="text-xs text-[#A7A59B] mt-1 font-light">
              By {article.author} · {article.date}
            </p>
          </div>
        </div>

        {/* Article Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#A7A59B] font-light leading-relaxed whitespace-pre-line">
            {article.content}
          </div>

          {/* Expedition Link Callout */}
          <div className="p-5 rounded-2xl bg-[#151815] border border-[#D6A85C]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#D6A85C] font-semibold block">
                Related Photography Expedition
              </span>
              <h4 className="font-serif text-lg text-[#F2F0E8] mt-0.5">
                {article.linkedTourTitle}
              </h4>
              <p className="text-xs text-[#A7A59B] font-light mt-0.5">
                All-inclusive small group departure · From ₹XX,XXX
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose()
                const el = document.getElementById('tours')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-5 py-2.5 rounded-full bg-[#D6A85C] text-[#080908] hover:bg-[#B87333] text-xs font-sans uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap shadow-md"
            >
              View Expedition →
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#151815] border-t border-[#242923] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <span className="text-xs text-[#A7A59B] font-light">
            Have a question about tracking technique or equipment?
          </span>
          <button
            type="button"
            onClick={handleWhatsAppConsult}
            className="text-xs font-sans uppercase tracking-wider text-[#D6A85C] hover:text-[#B87333] font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Ask Expedition Leader Vijay Mathiew</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
