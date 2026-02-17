"use client"

import { useState, FormEvent } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"

export default function Contact() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setError("")

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Erreur lors de l'envoi")
      setSent(true)
      form.reset()
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer ou nous appeler directement.")
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary-dark mb-4">
            Contactez-nous
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Demandez un devis gratuit ou prenez rendez-vous
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-heading font-bold text-primary-dark mb-2">
                  Message envoyé !
                </h3>
                <p className="text-gray-600">
                  Nous vous répondrons dans les plus brefs délais.
                </p>
                <Button
                  className="mt-6"
                  onClick={() => setSent(false)}
                >
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary-dark mb-1.5">
                    Nom complet
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary-dark mb-1.5">
                    Téléphone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="06 00 00 00 00"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary-dark mb-1.5">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary-dark mb-1.5">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Décrivez votre besoin..."
                    required
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={sending}>
                  {sending ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-dark">Adresse</h4>
                  <p className="text-gray-600">1 chemin des platanes<br />69230 St Genis Laval</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-dark">Téléphone</h4>
                  <p className="text-gray-600">
                    <a href="tel:0777734664" className="hover:text-primary transition-colors">07 77 73 46 64</a>
                    <br />
                    <a href="tel:0668602236" className="hover:text-primary transition-colors">06 68 60 22 36</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-dark">Email</h4>
                  <p className="text-gray-600">
                    <a href="mailto:venycar69@gmail.com" className="hover:text-primary transition-colors">
                      venycar69@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-dark">Horaires</h4>
                  <p className="text-gray-600">
                    Lun - Ven : 8h30 - 18h30
                    <br />
                    Sam : Sur rendez-vous
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-xl overflow-hidden shadow-md h-64 md:h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2785.8!2d4.785!3d45.694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1+chemin+des+platanes+69230+Saint-Genis-Laval!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Veny Cars - St Genis Laval"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
