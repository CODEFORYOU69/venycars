"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { getRealisations, type Realisation } from "@/lib/realisations"
import { Wrench } from "lucide-react"

function BeforeAfterSlider({ realisation }: { realisation: Realisation }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      setSliderPosition((x / rect.width) * 100)
    },
    []
  )

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX)
    const handleEnd = () => setIsDragging(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("mouseup", handleEnd)
    window.addEventListener("touchend", handleEnd)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("mouseup", handleEnd)
      window.removeEventListener("touchend", handleEnd)
    }
  }, [isDragging, handleMove])

  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] cursor-col-resize select-none"
        onMouseDown={(e) => {
          setIsDragging(true)
          handleMove(e.clientX)
        }}
        onTouchStart={(e) => {
          setIsDragging(true)
          handleMove(e.touches[0].clientX)
        }}
      >
        {/* After image (full background) */}
        <Image
          src={realisation.image_apres_url}
          alt={`${realisation.titre} — Après`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <Image
            src={realisation.image_avant_url}
            alt={`${realisation.titre} — Avant`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-primary-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8l4 4-4 4M6 8l-4 4 4 4" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded z-10">
          Avant
        </div>
        <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded z-10">
          Après
        </div>
      </div>
      <div className="bg-white p-4">
        <h3 className="font-heading font-semibold text-primary-dark">{realisation.titre}</h3>
        {realisation.information && (
          <p className="text-gray-500 text-sm mt-1">{realisation.information}</p>
        )}
      </div>
    </div>
  )
}

export default function Galerie() {
  const [realisations, setRealisations] = useState<Realisation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRealisations()
      .then(setRealisations)
      .catch(() => setRealisations([]))
      .finally(() => setLoading(false))
  }, [])

  if (!loading && realisations.length === 0) return null

  return (
    <section id="galerie" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary-dark mb-4">
            Nos Réalisations
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez nos travaux de carrosserie et peinture en avant/après
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-lg animate-pulse">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="bg-white p-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {realisations.map((realisation, index) => (
              <motion.div
                key={realisation.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BeforeAfterSlider realisation={realisation} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
