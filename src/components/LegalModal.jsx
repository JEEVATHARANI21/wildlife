import { useState, useEffect } from 'react'

export default function LegalModal({ isOpen, onClose, initialTab = 'payment' }) {
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
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#080908]/90 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-3xl bg-[#151815] border border-[#242923] shadow-2xl overflow-hidden z-10 text-[#F2F0E8]"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95), 0 0 40px rgba(214, 168, 92, 0.15)',
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-[#242923] bg-[#080908]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#151815] border border-[#D6A85C]/40 flex items-center justify-center text-sm font-serif font-bold text-[#D6A85C]">
              VM
            </div>
            <div>
              <span className="font-sans text-xs tracking-[0.25em] uppercase font-bold text-[#F2F0E8] block">
                VM <span className="text-[#D6A85C] font-normal">WILD EXPEDITIONS</span>
              </span>
              <span className="block font-sans text-[8px] tracking-[0.2em] uppercase text-[#A7A59B] font-semibold mt-0.5">
                Beyond the Map. Into the wild
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[#242923] flex items-center justify-center text-[#F2F0E8]/70 hover:text-[#F2F0E8] hover:border-[#D6A85C] hover:bg-[#242923] transition-all text-sm cursor-pointer"
            title="Close modal (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#242923] bg-[#111511] px-6 md:px-8 gap-3 sm:gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('payment')}
            className={`py-3.5 font-sans text-xs tracking-[0.15em] uppercase transition-all relative cursor-pointer whitespace-nowrap ${
              activeTab === 'payment'
                ? 'text-[#D6A85C] font-semibold'
                : 'text-[#A7A59B] hover:text-[#F2F0E8]'
            }`}
          >
            💳 Payment & Cancellation
            {activeTab === 'payment' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6A85C]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`py-3.5 font-sans text-xs tracking-[0.15em] uppercase transition-all relative cursor-pointer whitespace-nowrap ${
              activeTab === 'terms'
                ? 'text-[#D6A85C] font-semibold'
                : 'text-[#A7A59B] hover:text-[#F2F0E8]'
            }`}
          >
            📜 Terms of Service
            {activeTab === 'terms' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6A85C]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3.5 font-sans text-xs tracking-[0.15em] uppercase transition-all relative cursor-pointer whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'text-[#D6A85C] font-semibold'
                : 'text-[#A7A59B] hover:text-[#F2F0E8]'
            }`}
          >
            🔒 Privacy Policy
            {activeTab === 'privacy' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6A85C]" />
            )}
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div
          data-lenis-prevent="true"
          className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 space-y-6 text-sm font-sans font-light leading-relaxed text-[#A7A59B] modal-scroll overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* TAB 1: Payment & Cancellation Policy */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-[#F2F0E8] mb-1 font-normal">
                  Payment & Cancellation Policy
                </h3>
                <p className="text-xs text-[#D6A85C] tracking-wider uppercase font-semibold">
                  Official Booking Terms & Reservation Charter · VM Wild Expeditions
                </p>
              </div>

              {/* Section 1: Booking & Payment */}
              <div className="space-y-3.5">
                <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-[#D6A85C] flex items-center gap-2">
                  <span>💳</span>
                  <span>1. Booking & Payment</span>
                </h4>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923] flex items-start gap-3.5 hover:border-[#D6A85C]/40 transition-colors">
                    <span className="text-emerald-400 text-lg shrink-0 font-bold mt-0.5">✅</span>
                    <div>
                      <span className="font-semibold text-[#F2F0E8] text-sm block mb-1">
                        50% Advance Payment Required
                      </span>
                      <p className="text-xs text-[#A7A59B] leading-relaxed">
                        50% advance payment is required to confirm the tour booking and reserve your seat on the expedition.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923] flex items-start gap-3.5 hover:border-[#D6A85C]/40 transition-colors">
                    <span className="text-emerald-400 text-lg shrink-0 font-bold mt-0.5">✅</span>
                    <div>
                      <span className="font-semibold text-[#F2F0E8] text-sm block mb-1">
                        Remaining 50% Balance (30 Days Prior)
                      </span>
                      <p className="text-xs text-[#A7A59B] leading-relaxed">
                        The remaining 50% balance must be paid at least 30 days before the tour commencement date.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923] flex items-start gap-3.5 hover:border-[#D6A85C]/40 transition-colors">
                    <span className="text-emerald-400 text-lg shrink-0 font-bold mt-0.5">✅</span>
                    <div>
                      <span className="font-semibold text-[#F2F0E8] text-sm block mb-1">
                        Required Payment Confirmation
                      </span>
                      <p className="text-xs text-[#A7A59B] leading-relaxed">
                        Booking will be confirmed only after the required payment is received and verified by our expedition desk.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Cancellation & Refund Schedule */}
              <div className="space-y-3.5 pt-2 border-t border-[#242923]">
                <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-[#D6A85C] flex items-center gap-2">
                  <span>🔄</span>
                  <span>2. Cancellation & Refund Policy</span>
                </h4>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923] flex items-start gap-3.5 hover:border-[#D6A85C]/40 transition-colors">
                    <span className="text-emerald-400 text-lg shrink-0 font-bold mt-0.5">✅</span>
                    <div>
                      <span className="font-semibold text-[#F2F0E8] text-sm block mb-1">
                        30–15 Days Before Tour Commencement
                      </span>
                      <p className="text-xs text-[#A7A59B] leading-relaxed">
                        50% of the total tour amount will be refunded.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923] flex items-start gap-3.5 hover:border-[#D6A85C]/40 transition-colors">
                    <span className="text-emerald-400 text-lg shrink-0 font-bold mt-0.5">✅</span>
                    <div>
                      <span className="font-semibold text-[#F2F0E8] text-sm block mb-1">
                        Within 15 Days Before Tour Commencement
                      </span>
                      <p className="text-xs text-[#A7A59B] leading-relaxed">
                        25% of the total tour amount will be refunded.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923] flex items-start gap-3.5 hover:border-[#D6A85C]/40 transition-colors">
                    <span className="text-emerald-400 text-lg shrink-0 font-bold mt-0.5">✅</span>
                    <div>
                      <span className="font-semibold text-[#F2F0E8] text-sm block mb-1">
                        After Tour Begins / No-Show
                      </span>
                      <p className="text-xs text-[#A7A59B] leading-relaxed">
                        No refund will be provided once the tour begins or in case of a no-show.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923] flex items-start gap-3.5 hover:border-[#D6A85C]/40 transition-colors">
                    <span className="text-emerald-400 text-lg shrink-0 font-bold mt-0.5">✅</span>
                    <div>
                      <span className="font-semibold text-[#F2F0E8] text-sm block mb-1">
                        Third-Party & Supplier Bookings
                      </span>
                      <p className="text-xs text-[#A7A59B] leading-relaxed">
                        Safari permits, accommodation, transportation and other non-refundable bookings are subject to the respective supplier's cancellation policies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Assistance */}
              <div className="p-4 rounded-2xl bg-[#111611] border border-[#D6A85C]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[#D6A85C] font-bold block mb-0.5">Need Payment Details or Custom Invoice?</span>
                  <span className="text-[#A7A59B] text-[11px]">Connect directly with Vijay Mathiew on WhatsApp for bank wire / UPI details.</span>
                </div>
                <a
                  href="https://wa.me/919087394546?text=Hello%20Vijay,%20I'm%20contacting%20you%20regarding%20payment%20details%20for%20a%20VM%20Wild%20Expedition."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#080908] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                >
                  💬 WhatsApp Concierge
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: Terms of Service */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-[#F2F0E8] mb-1 font-normal">
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
            </div>
          )}

          {/* TAB 3: Privacy Policy */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-[#F2F0E8] mb-1 font-normal">
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
                    For inquiries, please contact our desk at <a href="mailto:admissions@vmwild.com" className="text-[#D6A85C] hover:underline">admissions@vmwild.com</a> or via our official Instagram <a href="https://www.instagram.com/vm_wild_expeditions?stkn=OTU3MGI0bHR6OWZz" target="_blank" rel="noopener noreferrer" className="text-[#D6A85C] hover:underline">@vm_wild_expeditions</a>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center px-6 md:px-8 py-4 border-t border-[#242923] bg-[#080908]">
          <span className="font-sans text-[10px] text-[#A7A59B] uppercase tracking-widest">
            © {new Date().getFullYear()} VM WILD EXPEDITIONS
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#D6A85C] hover:bg-[#b58b45] text-[#080908] font-bold font-sans text-xs tracking-wider uppercase cursor-pointer shadow-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
