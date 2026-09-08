import { useState } from 'react'

export default function MarketplaceHero({
  destinations,
  selectedDest,
  setSelectedDest,
  selectedSpecies,
  setSelectedSpecies,
  onSearch,
}) {
  const [month, setMonth] = useState('any')
  const [safariType, setSafariType] = useState('any')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    onSearch && onSearch({ destination: selectedDest, species: selectedSpecies, month, safariType })
    const el = document.getElementById('deals')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative w-full pt-28 sm:pt-36 pb-16 px-4 sm:px-8 md:px-16 border-b border-[#2A2B28]/60 overflow-hidden bg-gradient-to-b from-[#0B0C0A] via-[#111310] to-[#0E0F0D]">
      {/* Background ambient lighting */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] pointer-events-none rounded-full blur-[140px] opacity-25"
        style={{ background: 'radial-gradient(circle, #B3874B 0%, #10B981 40%, transparent 80%)' }}
      />

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Marketplace Live Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1C18] border border-[#B3874B]/40 mb-6 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-[#B3874B] font-semibold">
            India's Premier Wildlife Travel Marketplace & Shared Safari Pool
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#F1EFE8] leading-[1.08] tracking-tight mb-5">
          Find Your Wild. <br />
          <span className="italic text-[#B3874B] font-normal">Discover, Compare & Join</span> Safaris.
        </h1>

        <p className="font-sans text-xs sm:text-sm md:text-base text-[#A7A59B] max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Connect directly with verified safari operators across 42+ Indian Tiger Reserves, discover exclusive multi-day wilderness packages, or join shared Gypsy vehicles to split costs.
        </p>

        {/* Global Omni-Search Bar (Interactive Platform Search) */}
        <form
          onSubmit={handleSearchSubmit}
          className="bg-[#161814]/95 border border-[#2A2B28] hover:border-[#B3874B]/50 transition-all duration-300 rounded-2xl p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-left"
        >
          {/* Destination Dropdown */}
          <div className="flex flex-col gap-1 p-2 rounded-xl hover:bg-white/[0.03] transition-colors">
            <label className="text-[10px] font-sans tracking-widest uppercase text-[#B3874B] font-medium flex items-center gap-1.5">
              <span>📍</span> Destination
            </label>
            <select
              value={selectedDest}
              onChange={(e) => setSelectedDest(e.target.value)}
              className="bg-transparent text-xs sm:text-sm text-[#F1EFE8] font-sans focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#141512] text-[#F1EFE8]">All National Parks</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id} className="bg-[#141512] text-[#F1EFE8]">
                  {d.name} ({d.state})
                </option>
              ))}
            </select>
          </div>

          {/* Wildlife Species Dropdown */}
          <div className="flex flex-col gap-1 p-2 rounded-xl hover:bg-white/[0.03] transition-colors">
            <label className="text-[10px] font-sans tracking-widest uppercase text-[#B3874B] font-medium flex items-center gap-1.5">
              <span>🐅</span> Wildlife Target
            </label>
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="bg-transparent text-xs sm:text-sm text-[#F1EFE8] font-sans focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#141512] text-[#F1EFE8]">Any Wildlife</option>
              <option value="Royal Bengal Tiger" className="bg-[#141512] text-[#F1EFE8]">Royal Bengal Tiger</option>
              <option value="Black Panther" className="bg-[#141512] text-[#F1EFE8]">Black Panther</option>
              <option value="Indian Leopard" className="bg-[#141512] text-[#F1EFE8]">Indian Leopard</option>
              <option value="Asiatic Elephant" className="bg-[#141512] text-[#F1EFE8]">Asiatic Elephant</option>
              <option value="One-Horned Rhinoceros" className="bg-[#141512] text-[#F1EFE8]">One-Horned Rhino</option>
            </select>
          </div>

          {/* Travel Month Dropdown */}
          <div className="flex flex-col gap-1 p-2 rounded-xl hover:bg-white/[0.03] transition-colors">
            <label className="text-[10px] font-sans tracking-widest uppercase text-[#B3874B] font-medium flex items-center gap-1.5">
              <span>📅</span> Travel Month
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-transparent text-xs sm:text-sm text-[#F1EFE8] font-sans focus:outline-none cursor-pointer"
            >
              <option value="any" className="bg-[#141512] text-[#F1EFE8]">Any Month</option>
              <option value="oct" className="bg-[#141512] text-[#F1EFE8]">October (Park Reopening)</option>
              <option value="nov" className="bg-[#141512] text-[#F1EFE8]">November (Pleasant)</option>
              <option value="dec" className="bg-[#141512] text-[#F1EFE8]">December (Winter Mist)</option>
              <option value="jan" className="bg-[#141512] text-[#F1EFE8]">January (Peak Winter)</option>
              <option value="mar" className="bg-[#141512] text-[#F1EFE8]">March – May (Peak Sightings)</option>
            </select>
          </div>

          {/* Safari Format Dropdown */}
          <div className="flex flex-col gap-1 p-2 rounded-xl hover:bg-white/[0.03] transition-colors">
            <label className="text-[10px] font-sans tracking-widest uppercase text-[#B3874B] font-medium flex items-center gap-1.5">
              <span>🚙</span> Experience
            </label>
            <select
              value={safariType}
              onChange={(e) => setSafariType(e.target.value)}
              className="bg-transparent text-xs sm:text-sm text-[#F1EFE8] font-sans focus:outline-none cursor-pointer"
            >
              <option value="any" className="bg-[#141512] text-[#F1EFE8]">All Experiences</option>
              <option value="packages" className="bg-[#141512] text-[#F1EFE8]">Safari Packages & Lodging</option>
              <option value="shared" className="bg-[#141512] text-[#F1EFE8]">Shared Gypsy Seat Pool</option>
              <option value="boat" className="bg-[#141512] text-[#F1EFE8]">Waterfront Boat Safaris</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-center justify-center p-1">
            <button
              type="submit"
              className="w-full h-full py-3.5 px-6 rounded-xl bg-[#B3874B] hover:bg-[#c99955] active:scale-[0.98] text-[#0B0C0A] font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-[0_8px_24px_rgba(179,135,75,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>EXPLORE</span>
              <span>→</span>
            </button>
          </div>
        </form>

        {/* Quick Filter Shortcut Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <span className="text-[10px] font-sans text-[#777] uppercase tracking-wider mr-1">Trending:</span>
          {[
            { label: '🔥 All Deals', dest: 'all', species: 'all' },
            { label: '🐅 Tadoba Tigers', dest: 'tadoba', species: 'Royal Bengal Tiger' },
            { label: '🐆 Kabini Black Panther', dest: 'kabini', species: 'Black Panther' },
            { label: '🏰 Ranthambore Fort Safaris', dest: 'ranthambore', species: 'all' },
            { label: '🦏 Kaziranga Rhino Drives', dest: 'kaziranga', species: 'One-Horned Rhinoceros' },
          ].map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => {
                setSelectedDest(chip.dest)
                setSelectedSpecies(chip.species)
                const el = document.getElementById('deals')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-3 py-1 rounded-full border border-white/10 hover:border-[#B3874B] bg-white/[0.04] text-[11px] font-sans text-[#A7A59B] hover:text-[#F1EFE8] transition-all cursor-pointer"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Live Trust Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/5 text-center">
          <div>
            <span className="font-serif text-2xl sm:text-3xl text-[#F1EFE8] font-light block">42+</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-[#888]">Tiger Reserves</span>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl text-[#B3874B] font-light block">180+</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-[#888]">Verified Operators</span>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl text-emerald-400 font-light block">100%</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-[#888]">Govt Forest Permits</span>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl text-[#F1EFE8] font-light block">₹0</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-[#888]">Hidden Booking Surcharges</span>
          </div>
        </div>
      </div>
    </div>
  )
}
