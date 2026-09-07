import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VIDEO_SRC = '/videos/wild.mp4'
const TOTAL_SECONDS = 8 // 8 seconds duration

const TIMED_QUOTES = [
  { time: 0, text: 'The forest holds its breath.' },
  { time: 1.8, text: 'A shadow stirs between the leaves.' },
  { time: 3.5, text: 'Patience — the only equipment that matters.' },
  { time: 5.2, text: 'Closer now. Unhurried. Certain.' },
  { time: 6.8, text: 'One frame. One heartbeat. One truth.' },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const videoRef = useRef(null)

  const counterRef = useRef(null)
  const quoteRef = useRef(null)
  const progressRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const scrollHintRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Setup initial video state
    video.muted = true
    video.playsInline = true
    video.loop = true

    // Ensure video starts playing immediately
    const startPlay = () => {
      video.play().catch(() => {
        // Fallback for strict browser autoplay
        video.muted = true
        video.play().catch(() => {})
      })
    }
    startPlay()

    // Title entrance animations on mount
    gsap.fromTo(
      titleRef.current,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: 'power3.out' }
    )
    gsap.fromTo(
      subtitleRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, delay: 0.5, ease: 'power3.out' }
    )
    gsap.fromTo(
      scrollHintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 0.8 }
    )

    // Update time displays and quotes smoothly as video plays
    const onTimeUpdate = () => {
      if (!video) return
      // Cap/loop at 8 seconds
      if (video.currentTime >= TOTAL_SECONDS) {
        video.currentTime = 0
      }

      const cur = Math.min(video.currentTime, TOTAL_SECONDS)
      const progress = cur / TOTAL_SECONDS

      // Update progress bar
      if (progressRef.current) {
        progressRef.current.style.width = `${progress * 100}%`
      }

      // Update seconds counter: e.g. 03s / 08s
      if (counterRef.current) {
        const secs = Math.floor(cur)
        counterRef.current.textContent = `${String(secs + 1).padStart(2, '0')}s`
      }

      // Update quote based on elapsed seconds
      if (quoteRef.current) {
        const match = [...TIMED_QUOTES].reverse().find((q) => q.time <= cur)
        if (match && quoteRef.current.textContent !== match.text) {
          quoteRef.current.textContent = match.text
        }
      }
    }

    video.addEventListener('timeupdate', onTimeUpdate)

    // Sticky ScrollTrigger to seamlessly pin the 8s cinematic hero while user explores
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: stickyRef.current,
      onLeave: () => {
        // Pause when user leaves section to save GPU/battery
        video.pause()
        setIsPlaying(false)
      },
      onEnterBack: () => {
        video.play().catch(() => {})
        setIsPlaying(true)
      },
    })

    return () => {
      st.kill()
      video.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      style={{ height: '180vh', background: '#0B0C0A' }}
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
        {/* High Performance 8-Second Cinematic Video */}
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          className="absolute inset-0 w-full h-full object-cover select-none"
          autoPlay
          muted
          loop
          playsInline
          style={{
            transformOrigin: 'center center',
            filter: 'contrast(1.04) brightness(0.95)',
          }}
        />

        {/* Cinematic Vignette & Bottom Dark Gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(11,12,10,0.92) 0%, rgba(11,12,10,0.18) 55%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(11,12,10,0.6) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Top Navbar Header */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem 4rem',
            background:
              'linear-gradient(to bottom, rgba(11,12,10,0.7), transparent)',
            zIndex: 20,
          }}
        >
          <a
            href="#"
            className="group"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.45rem 0.75rem',
                borderRadius: '0.75rem',
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                transition: 'all 0.3s ease',
              }}
            >
              <img
                src="/logo-icon.png"
                alt="UntamedTrails"
                style={{
                  height: '46px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.9))',
                  transition: 'transform 0.3s ease',
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.25rem',
                  letterSpacing: '0.28em',
                  color: '#F1EFE8',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                }}
              >
                UNTAMED<span style={{ color: '#B3874B', fontWeight: 300 }}>TRAILS</span>
              </span>
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.62rem',
                  letterSpacing: '0.35em',
                  color: 'rgba(241,239,232,0.65)',
                  textTransform: 'uppercase',
                  marginTop: '0.3rem',
                  fontWeight: 400,
                }}
              >
                Wildlife Photography Studio
              </span>
            </div>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            {['WORK', 'ABOUT', 'CONTACT'].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                {l}
              </a>
            ))}
            <a
              href="https://www.instagram.com/vijaymathiew_photography?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: '#F1EFE8',
                textDecoration: 'none',
                textTransform: 'uppercase',
                padding: '0.35rem 0.85rem',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(8px)',
              }}
              title="Follow on Instagram"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B3874B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Hero Title */}
        <div
          style={{
            position: 'absolute',
            bottom: '4.5rem',
            left: '4rem',
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
            INTO THE
            <br />
            WILD
          </h1>

          <div
            ref={subtitleRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginTop: '1.5rem',
              opacity: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.28em',
                color: 'var(--muted)',
                textTransform: 'uppercase',
              }}
            >
              Wildlife Photography
            </span>
            <span
              style={{
                width: 36,
                height: 1,
                background: 'var(--border)',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: 'var(--muted)',
                textTransform: 'uppercase',
              }}
            >
              Tamil Nadu · India
            </span>
          </div>
        </div>

        {/* Dynamic Atmospheric Quote */}
        <div
          style={{
            position: 'absolute',
            bottom: '4.5rem',
            right: '4rem',
            zIndex: 20,
            textAlign: 'right',
            maxWidth: 340,
          }}
        >
          <p
            ref={quoteRef}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.25rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'rgba(241,239,232,0.7)',
              lineHeight: 1.55,
              transition: 'opacity 0.4s ease',
            }}
          >
            The forest holds its breath.
          </p>
        </div>

        {/* 8-Second Timeline Progress Bar & Time Counter */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <span
            ref={counterRef}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              color: 'var(--text)',
              tabularNums: true,
              minWidth: '3ch',
              letterSpacing: '0.05em',
            }}
          >
            01s
          </span>

          <div
            onClick={togglePlayback}
            style={{
              width: 160,
              height: 2,
              background: 'rgba(42,43,40,0.8)',
              position: 'relative',
              cursor: 'pointer',
            }}
            title={isPlaying ? 'Click to Pause' : 'Click to Play'}
          >
            <div
              ref={progressRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                background: '#10B981',
                width: '0%',
                transition: 'width 0.1s linear',
              }}
            />
          </div>

          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              color: 'var(--muted)',
              letterSpacing: '0.05em',
            }}
          >
            08s
          </span>
        </div>

        {/* Scroll To Explore Indicator */}
        <div
          ref={scrollHintRef}
          style={{
            position: 'absolute',
            right: '4rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            opacity: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.55rem',
              letterSpacing: '0.22em',
              color: 'var(--muted)',
              writingMode: 'vertical-rl',
              textTransform: 'uppercase',
            }}
          >
            Scroll to Explore
          </span>
          <div className="scroll-pulse" style={{ color: 'var(--muted)' }}>
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
              <rect
                x="1"
                y="1"
                width="12"
                height="18"
                rx="6"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="7" cy="6" r="2" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
