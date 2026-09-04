import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// REPLACE WITH YOUR PHOTOGRAPH — dark forest/dusk image
const BG_IMAGE = 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80&auto=format&fit=crop'

export default function Contact() {
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
      style={{ minHeight: '100svh', background: 'var(--bg)' }}
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-24 text-center">
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
        <footer className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="UntamedTrails"
              className="w-10 h-10 object-contain drop-shadow-md"
            />
            <p
              className="font-sans text-sm tracking-[0.25em] uppercase font-medium"
              style={{ color: 'var(--text)' }}
            >
              UNTAMED<span style={{ color: 'var(--muted)', fontWeight: 300 }}>TRAILS</span>
            </p>
          </div>
          <div className="flex items-center gap-6">
            {['Instagram', 'Behance', 'LinkedIn'].map(s => (
              <a
                key={s}
                href="#"
                className="font-sans text-[10px] tracking-[0.18em] uppercase nav-link"
                style={{ color: 'var(--muted)' }}
              >
                {s}
              </a>
            ))}
          </div>
          <p className="font-sans text-[10px]" style={{ color: 'var(--border)' }}>
            © 2026 UNTAMEDTRAILS. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  )
}
