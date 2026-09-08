import { useState, useEffect } from 'react'

export default function CreateSharedModal({ destinations, onClose, onCreated }) {
  const [destinationId, setDestinationId] = useState(destinations[0]?.id || '')
  const [zone, setZone] = useState('')
  const [date, setDate] = useState('')
  const [shift, setShift] = useState('Morning Safari (06:00 AM)')
  const [openSeats, setOpenSeats] = useState(3)
  const [pricePerSeat, setPricePerSeat] = useState(4000)
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    const targetDest = destinations.find((d) => d.id === destinationId)
    const newPool = {
      id: `shared-${Date.now()}`,
      destinationId,
      destinationName: targetDest?.name || 'Indian Tiger Reserve',
      zone: zone || 'Core Predator Zone',
      date: date || 'Upcoming Weekend',
      shift,
      vehicleType: 'Gypsy 4x4',
      totalSeats: 6,
      bookedSeats: 6 - Number(openSeats),
      pricePerSeat: Number(pricePerSeat),
      currency: 'INR',
      host: {
        name: 'You (Safari Host)',
        role: 'Community Host',
        avatar: '/images/hee.png',
        gear: 'Wildlife Enthusiast',
        badge: 'New Host',
      },
      tags: ['Open Gypsy Pool', 'Shared Cost', 'Equal Rotation'],
      notes: notes || 'Looking for passionate co-passengers to share forest gate costs.',
    }
    onCreated && onCreated(newPool)
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#141613] border border-[#2A2B28] p-6 sm:p-8 shadow-2xl text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#888] hover:text-[#F1EFE8] text-lg cursor-pointer"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#B3874B]" />
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#B3874B] font-semibold">
                Host a Vehicle Pool · Shared Safari 2.0
              </span>
            </div>

            <h3 className="font-serif text-2xl text-[#F1EFE8] mb-1">
              Create a Shared Safari
            </h3>
            <p className="font-sans text-xs text-[#A7A59B] mb-5 font-light">
              List vacant seats in your chartered Gypsy to reduce costs and connect with fellow wildlife explorers.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-sans uppercase tracking-widest text-[#777] block mb-1">
                  National Park / Tiger Reserve
                </label>
                <select
                  value={destinationId}
                  onChange={(e) => setDestinationId(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-black/50 border border-white/10 text-sm text-[#F1EFE8] font-sans focus:outline-none focus:border-[#B3874B]"
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id} className="bg-[#141613]">
                      {d.name} ({d.state})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-sans uppercase tracking-widest text-[#777] block mb-1">
                    Safari Zone
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zone 3 / Moharli Gate"
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-black/50 border border-white/10 text-sm text-[#F1EFE8] font-sans focus:outline-none focus:border-[#B3874B]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-sans uppercase tracking-widest text-[#777] block mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-black/50 border border-white/10 text-sm text-[#F1EFE8] font-sans focus:outline-none focus:border-[#B3874B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-sans uppercase tracking-widest text-[#777] block mb-1">
                    Shift
                  </label>
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-black/50 border border-white/10 text-xs text-[#F1EFE8] font-sans focus:outline-none focus:border-[#B3874B]"
                  >
                    <option value="Morning Safari (06:00 AM)">Morning (Dawn)</option>
                    <option value="Evening Safari (02:30 PM)">Evening (Dusk)</option>
                    <option value="Full Day Safari">Full Day Permitted</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-sans uppercase tracking-widest text-[#777] block mb-1">
                    Vacant Seats to Share
                  </label>
                  <select
                    value={openSeats}
                    onChange={(e) => setOpenSeats(Number(e.target.value))}
                    className="w-full py-2.5 px-3 rounded-xl bg-black/50 border border-white/10 text-xs text-[#F1EFE8] font-sans focus:outline-none focus:border-[#B3874B]"
                  >
                    <option value={1}>1 Seat</option>
                    <option value={2}>2 Seats</option>
                    <option value={3}>3 Seats</option>
                    <option value={4}>4 Seats</option>
                    <option value={5}>5 Seats</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-sans uppercase tracking-widest text-[#777] block mb-1">
                  Expected Cost Share Per Seat (₹ INR)
                </label>
                <input
                  type="number"
                  required
                  min={1000}
                  max={25000}
                  step={100}
                  value={pricePerSeat}
                  onChange={(e) => setPricePerSeat(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-black/50 border border-white/10 text-sm text-[#F1EFE8] font-sans focus:outline-none focus:border-[#B3874B]"
                />
              </div>

              <div>
                <label className="text-[10px] font-sans uppercase tracking-widest text-[#777] block mb-1">
                  Host Notes / Gear & Photography Preference
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Serious birders and photographers welcome. We stop for patient waterhole tracking."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-black/50 border border-white/10 text-xs text-[#F1EFE8] font-sans focus:outline-none focus:border-[#B3874B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#B3874B] hover:bg-[#c99955] text-[#0B0C0A] font-sans text-xs font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer"
              >
                Publish Shared Safari Pool
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mx-auto">
              ✓
            </div>
            <h3 className="font-serif text-2xl text-[#F1EFE8]">
              Your Shared Pool is Live!
            </h3>
            <p className="font-sans text-xs text-[#A7A59B] max-w-sm mx-auto font-light leading-relaxed">
              Your Gypsy vehicle pool has been broadcast to the community. When a traveler books a seat, you'll receive an instant WhatsApp alert.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-6 rounded-xl bg-white/10 text-[#F1EFE8] font-sans text-xs uppercase tracking-wider hover:bg-white/20"
              >
                Back to Marketplace Feed
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
