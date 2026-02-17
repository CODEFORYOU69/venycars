import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Galerie from "@/components/galerie"
import LoiHamon from "@/components/loi-hamon"
import AchatVente from "@/components/achat-vente"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Galerie />
      <LoiHamon />
      <AchatVente />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
