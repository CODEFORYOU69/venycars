import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Veny Cars — Carrosserie Autos & Peinture à St Genis Laval",
  description:
    "Carrosserie, peinture, pare-brise et achat-vente de véhicules à St Genis Laval (69230). Franchise offerte pour tout sinistre assurance. Appelez le 07 77 73 46 64.",
  keywords: [
    "carrosserie",
    "peinture auto",
    "pare-brise",
    "achat vente véhicules",
    "St Genis Laval",
    "69230",
    "Veny Cars",
    "loi Hamon",
    "franchise offerte",
  ],
  openGraph: {
    title: "Veny Cars — Carrosserie Autos & Peinture",
    description:
      "Carrosserie, peinture, pare-brise et achat-vente à St Genis Laval. Franchise offerte pour sinistre assurance.",
    type: "website",
    locale: "fr_FR",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
