import { useState } from 'react'

export default function SharedSafaris({ safaris, onJoinSafari, onCreateSafari }) {
  const [selectedZone, setSelectedZone] = useState('all')

  const filtered = safaris.filter((s) => {
    if (selectedZone === 'all') return true
    return s.destinationId === selectedZone
  })

  return (
    <section id="shared-safaris" className="py-20 px-4 sm:px-8 md:px-16 bg-[#0B0C0A] border-b border-[#2A2B28]/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-emerald-400 font-semibold">
                Vehicle Pooling & Community · Shared Safari 2.0
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F1EFE8] font-light leading-tight">
              Discover & Join <span className="italic text-[#B3874B] font-normal">Shared Safaris</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-2 max-w-xl font-light">
              Don't book an entire Gypsy vehicle alone. Split forest permit and guide costs with like-minded wildlife photographers and nature lovers.
            </p>
          </div>

          {/* Action: Host a Pool */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCreateSafari}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#B3874B] to-[#966d38] hover:brightness-110 text-[#0B0C0A] font-sans text-xs font-semibold tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(179,135,75,0.3)] flex items-center gap-2 cursor-pointer"
            >
              <span>+ Create / Host a Safari</span>
            </button>
          </div>
        </div>

        {/* Live Shared Safari Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filtered.map((pool) => {
            const seatsLeft = pool.totalSeats - pool.bookedSeats
            return (
              <div
                key={pool.id}
                className="group rounded-2xl bg-[#141613] border border-[#2A2B28] hover:border-[#B3874B]/70 p-6 sm:p-7 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Destination & Date */}
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/5 mb-4">
                    <div>
                      <span className="text-[10px] font-sans tracking-widest uppercase text-[#B3874B] font-semibold block mb-1">
                        📍 {pool.destinationName}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#F1EFE8] leading-tight group-hover:text-[#B3874B] transition-colors">
                        {pool.zone}
                      </h3>
                      <span className="text-xs font-sans text-[#A7A59B] mt-1 block">
                        📅 {pool.date} · 🌅 {pool.shift}
                      </span>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-xl font-serif text-[#F1EFE8] block">
                        ₹{pool.pricePerSeat.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[9px] font-sans uppercase tracking-wider text-[#888]">
                        per person / seat
                      </span>
                    </div>
                  </div>

                  {/* Gypsy Seat Visualizer (Interactive 6-Seat Map) */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-sans tracking-widest uppercase text-[#A7A59B]">
                        Gypsy Vehicle Capacity (6 Seats)
                      </span>
                      <span className={`text-[10px] font-sans font-semibold tracking-wider px-2 py-0.5 rounded ${
                        seatsLeft <= 2 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {seatsLeft} {seatsLeft === 1 ? 'SEAT' : 'SEATS'} REMAINING
                      </span>
                    </div>

                    {/* 6 Seats Graphical Layout */}
                    <div className="grid grid-cols-6 gap-2">
                      {Array.from({ length: pool.totalSeats }).map((_, idx) => {
                        const isBooked = idx < pool.bookedSeats
                        return (
                          <div
                            key={idx}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all ${
                              isBooked
                                ? 'bg-white/5 border-white/10 text-[#666]'
                                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-semibold animate-pulse'
                            }`}
                          >
                            <span className="text-base">{isBooked ? '👤' : '💺'}</span>
                            <span className="text-[8px] font-sans uppercase mt-1">
                              {isBooked ? `Seat ${idx + 1}` : 'OPEN'}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Host Bio & Photography Preferences */}
                  <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <img
                      src={pool.host.avatar}
                      alt={pool.host.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#B3874B]/50"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-xs font-semibold text-[#F1EFE8] truncate">
                          {pool.host.name}
                        </span>
                        <span className="text-[9px] font-sans px-1.5 py-0.5 rounded bg-white/10 text-[#B3874B]">
                          Host
                        </span>
                      </div>
                      <span className="font-sans text-[10px] text-[#888] block truncate">
                        📷 {pool.host.gear} · {pool.host.badge}
                      </span>
                    </div>
                  </div>

                  {/* Notes & Tags */}
                  <p className="font-sans text-xs text-[#A7A59B] leading-relaxed font-light mb-4 italic">
                    "{pool.notes}"
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {pool.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md bg-white/5 text-[10px] font-sans text-[#A7A59B] border border-white/5"
                      >
                        ✦ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Join Button */}
                <div className="pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => onJoinSafari(pool)}
                    className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-[#B3874B] text-[#F1EFE8] hover:text-[#0B0C0A] font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Reserve Seat ({seatsLeft} Left)</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
