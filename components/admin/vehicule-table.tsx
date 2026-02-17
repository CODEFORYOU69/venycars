"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Vehicule } from "@/lib/vehicules"
import { Pencil, Trash2, Check, Car } from "lucide-react"

type Props = {
  vehicules: Vehicule[]
  onEdit: (vehicule: Vehicule) => void
  onDelete: (id: string) => void
  onToggleVendu: (id: string, vendu: boolean) => void
}

export default function VehiculeTable({ vehicules, onEdit, onDelete, onToggleVendu }: Props) {
  if (vehicules.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Aucun véhicule pour le moment.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-gray-500">
            <th className="pb-3 pr-4">Photo</th>
            <th className="pb-3 pr-4">Véhicule</th>
            <th className="pb-3 pr-4">Année</th>
            <th className="pb-3 pr-4">Prix</th>
            <th className="pb-3 pr-4">Km</th>
            <th className="pb-3 pr-4">Carburant</th>
            <th className="pb-3 pr-4">Statut</th>
            <th className="pb-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicules.map((v) => (
            <tr key={v.id} className="border-b last:border-0 hover:bg-gray-50">
              <td className="py-3 pr-4">
                <div className="w-16 h-12 rounded overflow-hidden bg-gray-100 relative">
                  {v.image_urls.length > 0 ? (
                    <Image src={v.image_urls[0]} alt={`${v.marque} ${v.modele}`} fill className="object-cover" sizes="64px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Car className="w-5 h-5 text-gray-300" />
                    </div>
                  )}
                </div>
              </td>
              <td className="py-3 pr-4 font-medium text-primary-dark">
                {v.marque} {v.modele}
              </td>
              <td className="py-3 pr-4">{v.annee}</td>
              <td className="py-3 pr-4">{v.prix.toLocaleString("fr-FR")} €</td>
              <td className="py-3 pr-4">{v.kilometrage.toLocaleString("fr-FR")} km</td>
              <td className="py-3 pr-4">{v.carburant}</td>
              <td className="py-3 pr-4">
                <Badge variant={v.vendu ? "default" : "outline"} className={v.vendu ? "bg-red-500 border-0" : ""}>
                  {v.vendu ? "Vendu" : "Disponible"}
                </Badge>
              </td>
              <td className="py-3">
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleVendu(v.id, !v.vendu)}
                    title={v.vendu ? "Marquer disponible" : "Marquer vendu"}
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onEdit(v)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm("Supprimer ce véhicule ?")) onDelete(v.id)
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
