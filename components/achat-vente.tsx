"use client"

import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, ShieldCheck, Handshake } from "lucide-react"

export default function AchatVente() {
  return (
    <section id="achat-vente" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary-dark mb-4">
            Achat & Vente de Véhicules
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Nous proposons des véhicules d&apos;occasion soigneusement sélectionnés et contrôlés
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Car,
              title: "Véhicules sélectionnés",
              description: "Chaque véhicule est inspecté et remis en état par nos soins avant la vente.",
            },
            {
              icon: ShieldCheck,
              title: "Garantie incluse",
              description: "Tous nos véhicules sont vendus avec garantie pour votre tranquillité.",
            },
            {
              icon: Handshake,
              title: "Reprise possible",
              description: "Nous rachetons votre ancien véhicule. Estimation gratuite et sans engagement.",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center border-0 shadow-md h-full">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-primary-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Vehicle placeholder grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden border-0 shadow-md group hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Car className="w-16 h-16 text-gray-300" />
                </div>
                <CardContent className="pt-4 pb-6">
                  <Badge variant="outline" className="mb-2">Bientôt disponible</Badge>
                  <h4 className="font-heading font-semibold text-primary-dark">
                    Véhicule à venir
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Contactez-nous pour connaître nos véhicules disponibles
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
