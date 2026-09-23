import { createContext, useContext, useState, useEffect } from 'react'
import { TOURS_DATA } from '../data/photoToursData'
import { GALLERY_IMAGES } from '../data/galleryData'

const STORAGE_KEY = 'vm_wild_site_content_v2'

export const DEFAULT_CONTENT = {
  brand: {
    siteName: 'VM Wild Expeditions',
    tagline: 'Beyond the Map. Into the Wild.',
    logoUrl: '/logo-clean.png',
  },
  social: {
    instagramUrl: 'https://www.instagram.com/vm_wild_expeditions?stkn=OTU3MGI0bHR6OWZz',
    instagramHandle: '@vm_wild_expeditions',
    whatsappNumber: '919087394546',
    contactEmail: 'admissions@vmwild.com',
  },
  hero: {
    eyebrow: 'THE PINNACLE OF WILDLIFE PHOTOGRAPHY',
    headlinePart1: 'Bespoke Photographic',
    headlinePart2: 'Expeditions',
    description: 'Masterclass field tracking, intimate vehicular limits (max 4 per Gypsy), and deep animal behavior anticipation with expedition mentors across India’s wildest national parks.',
    heroBgImage: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=1920&q=85&auto=format&fit=crop',
  },
  founders: TOURS_DATA.founders || [],
  animalTours: TOURS_DATA.animalTours || [],
  birdTours: TOURS_DATA.birdTours || [],
  galleryImages: GALLERY_IMAGES || [],
  adminSettings: {
    passcode: 'vmwild2026',
  },
}

const SiteContentContext = createContext(null)

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          ...DEFAULT_CONTENT,
          ...parsed,
          brand: { ...DEFAULT_CONTENT.brand, ...(parsed.brand || {}) },
          social: { ...DEFAULT_CONTENT.social, ...(parsed.social || {}) },
          hero: { ...DEFAULT_CONTENT.hero, ...(parsed.hero || {}) },
          adminSettings: { ...DEFAULT_CONTENT.adminSettings, ...(parsed.adminSettings || {}) },
        }
      }
    } catch (e) {
      console.error('Failed to load saved site content', e)
    }
    return DEFAULT_CONTENT
  })

  // Persist to localStorage whenever content updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    } catch (e) {
      console.error('Failed to save site content to localStorage', e)
    }
  }, [content])

  const updateBrand = (newBrand) => {
    setContent((prev) => ({
      ...prev,
      brand: { ...prev.brand, ...newBrand },
    }))
  }

  const updateSocial = (newSocial) => {
    setContent((prev) => ({
      ...prev,
      social: { ...prev.social, ...newSocial },
    }))
  }

  const updateHero = (newHero) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...newHero },
    }))
  }

  const updateFounders = (newFounders) => {
    setContent((prev) => ({
      ...prev,
      founders: newFounders,
    }))
  }

  const updateFounder = (index, founderData) => {
    setContent((prev) => {
      const updated = [...prev.founders]
      updated[index] = { ...updated[index], ...founderData }
      return { ...prev, founders: updated }
    })
  }

  const updateTours = (category, newTours) => {
    setContent((prev) => ({
      ...prev,
      [category === 'animals' ? 'animalTours' : 'birdTours']: newTours,
    }))
  }

  const updateSingleTour = (category, tourId, tourData) => {
    const key = category === 'animals' ? 'animalTours' : 'birdTours'
    setContent((prev) => ({
      ...prev,
      [key]: prev[key].map((t) => (t.id === tourId ? { ...t, ...tourData } : t)),
    }))
  }

  const updateGallery = (newGallery) => {
    setContent((prev) => ({
      ...prev,
      galleryImages: newGallery,
    }))
  }

  const updateAdminSettings = (newSettings) => {
    setContent((prev) => ({
      ...prev,
      adminSettings: { ...prev.adminSettings, ...newSettings },
    }))
  }

  const resetToDefaults = () => {
    setContent(DEFAULT_CONTENT)
    localStorage.removeItem(STORAGE_KEY)
  }

  const exportContentJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', 'vm_wild_site_content_backup.json')
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const importContentJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString)
      setContent({
        ...DEFAULT_CONTENT,
        ...parsed,
      })
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  return (
    <SiteContentContext.Provider
      value={{
        content,
        updateBrand,
        updateSocial,
        updateHero,
        updateFounders,
        updateFounder,
        updateTours,
        updateSingleTour,
        updateGallery,
        updateAdminSettings,
        resetToDefaults,
        exportContentJSON,
        importContentJSON,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent() {
  const context = useContext(SiteContentContext)
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider')
  }
  return context
}
