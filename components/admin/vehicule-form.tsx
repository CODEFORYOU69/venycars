"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UploadButton } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import type { Vehicule, VehiculeInsert } from "@/lib/vehicules"
import { X } from "lucide-react"

type Props = {
  vehicule?: Vehicule | null
  onSubmit: (data: VehiculeInsert) => Promise<void>
  onCancel: () => void
}

const carburants = ["Diesel", "Essence", "Hybride", "Électrique"]

export default function VehiculeForm({ vehicule, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<VehiculeInsert>({
    marque: vehicule?.marque ?? "",
    modele: vehicule?.modele ?? "",
    annee: vehicule?.annee ?? new Date().getFullYear(),
    prix: vehicule?.prix ?? 0,
    kilometrage: vehicule?.kilometrage ?? 0,
    carburant: vehicule?.carburant ?? "Diesel",
    image_urls: vehicule?.image_urls ?? [],
    vendu: vehicule?.vendu ?? false,
  })
  const [submitting, setSubmitting] = useState(false)

  function removeImage(index: number) {
    setForm({
      ...form,
      image_urls: form.image_urls.filter((_, i) => i !== index),
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await onSubmit(form)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <h3 className="text-lg font-heading font-semibold text-primary-dark">
        {vehicule ? "Modifier le véhicule" : "Ajouter un véhicule"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marque</label>
          <Input
            value={form.marque}
            onChange={(e) => setForm({ ...form, marque: e.target.value })}
            required
            placeholder="Peugeot"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Modèle</label>
          <Input
            value={form.modele}
            onChange={(e) => setForm({ ...form, modele: e.target.value })}
            required
            placeholder="308"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Année</label>
          <Input
            type="number"
            value={form.annee}
            onChange={(e) => setForm({ ...form, annee: parseInt(e.target.value) || 0 })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
          <Input
            type="number"
            value={form.prix}
            onChange={(e) => setForm({ ...form, prix: parseInt(e.target.value) || 0 })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kilométrage</label>
          <Input
            type="number"
            value={form.kilometrage}
            onChange={(e) => setForm({ ...form, kilometrage: parseInt(e.target.value) || 0 })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Carburant</label>
          <select
            value={form.carburant}
            onChange={(e) => setForm({ ...form, carburant: e.target.value })}
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {carburants.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Multi-image upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Photos ({form.image_urls.length}/10)
        </label>
        {form.image_urls.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-3">
            {form.image_urls.map((url, index) => (
              <div key={url} className="relative w-24 h-20 rounded-lg overflow-hidden group">
                <Image src={url} alt={`Photo ${index + 1}`} fill className="object-cover" sizes="96px" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        {form.image_urls.length < 10 && (
          <UploadButton<OurFileRouter, "vehiculeImage">
            endpoint="vehiculeImage"
            appearance={{
              button: "bg-primary border-2 border-primary text-white hover:bg-transparent hover:text-primary transition-colors",
              allowedContent: "text-primary",
            }}
            onClientUploadComplete={(res) => {
              if (res) {
                const newUrls = res.map((f) => f.ufsUrl)
                setForm({ ...form, image_urls: [...form.image_urls, ...newUrls] })
              }
            }}
            onUploadError={(error) => {
              alert(`Erreur upload: ${error.message}`)
            }}
          />
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Enregistrement..." : vehicule ? "Modifier" : "Ajouter"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  )
}
