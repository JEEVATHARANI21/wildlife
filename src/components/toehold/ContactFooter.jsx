import { useState } from 'react'

export default function ContactFooter({ openLegal }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', category: 'animal', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    const encodedText = encodeURIComponent(
      `Hello Untamed Trails,\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nInterested Track: ${form.category === 'animal' ? 'Animal Tracking Tours' : 'Bird Photography Tours'}\nMessage: ${form.message}`
    )
    window.open(`https://wa.me/919087394546?text=${encodedText}`, '_blank')
  }

  return (
    <footer id="contact" className="relative bg-[#050605] text-[#A7A59B] pt-24 pb-12 px-5 sm:px-8 md:px-16 border-t border-[#242923]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#242923]">
          {/* Left Column: Brand Story & Direct Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/logo-icon.png" alt="Untamed Trails" className="h-10 w-auto object-contain brightness-125" />
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-[0.2em] uppercase text-[#F2F0E8] font-bold">
                  UNTAMED <span className="text-[#B87333] font-normal">TRAILS</span>
                </span>
                <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-[#A7A59B]">
                  Wildlife & Bird Photography Tours
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] max-w-lg leading-relaxed font-light">
              Untamed Trails is a bespoke wildlife photography travel studio founded on uncompromised field ethics, intimate vehicular limits (max 4 per Gypsy), and deep animal behavior anticipation across India’s wildest national parks.
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
                  <span className="text-xs font-sans text-[#F2F0E8] group-hover:text-[#D6A85C] font-semibold">+91 90873 94546</span>
                </div>
              </a>

              <a
                href="https://wa.me/919087394546?text=Hi%20Vijay,%20I'm%20reaching%20out%20from%20Untamed%20Trails%20website%20for%20a%20Photo%20Tour%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#151815] border border-[#242923] hover:border-[#25D366]/50 transition-colors flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#080908] border border-[#242923] flex items-center justify-center text-lg text-[#25D366]">
                  💬
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#A7A59B] block">Direct WhatsApp</span>
                  <span className="text-xs font-sans text-[#F2F0E8] group-hover:text-[#25D366] font-semibold">+91 90873 94546</span>
                </div>
              </a>
            </div>

            {/* Instagram Link */}
            <div className="pt-2">
              <a
                href="https://www.instagram.com/untamed__trails__?stkn=OTU3MGI0bHR6OWZz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-sans text-[#D6A85C] hover:text-[#B87333] transition-colors"
              >
                <span>Follow our official Instagram: @untamed__trails__</span>
                <span>↗</span>
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
                      placeholder="+91 90873 94546"
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
                      <option value="animal" className="bg-[#151815]">🐅 1. Animal & Big Cat Tracking</option>
                      <option value="bird" className="bg-[#151815]">🦅 2. Bird Photography Tours</option>
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
          <p>© {new Date().getFullYear()} Untamed Trails Photography & Expeditions Pvt Ltd. All Rights Reserved.</p>
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
          </div>
        </div>
      </div>
    </footer>
  )
}
