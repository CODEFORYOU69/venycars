-- Migrate image_url (single) to image_urls (array)
-- Preserve existing data by converting non-null image_url into a single-element array

ALTER TABLE vehicules ADD COLUMN image_urls text[] NOT NULL DEFAULT '{}';

UPDATE vehicules SET image_urls = ARRAY[image_url] WHERE image_url IS NOT NULL;

ALTER TABLE vehicules DROP COLUMN image_url;
