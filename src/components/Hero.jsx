import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FRAME_TOTAL = 136
const getFrameSrc = (i) =>
  `/images/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`

const QUOTES = [
  { frame: 1,   text: 'The forest holds its breath.' },
  { frame: 20,  text: 'A shadow stirs between the leaves.' },
  { frame: 45,  text: 'Patience — the only equipment that matters.' },
  { frame: 70,  text: 'Closer now. Unhurried. Certain.' },
  { frame: 100, text: 'The moment before everything changes.' },
  { frame: 125, text: 'One frame. One heartbeat. One truth.' },
]

export default function Hero() {
  const sectionRef  = useRef(null)
  const stickyRef   = useRef(null)
  const canvasRef   = useRef(null)
  const counterRef  = useRef(null)
  const quoteRef    = useRef(null)
  const progressRef = useRef(null)
  const titleRef    = useRef(null)
  const subtitleRef = useRef(null)
  const scrollHintRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false }) // Hardware accelerated, no alpha overhead

    // Allocate frame array (loaded lazily in batches)
    const images = new Array(FRAME_TOTAL)
    let currentFrame = 0
    let rafId = null

    const loadFrame = (index) => {
      if (index < 0 || index >= FRAME_TOTAL) return null
      if (!images[index]) {
        const img = new Image()
        img.src = getFrameSrc(index + 1)
        images[index] = img
        img.onload = () => {
          if (currentFrame === index) {
            renderFrame(index)
          }
        }
      }
      return images[index]
    }

    // Step 1: Immediately load first 10 frames and key milestone frames
    for (let i = 0; i < 15; i++) loadFrame(i)
    for (let i = 20; i < FRAME_TOTAL; i += 10) loadFrame(i)

    // Step 2: Progressively load the rest in idle time without freezing the browser
    const preloadRest = () => {
      let nextToLoad = 0
      const loadNextBatch = () => {
        const batchEnd = Math.min(nextToLoad + 6, FRAME_TOTAL)
        for (let i = nextToLoad; i < batchEnd; i++) {
          loadFrame(i)
        }
        nextToLoad = batchEnd
        if (nextToLoad < FRAME_TOTAL) {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(loadNextBatch, { timeout: 1000 })
          } else {
            setTimeout(loadNextBatch, 50)
          }
        }
      }
      loadNextBatch()
    }
    setTimeout(preloadRest, 200)

    // Size canvas (cap devicePixelRatio at 1.5 to prevent massive 4K canvas lag)
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => {
      if (!canvas) return
      canvas.width = Math.floor(canvas.offsetWidth * dpr)
      canvas.height = Math.floor(canvas.offsetHeight * dpr)
      renderFrame(currentFrame)
    }

    const renderFrame = (index) => {
      if (!canvas || !ctx) return
      const img = loadFrame(index)
      if (!img || !img.complete || img.naturalWidth === 0) return

      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      // Cover-fit calculation
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      const dx = (w - dw) / 2
      const dy = (h - dh) / 2

      ctx.drawImage(img, dx, dy, dw, dh)

      // Subtle vignette
      const grad = ctx.createRadialGradient(w / 2, h / 2, h * 0.15, w / 2, h / 2, h * 0.85)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(1, 'rgba(11,12,10,0.65)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)
    }

    // Intro entrance animation
    const firstImg = loadFrame(0)
    const onFirstLoad = () => {
      resize()
      renderFrame(0)
      gsap.fromTo(titleRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: 'power3.out' }
      )
      gsap.fromTo(subtitleRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, delay: 0.5, ease: 'power3.out' }
      )
      gsap.fromTo(scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.8 }
      )
    }

    if (firstImg.complete) {
      onFirstLoad()
    } else {
      firstImg.onload = onFirstLoad
    }

    window.addEventListener('resize', resize)
    resize()

    // Smooth scroll trigger with requestAnimationFrame throttling
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: stickyRef.current,
      onUpdate: (self) => {
        const idx = Math.min(
          FRAME_TOTAL - 1,
          Math.floor(self.progress * (FRAME_TOTAL - 1))
        )
        if (idx !== currentFrame) {
          currentFrame = idx
          // Preload adjacent frames
          loadFrame(idx - 1)
          loadFrame(idx + 1)
          loadFrame(idx + 2)

          if (rafId) cancelAnimationFrame(rafId)
          rafId = requestAnimationFrame(() => {
            renderFrame(idx)
          })
        }

        if (counterRef.current) {
          counterRef.current.textContent = String(idx + 1).padStart(3, '0')
        }
        if (progressRef.current) {
          progressRef.current.style.width = `${self.progress * 100}%`
        }
        if (quoteRef.current) {
          const q = QUOTES.slice().reverse().find(q => q.frame <= idx + 1)
          if (q) quoteRef.current.textContent = q.text
        }
      },
    })

    return () => {
      st.kill()
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ height: '450vh', background: '#0B0C0A' }}
    >
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100svh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* CANVAS */}
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />

        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(11,12,10,0.88) 0%, rgba(11,12,10,0.1) 55%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Top Navbar Header */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1.5rem 4rem',
            background: 'linear-gradient(to bottom, rgba(11,12,10,0.7), transparent)',
            zIndex: 20,
          }}
        >
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="UntamedTrails"
              style={{ width: '34px', height: '34px', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
            />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.25em',
              color: 'var(--text)',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}>
              UNTAMED<span style={{ color: 'var(--muted)', fontWeight: 300 }}>TRAILS</span>
            </span>
          </a>
          <div style={{ display: 'flex', gap: '2.5rem' }}>
            {['WORK', 'ABOUT', 'CONTACT'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: 'var(--muted)',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}>{l}</a>
            ))}
          </div>
        </div>

        {/* TITLE */}
        <div
          style={{
            position: 'absolute', bottom: '4.5rem', left: '4rem',
            zIndex: 20,
          }}
        >
          <h1
            ref={titleRef}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(4rem, 11vw, 10rem)',
              fontWeight: 300,
              color: 'var(--text)',
              lineHeight: 0.88,
              letterSpacing: '0.1em',
              opacity: 0,
            }}
          >
            INTO THE<br />WILD
          </h1>
          <div
            ref={subtitleRef}
            style={{
              display: 'flex', alignItems: 'center', gap: '1.5rem',
              marginTop: '1.5rem', opacity: 0,
            }}
          >
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
            }}>Wildlife Photography</span>
            <span style={{ width: 36, height: 1, background: 'var(--border)', display: 'inline-block' }} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
            }}>Tamil Nadu · India</span>
          </div>
        </div>

        {/* QUOTE */}
        <div style={{
          position: 'absolute', bottom: '4.5rem', right: '4rem',
          zIndex: 20, textAlign: 'right', maxWidth: 320,
        }}>
          <p
            ref={quoteRef}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.25rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'rgba(241,239,232,0.65)',
              lineHeight: 1.55,
              transition: 'opacity 0.4s ease',
            }}
          >
            The forest holds its breath.
          </p>
        </div>

        {/* FRAME COUNTER + PROGRESS */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          <span
            ref={counterRef}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              color: 'var(--text)',
              tabularNums: true,
              minWidth: '3ch',
            }}
          >001</span>

          <div style={{
            width: 160, height: 1,
            background: 'rgba(42,43,40,0.8)',
            position: 'relative',
          }}>
            <div
              ref={progressRef}
              style={{
                position: 'absolute', top: 0, left: 0,
                height: '100%',
                background: 'rgba(241,239,232,0.6)',
                width: '0%',
                transition: 'width 0.08s linear',
              }}
            />
          </div>

          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.65rem',
            color: 'var(--muted)',
          }}>{String(FRAME_TOTAL).padStart(3, '0')}</span>
        </div>

        {/* SCROLL HINT */}
        <div
          ref={scrollHintRef}
          style={{
            position: 'absolute', right: '4rem', top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20, opacity: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '0.75rem',
          }}
        >
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.55rem',
            letterSpacing: '0.22em',
            color: 'var(--muted)',
            writingMode: 'vertical-rl',
            textTransform: 'uppercase',
          }}>Scroll to Explore</span>
          <div className="scroll-pulse" style={{ color: 'var(--muted)' }}>
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
              <rect x="1" y="1" width="12" height="18" rx="6" stroke="currentColor" strokeWidth="1"/>
              <circle cx="7" cy="6" r="2" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
