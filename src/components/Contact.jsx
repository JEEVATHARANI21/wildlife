import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// REPLACE WITH YOUR PHOTOGRAPH — dark forest/dusk image
const BG_IMAGE = 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80&auto=format&fit=crop'

export default function Contact({ openLegal }) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const arrowRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    )
    gsap.fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    )
  }, [])

  useEffect(() => {
    if (!arrowRef.current) return
    gsap.to(arrowRef.current, {
      x: hovered ? 8 : 0,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [hovered])

  const handleChange = (e) => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    window.location.href = `mailto:hello@untamedtrails.in?subject=Enquiry from ${formData.name}&body=${formData.message}`
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Background image */}
      <img
        src={BG_IMAGE}
        alt="Forest at dusk"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.2 }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(11,12,10,1) 0%, rgba(11,12,10,0.6) 60%, rgba(11,12,10,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 pt-16 md:pt-20 pb-24 md:pb-32 text-center">
        {/* Divider */}
        <div style={{ width: 40, height: 1, background: 'var(--border)', marginBottom: '4rem' }} />

        {/* Big statement */}
        <div ref={titleRef}>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2.5rem, 9vw, 8rem)',
              fontWeight: 300,
              color: 'var(--text)',
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
            }}
          >
            Have a Story<br />
            <span style={{ fontStyle: 'italic' }}>Worth Capturing?</span>
          </h2>
        </div>

        {/* CTA */}
        <div ref={contentRef} className="flex flex-col items-center gap-8 mt-12">
          <a
            href="mailto:hello@untamedtrails.in"
            className="group flex items-center gap-4"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <span
              className="font-sans text-sm tracking-[0.25em] uppercase"
              style={{ color: 'var(--text)' }}
            >
              Let's Talk
            </span>
            <svg
              ref={arrowRef}
              width="32" height="12" viewBox="0 0 32 12" fill="none"
            >
              <path d="M0 6h30M24 1l6 5-6 5" stroke="var(--text)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            href="mailto:hello@untamedtrails.in"
            className="font-sans text-sm"
            style={{ color: 'var(--muted)', borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}
          >
            hello@untamedtrails.in
          </a>

          {/* Minimal contact form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 mt-8 w-full"
            style={{ maxWidth: 480 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="flex-1 bg-transparent font-sans text-sm py-3 px-4"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  outline: 'none',
                  caretColor: 'var(--text)',
                }}
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 bg-transparent font-sans text-sm py-3 px-4"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  outline: 'none',
                  caretColor: 'var(--text)',
                }}
              />
            </div>
            <textarea
              name="message"
              placeholder="Tell me about your project..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="bg-transparent font-sans text-sm py-3 px-4 resize-none"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--text)',
                outline: 'none',
                caretColor: 'var(--text)',
              }}
            />
            <button
              type="submit"
              className="font-sans text-xs tracking-[0.22em] uppercase py-4 transition-all duration-300"
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text)',
              }}
              onMouseEnter={e => {
                e.target.style.background = 'var(--text)'
                e.target.style.color = 'var(--bg)'
              }}
              onMouseLeave={e => {
                e.target.style.background = 'transparent'
                e.target.style.color = 'var(--text)'
              }}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Divider */}
        <div style={{ width: 40, height: 1, background: 'var(--border)', marginTop: '5rem', marginBottom: '2rem' }} />

        {/* Footer */}
        <footer className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3 group logo-brand-group cursor-pointer">
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 shadow-2xl group-hover:border-[#B3874B]/50 transition-all duration-300">
              <img
                src="/logo-icon.png"
                alt="UntamedTrails"
                className="h-14 md:h-16 w-auto object-contain logo-icon-img animate-leopard-prowl"
                style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease' }}
              />
            </div>
            <p
              className="font-sans text-xl md:text-2xl tracking-[0.3em] uppercase font-bold text-[#F1EFE8] mt-2 logo-brand-title shimmer-gold-text"
              style={{ transition: 'letter-spacing 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              UNTAMED<span className="text-[#B3874B] font-light">TRAILS</span>
            </p>
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#888]">
              Wildlife Photography Studio
            </span>
          </div>

          <div className="flex items-center gap-6 mt-2">
            <a
              href="https://www.instagram.com/vijaymathiew_photography?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 hover:border-[#B3874B] bg-white/5 text-[#F1EFE8] hover:text-[#B3874B] font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-300 shadow-md group"
            >
              <svg
                className="w-4 h-4 text-[#B3874B] group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>@vijaymathiew_photography</span>
              <span className="text-[#888] group-hover:translate-x-0.5 transition-transform">↗</span>
            </a>
          </div>

          {/* Legal: Terms & Privacy Policy Links */}
          <div className="flex items-center gap-5 text-xs text-[#888] font-sans mt-2">
            <button
              onClick={() => openLegal && openLegal('terms')}
              className="hover:text-[#B3874B] transition-colors cursor-pointer uppercase tracking-widest text-[10px]"
            >
              Terms of Service
            </button>
            <span className="text-[#444]">·</span>
            <button
              onClick={() => openLegal && openLegal('privacy')}
              className="hover:text-[#B3874B] transition-colors cursor-pointer uppercase tracking-widest text-[10px]"
            >
              Privacy Policy
            </button>
          </div>

          <p className="font-sans text-[10px]" style={{ color: 'var(--border)' }}>
            © 2026 UNTAMEDTRAILS. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  )
}
