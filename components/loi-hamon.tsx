"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, ArrowRight } from "lucide-react"

export default function LoiHamon() {
  return (
    <section
      id="loi-hamon"
      className="py-20 md:py-28 bg-gradient-to-br from-primary-dark via-primary to-primary-dark relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-accent/5" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="accent" className="mb-6 text-sm px-4 py-1.5">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Vos droits
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Loi Hamon — Choisissez votre réparateur
          </h2>

          <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
            La loi Hamon vous permet de choisir librement votre carrossier pour la
            réparation de votre véhicule. Vous n&apos;êtes pas obligé de passer par le
            réparateur proposé par votre assurance. Faites valoir vos droits et
            confiez-nous votre véhicule.
          </p>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 text-center border border-white/20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-3">
            Pour tout sinistre assurance,
            <br />
            <span className="text-accent">nous offrons la franchise</span>
          </p>
          <p className="text-white/60 text-sm mb-8">
            * À hauteur de 300€
          </p>

          <Button asChild size="lg" variant="accent" className="w-full sm:w-auto">
            <a href="#contact" className="text-center">
              <span className="hidden sm:inline">Contactez-nous pour votre sinistre</span>
              <span className="sm:hidden">Contactez-nous</span>
              <ArrowRight className="w-4 h-4 ml-2 inline-block" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
