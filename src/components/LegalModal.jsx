import { useState, useEffect } from 'react'

export default function LegalModal({ isOpen, onClose, initialTab = 'terms' }) {
  const [activeTab, setActiveTab] = useState(initialTab)

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#080908]/90 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl bg-[#151815] border border-[#242923] shadow-2xl overflow-hidden z-10 text-[#F2F0E8]"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95), 0 0 40px rgba(184, 115, 51, 0.15)',
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-[#242923] bg-[#080908]">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="VM Wild Expeditions"
              className="h-9 w-auto object-contain rounded-md border border-[#242923]"
            />
            <div>
              <span className="font-sans text-xs tracking-[0.25em] uppercase font-bold text-[#F2F0E8]">
                VM <span className="text-[#B87333] font-normal">WILD EXPEDITIONS</span>
              </span>
              <span className="block font-sans text-[8px] tracking-[0.2em] uppercase text-[#D6A85C] font-semibold mt-0.5">
                Beyond the Map. Into the wild
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[#242923] flex items-center justify-center text-[#F2F0E8]/70 hover:text-[#F2F0E8] hover:border-[#B87333] hover:bg-[#242923] transition-all text-sm cursor-pointer"
            title="Close modal (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#242923] bg-[#151815] px-6 md:px-8 gap-4 sm:gap-8">
          <button
            onClick={() => setActiveTab('terms')}
            className={`py-3.5 font-sans text-xs tracking-[0.2em] uppercase transition-all relative cursor-pointer ${
              activeTab === 'terms'
                ? 'text-[#D6A85C] font-semibold'
                : 'text-[#A7A59B] hover:text-[#F2F0E8]'
            }`}
          >
            Terms of Service
            {activeTab === 'terms' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B87333]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3.5 font-sans text-xs tracking-[0.2em] uppercase transition-all relative cursor-pointer ${
              activeTab === 'privacy'
                ? 'text-[#D6A85C] font-semibold'
                : 'text-[#A7A59B] hover:text-[#F2F0E8]'
            }`}
          >
            Privacy Policy
            {activeTab === 'privacy' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B87333]" />
            )}
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div
          data-lenis-prevent="true"
          className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 space-y-6 text-sm font-sans font-light leading-relaxed text-[#A7A59B] modal-scroll overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
        >
          {activeTab === 'terms' ? (
            <>
              <div>
                <h3 className="font-serif text-2xl text-[#F2F0E8] mb-2 font-normal">
                  Terms of Service & Expedition Charter
                </h3>
                <p className="text-xs text-[#D6A85C] tracking-wider uppercase mb-4 font-semibold">
                  Effective Date: September 2026 · VM Wild Expeditions Photography Studio
                </p>
                <p>
                  Welcome to <strong>VM Wild Expeditions</strong>. By accessing this website, registering for photography expeditions, or reserving tour seats, you agree to comply with and be bound by the following Terms and Conditions.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#D6A85C] mb-1">
                    1. Intellectual Property & Copyright
                  </h4>
                  <p>
                    All wildlife photographs, video footage, soundscapes, editorial narratives, and brand insignia published on this site are the sole intellectual property of <strong>VM Wild Expeditions</strong> and its founders. All works are protected under the Indian Copyright Act, 1957.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#D6A85C] mb-1">
                    2. Photo Tour Booking & Vehicle Policy
                  </h4>
                  <p>
                    VM Wild Expeditions guarantees a strict maximum of 4 photographers per safari Gypsy to assure unhindered 360-degree shooting angles and individual beanbag placements. Forest department permits are allocated per official sanctuary regulations.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#D6A85C] mb-1">
                    3. Uncompromising Field Ethics
                  </h4>
                  <p>
                    Every participant must abide by our Non-Invasive Wildlife Ethics Code: zero baiting, no chasing or off-roading, and full compliance with forest guide instructions. The well-being of the animal always supersedes capturing an image.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-serif text-2xl text-[#F2F0E8] mb-2 font-normal">
                  Privacy Policy & Confidentiality
                </h3>
                <p className="text-xs text-[#D6A85C] tracking-wider uppercase mb-4 font-semibold">
                  Effective Date: September 2026 · Client Data Governance
                </p>
                <p>
                  At <strong>VM Wild Expeditions</strong>, we respect your confidentiality and are committed to safeguarding personal information shared with our expedition desk.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#D6A85C] mb-1">
                    1. Information Collected
                  </h4>
                  <p>
                    When you inquire via WhatsApp or our registration forms, we collect your name, phone number, and expedition preferences solely to facilitate tour planning and forest permit ticketing.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#D6A85C] mb-1">
                    2. Zero Data Selling
                  </h4>
                  <p>
                    VM Wild Expeditions does not sell, rent, lease, or monetize client personal data to any third-party marketing brokers or external networks.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#D6A85C] mb-1">
                    3. Official Contact
                  </h4>
                  <p>
                    For inquiries, please contact our desk at <a href="mailto:hello@vmwildexpeditions.com" className="text-[#D6A85C] hover:underline">hello@vmwildexpeditions.com</a> or via our official Instagram <a href="https://www.instagram.com/vm_wild_expeditions?stkn=OTU3MGI0bHR6OWZz" target="_blank" rel="noopener noreferrer" className="text-[#D6A85C] hover:underline">@vm_wild_expeditions</a>.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center px-6 md:px-8 py-4 border-t border-[#242923] bg-[#080908]">
          <span className="font-sans text-[10px] text-[#A7A59B] uppercase tracking-widest">
            © 2026 VM WILD EXPEDITIONS
          </span>
          <button
            onClick={onClose}
            className="btn-copper-primary px-6 py-2 rounded-full font-sans text-xs tracking-wider uppercase cursor-pointer shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
