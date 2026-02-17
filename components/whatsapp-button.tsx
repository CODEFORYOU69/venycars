"use client"

import { motion } from "motion/react"

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/33777734664"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      className="fixed bottom-24 md:bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-7 h-7 fill-white"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.338 22.594c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.828-6.81-8.066-7.126-.228-.316-1.922-2.558-1.922-4.878s1.216-3.462 1.648-3.936c.432-.474.942-.592 1.256-.592.314 0 .628.002.904.016.29.014.68-.11 1.064.812.39.94 1.33 3.242 1.446 3.476.118.236.196.51.04.824-.158.316-.236.512-.472.79-.236.276-.496.616-.708.826-.236.236-.482.492-.208.964.276.472 1.226 2.022 2.632 3.276 1.81 1.614 3.336 2.114 3.808 2.35.472.236.748.196 1.024-.118.276-.316 1.178-1.374 1.492-1.846.314-.472.628-.392 1.06-.236.432.158 2.738 1.292 3.208 1.528.472.236.786.354.904.55.116.196.116 1.136-.274 2.236z" />
      </svg>
    </motion.a>
  )
}
