"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Realisation } from "@/lib/realisations"
import { Trash2 } from "lucide-react"

type Props = {
  realisations: Realisation[]
  onDelete: (id: string) => void
}

export default function RealisationTable({ realisations, onDelete }: Props) {
  if (realisations.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Aucune réalisation pour le moment.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-gray-500">
            <th className="pb-3 pr-4">Avant</th>
            <th className="pb-3 pr-4">Après</th>
            <th className="pb-3 pr-4">Titre</th>
            <th className="pb-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {realisations.map((r) => (
            <tr key={r.id} className="border-b last:border-0 hover:bg-gray-50">
              <td className="py-3 pr-4">
                <div className="w-24 h-16 rounded overflow-hidden bg-gray-100 relative">
                  <Image src={r.image_avant_url} alt="Avant" fill className="object-cover" sizes="96px" />
                </div>
              </td>
              <td className="py-3 pr-4">
                <div className="w-24 h-16 rounded overflow-hidden bg-gray-100 relative">
                  <Image src={r.image_apres_url} alt="Après" fill className="object-cover" sizes="96px" />
                </div>
              </td>
              <td className="py-3 pr-4 font-medium text-primary-dark">{r.titre}</td>
              <td className="py-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (confirm("Supprimer cette réalisation ?")) onDelete(r.id)
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
