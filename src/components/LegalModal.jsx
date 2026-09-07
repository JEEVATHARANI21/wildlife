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
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl bg-[#0E0F0D] border border-[#2A2B28] shadow-2xl overflow-hidden z-10 text-[#F1EFE8]"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 40px rgba(179, 135, 75, 0.15)',
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-[#2A2B28] bg-[#141512]">
          <div className="flex items-center gap-3">
            <img
              src="/logo-icon.png"
              alt="UntamedTrails"
              className="h-8 w-auto object-contain"
            />
            <div>
              <span className="font-sans text-xs tracking-[0.25em] uppercase font-bold text-[#F1EFE8]">
                UNTAMED<span className="text-[#B3874B] font-light">TRAILS</span>
              </span>
              <span className="block font-sans text-[8px] tracking-[0.25em] uppercase text-[#777]">
                Legal & Governance
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#B3874B] hover:bg-white/5 transition-all text-sm cursor-pointer"
            title="Close modal (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#2A2B28] bg-[#0A0B09] px-6 md:px-8 gap-4 sm:gap-8">
          <button
            onClick={() => setActiveTab('terms')}
            className={`py-3.5 font-sans text-xs tracking-[0.2em] uppercase transition-all relative cursor-pointer ${
              activeTab === 'terms'
                ? 'text-[#B3874B] font-medium'
                : 'text-[#888] hover:text-[#DDD]'
            }`}
          >
            Terms of Service
            {activeTab === 'terms' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B3874B]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3.5 font-sans text-xs tracking-[0.2em] uppercase transition-all relative cursor-pointer ${
              activeTab === 'privacy'
                ? 'text-[#B3874B] font-medium'
                : 'text-[#888] hover:text-[#DDD]'
            }`}
          >
            Privacy Policy
            {activeTab === 'privacy' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B3874B]" />
            )}
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-sm font-sans font-light leading-relaxed text-[#C5C3B8]">
          {activeTab === 'terms' ? (
            <>
              <div>
                <h3 className="font-serif text-2xl text-[#F1EFE8] mb-2 font-normal">
                  Terms of Service
                </h3>
                <p className="text-xs text-[#888] tracking-wider uppercase mb-4">
                  Effective Date: September 2026 · UntamedTrails Studio
                </p>
                <p>
                  Welcome to <strong>UntamedTrails</strong>. By accessing this website and viewing or acquiring any fine art works, prints, or digital specimens, you agree to comply with and be bound by the following Terms and Conditions.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#B3874B] mb-1">
                    1. Intellectual Property & Copyright
                  </h4>
                  <p>
                    All wildlife photographs, video footage, soundscapes, editorial narratives, and brand insignia published on this site are the sole and exclusive intellectual property of photographer <strong>Vijay Mathiew</strong> and UntamedTrails. All works are protected under the Indian Copyright Act, 1957, and international copyright treaties.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#B3874B] mb-1">
                    2. Commercial Licensing & Non-Personal Use
                  </h4>
                  <p>
                    No image, clip, or content from this platform may be copied, reproduced, republished, modified, downloaded, distributed, or utilized for commercial purposes, advertising, synthetic AI training sets, or digital redistribution without a signed written license agreement issued by UntamedTrails.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#B3874B] mb-1">
                    3. Fine Art Prints & Archival Authenticity
                  </h4>
                  <p>
                    Limited edition prints are individually numbered, inspected, signed, and accompanied by an official Certificate of Authenticity. Collectors acquire ownership of the physical archival print but do not acquire reproduction or commercial licensing rights.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#B3874B] mb-1">
                    4. Field Ethics & Wildlife Welfare
                  </h4>
                  <p>
                    Every moment captured by UntamedTrails adheres to strict ethical wildlife photography protocols: non-intrusive observation, no baiting, zero habitat disruption, and complete respect for animal behavior in their natural wilderness corridors.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-serif text-2xl text-[#F1EFE8] mb-2 font-normal">
                  Privacy Policy
                </h3>
                <p className="text-xs text-[#888] tracking-wider uppercase mb-4">
                  Effective Date: September 2026 · Client Data Governance
                </p>
                <p>
                  At <strong>UntamedTrails</strong>, we respect your confidentiality and are committed to safeguarding personal information shared with our fine art studio.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#B3874B] mb-1">
                    1. Information Collected
                  </h4>
                  <p>
                    When you contact our studio via our contact forms or email, we collect your name, email address, and inquiry details solely to facilitate direct communications, licensing consultations, and print acquisitions.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#B3874B] mb-1">
                    2. Zero Data Selling or Third-Party Sharing
                  </h4>
                  <p>
                    UntamedTrails does not sell, rent, lease, or monetize client personal data to any third-party advertisers, broker networks, or external agencies.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#B3874B] mb-1">
                    3. Communication Confidentiality
                  </h4>
                  <p>
                    Correspondence with collectors, commercial licensors, and gallery curators is kept strictly confidential. We maintain industry-standard security measures to safeguard all digital interactions.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#B3874B] mb-1">
                    4. Contact & Inquiries
                  </h4>
                  <p>
                    For questions regarding our privacy practices or to request data removal, please contact our studio directly at <a href="mailto:hello@untamedtrails.in" className="text-[#B3874B] hover:underline">hello@untamedtrails.in</a> or via our official Instagram <a href="https://www.instagram.com/vijaymathiew_photography" target="_blank" rel="noopener noreferrer" className="text-[#B3874B] hover:underline">@vijaymathiew_photography</a>.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center px-6 md:px-8 py-4 border-t border-[#2A2B28] bg-[#141512]">
          <span className="font-sans text-[10px] text-[#777] uppercase tracking-widest">
            © 2026 UNTAMEDTRAILS
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#1C1D1A] hover:bg-[#B3874B] text-[#F1EFE8] font-sans text-xs tracking-wider uppercase transition-colors duration-300 cursor-pointer shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
