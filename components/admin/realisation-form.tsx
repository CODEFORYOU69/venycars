"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UploadButton } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import type { RealisationInsert } from "@/lib/realisations"
import { X } from "lucide-react"

type Props = {
  onSubmit: (data: RealisationInsert) => Promise<void>
  onCancel: () => void
}

export default function RealisationForm({ onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<RealisationInsert>({
    titre: "",
    image_avant_url: "",
    image_apres_url: "",
  })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.image_avant_url || !form.image_apres_url) {
      alert("Veuillez uploader les deux photos (avant et après)")
      return
    }
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
        Ajouter une réalisation
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
        <Input
          value={form.titre}
          onChange={(e) => setForm({ ...form, titre: e.target.value })}
          required
          placeholder="Réparation aile avant Clio"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Photo Avant */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo Avant</label>
          {form.image_avant_url ? (
            <div className="relative w-full h-40 rounded-lg overflow-hidden">
              <Image src={form.image_avant_url} alt="Avant" fill className="object-cover" />
              <button
                type="button"
                onClick={() => setForm({ ...form, image_avant_url: "" })}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <UploadButton<OurFileRouter, "realisationImage">
              endpoint="realisationImage"
              appearance={{
                button: "bg-primary border-2 border-primary text-white hover:bg-transparent hover:text-primary transition-colors",
                allowedContent: "text-primary",
              }}
              onClientUploadComplete={(res) => {
                if (res?.[0]) {
                  setForm({ ...form, image_avant_url: res[0].ufsUrl })
                }
              }}
              onUploadError={(error) => {
                alert(`Erreur upload: ${error.message}`)
              }}
            />
          )}
        </div>

        {/* Photo Après */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo Après</label>
          {form.image_apres_url ? (
            <div className="relative w-full h-40 rounded-lg overflow-hidden">
              <Image src={form.image_apres_url} alt="Après" fill className="object-cover" />
              <button
                type="button"
                onClick={() => setForm({ ...form, image_apres_url: "" })}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <UploadButton<OurFileRouter, "realisationImage">
              endpoint="realisationImage"
              appearance={{
                button: "bg-primary border-2 border-primary text-white hover:bg-transparent hover:text-primary transition-colors",
                allowedContent: "text-primary",
              }}
              onClientUploadComplete={(res) => {
                if (res?.[0]) {
                  setForm({ ...form, image_apres_url: res[0].ufsUrl })
                }
              }}
              onUploadError={(error) => {
                alert(`Erreur upload: ${error.message}`)
              }}
            />
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Enregistrement..." : "Ajouter"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  )
}
