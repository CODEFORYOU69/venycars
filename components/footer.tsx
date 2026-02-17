import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-8 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left flex flex-col md:flex-row items-center gap-3">
            <Image
              src="/logo.png"
              alt="Veny Cars"
              width={100}
              height={40}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="text-white/60 text-sm mt-1">
              Carrosserie Autos & Peinture — St Genis Laval
            </p>
          </div>
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Veny Cars. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
