import { createClient } from "@/lib/supabase/client"

export type Vehicule = {
  id: string
  marque: string
  modele: string
  annee: number
  prix: number
  kilometrage: number
  carburant: string
  image_urls: string[]
  information: string
  vendu: boolean
  created_at: string
}

export type VehiculeInsert = Omit<Vehicule, "id" | "created_at">

export async function getVehicules() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("vehicules")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Vehicule[]
}

export async function getVehiculesDisponibles() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("vehicules")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Vehicule[]
}

export async function createVehicule(vehicule: VehiculeInsert) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("vehicules")
    .insert(vehicule)
    .select()
    .single()

  if (error) throw error
  return data as Vehicule
}

export async function updateVehicule(id: string, updates: Partial<VehiculeInsert>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("vehicules")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as Vehicule
}

export async function deleteVehicule(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from("vehicules")
    .delete()
    .eq("id", id)

  if (error) throw error
}
