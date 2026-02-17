"use client"

import { useRef, useCallback } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Fuel, Gauge, Calendar } from "lucide-react"
import type { Vehicule } from "@/lib/vehicules"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCube, Pagination } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"

import "swiper/css"
import "swiper/css/effect-cube"
import "swiper/css/pagination"

export default function VehiculeCard({ vehicule }: { vehicule: Vehicule }) {
  const swiperRef = useRef<SwiperType | null>(null)
  const hasImages = vehicule.image_urls.length > 0
  const hasMultipleImages = vehicule.image_urls.length > 1

  const handleBulletClick = useCallback((index: number) => {
    swiperRef.current?.slideTo(index)
  }, [])

  return (
    <Card className="overflow-hidden border-0 shadow-md group hover:shadow-xl transition-shadow">
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 relative">
        {hasMultipleImages ? (
          <div className="swiper-3d-container">
            {/* Main Swiper – Cube Effect */}
            <Swiper
              onSwiper={(swiper) => { swiperRef.current = swiper }}
              modules={[EffectCube, Pagination]}
              effect="cube"
              grabCursor
              cubeEffect={{
                shadow: false,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
              }}
              pagination={{
                el: ".swiper-3d-pagination",
                clickable: true,
                renderBullet: (index: number, className: string) => {
                  const url = vehicule.image_urls[index]
                  if (!url) return `<span class="${className}"></span>`
                  return `<span class="${className}" data-index="${index}">
                    <img src="${url}" alt="" />
                  </span>`
                },
              }}
              className="aspect-[4/3] vehicule-swiper-cube"
            >
              {vehicule.image_urls.map((url, i) => (
                <SwiperSlide key={url}>
                  <div className="relative w-full h-full">
                    <Image
                      src={url}
                      alt={`${vehicule.marque} ${vehicule.modele} - ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 3D Pagination Bullets (rendered by Swiper, styled via CSS) */}
            <div className="swiper-3d-pagination" />
          </div>
        ) : hasImages ? (
          <div className="aspect-[4/3] relative">
            <Image
              src={vehicule.image_urls[0]}
              alt={`${vehicule.marque} ${vehicule.modele}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="aspect-[4/3] flex items-center justify-center">
            <Car className="w-16 h-16 text-gray-300" />
          </div>
        )}
        {vehicule.vendu && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-red-500 text-white border-0 text-sm font-semibold px-3 py-1">
              Vendu
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="pt-4 pb-6">
        <h4 className="font-heading font-semibold text-primary-dark text-lg">
          {vehicule.marque} {vehicule.modele}
        </h4>
        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {vehicule.annee}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5" />
            {vehicule.kilometrage.toLocaleString("fr-FR")} km
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="w-3.5 h-3.5" />
            {vehicule.carburant}
          </span>
        </div>
        <p className="text-primary font-bold text-xl mt-3">
          {vehicule.prix.toLocaleString("fr-FR")} €
        </p>
      </CardContent>
    </Card>
  )
}
