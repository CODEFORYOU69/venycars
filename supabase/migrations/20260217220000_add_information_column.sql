-- Add information text column to vehicules and realisations
ALTER TABLE vehicules ADD COLUMN information text NOT NULL DEFAULT '';
ALTER TABLE realisations ADD COLUMN information text NOT NULL DEFAULT '';
