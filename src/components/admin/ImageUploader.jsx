import { useState, useRef } from 'react'

/**
 * Resizes and compresses image files using HTML5 Canvas
 * so that uploaded photos become fast, lightweight Data URLs
 * that save reliably into localStorage without quota errors.
 */
export function compressImageFile(file, maxWidth = 1600, maxHeight = 1600, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'))
      return
    }

    if (!file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image'))
      return
    }

    // Keep SVG files as raw data URLs without canvas rasterization
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result)
      reader.onerror = () => reject(new Error('Failed to read SVG file'))
      reader.readAsDataURL(file)
      return
    }

    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Failed to read image file'))
    reader.onload = (e) => {
      const img = new Image()
      img.onerror = () => reject(new Error('Failed to decode image data'))
      img.onload = () => {
        let width = img.width
        let height = img.height

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          } else {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        const outputFormat = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
        const dataUrl = canvas.toDataURL(outputFormat, quality)
        resolve(dataUrl)
      }
      img.src = e.target?.result
    }
    reader.readAsDataURL(file)
  })
}

export default function ImageUploader({
  label = 'Image URL / Upload',
  value = '',
  onChange,
  placeholder = 'https://... or click Upload Image below',
  helpText = '',
  presetOptions = [],
  aspectRatio = 'cover', // 'cover' | 'banner' | 'portrait' | 'contain'
}) {
  const fileInputRef = useRef(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    await processAndSetFile(file)
    // Clear file input value so re-uploading same file works if needed
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const processAndSetFile = async (file) => {
    setIsProcessing(true)
    setErrorMsg('')
    try {
      const dataUrl = await compressImageFile(file)
      onChange(dataUrl)
    } catch (err) {
      console.error('Image upload failed:', err)
      setErrorMsg(err.message || 'Could not process image file')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      await processAndSetFile(file)
    }
  }

  const isDataUrl = value && value.startsWith('data:')
  const isLocalPath = value && value.startsWith('/')

  return (
    <div className="space-y-2.5 font-sans">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-[10.5px] uppercase tracking-wider text-[#D6A85C] font-semibold block">
            {label}
          </label>
          {isDataUrl && (
            <span className="text-[9px] uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
              Uploaded Image
            </span>
          )}
          {!isDataUrl && value && (
            <span className="text-[9px] uppercase tracking-wider bg-[#1c221c] text-[#D6A85C] border border-[#242923] px-2 py-0.5 rounded-full font-bold">
              {isLocalPath ? 'Local Path' : 'URL Link'}
            </span>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Dropzone & Preview Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative group rounded-2xl border transition-all duration-200 p-3 bg-[#080908] ${
          isDragging
            ? 'border-[#D6A85C] bg-[#151a15] ring-2 ring-[#D6A85C]/30'
            : 'border-[#242923] hover:border-[#D6A85C]/50'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Image Thumbnail Preview */}
          <div
            className={`shrink-0 relative rounded-xl overflow-hidden bg-[#111511] border border-[#242923] flex items-center justify-center ${
              aspectRatio === 'banner'
                ? 'w-full sm:w-36 h-24'
                : aspectRatio === 'portrait'
                ? 'w-20 h-24 sm:w-20 sm:h-24'
                : aspectRatio === 'contain'
                ? 'w-24 h-16 p-1'
                : 'w-24 h-20'
            }`}
          >
            {value ? (
              <img
                src={value}
                alt="Image Preview"
                className={`w-full h-full ${
                  aspectRatio === 'contain' ? 'object-contain' : 'object-cover'
                }`}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <div className="text-center p-2 text-[#A7A59B]/50">
                <span className="text-xl block mb-0.5">🖼️</span>
                <span className="text-[9px] uppercase tracking-wider block">No Image</span>
              </div>
            )}

            {isProcessing && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-xs text-[#D6A85C] font-semibold">
                Processing...
              </div>
            )}
          </div>

          {/* Controls Column */}
          <div className="flex-1 space-y-2 flex flex-col justify-between">
            {/* Direct Text URL Field */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="flex-1 py-2 px-3 rounded-xl bg-[#111511] border border-[#242923] focus:border-[#D6A85C] text-xs text-[#F2F0E8] outline-none font-mono transition-colors"
              />
            </div>

            {/* Action Buttons: Upload File & Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="py-1.5 px-3 rounded-xl bg-[#1c241c] hover:bg-[#D6A85C] hover:text-[#080908] border border-[#D6A85C]/60 text-xs font-semibold text-[#D6A85C] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <span>📁</span>
                <span>{value ? 'Upload / Replace Image' : 'Upload Image File'}</span>
              </button>

              {presetOptions && presetOptions.length > 0 && presetOptions.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onChange(opt.value)}
                  className="py-1.5 px-2.5 rounded-xl bg-[#151815] hover:bg-[#1f241f] border border-[#242923] hover:border-[#D6A85C]/60 text-[11px] text-[#A7A59B] hover:text-[#F2F0E8] transition-all cursor-pointer"
                >
                  {opt.label}
                </button>
              ))}

              {value && (
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="py-1.5 px-2.5 rounded-xl bg-[#181111] hover:bg-red-950/60 border border-red-900/40 text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer ml-auto"
                  title="Clear image URL"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dropzone Hint */}
        <div className="mt-2 pt-2 border-t border-[#181c18] flex items-center justify-between text-[10px] text-[#A7A59B]">
          <span>💡 Tip: Click <strong>Upload Image File</strong> to pick any image from your computer or drag & drop here.</span>
        </div>
      </div>

      {helpText && <p className="text-[10px] text-[#A7A59B]">{helpText}</p>}
      {errorMsg && <p className="text-xs text-red-400 font-sans mt-1">⚠️ {errorMsg}</p>}
    </div>
  )
}
