"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Car, Images } from "lucide-react"
import VehiculeForm from "@/components/admin/vehicule-form"
import VehiculeTable from "@/components/admin/vehicule-table"
import RealisationForm from "@/components/admin/realisation-form"
import RealisationTable from "@/components/admin/realisation-table"
import {
  getVehicules,
  createVehicule,
  updateVehicule,
  deleteVehicule,
  type Vehicule,
  type VehiculeInsert,
} from "@/lib/vehicules"
import {
  getRealisations,
  createRealisation,
  deleteRealisation,
  type Realisation,
  type RealisationInsert,
} from "@/lib/realisations"

type Tab = "vehicules" | "galerie"

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("vehicules")

  // Vehicules state
  const [vehicules, setVehicules] = useState<Vehicule[]>([])
  const [showVehiculeForm, setShowVehiculeForm] = useState(false)
  const [editingVehicule, setEditingVehicule] = useState<Vehicule | null>(null)

  // Realisations state
  const [realisations, setRealisations] = useState<Realisation[]>([])
  const [showRealisationForm, setShowRealisationForm] = useState(false)

  useEffect(() => {
    loadVehicules()
    loadRealisations()
  }, [])

  async function loadVehicules() {
    try {
      const data = await getVehicules()
      setVehicules(data)
    } catch {
      // silently fail
    }
  }

  async function loadRealisations() {
    try {
      const data = await getRealisations()
      setRealisations(data)
    } catch {
      // silently fail
    }
  }

  // Vehicule handlers
  async function handleCreateVehicule(data: VehiculeInsert) {
    await createVehicule(data)
    setShowVehiculeForm(false)
    loadVehicules()
  }

  async function handleUpdateVehicule(data: VehiculeInsert) {
    if (!editingVehicule) return
    await updateVehicule(editingVehicule.id, data)
    setEditingVehicule(null)
    loadVehicules()
  }

  async function handleDeleteVehicule(id: string) {
    await deleteVehicule(id)
    loadVehicules()
  }

  async function handleToggleVendu(id: string, vendu: boolean) {
    await updateVehicule(id, { vendu })
    loadVehicules()
  }

  // Realisation handlers
  async function handleCreateRealisation(data: RealisationInsert) {
    await createRealisation(data)
    setShowRealisationForm(false)
    loadRealisations()
  }

  async function handleDeleteRealisation(id: string) {
    await deleteRealisation(id)
    loadRealisations()
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("vehicules")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "vehicules"
              ? "bg-primary text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Car className="w-4 h-4" />
          Véhicules ({vehicules.length})
        </button>
        <button
          onClick={() => setTab("galerie")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "galerie"
              ? "bg-primary text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Images className="w-4 h-4" />
          Galerie ({realisations.length})
        </button>
      </div>

      {/* Vehicules tab */}
      {tab === "vehicules" && (
        <div className="space-y-6">
          {showVehiculeForm || editingVehicule ? (
            <VehiculeForm
              vehicule={editingVehicule}
              onSubmit={editingVehicule ? handleUpdateVehicule : handleCreateVehicule}
              onCancel={() => {
                setShowVehiculeForm(false)
                setEditingVehicule(null)
              }}
            />
          ) : (
            <Button onClick={() => setShowVehiculeForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un véhicule
            </Button>
          )}
          <div className="bg-white rounded-xl shadow-md p-6">
            <VehiculeTable
              vehicules={vehicules}
              onEdit={setEditingVehicule}
              onDelete={handleDeleteVehicule}
              onToggleVendu={handleToggleVendu}
            />
          </div>
        </div>
      )}

      {/* Galerie tab */}
      {tab === "galerie" && (
        <div className="space-y-6">
          {showRealisationForm ? (
            <RealisationForm
              onSubmit={handleCreateRealisation}
              onCancel={() => setShowRealisationForm(false)}
            />
          ) : (
            <Button onClick={() => setShowRealisationForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une réalisation
            </Button>
          )}
          <div className="bg-white rounded-xl shadow-md p-6">
            <RealisationTable
              realisations={realisations}
              onDelete={handleDeleteRealisation}
            />
          </div>
        </div>
      )}
    </div>
  )
}
