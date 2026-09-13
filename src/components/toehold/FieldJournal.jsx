import { useState } from 'react'
import { FIELD_JOURNAL_DATA } from '../../data/fieldJournalData'
import FieldJournalModal from './FieldJournalModal'

export default function FieldJournal() {
  const [selectedArticle, setSelectedArticle] = useState(null)

  return (
    <section id="journal" className="py-24 sm:py-28 bg-[#080908] border-b border-[#242923] select-none relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[300px] bg-[#B87333]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
              FIELD NOTES & KNOWLEDGE
            </span>
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight mb-4">
            The Field <span className="italic text-[#D6A85C] font-normal">Journal</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#A7A59B] font-light leading-relaxed max-w-2xl mx-auto">
            First-hand tracking stories, photography masterclasses, and habitat guides written by Expedition Leader Vijay Mathiew directly from India's untamed wildernesses.
          </p>
        </div>

        {/* 4 Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {FIELD_JOURNAL_DATA.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group relative rounded-3xl bg-[#151815] border border-[#242923] hover:border-[#D6A85C]/60 transition-all duration-400 overflow-hidden cursor-pointer flex flex-col sm:flex-row justify-between shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(214,168,92,0.15)] hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative w-full sm:w-2/5 aspect-[16/10] sm:aspect-auto overflow-hidden bg-[#080908] flex-shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.88] group-hover:brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent via-transparent to-[#151815]/80" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#080908]/85 backdrop-blur-md border border-[#242923] text-[#D6A85C] font-sans text-[9px] font-bold tracking-wider uppercase">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Text Container */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-sans text-[#A7A59B] uppercase tracking-wider">
                    <span>⏱ {article.readTime}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#A7A59B] font-light leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#242923] flex items-center justify-between">
                  <span className="text-xs font-sans uppercase tracking-wider text-[#D6A85C] font-semibold flex items-center gap-1 group-hover:text-[#F2F0E8] transition-colors">
                    <span>Read Field Account</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                  <span className="text-[11px] text-[#A7A59B]">By {article.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Field Journal Modal */}
      {selectedArticle && (
        <FieldJournalModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </section>
  )
}
