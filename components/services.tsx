"use client"

import { motion } from "motion/react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Wrench, Paintbrush, Shield, Car } from "lucide-react"

const services = [
  {
    icon: Wrench,
    title: "Carrosserie",
    description: "Réparation et remise en état de la carrosserie. Débosselage, redressage et remplacement d'éléments.",
  },
  {
    icon: Paintbrush,
    title: "Peinture",
    description: "Peinture complète ou partielle, retouches et finitions. Teinte d'origine garantie.",
  },
  {
    icon: Shield,
    title: "Pare-brise",
    description: "Remplacement et réparation de pare-brise, vitres latérales et lunettes arrière.",
  },
  {
    icon: Car,
    title: "Achat-Vente",
    description: "Achat et vente de véhicules d'occasion. Véhicules contrôlés et garantis.",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary-dark mb-4">
            Nos Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Un savoir-faire complet pour l&apos;entretien et la réparation de votre véhicule
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-md h-full">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="font-heading text-primary-dark">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
