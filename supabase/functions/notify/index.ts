// ================================================================
// Edge Function: notify
// Disparada por: Database Webhook → tabla ciudadanos → INSERT
// Envía: confirmación al ciudadano + notificación al equipo
// ================================================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API = 'https://api.resend.com/emails'
const EQUIPO_EMAIL = 'academicosmyl@gmail.com'

async function sendEmail(to: string, subject: string, html: string, apiKey: string) {
  return fetch(RESEND_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: 'SOM La Mesa <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
    }),
  })
}

serve(async (req) => {
  try {
    const { record } = await req.json()
    const apiKey = Deno.env.get('RESEND_API_KEY') ?? ''
    if (!apiKey) return new Response('Sin RESEND_API_KEY', { status: 500 })

    const nombre   = record.nombre ?? 'Ciudadano'
    const celular  = record.celular ?? '—'
    const email    = record.email ?? null
    const esLider  = record.quiere_ser_lider ? 'Sí' : 'No'
    const fecha    = new Date(record.created_at).toLocaleString('es-CO', { timeZone: 'America/Bogota' })
    const primerNombre = nombre.split(' ')[0]

    const promesas: Promise<Response>[] = []

    // ── 1. Email de confirmación al ciudadano (solo si dejó email) ──
    if (email) {
      const htmlCiudadano = `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#f8fafc;border-radius:10px;">
          <div style="text-align:center;margin-bottom:24px;">
            <div style="font-size:48px;">✅</div>
            <h2 style="color:#0f172a;margin:12px 0 4px;">¡Gracias, ${primerNombre}!</h2>
            <p style="color:#64748b;margin:0;">Tu reporte fue recibido en el SOM</p>
          </div>
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;margin:20px 0;">
            <p style="margin:0;color:#166534;font-weight:600;font-size:15px;">¿Qué pasa ahora?</p>
            <p style="margin:8px 0 0;color:#166534;font-size:13px;line-height:1.7;">
              Tu reporte entra directamente al mapa del Sistema Operativo Municipal (SOM) de la campaña de
              <strong>Fabio Andrés Cabrera Parra</strong>. Los problemas más reportados serán los primeros
              en el plan de gobierno para La Mesa 2027.
            </p>
          </div>
          <p style="color:#475569;font-size:13px;line-height:1.7;">
            Si quieres hacer seguimiento o tienes más información que compartir, responde este correo.
          </p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;"/>
          <p style="color:#94a3b8;font-size:11px;margin:0;">
            Campaña Fabio A. Cabrera Parra · Alcaldía de La Mesa · 2027<br/>
            Tus datos están protegidos bajo la Ley 1581 de 2012.<br/>
            Para ejercer tus derechos escríbenos a ${EQUIPO_EMAIL}
          </p>
        </div>`
      promesas.push(sendEmail(email, '✅ Tu reporte fue recibido — La Mesa que nos merecemos', htmlCiudadano, apiKey))
    }

    // ── 2. Notificación al equipo de campaña (siempre) ──
    const htmlEquipo = `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#0f172a;border-radius:10px;color:#e2e8f0;">
        <div style="background:#19E3C2;color:#080B11;padding:10px 18px;border-radius:6px;display:inline-block;font-weight:700;font-size:12px;letter-spacing:1px;margin-bottom:20px;">
          NUEVO CIUDADANO REGISTRADO · SOM
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <tr><td style="padding:8px 0;color:#94a3b8;width:120px;">Nombre</td><td style="padding:8px 0;color:#e2e8f0;font-weight:600;">${nombre}</td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8;">Celular</td><td style="padding:8px 0;color:#e2e8f0;">${celular}</td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8;">Email</td><td style="padding:8px 0;color:#e2e8f0;">${email ?? '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8;">Líder</td><td style="padding:8px 0;color:${esLider === 'Sí' ? '#19E3C2' : '#94a3b8'};font-weight:${esLider === 'Sí' ? '700' : '400'};">${esLider}</td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8;">Fecha</td><td style="padding:8px 0;color:#e2e8f0;">${fecha}</td></tr>
        </table>
        <a href="https://academicosmyl-lab.github.io/som-la-mesa/#/login"
          style="display:inline-block;margin-top:20px;padding:12px 24px;background:#19E3C2;color:#080B11;border-radius:8px;font-weight:700;font-size:13px;text-decoration:none;">
          Ver en el Dashboard →
        </a>
        <p style="color:#334155;font-size:11px;margin-top:20px;">SOM · Sistema Operativo Municipal · La Mesa, Cundinamarca</p>
      </div>`
    promesas.push(sendEmail(EQUIPO_EMAIL, `🔔 Nuevo ciudadano SOM — ${nombre}`, htmlEquipo, apiKey))

    await Promise.all(promesas)
    return new Response(JSON.stringify({ ok: true }), { status: 200 })

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
})
