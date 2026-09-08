import { useState } from 'react'
import MarketplaceHero from './MarketplaceHero'
import SafariDeals from './SafariDeals'
import SharedSafaris from './SharedSafaris'
import DestinationsHub from './DestinationsHub'
import OperatorDirectory from './OperatorDirectory'
import PackageDetailModal from './PackageDetailModal'
import JoinSharedModal from './JoinSharedModal'
import CreateSharedModal from './CreateSharedModal'

import {
  DESTINATIONS as INITIAL_DESTS,
  PACKAGES as INITIAL_PKGS,
  SHARED_SAFARIS as INITIAL_SHARED,
  OPERATORS as INITIAL_OPS,
} from '../../data/marketplaceData'

export default function MarketplacePlatform() {
  const [destinations] = useState(INITIAL_DESTS)
  const [packages] = useState(INITIAL_PKGS)
  const [sharedSafaris, setSharedSafaris] = useState(INITIAL_SHARED)
  const [operators] = useState(INITIAL_OPS)

  // Filter States
  const [selectedDest, setSelectedDest] = useState('all')
  const [selectedSpecies, setSelectedSpecies] = useState('all')

  // Modal States
  const [activePackage, setActivePackage] = useState(null)
  const [activeJoinSafari, setActiveJoinSafari] = useState(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const handleSearch = ({ destination, species }) => {
    setSelectedDest(destination)
    setSelectedSpecies(species)
  }

  const handleCreatedSafari = (newPool) => {
    setSharedSafaris((prev) => [newPool, ...prev])
  }

  return (
    <div id="marketplace" className="relative w-full">
      {/* 1. Global Omni-Search Hero */}
      <MarketplaceHero
        destinations={destinations}
        selectedDest={selectedDest}
        setSelectedDest={setSelectedDest}
        selectedSpecies={selectedSpecies}
        setSelectedSpecies={setSelectedSpecies}
        onSearch={handleSearch}
      />

      {/* 2. Shared Safari 2.0 (The Major Differentiator) */}
      <SharedSafaris
        safaris={sharedSafaris}
        onJoinSafari={(safari) => setActiveJoinSafari(safari)}
        onCreateSafari={() => setCreateModalOpen(true)}
      />

      {/* 3. Discover Best Safari Deals (Conversion-Oriented Deal Cards) */}
      <SafariDeals
        packages={packages}
        selectedDest={selectedDest}
        onSelectPackage={(pkg) => setActivePackage(pkg)}
      />

      {/* 4. National Parks & Destinations Hub */}
      <DestinationsHub
        destinations={destinations}
        onSelectDestination={(destId) => setSelectedDest(destId)}
      />

      {/* 5. Verified Operators Directory */}
      <OperatorDirectory operators={operators} />

      {/* Interactive Modals */}
      {activePackage && (
        <PackageDetailModal
          pkg={activePackage}
          onClose={() => setActivePackage(null)}
        />
      )}

      {activeJoinSafari && (
        <JoinSharedModal
          safari={activeJoinSafari}
          onClose={() => setActiveJoinSafari(null)}
        />
      )}

      {createModalOpen && (
        <CreateSharedModal
          destinations={destinations}
          onClose={() => setCreateModalOpen(false)}
          onCreated={handleCreatedSafari}
        />
      )}
    </div>
  )
}
