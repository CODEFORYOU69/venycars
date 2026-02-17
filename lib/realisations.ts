import { createClient } from "@/lib/supabase/client"

export type Realisation = {
  id: string
  titre: string
  image_avant_url: string
  image_apres_url: string
  created_at: string
}

export type RealisationInsert = Omit<Realisation, "id" | "created_at">

export async function getRealisations() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("realisations")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Realisation[]
}

export async function createRealisation(realisation: RealisationInsert) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("realisations")
    .insert(realisation)
    .select()
    .single()

  if (error) throw error
  return data as Realisation
}

export async function deleteRealisation(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from("realisations")
    .delete()
    .eq("id", id)

  if (error) throw error
}
