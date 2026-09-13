import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ToeholdNavbar from './components/toehold/ToeholdNavbar'
import ToursHero from './components/toehold/ToursHero'
import TourCatalog from './components/toehold/TourCatalog'
import FoundersSection from './components/toehold/FoundersSection'
import ExpeditionDifference from './components/toehold/ExpeditionDifference'
import Testimonials from './components/toehold/Testimonials'
import InstagramFeed from './components/toehold/InstagramFeed'
import ContactFooter from './components/toehold/ContactFooter'
import TourDetailModal from './components/toehold/TourDetailModal'
import SeasonCalendarModal from './components/toehold/SeasonCalendarModal'

import CustomCursor from './components/CustomCursor'
import LegalModal from './components/LegalModal'
import WhatsAppButton from './components/WhatsAppButton'

import { TOURS_DATA } from './data/photoToursData'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('animals') // 'animals' | 'birds'
  const [selectedTour, setSelectedTour] = useState(null)
  const [calendarOpen, setCalendarOpen] = useState(false)
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

  return (
    <div className="grain" style={{ background: '#080908', color: '#F2F0E8' }}>
      <CustomCursor />

      {/* 1. Toehold-Style Primary & Secondary Navbar */}
      <ToeholdNavbar
        onSelectCategory={setActiveCategory}
        onOpenCalendar={() => setCalendarOpen(true)}
      />

      <main>
        {/* 2. Photo Tours Hero */}
        <ToursHero />

        {/* 3. Filterable Tour Schedules (2 Distinct Categories: Animal Tracking & Bird Photography) */}
        <TourCatalog
          animalTours={TOURS_DATA.animalTours}
          birdTours={TOURS_DATA.birdTours}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onSelectTour={setSelectedTour}
          onOpenCalendar={() => setCalendarOpen(true)}
        />

        {/* 4. The 2 Founders of VM Wild Expeditions */}
        <FoundersSection founders={TOURS_DATA.founders} />

        {/* 5. The VM Wild Edge / Why Travel With Us (Toehold Style) */}
        <ExpeditionDifference features={TOURS_DATA.difference} />

        {/* 6. Guest Testimonials & Reviews */}
        <Testimonials testimonials={TOURS_DATA.testimonials} />

        {/* 7. Instagram Live Feed Grid (@vm_wild_expeditions) */}
        <InstagramFeed posts={TOURS_DATA.instagramPosts} />

        {/* 8. Contact, Inquiries & Footer */}
        <ContactFooter openLegal={openLegal} />
      </main>

      {/* Comprehensive Tour Details Modal */}
      {selectedTour && (
        <TourDetailModal
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}

      {/* 2026-2027 Season Departure Calendar Modal */}
      <SeasonCalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        onSelectTour={setSelectedTour}
        animalTours={TOURS_DATA.animalTours}
        birdTours={TOURS_DATA.birdTours}
      />

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
