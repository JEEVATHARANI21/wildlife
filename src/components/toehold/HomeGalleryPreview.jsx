import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GALLERY_IMAGES } from '../../data/galleryData'

// Helper: Create rounded rectangle shape for true 3D extruded cards
function createRoundedRectShape(w, h, r) {
  const shape = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  shape.moveTo(x, y + r)
  shape.lineTo(x, y + h - r)
  shape.quadraticCurveTo(x, y + h, x + r, y + h)
  shape.lineTo(x + w - r, y + h)
  shape.quadraticCurveTo(x + w, y + h, x + w, y + h - r)
  shape.lineTo(x + w, y + r)
  shape.quadraticCurveTo(x + w, y, x + w - r, y)
  shape.lineTo(x + r, y)
  shape.quadraticCurveTo(x, y, x, y + r)
  return shape
}

// Helper: Render high-definition canvas texture with gold border & HUD optics
function createLuxuryCardTexture(item, renderer) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 700
  const ctx = canvas.getContext('2d')

  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = item.src
    img.onload = () => {
      // Background fill
      ctx.fillStyle = '#080908'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Object-fit cover cropping for photo
      const imgAspect = img.width / img.height
      const canvasAspect = canvas.width / canvas.height
      let drawW, drawH, drawX, drawY

      if (imgAspect > canvasAspect) {
        drawH = canvas.height
        drawW = canvas.height * imgAspect
        drawX = (canvas.width - drawW) / 2
        drawY = 0
      } else {
        drawW = canvas.width
        drawH = canvas.width / imgAspect
        drawX = 0
        drawY = (canvas.height - drawH) / 2
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH)

      // Subtle bottom gradient vignette
      const grad = ctx.createLinearGradient(0, canvas.height * 0.45, 0, canvas.height)
      grad.addColorStop(0, 'rgba(8, 9, 8, 0)')
      grad.addColorStop(1, 'rgba(8, 9, 8, 0.78)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Category Pill Badge
      ctx.fillStyle = 'rgba(8, 9, 8, 0.85)'
      ctx.beginPath()
      ctx.roundRect(26, 26, 115, 34, 17)
      ctx.fill()
      ctx.strokeStyle = '#D6A85C'
      ctx.lineWidth = 1.8
      ctx.stroke()

      ctx.fillStyle = '#D6A85C'
      ctx.font = 'bold 12px sans-serif'
      ctx.fillText(`• ${item.category.toUpperCase()}`, 38, 48)

      // Camera Optical Viewfinder HUD Brackets (4 corners)
      ctx.strokeStyle = 'rgba(214, 168, 92, 0.7)'
      ctx.lineWidth = 2.5
      const cornerLen = 22
      const pad = 32
      // Top-Left
      ctx.beginPath(); ctx.moveTo(pad, pad + cornerLen); ctx.lineTo(pad, pad); ctx.lineTo(pad + cornerLen, pad); ctx.stroke();
      // Top-Right
      ctx.beginPath(); ctx.moveTo(canvas.width - pad - cornerLen, pad); ctx.lineTo(canvas.width - pad, pad); ctx.lineTo(canvas.width - pad, pad + cornerLen); ctx.stroke();
      // Bottom-Left
      ctx.beginPath(); ctx.moveTo(pad, canvas.height - pad - cornerLen); ctx.lineTo(pad, canvas.height - pad); ctx.lineTo(pad + cornerLen, canvas.height - pad); ctx.stroke();
      // Bottom-Right
      ctx.beginPath(); ctx.moveTo(canvas.width - pad - cornerLen, canvas.height - pad); ctx.lineTo(canvas.width - pad, canvas.height - pad); ctx.lineTo(canvas.width - pad, canvas.height - pad - cornerLen); ctx.stroke();

      // Center Iris Reticle
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      ctx.beginPath()
      ctx.arc(cx, cy, 26, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(214, 168, 92, 0.55)'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.stroke()
      ctx.setLineDash([])

      ctx.beginPath()
      ctx.arc(cx, cy, 5, 0, Math.PI * 2)
      ctx.fillStyle = '#D6A85C'
      ctx.fill()

      // Gold Luxury Accent Border
      ctx.strokeStyle = '#D6A85C'
      ctx.lineWidth = 6
      ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6)

      // Convert canvas to Three.js Texture with Anisotropic Filtering
      const texture = new THREE.CanvasTexture(canvas)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = renderer ? renderer.capabilities.getMaxAnisotropy() : 16
      texture.minFilter = THREE.LinearMipmapLinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.generateMipmaps = true

      resolve(texture)
    }

    img.onerror = () => {
      ctx.fillStyle = '#151815'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const texture = new THREE.CanvasTexture(canvas)
      resolve(texture)
    }
  })
}

export default function HomeGalleryPreview({ onViewFullGallery, onNavigateToGallery, onPlanTrip }) {
  const handleViewGallery = onViewFullGallery || onNavigateToGallery

  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isRotating, setIsRotating] = useState(true)

  const activeItem = GALLERY_IMAGES[activeIndex] || GALLERY_IMAGES[0]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    // 1. WebGL Renderer (High Performance + Anisotropy)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    container.appendChild(renderer.domElement)

    // 2. Camera Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
    camera.position.z = width < 640 ? 9.8 : 8.0

    // 3. Vibrant Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5)
    scene.add(ambientLight)

    const mainLight = new THREE.DirectionalLight(0xfff5ea, 1.8)
    mainLight.position.set(5, 8, 6)
    scene.add(mainLight)

    const spotLight = new THREE.SpotLight(0xD6A85C, 3.5)
    spotLight.position.set(0, 4, 7)
    spotLight.angle = Math.PI / 4
    spotLight.penumbra = 0.5
    scene.add(spotLight)

    // 4. Cylinder Group
    const group = new THREE.Group()
    scene.add(group)

    // 5. True 3D Extruded Rounded Card Geometry (Landscape 16:11 Aspect Ratio)
    const cardW = 2.4
    const cardH = 1.64
    const shape = createRoundedRectShape(cardW, cardH, 0.1)
    const extrudeSettings = {
      depth: 0.03,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.012,
      bevelThickness: 0.012,
    }
    const cardGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    cardGeometry.center()

    const count = GALLERY_IMAGES.length
    const radius = width < 640 ? 3.8 : 4.6
    const meshes = []
    const materials = []
    const textures = []

    // Load textures and build 3D card meshes asynchronously
    let isDisposed = false

    const buildCarousel = async () => {
      for (let index = 0; index < count; index++) {
        if (isDisposed) break
        const item = GALLERY_IMAGES[index]
        const angle = (index / count) * Math.PI * 2

        const texture = await createLuxuryCardTexture(item, renderer)
        if (isDisposed) break
        textures.push(texture)

        // Front texture material & dark back/bevel material
        const frontMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.25,
          metalness: 0.1,
          side: THREE.FrontSide,
        })

        const sideMaterial = new THREE.MeshStandardMaterial({
          color: 0x111411,
          roughness: 0.5,
          metalness: 0.3,
          side: THREE.DoubleSide,
        })

        materials.push(frontMaterial, sideMaterial)

        // Multi-material assignment: front face uses texture, sides/back use dark luxury material
        const meshMaterials = [sideMaterial, frontMaterial]
        const mesh = new THREE.Mesh(cardGeometry, meshMaterials)

        mesh.position.x = Math.sin(angle) * radius
        mesh.position.z = Math.cos(angle) * radius
        mesh.position.y = Math.sin(index * 0.7) * 0.2
        mesh.rotation.y = angle

        mesh.userData = { id: item.id, index: index, item: item, angle: angle }
        group.add(mesh)
        meshes.push(mesh)
      }
    }

    buildCarousel()

    group.rotation.x = 0.05

    // 6. Interactive Drag & Touch Controls
    let isDragging = false
    let prevMouseX = 0
    let targetRotationY = 0
    let autoRotate = true

    const onMouseDown = (e) => {
      isDragging = true
      autoRotate = false
      prevMouseX = e.clientX
    }

    const onMouseMove = (e) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMouseX
      prevMouseX = e.clientX
      targetRotationY += deltaX * 0.0055
    }

    const updateClosestCard = () => {
      if (meshes.length === 0) return
      let closestMesh = meshes[0]
      let maxZ = -999
      meshes.forEach((m) => {
        const worldPos = new THREE.Vector3()
        m.getWorldPosition(worldPos)
        if (worldPos.z > maxZ) {
          maxZ = worldPos.z
          closestMesh = m
        }
      })
      if (closestMesh && closestMesh.userData) {
        setActiveIndex(closestMesh.userData.index)
      }
    }

    const onMouseUp = () => {
      isDragging = false
      setTimeout(updateClosestCard, 100)
    }

    // Raycaster for clicking cards directly
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onClick = (e) => {
      if (meshes.length === 0) return
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(meshes)
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object
        const item = clickedMesh.userData.item
        if (item) {
          setActiveIndex(clickedMesh.userData.index)
          targetRotationY = -clickedMesh.userData.angle
        }
      }
    }

    const domEl = renderer.domElement
    domEl.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    domEl.addEventListener('click', onClick)

    // Touch support
    let touchStartX = 0
    const onTouchStart = (e) => {
      touchStartX = e.touches[0].clientX
      autoRotate = false
    }
    const onTouchMove = (e) => {
      const deltaX = e.touches[0].clientX - touchStartX
      touchStartX = e.touches[0].clientX
      targetRotationY += deltaX * 0.0055
    }
    const onTouchEnd = () => {
      onMouseUp()
      setTimeout(() => {
        autoRotate = true
      }, 3000)
    }

    domEl.addEventListener('touchstart', onTouchStart, { passive: true })
    domEl.addEventListener('touchmove', onTouchMove, { passive: true })
    domEl.addEventListener('touchend', onTouchEnd, { passive: true })

    // 7. Intersection Observer to pause WebGL rendering when scrolled offscreen
    let isVisible = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.1 }
    )
    observer.observe(container)

    // 8. Render Loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      if (!isVisible) return

      const elapsedTime = clock.getElapsedTime()

      if (autoRotate && isRotating) {
        targetRotationY += 0.0018
      }

      group.rotation.y += (targetRotationY - group.rotation.y) * 0.08

      // Wave floating motion & dynamic scale accent for front-facing card
      for (let i = 0; i < meshes.length; i++) {
        const mesh = meshes[i]
        mesh.position.y = Math.sin(elapsedTime * 1.5 + i) * 0.16

        const worldPos = new THREE.Vector3()
        mesh.getWorldPosition(worldPos)
        
        // Scale accent when card is closest to camera
        const targetScale = worldPos.z > radius * 0.75 ? 1.12 : 0.95
        mesh.scale.x += (targetScale - mesh.scale.x) * 0.08
        mesh.scale.y += (targetScale - mesh.scale.y) * 0.08
        mesh.scale.z += (targetScale - mesh.scale.z) * 0.08
      }

      renderer.render(scene, camera)
    }
    animate()

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.position.z = w < 640 ? 9.8 : 8.0
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      isDisposed = true
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      domEl.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      domEl.removeEventListener('click', onClick)
      domEl.removeEventListener('touchstart', onTouchStart)
      domEl.removeEventListener('touchmove', onTouchMove)
      domEl.removeEventListener('touchend', onTouchEnd)
      if (container.contains(domEl)) {
        container.removeChild(domEl)
      }
      cardGeometry.dispose()
      materials.forEach((m) => m.dispose())
      textures.forEach((t) => t.dispose())
      renderer.dispose()
    }
  }, [isRotating])

  return (
    <section
      id="gallery-preview"
      className="py-20 sm:py-28 bg-[#090A09] border-b border-[#20251f] select-none relative overflow-hidden"
    >
      {/* Warm Ambient Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[350px] sm:h-[450px] bg-[#B87333]/[0.05] blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="w-7 h-[1.5px] bg-[#B87333]" />
              <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
                CURATED 3D CYLINDER REVOLVING REEL
              </span>
              <span className="w-7 h-[1.5px] bg-[#B87333]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight">
              Wilderness <span className="italic text-[#D6A85C] font-normal">Moments</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start sm:self-end">
            {/* Orbit Pause/Resume Controls */}
            <button
              onClick={() => setIsRotating(!isRotating)}
              className="px-4 py-2 rounded-full bg-[#151815] border border-[#242923] hover:border-[#D6A85C] text-[#F2F0E8] text-xs font-sans tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <span className={`w-2 h-2 rounded-full ${isRotating ? 'bg-[#D6A85C] animate-pulse' : 'bg-[#666]'}`} />
              <span>{isRotating ? 'Pause Orbit' : 'Resume Orbit'}</span>
            </button>

            <button
              onClick={handleViewGallery}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] font-sans text-xs uppercase tracking-wider font-bold hover:shadow-[0_4px_25px_rgba(214,168,92,0.45)] hover:scale-102 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>VIEW FULL GALLERY</span>
              <span className="font-bold">→</span>
            </button>
          </div>
        </div>

        {/* 3D WebGL Cylinder Canvas Container */}
        <div
          ref={containerRef}
          className="w-full h-[52vh] sm:h-[62vh] md:h-[68vh] relative cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden border border-[#242923]/60 bg-[#080908]/60 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        />

        {/* Interaction Hint */}
        <div className="text-center mt-3 mb-6">
          <span className="text-[11px] font-sans text-[#A7A59B] tracking-widest uppercase">
            [ Drag horizontally to revolve 3D orbit · Click any specimen card to focus ]
          </span>
        </div>

        {/* Active Specimen HUD Info Panel */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0e120f]/90 border border-[#20251f] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span className="font-serif text-3xl sm:text-5xl text-[#D6A85C]/40 font-light">
              {String(activeItem.id || activeIndex + 1).replace('gal-', '').padStart(2, '0')}
            </span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#D6A85C]/15 border border-[#D6A85C]/40 text-[#D6A85C] text-[9px] font-sans tracking-widest uppercase font-bold">
                  {activeItem.category}
                </span>
                <span className="text-xs font-sans text-[#A7A59B]">📍 {activeItem.location}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-3xl text-[#F2F0E8] font-light">
                {activeItem.title}
              </h3>
              <p className="font-sans text-xs text-[#A7A59B] mt-1 font-light italic">
                Species: {activeItem.species}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#A7A59B] font-sans border-t md:border-t-0 border-[#20251f] pt-4 md:pt-0 w-full md:w-auto justify-between md:justify-end">
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-[#D6A85C] mb-0.5">EXIF Camera Gear</span>
              <span className="text-[#F2F0E8] font-mono text-[11px]">{activeItem.gear || '400mm f/2.8 · 1/1000s'}</span>
            </div>

            <button
              onClick={handleViewGallery}
              className="py-3 px-6 rounded-full bg-[#151815] border border-[#242923] hover:border-[#D6A85C] hover:bg-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Collection</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
