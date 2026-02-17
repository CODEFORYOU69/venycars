"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Phone, Wrench, ShieldCheck, Car, MessageCircle, Images } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Galerie", href: "#galerie" },
  { label: "Loi Hamon", href: "#loi-hamon" },
  { label: "Achat-Vente", href: "#achat-vente" },
  { label: "Contact", href: "#contact" },
]

const mobileNavItems = [
  { label: "Services", href: "#services", icon: Wrench },
  { label: "Galerie", href: "#galerie", icon: Images },
  { label: "Achat-Vente", href: "#achat-vente", icon: Car },
  { label: "Contact", href: "#contact", icon: MessageCircle },
  { label: "Appeler", href: "tel:0777734664", icon: Phone },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* Top navbar (desktop: full nav, mobile: logo only) */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-primary-dark/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Veny Cars"
                width={140}
                height={56}
                className="h-12 md:h-14 w-auto"
                priority
              />
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild variant="accent" size="sm">
                <a href="tel:0777734664">
                  <Phone className="w-4 h-4 mr-2" />
                  Appelez-nous
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] safe-bottom">
        <div className="flex items-center justify-around h-16 px-1">
          {mobileNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-2 text-gray-500 hover:text-primary active:text-primary transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium leading-tight">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
