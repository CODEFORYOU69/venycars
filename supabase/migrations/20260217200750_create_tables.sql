-- Table vehicules
CREATE TABLE IF NOT EXISTS vehicules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  marque text NOT NULL,
  modele text NOT NULL,
  annee int4 NOT NULL,
  prix int4 NOT NULL,
  kilometrage int4 NOT NULL,
  carburant text NOT NULL,
  image_url text,
  vendu boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Table realisations
CREATE TABLE IF NOT EXISTS realisations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titre text NOT NULL,
  image_avant_url text NOT NULL,
  image_apres_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE vehicules ENABLE ROW LEVEL SECURITY;
ALTER TABLE realisations ENABLE ROW LEVEL SECURITY;

-- Public read access for vehicules
CREATE POLICY "Public read vehicules" ON vehicules
  FOR SELECT USING (true);

-- Authenticated users can do everything on vehicules
CREATE POLICY "Admin full access vehicules" ON vehicules
  FOR ALL USING (auth.role() = 'authenticated');

-- Public read access for realisations
CREATE POLICY "Public read realisations" ON realisations
  FOR SELECT USING (true);

-- Authenticated users can do everything on realisations
CREATE POLICY "Admin full access realisations" ON realisations
  FOR ALL USING (auth.role() = 'authenticated');
