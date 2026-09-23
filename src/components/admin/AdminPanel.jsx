import { useState, useRef } from 'react'
import { useSiteContent } from '../../context/SiteContentContext'

export default function AdminPanel({ onExitAdmin }) {
  const {
    content,
    updateBrand,
    updateSocial,
    updateHero,
    updateFounder,
    updateSingleTour,
    updateAdminSettings,
    resetToDefaults,
    exportContentJSON,
    importContentJSON,
  } = useSiteContent()

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('vm_wild_admin_auth') === 'true'
  })
  const [passcodeInput, setPasscodeInput] = useState('')
  const [authError, setAuthError] = useState('')

  // Active Tab: 'brand' | 'social' | 'hero' | 'founders' | 'tours' | 'backup'
  const [activeTab, setActiveTab] = useState('brand')
  const [toastMessage, setToastMessage] = useState('')
  const fileInputRef = useRef(null)

  const showToast = (msg = 'Changes saved successfully!') => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const validPass = content.adminSettings?.passcode || 'vmwild2026'
    if (passcodeInput.trim() === validPass) {
      setIsAuthenticated(true)
      sessionStorage.setItem('vm_wild_admin_auth', 'true')
      setAuthError('')
    } else {
      setAuthError('Incorrect passcode. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('vm_wild_admin_auth')
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const res = importContentJSON(event.target.result)
      if (res.success) {
        showToast('Backup restored successfully!')
      } else {
        alert('Invalid JSON backup file: ' + res.error)
      }
    }
    reader.readAsText(file)
  }

  // 1. Password Protected Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080908] text-[#F2F0E8] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#111511] border border-[#242923] shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#181e18] border border-[#D6A85C]/40 flex items-center justify-center text-2xl shadow-lg">
            🔐
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] mb-2 font-light">
            VM Wild <span className="italic text-[#D6A85C]">Admin Portal</span>
          </h1>
          <p className="font-sans text-xs text-[#A7A59B] mb-8 font-light">
            Enter your secret master passcode to customize website content, logos, tours, and media.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-[10.5px] font-sans uppercase tracking-widest text-[#D6A85C] block mb-1.5 font-semibold">
                Master Passcode
              </label>
              <input
                type="password"
                required
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full py-3 px-4 rounded-xl bg-[#080908] border border-[#242923] focus:border-[#D6A85C] text-sm text-[#F2F0E8] font-sans outline-none transition-colors"
              />
              {authError && (
                <p className="text-red-400 text-xs font-sans mt-2">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] text-xs font-sans uppercase tracking-wider font-bold hover:shadow-[0_4px_22px_rgba(214,168,92,0.45)] transition-all cursor-pointer"
            >
              Unlock Dashboard →
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#242923] flex items-center justify-between text-xs font-sans text-[#A7A59B]">
            <span>Default: <code className="text-[#D6A85C]">vmwild2026</code></span>
            <button
              onClick={onExitAdmin}
              className="text-[#D6A85C] hover:underline cursor-pointer"
            >
              ← Back to Site
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080908] text-[#F2F0E8] flex flex-col font-sans select-none">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0d100d]/95 backdrop-blur-md border-b border-[#242923] px-5 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#151815] border border-[#D6A85C]/40 flex items-center justify-center text-sm">
            ⚙️
          </div>
          <div>
            <h1 className="font-serif text-base sm:text-lg text-[#F2F0E8] font-semibold leading-tight flex items-center gap-2">
              <span>VM Wild CMS</span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Live Sync Active
              </span>
            </h1>
            <p className="text-[10px] text-[#A7A59B]">All edits instantly update the live site</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportContentJSON}
            className="hidden sm:inline-flex items-center gap-1.5 py-2 px-3.5 rounded-full bg-[#151815] hover:bg-[#1f241f] border border-[#242923] text-xs text-[#D6A85C] hover:border-[#D6A85C] transition-all cursor-pointer"
            title="Download JSON Backup"
          >
            <span>⬇️</span>
            <span>Export Backup</span>
          </button>

          <button
            onClick={onExitAdmin}
            className="py-2 px-4 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] text-xs font-sans uppercase tracking-wider font-bold shadow-md hover:shadow-[0_2px_14px_rgba(214,168,92,0.4)] transition-all cursor-pointer"
          >
            👁️ View Live Website
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-[#151815] text-[#A7A59B] hover:text-red-400 border border-[#242923] transition-colors cursor-pointer"
            title="Lock & Exit"
          >
            🔒
          </button>
        </div>
      </header>

      {/* Main Admin Content Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="p-3 bg-[#111511] rounded-2xl border border-[#242923] space-y-1">
            {[
              { id: 'brand', label: '🏢 Brand & Logo', desc: 'Site name, logo, tagline' },
              { id: 'social', label: '🔗 Social & Contact', desc: 'Instagram, WhatsApp, email' },
              { id: 'hero', label: '🌅 Hero Banner', desc: 'Headlines & hero photo' },
              { id: 'founders', label: '👥 Founders & Mentors', desc: 'Vijay & Jayavignesh' },
              { id: 'tours', label: '🦁 Photo Tours', desc: 'Animal & Bird expeditions' },
              { id: 'backup', label: '⚙️ Backup & Security', desc: 'Export, import, passcode' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-3 rounded-xl transition-all duration-200 cursor-pointer flex flex-col ${
                  activeTab === tab.id
                    ? 'bg-[#1b221b] border border-[#D6A85C]/60 text-[#F2F0E8] shadow-sm'
                    : 'text-[#A7A59B] hover:text-[#F2F0E8] hover:bg-[#151815]'
                }`}
              >
                <span className="text-xs font-semibold tracking-wide flex items-center justify-between">
                  <span>{tab.label}</span>
                  {activeTab === tab.id && <span className="text-[#D6A85C] text-xs">●</span>}
                </span>
                <span className="text-[10px] text-[#A7A59B] mt-0.5">{tab.desc}</span>
              </button>
            ))}
          </div>

          {/* Quick Help Card */}
          <div className="p-4 rounded-2xl bg-[#0a0d0a] border border-[#242923] text-xs text-[#A7A59B] space-y-2">
            <span className="text-[#D6A85C] font-semibold block">💡 How It Works</span>
            <p className="text-[11px] leading-relaxed">
              Every edit you save is immediately active across the site in real time. Download a backup JSON whenever you wish to commit changes to GitHub.
            </p>
          </div>
        </aside>

        {/* Right Main Editor Panel */}
        <main className="lg:col-span-9 bg-[#111511] p-6 sm:p-8 rounded-3xl border border-[#242923] shadow-xl">
          {/* TAB 1: Brand & Logo */}
          {activeTab === 'brand' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#F2F0E8]">Brand & Logo Configuration</h2>
                <p className="text-xs text-[#A7A59B] mt-1">
                  Customize the brand identity, logo graphic, and header tagline displayed on all pages.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="space-y-1.5">
                  <label className="text-[10.5px] uppercase tracking-wider text-[#D6A85C] font-semibold block">
                    Website Brand Name
                  </label>
                  <input
                    type="text"
                    value={content.brand?.siteName || ''}
                    onChange={(e) => updateBrand({ siteName: e.target.value })}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#080908] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10.5px] uppercase tracking-wider text-[#D6A85C] font-semibold block">
                    Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={content.brand?.tagline || ''}
                    onChange={(e) => updateBrand({ tagline: e.target.value })}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#080908] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-[10.5px] uppercase tracking-wider text-[#D6A85C] font-semibold block">
                  Website Logo Image URL
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <input
                    type="text"
                    value={content.brand?.logoUrl || ''}
                    onChange={(e) => updateBrand({ logoUrl: e.target.value })}
                    placeholder="/logo-clean.png or image URL or /images/MYLOGO.jpeg"
                    className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#080908] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => updateBrand({ logoUrl: '/images/MYLOGO.jpeg' })}
                    className="py-2.5 px-4 rounded-xl bg-[#1b221b] border border-[#242923] hover:border-[#D6A85C] text-xs text-[#D6A85C] whitespace-nowrap cursor-pointer"
                  >
                    Use Uploaded MYLOGO.jpeg
                  </button>
                  <button
                    type="button"
                    onClick={() => updateBrand({ logoUrl: '/logo-clean.png' })}
                    className="py-2.5 px-4 rounded-xl bg-[#151815] border border-[#242923] hover:border-[#A7A59B] text-xs text-[#A7A59B] whitespace-nowrap cursor-pointer"
                  >
                    Reset to Default Logo
                  </button>
                </div>

                {/* Logo Live Preview */}
                <div className="p-4 rounded-2xl bg-[#080908] border border-[#242923] flex items-center gap-4">
                  <span className="text-xs text-[#A7A59B]">Logo Preview:</span>
                  <div className="h-12 w-28 bg-[#121512] rounded-xl border border-[#242923] flex items-center justify-center p-2">
                    <img
                      src={content.brand?.logoUrl || '/logo-clean.png'}
                      alt="Logo preview"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.src = '/logo-clean.png'
                      }}
                    />
                  </div>
                  <span className="text-xs text-[#D6A85C] font-serif font-semibold">
                    {content.brand?.siteName}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#242923] flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast('Brand configuration saved!')}
                  className="py-2.5 px-6 rounded-full bg-[#D6A85C] text-[#080908] text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Save Brand Settings
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Social & Contact */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#F2F0E8]">Social Media & Direct Connect</h2>
                <p className="text-xs text-[#A7A59B] mt-1">
                  Manage your official Instagram handle, automated WhatsApp concierge destination, and contact emails.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="space-y-1.5">
                  <label className="text-[10.5px] uppercase tracking-wider text-[#D6A85C] font-semibold block">
                    Official Instagram URL
                  </label>
                  <input
                    type="url"
                    value={content.social?.instagramUrl || ''}
                    onChange={(e) => updateSocial({ instagramUrl: e.target.value })}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#080908] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10.5px] uppercase tracking-wider text-[#D6A85C] font-semibold block">
                    Instagram Handle Text
                  </label>
                  <input
                    type="text"
                    value={content.social?.instagramHandle || ''}
                    onChange={(e) => updateSocial({ instagramHandle: e.target.value })}
                    placeholder="@vm_wild_expeditions"
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#080908] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10.5px] uppercase tracking-wider text-[#D6A85C] font-semibold block">
                    WhatsApp Destination Number (No plus sign)
                  </label>
                  <input
                    type="text"
                    value={content.social?.whatsappNumber || ''}
                    onChange={(e) => updateSocial({ whatsappNumber: e.target.value.replace(/[^0-9]/g, '') })}
                    placeholder="919087394546"
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#080908] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                  />
                  <span className="text-[10px] text-[#A7A59B]">
                    Used for background 1-tap WhatsApp redirect links. Never exposed as raw text on the UI.
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10.5px] uppercase tracking-wider text-[#D6A85C] font-semibold block">
                    Expedition Contact Email
                  </label>
                  <input
                    type="email"
                    value={content.social?.contactEmail || ''}
                    onChange={(e) => updateSocial({ contactEmail: e.target.value })}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#080908] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#242923] flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast('Social and contact details updated!')}
                  className="py-2.5 px-6 rounded-full bg-[#D6A85C] text-[#080908] text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Save Social Settings
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Hero Banner */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#F2F0E8]">Hero Banner & Homepage Intro</h2>
                <p className="text-xs text-[#A7A59B] mt-1">
                  Control the main headline, description, and cinematic background photography on the homepage.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-[10.5px] uppercase tracking-wider text-[#D6A85C] font-semibold block">
                    Eyebrow Pill Text
                  </label>
                  <input
                    type="text"
                    value={content.hero?.eyebrow || ''}
                    onChange={(e) => updateHero({ eyebrow: e.target.value })}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#080908] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] uppercase tracking-wider text-[#D6A85C] font-semibold block">
                      Headline Prefix
                    </label>
                    <input
                      type="text"
                      value={content.hero?.headlinePart1 || ''}
                      onChange={(e) => updateHero({ headlinePart1: e.target.value })}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-[#080908] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10.5px] uppercase tracking-wider text-[#D6A85C] font-semibold block">
                      Headline Emphasis (Italic Gold)
                    </label>
                    <input
                      type="text"
                      value={content.hero?.headlinePart2 || ''}
                      onChange={(e) => updateHero({ headlinePart2: e.target.value })}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-[#080908] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10.5px] uppercase tracking-wider text-[#D6A85C] font-semibold block">
                    Hero Narrative Description
                  </label>
                  <textarea
                    rows={3}
                    value={content.hero?.description || ''}
                    onChange={(e) => updateHero({ description: e.target.value })}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#080908] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10.5px] uppercase tracking-wider text-[#D6A85C] font-semibold block">
                    Hero Background Photography URL
                  </label>
                  <input
                    type="url"
                    value={content.hero?.heroBgImage || ''}
                    onChange={(e) => updateHero({ heroBgImage: e.target.value })}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#080908] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                  />
                  {content.hero?.heroBgImage && (
                    <div className="relative mt-2 h-36 rounded-2xl overflow-hidden border border-[#242923]">
                      <img
                        src={content.hero.heroBgImage}
                        alt="Hero preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-[#D6A85C]">
                        Preview
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[#242923] flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast('Hero banner updated!')}
                  className="py-2.5 px-6 rounded-full bg-[#D6A85C] text-[#080908] text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Save Hero Settings
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: Founders & Mentors */}
          {activeTab === 'founders' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#F2F0E8]">Founders & Expedition Mentors</h2>
                <p className="text-xs text-[#A7A59B] mt-1">
                  Customize Vijay Mathiew and Jayavignesh Hariharan's names, titles, bios, personal quotes, and portraits.
                </p>
              </div>

              <div className="space-y-8 pt-2">
                {content.founders?.map((founder, idx) => (
                  <div key={founder.id || idx} className="p-5 sm:p-6 rounded-2xl bg-[#0a0d0a] border border-[#242923] space-y-4">
                    <div className="flex items-center justify-between border-b border-[#242923] pb-3">
                      <span className="text-xs font-serif font-bold text-[#D6A85C] uppercase tracking-wider">
                        Founder 0{idx + 1}: {founder.name}
                      </span>
                      <span className="text-[10px] font-sans text-[#A7A59B] bg-[#151815] px-2.5 py-0.5 rounded-full border border-[#242923]">
                        {founder.role}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-[#A7A59B] block font-semibold">
                          Display Name
                        </label>
                        <input
                          type="text"
                          value={founder.name || ''}
                          onChange={(e) => updateFounder(idx, { name: e.target.value })}
                          className="w-full py-2 px-3 rounded-xl bg-[#111511] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-[#A7A59B] block font-semibold">
                          Role Title
                        </label>
                        <input
                          type="text"
                          value={founder.role || ''}
                          onChange={(e) => updateFounder(idx, { role: e.target.value })}
                          className="w-full py-2 px-3 rounded-xl bg-[#111511] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] uppercase tracking-wider text-[#A7A59B] block font-semibold">
                          Portrait Image URL
                        </label>
                        <input
                          type="text"
                          value={founder.image || ''}
                          onChange={(e) => updateFounder(idx, { image: e.target.value })}
                          className="w-full py-2 px-3 rounded-xl bg-[#111511] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] uppercase tracking-wider text-[#A7A59B] block font-semibold">
                          Bio Narrative
                        </label>
                        <textarea
                          rows={3}
                          value={founder.bio || ''}
                          onChange={(e) => updateFounder(idx, { bio: e.target.value })}
                          className="w-full py-2 px-3 rounded-xl bg-[#111511] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none leading-relaxed"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] uppercase tracking-wider text-[#A7A59B] block font-semibold">
                          Personal Quote
                        </label>
                        <input
                          type="text"
                          value={founder.quote || ''}
                          onChange={(e) => updateFounder(idx, { quote: e.target.value })}
                          className="w-full py-2 px-3 rounded-xl bg-[#111511] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-[#A7A59B] block font-semibold">
                          Instagram Profile Link
                        </label>
                        <input
                          type="url"
                          value={founder.instagramUrl || ''}
                          onChange={(e) => updateFounder(idx, { instagramUrl: e.target.value })}
                          className="w-full py-2 px-3 rounded-xl bg-[#111511] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-[#A7A59B] block font-semibold">
                          Instagram Handle Text
                        </label>
                        <input
                          type="text"
                          value={founder.instagramHandle || ''}
                          onChange={(e) => updateFounder(idx, { instagramHandle: e.target.value })}
                          className="w-full py-2 px-3 rounded-xl bg-[#111511] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#242923] flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast('Founders information updated!')}
                  className="py-2.5 px-6 rounded-full bg-[#D6A85C] text-[#080908] text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Save Founders Data
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: Photo Tour Expeditions */}
          {activeTab === 'tours' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#F2F0E8]">Photo Tour Expeditions</h2>
                <p className="text-xs text-[#A7A59B] mt-1">
                  Edit tour destinations, titles, durations, photographic focus, status, and photography covers.
                </p>
              </div>

              {/* Animal Tours Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-serif text-[#D6A85C] uppercase tracking-wider flex items-center gap-2">
                  <span>🐅</span>
                  <span>Wild & Big Cat Expeditions ({content.animalTours?.length || 0})</span>
                </h3>

                <div className="space-y-4">
                  {content.animalTours?.map((tour) => (
                    <div key={tour.id} className="p-4 sm:p-5 rounded-2xl bg-[#0a0d0a] border border-[#242923] space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#242923] pb-2.5">
                        <span className="text-xs font-bold text-[#F2F0E8]">
                          {tour.destination} ({tour.state})
                        </span>
                        <span className="text-[10px] text-[#D6A85C] font-semibold bg-[#151815] px-2.5 py-0.5 rounded-full border border-[#242923]">
                          {tour.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9.5px] uppercase tracking-wider text-[#A7A59B] block">Title</label>
                          <input
                            type="text"
                            value={tour.title || ''}
                            onChange={(e) => updateSingleTour('animals', tour.id, { title: e.target.value })}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-[#111511] border border-[#242923] text-xs text-[#F2F0E8]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9.5px] uppercase tracking-wider text-[#A7A59B] block">Duration</label>
                          <input
                            type="text"
                            value={tour.duration || ''}
                            onChange={(e) => updateSingleTour('animals', tour.id, { duration: e.target.value })}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-[#111511] border border-[#242923] text-xs text-[#F2F0E8]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9.5px] uppercase tracking-wider text-[#A7A59B] block">Status Badge</label>
                          <select
                            value={tour.status || 'Open for Booking'}
                            onChange={(e) => updateSingleTour('animals', tour.id, { status: e.target.value })}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-[#111511] border border-[#242923] text-xs text-[#D6A85C]"
                          >
                            <option value="Open for Booking">Open for Booking</option>
                            <option value="Few Seats Left">Few Seats Left</option>
                            <option value="Filling Fast">Filling Fast</option>
                            <option value="Sold Out">Sold Out</option>
                          </select>
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-[9.5px] uppercase tracking-wider text-[#A7A59B] block">Photographic Focus</label>
                          <input
                            type="text"
                            value={tour.photoFocus || ''}
                            onChange={(e) => updateSingleTour('animals', tour.id, { photoFocus: e.target.value })}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-[#111511] border border-[#242923] text-xs text-[#F2F0E8]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9.5px] uppercase tracking-wider text-[#A7A59B] block">Scheduled Dates</label>
                          <input
                            type="text"
                            value={tour.dateRange || ''}
                            onChange={(e) => updateSingleTour('animals', tour.id, { dateRange: e.target.value })}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-[#111511] border border-[#242923] text-xs text-[#F2F0E8]"
                          />
                        </div>

                        <div className="space-y-1 sm:col-span-3">
                          <label className="text-[9.5px] uppercase tracking-wider text-[#A7A59B] block">Cover Image URL</label>
                          <input
                            type="text"
                            value={tour.heroImage || ''}
                            onChange={(e) => updateSingleTour('animals', tour.id, { heroImage: e.target.value })}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-[#111511] border border-[#242923] text-xs text-[#F2F0E8]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bird Tours Section */}
              <div className="space-y-4 pt-6 border-t border-[#242923]">
                <h3 className="text-sm font-serif text-[#D6A85C] uppercase tracking-wider flex items-center gap-2">
                  <span>🦜</span>
                  <span>Birds & Avian Expeditions ({content.birdTours?.length || 0})</span>
                </h3>

                <div className="space-y-4">
                  {content.birdTours?.map((tour) => (
                    <div key={tour.id} className="p-4 sm:p-5 rounded-2xl bg-[#0a0d0a] border border-[#242923] space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#242923] pb-2.5">
                        <span className="text-xs font-bold text-[#F2F0E8]">
                          {tour.destination} ({tour.state})
                        </span>
                        <span className="text-[10px] text-[#D6A85C] font-semibold bg-[#151815] px-2.5 py-0.5 rounded-full border border-[#242923]">
                          {tour.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9.5px] uppercase tracking-wider text-[#A7A59B] block">Title</label>
                          <input
                            type="text"
                            value={tour.title || ''}
                            onChange={(e) => updateSingleTour('birds', tour.id, { title: e.target.value })}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-[#111511] border border-[#242923] text-xs text-[#F2F0E8]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9.5px] uppercase tracking-wider text-[#A7A59B] block">Duration</label>
                          <input
                            type="text"
                            value={tour.duration || ''}
                            onChange={(e) => updateSingleTour('birds', tour.id, { duration: e.target.value })}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-[#111511] border border-[#242923] text-xs text-[#F2F0E8]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9.5px] uppercase tracking-wider text-[#A7A59B] block">Status Badge</label>
                          <select
                            value={tour.status || 'Open for Booking'}
                            onChange={(e) => updateSingleTour('birds', tour.id, { status: e.target.value })}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-[#111511] border border-[#242923] text-xs text-[#D6A85C]"
                          >
                            <option value="Open for Booking">Open for Booking</option>
                            <option value="Few Seats Left">Few Seats Left</option>
                            <option value="Filling Fast">Filling Fast</option>
                            <option value="Sold Out">Sold Out</option>
                          </select>
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-[9.5px] uppercase tracking-wider text-[#A7A59B] block">Photographic Focus</label>
                          <input
                            type="text"
                            value={tour.photoFocus || ''}
                            onChange={(e) => updateSingleTour('birds', tour.id, { photoFocus: e.target.value })}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-[#111511] border border-[#242923] text-xs text-[#F2F0E8]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9.5px] uppercase tracking-wider text-[#A7A59B] block">Scheduled Dates</label>
                          <input
                            type="text"
                            value={tour.dateRange || ''}
                            onChange={(e) => updateSingleTour('birds', tour.id, { dateRange: e.target.value })}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-[#111511] border border-[#242923] text-xs text-[#F2F0E8]"
                          />
                        </div>

                        <div className="space-y-1 sm:col-span-3">
                          <label className="text-[9.5px] uppercase tracking-wider text-[#A7A59B] block">Cover Image URL</label>
                          <input
                            type="text"
                            value={tour.heroImage || ''}
                            onChange={(e) => updateSingleTour('birds', tour.id, { heroImage: e.target.value })}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-[#111511] border border-[#242923] text-xs text-[#F2F0E8]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#242923] flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast('All tour schedules and details saved!')}
                  className="py-2.5 px-6 rounded-full bg-[#D6A85C] text-[#080908] text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Save Tour Schedules
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: Backup, Reset & Passcode */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#F2F0E8]">Security & Data Backup</h2>
                <p className="text-xs text-[#A7A59B] mt-1">
                  Change the admin passcode, download website backups, or restore settings from a JSON file.
                </p>
              </div>

              {/* Passcode change */}
              <div className="p-5 rounded-2xl bg-[#0a0d0a] border border-[#242923] space-y-3">
                <h3 className="text-xs font-semibold text-[#D6A85C] uppercase tracking-wider">
                  Admin Passcode
                </h3>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    value={content.adminSettings?.passcode || ''}
                    onChange={(e) => updateAdminSettings({ passcode: e.target.value })}
                    className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#111511] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => showToast('Admin passcode updated!')}
                    className="py-2.5 px-5 rounded-xl bg-[#D6A85C] text-[#080908] text-xs font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap"
                  >
                    Update Passcode
                  </button>
                </div>
              </div>

              {/* Export / Import Backup */}
              <div className="p-5 rounded-2xl bg-[#0a0d0a] border border-[#242923] space-y-4">
                <h3 className="text-xs font-semibold text-[#D6A85C] uppercase tracking-wider">
                  Content Backup & Restore
                </h3>
                <p className="text-xs text-[#A7A59B] leading-relaxed">
                  Download a complete backup of all custom logos, social links, founders, and tour schedules in a single JSON file. You can commit this file or restore it anytime.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={exportContentJSON}
                    className="py-2.5 px-5 rounded-xl bg-[#151815] hover:bg-[#1b221b] border border-[#D6A85C] text-xs text-[#D6A85C] font-semibold flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>⬇️</span>
                    <span>Download Backup JSON</span>
                  </button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="py-2.5 px-5 rounded-xl bg-[#151815] hover:bg-[#1b221b] border border-[#242923] text-xs text-[#F2F0E8] font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    <span>⬆️</span>
                    <span>Upload & Restore Backup</span>
                  </button>
                </div>
              </div>

              {/* Factory Reset */}
              <div className="p-5 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-3">
                <h3 className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                  Danger Zone: Factory Reset
                </h3>
                <p className="text-xs text-[#A7A59B]">
                  Reset all website content, logos, tours, and texts back to the original default code settings.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to reset all website customizations to defaults?')) {
                      resetToDefaults()
                      showToast('Site content reset to factory defaults!')
                    }
                  }}
                  className="py-2 px-4 rounded-xl bg-red-900/40 hover:bg-red-900/60 border border-red-800 text-xs text-red-300 font-semibold cursor-pointer"
                >
                  Reset Website to Defaults
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Floating Save Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 py-3 px-5 rounded-2xl bg-[#D6A85C] text-[#080908] text-xs font-bold font-sans shadow-2xl flex items-center gap-2 animate-bounce">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
