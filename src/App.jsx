import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Showreel3D from './components/Showreel3D'
import Album from './components/Album'
import Moments from './components/Moments'
import Birds from './components/Birds'
import Tours from './components/Tours'
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
      {/* 03 Section 3: Interactive Album - Wildlife Photography Gallery */}
      <Album />
      {/* 04 Moments: Wildlife Photography India */}
      <Moments />
      {/* 05 Avian Special: Bird Photography */}
      <Birds />
      {/* 06 Guided Expeditions: Wildlife Photography Tours */}
      <Tours />
      {/* Video section */}
      <VideoSection />
      {/* 08 About: Professional Wildlife Photographer */}
      <About />
      {/* 09 Contact: Wildlife Photographer Tamil Nadu */}
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
