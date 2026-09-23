import { useState } from 'react'
import { useSiteContent } from '../../context/SiteContentContext'

export default function ContactFooter({ openLegal, onOpenAdmin }) {
  const { content } = useSiteContent()
  const brand = content?.brand || {
    siteName: 'VM Wild Expeditions',
    tagline: 'Beyond the Map. Into the wild',
    logoUrl: '/logo-clean.png',
  }
  const social = content?.social || {
    instagramUrl: 'https://www.instagram.com/vm_wild_expeditions?stkn=OTU3MGI0bHR6OWZz',
    instagramHandle: '@vm_wild_expeditions',
    whatsappNumber: '919087394546',
  }

  const [form, setForm] = useState({ name: '', phone: '', email: '', category: 'animal', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    const encodedText = encodeURIComponent(
      `Hello ${brand.siteName},\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nInterested Track: ${form.category === 'animal' ? 'Wild Photography' : form.category === 'bird' ? 'Birds Photography' : 'Custom Expedition'}\nMessage: ${form.message}`
    )
    window.open(`https://wa.me/${social.whatsappNumber}?text=${encodedText}`, '_blank')
  }

  return (
    <footer id="contact" className="relative bg-[#050605] text-[#A7A59B] pt-24 pb-12 px-5 sm:px-8 md:px-16 border-t border-[#242923]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#242923]">
          {/* Left Column: Brand Story & Direct Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-1.5 sm:p-2 rounded-2xl bg-[#080908] border border-[#242923] shadow-lg overflow-hidden">
                <img src={brand.logoUrl || '/logo-clean.png'} alt={brand.siteName} className="h-13 sm:h-16 w-auto object-contain" />
              </div>
              <div className="flex flex-col border-l border-[#242923] pl-3.5">
                <span className="font-serif text-lg sm:text-xl tracking-[0.16em] uppercase text-[#F2F0E8] font-bold leading-tight">
                  {brand.siteName}
                </span>
                <span className="font-sans text-[8.5px] sm:text-[9.5px] tracking-[0.22em] uppercase text-[#D6A85C] font-semibold mt-0.5">
                  {brand.tagline}
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] max-w-lg leading-relaxed font-light">
              VM Wild Expeditions is a bespoke wildlife photography travel studio founded on uncompromised field ethics, intimate vehicular limits (max 4 per Gypsy), and deep animal behavior anticipation across India’s wildest national parks.
            </p>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <a
                href="tel:+919087394546"
                className="p-4 rounded-2xl bg-[#151815] border border-[#242923] hover:border-[#B87333] transition-colors flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#080908] border border-[#242923] flex items-center justify-center text-lg text-[#B87333]">
                  📞
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#A7A59B] block">Call Toll-Free / Mobile</span>
                  <span className="text-xs font-sans text-[#F2F0E8] group-hover:text-[#D6A85C] font-semibold">Click to Call</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${social.whatsappNumber}?text=Hi%20Vijay,%20I'm%20reaching%20out%20from%20${encodeURIComponent(brand.siteName)}%20website%20for%20a%20Photo%20Tour%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#151815] border border-[#242923] hover:border-[#25D366] transition-colors flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#080908] border border-[#242923] group-hover:border-[#25D366]/60 flex items-center justify-center text-[#25D366] transition-colors shadow-inner">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#A7A59B] block">Direct WhatsApp</span>
                  <span className="text-xs font-sans text-[#F2F0E8] group-hover:text-[#25D366] font-semibold">Chat With Us</span>
                </div>
              </a>
            </div>

            {/* Instagram Link with official SVG icon */}
            <div className="pt-2">
              <a
                href={social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#151815] border border-[#242923] hover:border-[#E1306C] text-xs font-sans text-[#F2F0E8] hover:text-[#E1306C] transition-all group"
              >
                <svg className="w-4 h-4 text-[#E1306C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Follow Official Instagram: <strong>{social.instagramHandle || '@vm_wild_expeditions'}</strong></span>
                <span className="text-[11px] text-[#A7A59B] group-hover:text-[#E1306C]">↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Quick Expedition Inquiry Form: #151815 container with #242923 border */}
          <div className="lg:col-span-6 bg-[#151815] p-6 sm:p-8 rounded-3xl border border-[#242923] shadow-2xl">
            <h3 className="font-serif text-2xl text-[#F2F0E8] mb-1 font-light">
              Plan Your Photo Tour
            </h3>
            <p className="font-sans text-xs text-[#A7A59B] mb-6 font-light">
              Connect with our founders for customized departures, private charters, or seat reservations.
            </p>

            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-widest text-[#A7A59B] block mb-1 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arjun Swaminathan"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#080908] border border-[#242923] text-xs text-[#F2F0E8] font-sans focus:outline-none focus:border-[#B87333]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-widest text-[#A7A59B] block mb-1 font-medium">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Your Phone / WhatsApp Number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#080908] border border-[#242923] text-xs text-[#F2F0E8] font-sans focus:outline-none focus:border-[#B87333]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-widest text-[#A7A59B] block mb-1 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="hello@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#080908] border border-[#242923] text-xs text-[#F2F0E8] font-sans focus:outline-none focus:border-[#B87333]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-widest text-[#A7A59B] block mb-1 font-medium">
                      Interested Expedition Track
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#080908] border border-[#242923] text-xs text-[#F2F0E8] font-sans focus:outline-none focus:border-[#B87333]"
                    >
                      <option value="animal" className="bg-[#151815]">Wild Photography</option>
                      <option value="bird" className="bg-[#151815]">Birds Photography</option>
                      <option value="both" className="bg-[#151815]">Both / Custom Expedition</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-sans uppercase tracking-widest text-[#A7A59B] block mb-1 font-medium">
                    Your Requirements / Preferred Parks
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your target species or preferred travel dates..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#080908] border border-[#242923] text-xs text-[#F2F0E8] font-sans focus:outline-none focus:border-[#B87333]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-copper-primary w-full py-3.5 rounded-xl font-sans text-xs uppercase tracking-widest cursor-pointer shadow-[0_4px_20px_rgba(184,115,51,0.35)] text-center"
                >
                  Send Inquiry via WhatsApp →
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <span className="text-3xl text-[#B87333]">✓</span>
                <h4 className="font-serif text-xl text-[#F2F0E8]">Inquiry Dispatched!</h4>
                <p className="font-sans text-xs text-[#A7A59B]">
                  WhatsApp has opened with your details. Our expedition desk will respond promptly.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#A7A59B]/70">
          <p>© {new Date().getFullYear()} {brand.siteName} Pvt Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <button
              onClick={() => openLegal && openLegal('terms')}
              className="hover:text-[#D6A85C] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>·</span>
            <button
              onClick={() => openLegal && openLegal('privacy')}
              className="hover:text-[#D6A85C] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            {onOpenAdmin && (
              <>
                <span>·</span>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-[#D6A85C] transition-colors cursor-pointer text-[#A7A59B]/40 hover:text-[#D6A85C] flex items-center gap-1.5"
                  title="Open Admin CMS Portal"
                >
                  <span>⚙️</span>
                  <span>Admin Portal</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
