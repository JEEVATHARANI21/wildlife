import { useRef, useState } from 'react'

// REPLACE WITH YOUR CINEMATIC WILDLIFE VIDEO
// Drop your .mp4 file at: public/videos/wild.mp4
const VIDEO_SRC = null  // set to '/videos/wild.mp4' once you have footage

// REPLACE WITH YOUR PHOTOGRAPH
const BG_IMAGE = 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=1920&q=80&auto=format&fit=crop'

export default function VideoSection() {
  const videoRef = useRef(null)
  const [soundOn, setSoundOn] = useState(false)
  const [playing, setPlaying] = useState(false)

  const handleSound = () => {
    if (!videoRef.current) return
    videoRef.current.muted = soundOn
    setSoundOn(!soundOn)
  }

  const handlePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setPlaying(!playing)
  }

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{
        minHeight: '80vh',
        background: 'var(--bg)',
      }}
    >
      {/* Background (image if no video yet) */}
      {!VIDEO_SRC && (
        <img
          src={BG_IMAGE}
          alt="Wildlife cinematic"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        />
      )}

      {/* Actual video */}
      {VIDEO_SRC && (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
          style={{ opacity: 0.55 }}
        />
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(11,12,10,0.85) 0%, rgba(11,12,10,0.4) 50%, rgba(11,12,10,0.7) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 py-24 gap-10">
        {/* Divider */}
        <div style={{ width: 40, height: 1, background: 'var(--border)' }} />

        <div>
          <p
            className="font-sans text-[10px] tracking-[0.3em] uppercase mb-5"
            style={{ color: 'var(--muted)' }}
          >
            In Motion
          </p>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 300,
              color: 'var(--text)',
              letterSpacing: '0.05em',
              lineHeight: 0.95,
            }}
          >
            Watch the Wild
          </h2>
        </div>

        {/* Play button */}
        <button
          onClick={VIDEO_SRC ? handlePlay : undefined}
          className="group flex items-center gap-4 mt-4 transition-all duration-300"
          style={{ opacity: VIDEO_SRC ? 1 : 0.4 }}
          title={VIDEO_SRC ? 'Play / Pause' : 'Drop your video at public/videos/wild.mp4'}
        >
          {/* Circle play icon */}
          <div
            style={{
              width: 64,
              height: 64,
              border: '1px solid rgba(241,239,232,0.3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.3s ease, background 0.3s ease',
            }}
            className="group-hover:border-[rgba(241,239,232,0.7)]"
          >
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M1 1l12 7L1 15V1z" fill="var(--text)" />
            </svg>
          </div>
          <span
            className="font-sans text-xs tracking-[0.2em] uppercase"
            style={{ color: 'var(--muted)' }}
          >
            {playing ? 'Pause' : 'Play'} Experience
          </span>
        </button>

        {/* Sound toggle */}
        {VIDEO_SRC && (
          <button
            onClick={handleSound}
            className="flex items-center gap-2 mt-2"
          >
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
              <path d="M1 4h3l4-3v12l-4-3H1V4z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              {soundOn && (
                <>
                  <path d="M11 2c1.5 1 2.5 2.8 2.5 5s-1 4-2.5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <path d="M13 0c2.5 1.8 4 4.6 4 7s-1.5 5.2-4 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </>
              )}
            </svg>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
              {soundOn ? 'Sound On' : 'Sound Off'}
            </span>
          </button>
        )}

        {/* Divider */}
        <div style={{ width: 40, height: 1, background: 'var(--border)' }} />
      </div>
    </section>
  )
}
