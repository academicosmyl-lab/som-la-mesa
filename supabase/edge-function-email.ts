// ================================================================
// Edge Function — Email automático al ciudadano (Resend)
// ================================================================
// CÓMO ACTIVAR:
//
// 1. Crear cuenta gratuita en https://resend.com (3.000 emails/mes gratis)
// 2. Obtener API Key en Resend → API Keys → Create API Key
// 3. En Supabase → Settings → Edge Functions → Secrets:
//    Agregar: RESEND_API_KEY = tu_clave_de_resend
// 4. En Supabase → Database → Webhooks → Create a new hook:
//    - Name: notify-reporte
//    - Table: ciudadanos
//    - Events: INSERT
//    - Type: Edge Function → esta función
// ================================================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { record } = await req.json()

  // Solo enviar si el ciudadano dejó celular (no anónimo)
  if (!record?.nombre || !record?.celular) {
    return new Response(JSON.stringify({ skipped: true }), { status: 200 })
  }

  const nombre = record.nombre.split(' ')[0]

  const emailBody = {
    from: 'SOM La Mesa <noreply@fabio2027.co>',
    to: [record.email ?? 'academicosmyl@gmail.com'],
    subject: '✅ Tu reporte fue recibido — La Mesa que nos merecemos',
    html: `
      <div style="font-family: sans-serif; max-width: 540px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #1a1a1a; margin-top: 0;">Hola, ${nombre}</h2>
        <p style="color: #333; line-height: 1.6;">
          Tu reporte fue recibido correctamente en el <strong>Sistema Operativo Municipal (SOM)</strong>
          de la campaña de Fabio Andrés Cabrera Parra para la Alcaldía de La Mesa 2027.
        </p>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 16px; margin: 24px 0;">
          <p style="margin: 0; color: #166534; font-weight: 600;">
            ¿Qué pasa con tu reporte?
          </p>
          <p style="margin: 8px 0 0; color: #166534; font-size: 14px; line-height: 1.6;">
            Los problemas reportados se analizan automáticamente para construir el plan de gobierno.
            Tu voz cuenta para priorizar inversiones y soluciones reales.
          </p>
        </div>
        <p style="color: #555; font-size: 13px;">
          Gracias por participar. La Mesa que nos merecemos se construye entre todos.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="color: #999; font-size: 11px; margin: 0;">
          Campaña Fabio A. Cabrera Parra · Alcaldía de La Mesa · 2027<br/>
          Tus datos están protegidos bajo la Ley 1581 de 2012.<br/>
          Para ejercer tus derechos: academicosmyl@gmail.com
        </p>
      </div>
    `,
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
    },
    body: JSON.stringify(emailBody),
  })

  const data = await res.json()
  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  })
})
