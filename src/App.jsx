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
import SeasonCalendarModal from './components/toehold/SeasonCalendarModal'
import ChooseYourWild from './components/toehold/ChooseYourWild'
import PlanExpeditionModal from './components/toehold/PlanExpeditionModal'
import SpeciesExplorer from './components/toehold/SpeciesExplorer'
import EssentialGuideFAQ from './components/toehold/EssentialGuideFAQ'
import HomeGalleryPreview from './components/toehold/HomeGalleryPreview'

import FullGalleryView from './components/views/FullGalleryView'
import ItineraryView from './components/views/ItineraryView'
import AboutView from './components/views/AboutView'
import FAQView from './components/views/FAQView'

import CustomCursor from './components/CustomCursor'
import LegalModal from './components/LegalModal'
import WhatsAppButton from './components/WhatsAppButton'

import { TOURS_DATA } from './data/photoToursData'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef(null)
  const [currentView, setCurrentView] = useState('home') // 'home' | 'gallery' | 'about' | 'itinerary'
  const [activeCategory, setActiveCategory] = useState('animals') // 'animals' | 'birds'
  const [selectedTour, setSelectedTour] = useState(null)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [planTripModalOpen, setPlanTripModalOpen] = useState(false)
  const [legalModalOpen, setLegalModalOpen] = useState(false)
  const [legalTab, setLegalTab] = useState('terms')

  const openLegal = (tab = 'terms') => {
    setLegalTab(tab)
    setLegalModalOpen(true)
  }

  // Smooth scroll and view switching
  const navigateTo = (view, targetAnchor = null) => {
    setCurrentView(view)
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
    if (targetAnchor) {
      setTimeout(() => {
        const id = targetAnchor === 'destinations' ? 'tours' : targetAnchor
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 150)
    }
  }

  const handleOpenItinerary = (tour) => {
    setSelectedTour(tour)
    setCurrentView('itinerary')
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
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

  const isAnyModalOpen = Boolean(
    calendarOpen || planTripModalOpen || legalModalOpen
  )

  useEffect(() => {
    if (!lenisRef.current) return
    if (isAnyModalOpen) {
      lenisRef.current.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenisRef.current.start()
      document.body.style.overflow = ''
    }
  }, [isAnyModalOpen])

  return (
    <div className="grain" style={{ background: '#080908', color: '#F2F0E8' }}>
      <CustomCursor />

      {/* 1. Navbar with user requested layout: Logo, Name, Tagline, Destinations, Gallery, About, FAQ, Contact, Enquire */}
      <ToeholdNavbar
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenEnquire={() => setPlanTripModalOpen(true)}
      />

      {/* VIEW ROUTING */}
      {currentView === 'gallery' && (
        <FullGalleryView
          onBackToHome={() => navigateTo('home')}
          onPlanTrip={() => setPlanTripModalOpen(true)}
        />
      )}

      {currentView === 'about' && (
        <AboutView
          onBackToHome={() => navigateTo('home')}
          onPlanTrip={() => setPlanTripModalOpen(true)}
        />
      )}

      {currentView === 'faq' && (
        <FAQView
          onBackToHome={() => navigateTo('home')}
          onPlanTrip={() => setPlanTripModalOpen(true)}
        />
      )}

      {currentView === 'itinerary' && selectedTour && (
        <ItineraryView
          tour={selectedTour}
          onBack={() => navigateTo('home')}
          onPlanTrip={() => setPlanTripModalOpen(true)}
        />
      )}

      {currentView === 'home' && (
        <main>
          {/* 2. Photo Tours Hero (Page 1) */}
          <ToursHero onPlanTrip={() => setPlanTripModalOpen(true)} />

          {/* 3. Choose Your Wild (Strategic 3-Path Expedition Gateway) */}
          <ChooseYourWild
            onSelectCategory={setActiveCategory}
            onPlanTrip={() => setPlanTripModalOpen(true)}
          />

          {/* 4. Tracking Package Tour Itineraries (Sample Cards -> Click redirects to dedicated fototrails365 itinerary view) */}
          <TourCatalog
            animalTours={TOURS_DATA.animalTours}
            birdTours={TOURS_DATA.birdTours}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onSelectTour={handleOpenItinerary}
            onOpenCalendar={() => setCalendarOpen(true)}
          />

          {/* 5. Target Species Showcase (Movable cards) */}
          <SpeciesExplorer onSelectTour={handleOpenItinerary} />

          {/* 6. Gallery: 4 to 5 images + "View Full Gallery" button that redirects to dedicated page */}
          <HomeGalleryPreview
            onViewFullGallery={() => navigateTo('gallery')}
            onPlanTrip={() => setPlanTripModalOpen(true)}
          />

          {/* 7. The 2 Founders of VM Wild Expeditions (Page 2 preview) */}
          <FoundersSection
            founders={TOURS_DATA.founders}
            onViewFullAbout={() => navigateTo('about')}
          />

          {/* 8. The VM Wild Edge / Why Travel With Us */}
          <ExpeditionDifference features={TOURS_DATA.difference} />

          {/* 9. Customer Reviews / Guest Testimonials (Page 5) */}
          <Testimonials testimonials={TOURS_DATA.testimonials} />

          {/* 10. Instagram Live Feed Grid */}
          <InstagramFeed posts={TOURS_DATA.instagramPosts} />

          {/* 11. Ready to Plan / Contact Page (Page 6) */}
          <ContactFooter
            openLegal={openLegal}
            onPlanTrip={() => setPlanTripModalOpen(true)}
          />
        </main>
      )}

      {/* 2026-2027 Season Departure Calendar Modal */}
      <SeasonCalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        onSelectTour={handleOpenItinerary}
        animalTours={TOURS_DATA.animalTours}
        birdTours={TOURS_DATA.birdTours}
      />

      {/* Plan Your Expedition Qualification Lead Funnel Modal (Enquire) */}
      <PlanExpeditionModal
        isOpen={planTripModalOpen}
        onClose={() => setPlanTripModalOpen(false)}
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
