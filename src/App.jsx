import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ToeholdNavbar from './components/toehold/ToeholdNavbar'
import ToursHero from './components/toehold/ToursHero'
import FeaturedTours from './components/toehold/FeaturedTours'
import TourCatalog from './components/toehold/TourCatalog'
import FoundersSection from './components/toehold/FoundersSection'
import ExpeditionDifference from './components/toehold/ExpeditionDifference'
import Testimonials from './components/toehold/Testimonials'
import InstagramFeed from './components/toehold/InstagramFeed'
import ContactFooter from './components/toehold/ContactFooter'
import TourDetailModal from './components/toehold/TourDetailModal'

import CustomCursor from './components/CustomCursor'
import LegalModal from './components/LegalModal'
import WhatsAppButton from './components/WhatsAppButton'

import { TOURS_DATA } from './data/photoToursData'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('animals') // 'animals' | 'birds'
  const [selectedTour, setSelectedTour] = useState(null)
  const [legalModalOpen, setLegalModalOpen] = useState(false)
  const [legalTab, setLegalTab] = useState('terms')

  const openLegal = (tab = 'terms') => {
    setLegalTab(tab)
    setLegalModalOpen(true)
  }

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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

  // Featured flagship tours: mix of animal & bird tracks
  const featuredTours = [
    TOURS_DATA.animalTours[0], // Tadoba Feline Fortune
    TOURS_DATA.animalTours[1], // Kabini Viceroy's Vista
    TOURS_DATA.birdTours[0],   // Shola Endemics Valparai
    TOURS_DATA.birdTours[1],   // Bharatpur Keoladeo
  ]

  return (
    <div className="grain" style={{ background: '#080908', color: '#F2F0E8' }}>
      <CustomCursor />

      {/* 1. Toehold-Style Primary & Secondary Navbar */}
      <ToeholdNavbar />

      <main>
        {/* 2. Photo Tours Hero with Quote & Two-Track Switcher */}
        <ToursHero onSelectCategory={setActiveCategory} />

        {/* 3. Featured Flagship Expeditions */}
        <FeaturedTours tours={featuredTours} onSelectTour={setSelectedTour} />

        {/* 4. Filterable Tour Schedules (2 Distinct Categories: Animal Tracking & Bird Photography) */}
        <TourCatalog
          animalTours={TOURS_DATA.animalTours}
          birdTours={TOURS_DATA.birdTours}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onSelectTour={setSelectedTour}
        />

        {/* 5. The 2 Founders of VM Wild Expeditions */}
        <FoundersSection founders={TOURS_DATA.founders} />

        {/* 6. The VM Wild Edge / Why Travel With Us (Toehold Style) */}
        <ExpeditionDifference features={TOURS_DATA.difference} />

        {/* 7. Guest Testimonials & Reviews */}
        <Testimonials testimonials={TOURS_DATA.testimonials} />

        {/* 8. Instagram Live Feed Grid (@vm_wild_expeditions) */}
        <InstagramFeed posts={TOURS_DATA.instagramPosts} />

        {/* 9. Contact, Inquiries & Footer */}
        <ContactFooter openLegal={openLegal} />
      </main>

      {/* Comprehensive Tour Details Modal */}
      {selectedTour && (
        <TourDetailModal
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}

      {/* Terms & Privacy Policy Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalTab}
      />

      {/* Floating WhatsApp Quick Connect */}
      <WhatsAppButton />
    </div>
  )
}
