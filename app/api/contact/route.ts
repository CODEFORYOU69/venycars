import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, message } = await req.json()

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Nom, téléphone et message sont requis." },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: "Veny Cars Site <onboarding@resend.dev>",
      to: "venycar69@gmail.com",
      subject: `Nouveau message de ${name}`,
      html: `
        <h2>Nouveau message depuis le site Veny Cars</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Email :</strong> ${email || "Non renseigné"}</p>
        <hr />
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message." },
      { status: 500 }
    )
  }
}
