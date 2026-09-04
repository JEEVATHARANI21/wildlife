import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// REPLACE WITH YOUR PORTRAIT PHOTOGRAPH
const PORTRAIT = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop&crop=faces'

const STATS = [
  { value: 12, suffix: '+', label: 'Years in the Wild' },
  { value: 38, suffix: '', label: 'National Parks' },
  { value: 240, suffix: '+', label: 'Species Documented' },
  { value: 18, suffix: '', label: 'Countries' },
]

function useCountUp(target, inView) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const duration = 2000
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return count
}

function StatItem({ value, suffix, label, inView, delay }) {
  const count = useCountUp(value, inView)
  return (
    <div
      className="stat-item"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="font-serif"
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 300,
          color: 'var(--text)',
          lineHeight: 1,
        }}
      >
        {count}{suffix}
      </div>
      <p
        className="font-sans text-[10px] tracking-[0.18em] uppercase mt-2"
        style={{ color: 'var(--muted)' }}
      >
        {label}
      </p>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const statsRef = useRef(null)
  const [statsInView, setStatsInView] = useState(false)

  useEffect(() => {
    // Text reveal
    const lines = textRef.current?.querySelectorAll('.about-line')
    if (lines) {
      gsap.fromTo(
        lines,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          },
        }
      )
    }

    // Stats trigger
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: 'top 80%',
      onEnter: () => {
        setStatsInView(true)
        statsRef.current?.querySelectorAll('.stat-item').forEach(el => el.classList.add('in-view'))
      },
    })
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="px-8 md:px-16 py-24 md:py-40"
      style={{ background: 'var(--bg)' }}
    >
      <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start">
        {/* Left — text */}
        <div className="md:w-6/12" ref={textRef}>
          <p className="about-line font-sans text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: 'var(--muted)' }}>
            About
          </p>

          <h2
            className="about-line font-serif mb-8"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              fontWeight: 300,
              color: 'var(--text)',
              lineHeight: 1.3,
            }}
          >
            I don't photograph animals.<br />
            <span style={{ fontStyle: 'italic' }}>I photograph the moments</span><br />
            between movement and silence.
          </h2>

          <div style={{ width: 40, height: 1, background: 'var(--border)', marginBottom: '2rem' }} className="about-line" />

          <p
            className="about-line font-sans text-sm leading-relaxed"
            style={{ color: 'var(--muted)', maxWidth: 440 }}
          >
            Twelve years in the wild have taught me that patience is the
            only equipment that truly matters. Every expedition begins with
            silence and ends with a single frame — the one that holds the
            breath of the forest, the weight of the moment, the animal in
            its complete, unguarded truth.
          </p>

          <p
            className="about-line font-sans text-sm leading-relaxed mt-5"
            style={{ color: 'var(--muted)', maxWidth: 440 }}
          >
            Based in Tamil Nadu, India. Working across Asia and Africa.
          </p>
        </div>

        {/* Right — portrait */}
        <div className="md:w-6/12 flex flex-col gap-12">
          <div
            className="overflow-hidden"
            style={{ aspectRatio: '3/4', position: 'relative' }}
          >
            <img
              src={PORTRAIT}
              alt="The Photographer"
              className="w-full h-full object-cover"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(11,12,10,0.4) 0%, transparent 60%)',
              }}
            />
          </div>

          {/* Stats grid */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-8"
          >
            {STATS.map((stat, i) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                inView={statsInView}
                delay={i * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
