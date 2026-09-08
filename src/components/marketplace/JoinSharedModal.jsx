import { useState, useEffect } from 'react'

export default function JoinSharedModal({ safari, onClose }) {
  const [seats, setSeats] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [gear, setGear] = useState('')
  const [confirmed, setConfirmed] = useState(false)

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

  if (!safari) return null

  const availableSeats = safari.totalSeats - safari.bookedSeats
  const totalAmount = seats * safari.pricePerSeat

  const handleSubmit = (e) => {
    e.preventDefault()
    setConfirmed(true)
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

        {!confirmed ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-sans uppercase tracking-widest text-emerald-400 font-semibold">
                Shared Gypsy Pooling · Instant Seat Lock
              </span>
            </div>

            <h3 className="font-serif text-2xl text-[#F1EFE8] mb-1">
              Join {safari.destinationName}
            </h3>
            <p className="font-sans text-xs text-[#B3874B] mb-5">
              {safari.zone} · 📅 {safari.date} ({safari.shift})
            </p>

            {/* Host summary */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3 mb-6">
              <img
                src={safari.host.avatar}
                alt={safari.host.name}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="text-xs font-sans">
                <span className="text-[#F1EFE8] font-medium block">Hosted by {safari.host.name}</span>
                <span className="text-[#888] text-[10px]">📷 {safari.host.gear}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-sans uppercase tracking-widest text-[#777] block mb-1">
                  Select Number of Seats (Max {availableSeats} Available)
                </label>
                <select
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  className="w-full py-2.5 px-3 rounded-xl bg-black/50 border border-white/10 text-sm text-[#F1EFE8] font-sans focus:outline-none focus:border-[#B3874B]"
                >
                  {Array.from({ length: availableSeats }).map((_, i) => (
                    <option key={i + 1} value={i + 1} className="bg-[#141613]">
                      {i + 1} {i === 0 ? 'Seat' : 'Seats'} (₹{((i + 1) * safari.pricePerSeat).toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-sans uppercase tracking-widest text-[#777] block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anjali Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-black/50 border border-white/10 text-sm text-[#F1EFE8] font-sans focus:outline-none focus:border-[#B3874B]"
                />
              </div>

              <div>
                <label className="text-[10px] font-sans uppercase tracking-widest text-[#777] block mb-1">
                  WhatsApp Contact Number (For Forest Permit & Group Chat)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-black/50 border border-white/10 text-sm text-[#F1EFE8] font-sans focus:outline-none focus:border-[#B3874B]"
                />
              </div>

              <div>
                <label className="text-[10px] font-sans uppercase tracking-widest text-[#777] block mb-1">
                  Camera Lens / Photography Preference (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 100-400mm / Wildlife Observer"
                  value={gear}
                  onChange={(e) => setGear(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-black/50 border border-white/10 text-sm text-[#F1EFE8] font-sans focus:outline-none focus:border-[#B3874B]"
                />
              </div>

              <div className="pt-2 border-t border-white/5 flex items-baseline justify-between text-xs font-sans">
                <span className="text-[#888]">Total Shared Pool Share:</span>
                <span className="text-xl font-serif text-[#F1EFE8]">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#B3874B] hover:bg-[#c99955] text-[#0B0C0A] font-sans text-xs font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer"
              >
                Confirm & Request Seat Lock
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mx-auto">
              ✓
            </div>
            <h3 className="font-serif text-2xl text-[#F1EFE8]">
              Seat Lock Request Sent!
            </h3>
            <p className="font-sans text-xs text-[#A7A59B] max-w-sm mx-auto font-light leading-relaxed">
              Hello <strong className="text-[#F1EFE8]">{name}</strong>, your request for {seats} seat(s) on the {safari.destinationName} Gypsy has been dispatched to {safari.host.name} and the forest desk.
            </p>
            <div className="pt-4">
              <a
                href={`https://wa.me/919087394546?text=Hi%20Vijay,%20I%20just%20reserved%20${seats}%20seat(s)%20for%20${encodeURIComponent(safari.destinationName)}%20(${encodeURIComponent(safari.zone)})%20on%20${safari.date}.%20My%20name%20is%20${encodeURIComponent(name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2.5 px-6 rounded-xl bg-[#25D366] text-[#0B0C0A] font-sans text-xs font-semibold tracking-wider uppercase"
              >
                Open WhatsApp Confirmation
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
