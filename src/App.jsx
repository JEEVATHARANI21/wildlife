import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Showreel3D from './components/Showreel3D'
import Album from './components/Album'
import Moments from './components/Moments'
import VideoSection from './components/VideoSection'
import About from './components/About'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import LegalModal from './components/LegalModal'
import WhatsAppButton from './components/WhatsAppButton'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef(null)
  const [legalModalOpen, setLegalModalOpen] = useState(false)
  const [legalTab, setLegalTab] = useState('terms')

  const openLegal = (tab = 'terms') => {
    setLegalTab(tab)
    setLegalModalOpen(true)
  }

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(() => {})
    }
  }, [])

  return (
    <div className="grain" style={{ background: 'var(--bg)' }}>
      <CustomCursor />
      <Navbar openLegal={openLegal} />
      {/* 01 Heroic Page: Sticky video hero */}
      <Hero />
      {/* Pacôme Pertant style Playful 3D Showreel featuring user photos */}
      <Showreel3D />
      {/* 03 Section 3: Interactive Album - click/swipe to change next/prev image */}
      <Album />
      {/* Moments with user specimens */}
      <Moments />
      {/* Video section */}
      <VideoSection />
      {/* About photographer */}
      <About />
      {/* Contact */}
      <Contact openLegal={openLegal} />

      {/* Terms & Privacy Policy Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalTab}
      />

      {/* Floating WhatsApp Contact & Support Button */}
      <WhatsAppButton />
    </div>
  )
}
