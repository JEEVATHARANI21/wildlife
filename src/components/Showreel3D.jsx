import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// All user images from D:\wildlife\images
const SHOWREEL_IMAGES = [
  { id: 1, src: '/images/user/IMG_4761.JPG', title: 'Leopard Gaze', category: 'Big Cats', location: 'Jawaï Rocks, India' },
  { id: 2, src: '/images/user/IMG_4634.JPG', title: 'Emerald Pit Viper', category: 'Reptiles', location: 'Western Ghats, India' },
  { id: 3, src: '/images/user/IMG_4632.JPG', title: 'Malabar Gliding Frog', category: 'Amphibians', location: 'Agumbe Rainforest' },
  { id: 4, src: '/images/user/IMG_7965.PNG', title: 'The Ancient Bull', category: 'Giants', location: 'Kabini Reserve' },
  { id: 5, src: '/images/user/IMG_4642.JPG', title: 'Banded Gecko', category: 'Macro', location: 'Kudremukh Forest' },
  { id: 6, src: '/images/user/IMG_6853.PNG', title: 'Indian Gaur', category: 'Wildlife', location: 'Nilgiri Biosphere' },
  { id: 7, src: '/images/user/IMG_4638.JPG', title: 'Night Bullfrog', category: 'Nocturnal', location: 'Anamalai Foothills' },
  { id: 8, src: '/images/user/IMG_7964.JPG', title: 'Elephant in Mist', category: 'Giants', location: 'Periyar Sanctuary' },
  { id: 9, src: '/images/user/IMG_4639.JPG', title: 'Bamboo Viper', category: 'Reptiles', location: 'Valparai Canopies' },
  { id: 10, src: '/images/user/IMG_4637.JPG', title: 'Glass Frog Embryos', category: 'Macro Biology', location: 'Rainforest Stream' },
  { id: 11, src: '/images/user/IMG_4643.JPG', title: 'Vine Snake Alert', category: 'Reptiles', location: 'Coorg Valley' },
  { id: 12, src: '/images/user/IMG_4633.JPG', title: 'Golden Tree Frog', category: 'Amphibians', location: 'Silent Valley' },
]

export default function Showreel3D() {
  const containerRef = useRef(null)
  const [activeItem, setActiveItem] = useState(SHOWREEL_IMAGES[0])
  const [isRotating, setIsRotating] = useState(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 8.5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xfff5e6, 2.5, 50)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    // Group for carousel cylinder
    const group = new THREE.Group()
    scene.add(group)

    // Geometry & Texture Loader
    const textureLoader = new THREE.TextureLoader()
    const cardGeometry = new THREE.PlaneGeometry(1.6, 2.2, 16, 16)

    const count = SHOWREEL_IMAGES.length
    const radius = 4.2
    const meshes = []

    SHOWREEL_IMAGES.forEach((item, index) => {
      const angle = (index / count) * Math.PI * 2

      const texture = textureLoader.load(item.src)
      texture.colorSpace = THREE.SRGBColorSpace

      const material = new THREE.MeshPhysicalMaterial({
        map: texture,
        side: THREE.DoubleSide,
        roughness: 0.2,
        metalness: 0.1,
        clearcoat: 0.4,
        clearcoatRoughness: 0.1,
      })

      const mesh = new THREE.Mesh(cardGeometry, material)
      mesh.position.x = Math.sin(angle) * radius
      mesh.position.z = Math.cos(angle) * radius
      mesh.position.y = Math.sin(index * 0.8) * 0.25 // subtle playful wavy float
      mesh.rotation.y = angle

      mesh.userData = { id: item.id, item: item, angle: angle }
      group.add(mesh)
      meshes.push(mesh)
    })

    // Tilt group slightly forward like a playful stage
    group.rotation.x = 0.08

    // Interactive Drag / Velocity
    let isDragging = false
    let prevMouseX = 0
    let targetRotationY = 0
    let velocityY = 0.003
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
      targetRotationY += deltaX * 0.006
    }

    const onMouseUp = () => {
      isDragging = false
      // Find which image is closest to camera
      setTimeout(() => {
        let closestMesh = meshes[0]
        let maxZ = -999
        meshes.forEach(m => {
          const worldPos = new THREE.Vector3()
          m.getWorldPosition(worldPos)
          if (worldPos.z > maxZ) {
            maxZ = worldPos.z
            closestMesh = m
          }
        })
        if (closestMesh && closestMesh.userData.item) {
          setActiveItem(closestMesh.userData.item)
        }
      }, 200)
    }

    // Raycaster for clicking cards directly
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(meshes)
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object
        const item = clickedMesh.userData.item
        if (item) {
          setActiveItem(item)
          // rotate clicked mesh to center
          const targetAngle = -clickedMesh.userData.angle
          targetRotationY = targetAngle
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
      targetRotationY += deltaX * 0.006
    }
    domEl.addEventListener('touchstart', onTouchStart)
    domEl.addEventListener('touchmove', onTouchMove)

    // Animate Loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      if (autoRotate && isRotating) {
        targetRotationY += 0.0025
      }

      // Smooth damping interpolation
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.07

      // Floating wave animation on cards
      meshes.forEach((m, idx) => {
        m.position.y = Math.sin(elapsedTime * 1.5 + idx) * 0.18
      })

      renderer.render(scene, camera)
    }
    animate()

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      domEl.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      domEl.removeEventListener('click', onClick)
      domEl.removeEventListener('touchstart', onTouchStart)
      domEl.removeEventListener('touchmove', onTouchMove)
      if (container.contains(domEl)) {
        container.removeChild(domEl)
      }
      cardGeometry.dispose()
      meshes.forEach(m => {
        m.material.dispose()
      })
    }
  }, [isRotating])

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '100vh', background: '#090A09' }}>
      {/* Editorial Large Typography header in Pacôme Pertant style */}
      <div className="relative z-10 pt-28 px-8 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pointer-events-none">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#A7A59B]">
              3D Interactive Showreel · Motion & Specimen
            </p>
          </div>
          <h2
            className="font-serif text-[#F1EFE8] leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)', fontWeight: 300, letterSpacing: '-0.02em' }}
          >
            Tactile Biology
          </h2>
        </div>

        <div className="flex items-center gap-6 pointer-events-auto">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="px-4 py-2 rounded-full border border-[#2A2B28] text-[#F1EFE8] text-xs font-sans tracking-widest uppercase transition-all duration-300 hover:bg-[#F1EFE8] hover:text-[#0B0C0A]"
          >
            {isRotating ? 'Pause Orbit' : 'Resume Orbit'}
          </button>
          <span className="text-xs text-[#A7A59B] hidden md:inline font-sans">
            [ Drag to rotate · Click card to focus ]
          </span>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-[68vh] md:h-[76vh] relative cursor-grab active:cursor-grabbing"
      />

      {/* Active Card HUD Info Panel (Pacôme Pertant experimental minimal style) */}
      <div className="relative z-10 pb-16 px-8 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-t border-[#2A2B28]/60 pt-6">
        <div className="flex items-baseline gap-6">
          <span className="font-serif text-3xl md:text-5xl text-[#F1EFE8]/30 font-light">
            {String(activeItem.id).padStart(2, '0')}
          </span>
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-emerald-400 font-sans mb-1">
              {activeItem.category}
            </p>
            <h3 className="font-serif text-2xl md:text-4xl text-[#F1EFE8] font-light">
              {activeItem.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-8 text-xs text-[#A7A59B] font-sans">
          <div>
            <span className="block text-[9px] uppercase tracking-widest text-[#555] mb-1">Location</span>
            <span>{activeItem.location}</span>
          </div>
          <div>
            <span className="block text-[9px] uppercase tracking-widest text-[#555] mb-1">Format</span>
            <span>High-Res Specimen</span>
          </div>
          <div className="w-12 h-12 rounded-full border border-[#2A2B28] flex items-center justify-center text-[#F1EFE8] hover:border-emerald-500 transition-colors">
            ↗
          </div>
        </div>
      </div>
    </section>
  )
}
