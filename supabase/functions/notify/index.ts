import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const RESEND = "https://api.resend.com/emails"
const EQUIPO = "academicosmyl@gmail.com"

async function mail(to: string, subject: string, html: string, key: string) {
  return fetch(RESEND, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + key,
    },
    body: JSON.stringify({
      from: "SOM La Mesa <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    }),
  })
}

function htmlCiudadano(pnombre: string): string {
  return [
    '<div style="font-family:sans-serif;padding:32px;background:#f8fafc;border-radius:10px;max-width:520px;margin:0 auto">',
    '<h2 style="color:#0f172a">Gracias, ' + pnombre + "!</h2>",
    '<p style="color:#64748b">Tu reporte fue recibido en el SOM de la campana de Fabio Cabrera para La Mesa 2027.</p>',
    '<p style="color:#166534;background:#f0fdf4;padding:16px;border-radius:8px">Los problemas mas reportados seran los primeros en el plan de gobierno.</p>',
    '<p style="color:#94a3b8;font-size:11px">Datos protegidos bajo la Ley 1581 de 2012</p>',
    "</div>",
  ].join("")
}

function htmlEquipo(nombre: string, celular: string, email: string | null, lider: string, fecha: string): string {
  const liderColor = lider === "Si" ? "#19E3C2" : "#94a3b8"
  return [
    '<div style="font-family:sans-serif;padding:32px;background:#0f172a;border-radius:10px;max-width:520px;margin:0 auto;color:#e2e8f0">',
    '<div style="background:#19E3C2;color:#080B11;padding:8px 16px;border-radius:6px;display:inline-block;font-weight:700;margin-bottom:20px">NUEVO CIUDADANO SOM</div>',
    "<table>",
    "<tr><td style=\"color:#94a3b8;padding:6px 16px 6px 0\">Nombre</td><td>" + nombre + "</td></tr>",
    "<tr><td style=\"color:#94a3b8;padding:6px 16px 6px 0\">Celular</td><td>" + celular + "</td></tr>",
    "<tr><td style=\"color:#94a3b8;padding:6px 16px 6px 0\">Email</td><td>" + (email ?? "-") + "</td></tr>",
    '<tr><td style="color:#94a3b8;padding:6px 16px 6px 0">Lider</td><td style="color:' + liderColor + '">' + lider + "</td></tr>",
    "<tr><td style=\"color:#94a3b8;padding:6px 16px 6px 0\">Fecha</td><td>" + fecha + "</td></tr>",
    "</table>",
    '<a href="https://academicosmyl-lab.github.io/som-la-mesa/#/login" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#19E3C2;color:#080B11;border-radius:8px;font-weight:700;text-decoration:none">Ver Dashboard</a>',
    "</div>",
  ].join("")
}

export default async function handler(req: Request): Promise<Response> {
  try {
    const body = await req.json()
    const record = body.record ?? body

    const apiKey = Deno.env.get("RESEND_API_KEY") ?? ""
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Sin API key" }), { status: 500 })
    }

    const nombre  = record.nombre  ?? "Ciudadano"
    const celular = record.celular ?? "-"
    const email   = record.email   ?? null
    const lider   = record.quiere_ser_lider ? "Si" : "No"
    const fecha   = new Date(record.created_at).toLocaleString("es-CO", { timeZone: "America/Bogota" })
    const pnombre = nombre.split(" ")[0]

    const tasks: Promise<Response>[] = []

    if (email) {
      tasks.push(mail(email, "Tu reporte fue recibido - La Mesa que nos merecemos", htmlCiudadano(pnombre), apiKey))
    }

    tasks.push(mail(EQUIPO, "Nuevo ciudadano SOM - " + nombre, htmlEquipo(nombre, celular, email, lider, fecha), apiKey))

    await Promise.all(tasks)
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
}
