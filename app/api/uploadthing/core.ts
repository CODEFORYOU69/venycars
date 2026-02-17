import { createUploadthing, type FileRouter } from "uploadthing/server"

const f = createUploadthing()

export const ourFileRouter = {
  vehiculeImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 10 },
  }).onUploadComplete(({ file }) => {
    return { url: file.ufsUrl }
  }),

  realisationImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(({ file }) => {
    return { url: file.ufsUrl }
  }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
