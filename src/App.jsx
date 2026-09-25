import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ToeholdNavbar from './components/toehold/ToeholdNavbar'
import ToursHero from './components/toehold/ToursHero'
import TourCatalog from './components/toehold/TourCatalog'
import FoundersSection from './components/toehold/FoundersSection'
import Testimonials from './components/toehold/Testimonials'
import ContactFooter from './components/toehold/ContactFooter'
import SeasonCalendarModal from './components/toehold/SeasonCalendarModal'
import PlanExpeditionModal from './components/toehold/PlanExpeditionModal'
import HomeGalleryPreview from './components/toehold/HomeGalleryPreview'

import FullGalleryView from './components/views/FullGalleryView'
import ItineraryView from './components/views/ItineraryView'
import AboutView from './components/views/AboutView'
import FAQView from './components/views/FAQView'

import CustomCursor from './components/CustomCursor'
import LegalModal from './components/LegalModal'
import WhatsAppButton from './components/WhatsAppButton'
import AdminPanel from './components/admin/AdminPanel'

import { TOURS_DATA } from './data/photoToursData'
import { useSiteContent } from './context/SiteContentContext'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const { content } = useSiteContent()
  const lenisRef = useRef(null)

  const getInitialView = () => {
    const path = window.location.pathname.toLowerCase()
    const hash = window.location.hash.toLowerCase()
    const search = window.location.search.toLowerCase()
    if (path.includes('/admin') || hash === '#admin' || search.includes('admin=true') || search.includes('view=admin')) {
      return 'admin'
    }
    return 'home'
  }

  const [currentView, setCurrentView] = useState(getInitialView) // 'home' | 'gallery' | 'about' | 'itinerary' | 'faq' | 'admin'
  const [activeCategory, setActiveCategory] = useState('animals') // 'animals' | 'birds'
  const [selectedTour, setSelectedTour] = useState(null)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [planTripModalOpen, setPlanTripModalOpen] = useState(false)
  const [legalModalOpen, setLegalModalOpen] = useState(false)
  const [legalTab, setLegalTab] = useState('terms')

  useEffect(() => {
    const handleUrlChange = () => {
      const hash = window.location.hash.toLowerCase()
      const path = window.location.pathname.toLowerCase()
      const search = window.location.search.toLowerCase()
      if (hash === '#admin' || path.includes('/admin') || search.includes('admin=true')) {
        setCurrentView('admin')
      }
    }
    window.addEventListener('hashchange', handleUrlChange)
    window.addEventListener('popstate', handleUrlChange)
    return () => {
      window.removeEventListener('hashchange', handleUrlChange)
      window.removeEventListener('popstate', handleUrlChange)
    }
  }, [])

  const handleExitAdmin = () => {
    if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname || '/')
    } else if (window.location.pathname.includes('/admin')) {
      window.history.pushState(null, '', '/')
    }
    navigateTo('home')
  }

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
    const isAdmin = currentView === 'admin'
    document.body.classList.toggle('admin-active', isAdmin)
    document.documentElement.classList.toggle('admin-active', isAdmin)

    if (!lenisRef.current) return

    if (isAdmin) {
      lenisRef.current.stop()
      // Restore native scrolling for Admin Dashboard
      document.documentElement.style.overflow = 'auto'
      document.body.style.overflow = 'auto'
      document.documentElement.style.height = 'auto'
      document.body.style.height = 'auto'
    } else if (isAnyModalOpen) {
      lenisRef.current.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenisRef.current.start()
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.height = ''
      document.documentElement.style.height = ''
    }
  }, [isAnyModalOpen, currentView])

  if (currentView === 'admin') {
    return <AdminPanel onExitAdmin={handleExitAdmin} />
  }

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
          {/* 1. Home Page / Hero */}
          <ToursHero onPlanTrip={() => setPlanTripModalOpen(true)} />

          {/* 2. Founder Section */}
          <FoundersSection
            founders={content.founders || TOURS_DATA.founders}
            onViewFullAbout={() => navigateTo('about')}
            onPlanTrip={() => setPlanTripModalOpen(true)}
            onExploreTrips={() => {
              const el = document.getElementById('packages')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          />

          {/* 3. Gallery */}
          <HomeGalleryPreview
            onViewFullGallery={() => navigateTo('gallery')}
            onPlanTrip={() => setPlanTripModalOpen(true)}
          />

          {/* 4. Tracking Package Tour Itineraries */}
          <TourCatalog
            animalTours={content.animalTours || TOURS_DATA.animalTours}
            birdTours={content.birdTours || TOURS_DATA.birdTours}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onSelectTour={handleOpenItinerary}
            onOpenCalendar={() => setCalendarOpen(true)}
          />

          {/* 5. Customer Reviews */}
          <Testimonials testimonials={TOURS_DATA.testimonials} />

          {/* 6. Ready to Plan / Contact Page */}
          <ContactFooter
            openLegal={openLegal}
            onPlanTrip={() => setPlanTripModalOpen(true)}
            onOpenAdmin={() => navigateTo('admin')}
          />
        </main>
      )}

      {/* 2026-2027 Season Departure Calendar Modal */}
      <SeasonCalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        onSelectTour={handleOpenItinerary}
        animalTours={content.animalTours || TOURS_DATA.animalTours}
        birdTours={content.birdTours || TOURS_DATA.birdTours}
      />

      {/* Plan Your Expedition Qualification Lead Funnel Modal (Enquire) */}
      <PlanExpeditionModal
        isOpen={planTripModalOpen}
        onClose={() => setPlanTripModalOpen(false)}
        openLegal={openLegal}
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
