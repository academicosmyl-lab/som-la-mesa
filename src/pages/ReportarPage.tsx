import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { TemaReporte } from '../lib/database.types'

const BARRIOS = ['Centro', 'El Triunfo', 'La Esperanza', 'Brisas del Campo', 'San Carlos']
const VEREDAS = ['El Cairo', 'La Esperanza Rural', 'San Javier', 'El Paraíso', 'La Victoria', 'El Triunfo Rural', 'Las Palmas']

const TEMAS: { value: TemaReporte; label: string; icon: string }[] = [
  { value: 'vias',      label: 'Vías y movilidad',  icon: '🛣️' },
  { value: 'agua',      label: 'Agua / acueducto',  icon: '💧' },
  { value: 'seguridad', label: 'Seguridad',          icon: '🛡️' },
  { value: 'salud',     label: 'Salud',              icon: '🏥' },
  { value: 'educacion', label: 'Educación',          icon: '🎓' },
  { value: 'empleo',    label: 'Empleo / economía',  icon: '💼' },
  { value: 'otro',      label: 'Otro',               icon: '📝' },
]

const SUB_PREGUNTAS: Record<TemaReporte, string> = {
  vias:      '¿Es una vía urbana o un carreteable veredal? ¿Está intransitable?',
  agua:      '¿Tienes acueducto? ¿Cada cuánto llega el agua?',
  seguridad: '¿Qué tipo de hecho? ¿A qué hora suele ocurrir?',
  salud:     '¿Hay centro de salud cercano? ¿Cuánto tiempo demoras en llegar?',
  educacion: '¿El problema es infraestructura, docentes o acceso?',
  empleo:    '¿El problema es falta de empleo, informalidad o turismo estacional?',
  otro:      'Cuéntanos con tus palabras qué está pasando en tu zona.',
}

type Paso = 'inicio' | 'zona' | 'barrio_vereda' | 'temas' | 'detalles' | 'foto' | 'consentimiento' | 'lider' | 'gracias' | 'cerrado'

interface FormState {
  esHabitante: 'si' | 'negocio' | 'no' | null
  tipoZona: 'urbano' | 'rural' | null
  zonaNombre: string
  temas: TemaReporte[]
  detalles: Partial<Record<TemaReporte, string>>
  fotoFile: File | null
  fotoUrl: string | null
  lat: number | null
  lng: number | null
  autorizaContacto: boolean | null
  nombre: string
  celular: string
  email: string
  consentimiento: boolean
  quiereLider: 'si' | 'tal_vez' | 'no' | null
}

const INIT: FormState = {
  esHabitante: null, tipoZona: null, zonaNombre: '',
  temas: [], detalles: {},
  fotoFile: null, fotoUrl: null, lat: null, lng: null,
  autorizaContacto: null, nombre: '', celular: '', email: '', consentimiento: false,
  quiereLider: null,
}

const teal = '#2dd4bf'
const dark = '#080B11'
const card = '#0d1520'
const border = '#1e3a4a'

const btnBase: React.CSSProperties = {
  padding: '12px 16px', borderRadius: 10, cursor: 'pointer',
  fontSize: 14, fontWeight: 600, border: `1px solid ${border}`,
  background: card, color: '#e2e8f0', textAlign: 'left', width: '100%',
}
const btnActive: React.CSSProperties = {
  ...btnBase, borderColor: teal, color: teal, background: '#0a1f1e',
}
const btnPrimary: React.CSSProperties = {
  padding: '13px 32px', borderRadius: 10, cursor: 'pointer',
  fontSize: 15, fontWeight: 700, background: teal, color: dark,
  border: 'none', width: '100%', marginTop: 8,
}

export default function ReportarPage() {
  const navigate = useNavigate()
  const [paso, setPaso] = useState<Paso>('inicio')
  const [form, setForm] = useState<FormState>(INIT)
  const [enviando, setEnviando] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (patch: Partial<FormState>) => setForm(p => ({ ...p, ...patch }))

  const toggleTema = (t: TemaReporte) => {
    set({
      temas: form.temas.includes(t)
        ? form.temas.filter(x => x !== t)
        : [...form.temas, t],
    })
  }

  const setDetalle = (tema: TemaReporte, texto: string) => {
    set({ detalles: { ...form.detalles, [tema]: texto } })
  }

  const capturarGPS = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(pos =>
      set({ lat: pos.coords.latitude, lng: pos.coords.longitude })
    )
  }

  const subirFoto = async (file: File): Promise<string | null> => {
    const ext = file.name.split('.').pop()
    const path = `reportes/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('fotos-reportes').upload(path, file)
    if (error) return null
    const { data } = supabase.storage.from('fotos-reportes').getPublicUrl(path)
    return data.publicUrl
  }

  const enviar = async () => {
    if (!form.temas.length || !form.zonaNombre || !form.tipoZona) return
    setEnviando(true)

    let fotoUrl: string | null = null
    if (form.fotoFile) fotoUrl = await subirFoto(form.fotoFile)

    let ciudadanoId: string | null = null
    if (form.autorizaContacto && form.nombre && form.celular && form.consentimiento) {
      const { data: c } = await supabase
        .from('ciudadanos')
        .insert({
          nombre: form.nombre,
          celular: form.celular,
          email: form.email || null,
          zona_id: null,
          quiere_ser_lider: form.quiereLider === 'si',
          consentimiento: true,
        })
        .select('id')
        .single()
      ciudadanoId = (c as { id: string } | null)?.id ?? null
    }

    await supabase.from('reportes').insert({
      zona_nombre: form.zonaNombre,
      tipo_zona: form.tipoZona,
      temas: form.temas,
      detalles: Object.keys(form.detalles).length ? form.detalles : null,
      foto_url: fotoUrl,
      lat: form.lat,
      lng: form.lng,
      anonimo: !form.autorizaContacto,
      ciudadano_id: ciudadanoId,
    })

    setEnviando(false)
    setPaso('gracias')
  }

  return (
    <div style={{ background: dark, minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '32px 20px 60px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <button onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 22, padding: 0 }}>←</button>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, color: teal, textTransform: 'uppercase' }}>SOM · La Mesa</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Reporta tu zona</div>
          </div>
        </div>

        {paso !== 'gracias' && paso !== 'cerrado' && <BarraProgreso paso={paso} />}

        {/* ── INICIO ── */}
        {paso === 'inicio' && (
          <Card titulo="¿Eres habitante de La Mesa?">
            {(['si', 'negocio', 'no'] as const).map(v => (
              <button key={v} style={form.esHabitante === v ? btnActive : btnBase}
                onClick={() => set({ esHabitante: v })}>
                {v === 'si' ? '✅ Sí, vivo aquí'
                  : v === 'negocio' ? '🏢 No, pero tengo negocio o propiedad aquí'
                  : '❌ No'}
              </button>
            ))}
            {form.esHabitante === 'no'
              ? <button style={btnPrimary} onClick={() => setPaso('cerrado')}>Continuar</button>
              : form.esHabitante && <button style={btnPrimary} onClick={() => setPaso('zona')}>Continuar →</button>
            }
          </Card>
        )}

        {/* ── ZONA ── */}
        {paso === 'zona' && (
          <Card titulo="¿En qué zona vives?">
            {(['urbano', 'rural'] as const).map(v => (
              <button key={v} style={form.tipoZona === v ? btnActive : btnBase}
                onClick={() => set({ tipoZona: v, zonaNombre: '' })}>
                {v === 'urbano' ? '🏘️ Casco urbano' : '🌿 Zona rural'}
              </button>
            ))}
            {form.tipoZona && <button style={btnPrimary} onClick={() => setPaso('barrio_vereda')}>Continuar →</button>}
          </Card>
        )}

        {/* ── BARRIO / VEREDA ── */}
        {paso === 'barrio_vereda' && (
          <Card titulo={form.tipoZona === 'urbano' ? '¿En qué barrio?' : '¿En qué vereda?'}>
            <select value={form.zonaNombre} onChange={e => set({ zonaNombre: e.target.value })}
              style={{ width: '100%', padding: '13px 16px', borderRadius: 10, background: card, border: `1px solid ${border}`, color: '#e2e8f0', fontSize: 15 }}>
              <option value="">— Selecciona —</option>
              {(form.tipoZona === 'urbano' ? BARRIOS : VEREDAS).map(z => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
            {form.zonaNombre && <button style={btnPrimary} onClick={() => setPaso('temas')}>Continuar →</button>}
          </Card>
        )}

        {/* ── TEMAS (SELECCIÓN MÚLTIPLE) ── */}
        {paso === 'temas' && (
          <Card titulo="¿Cuáles son los problemas de tu zona?">
            <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 0, marginBottom: 4 }}>
              Puedes seleccionar todos los que apliquen.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {TEMAS.map(t => {
                const activo = form.temas.includes(t.value)
                return (
                  <button key={t.value}
                    style={{
                      ...( activo ? btnActive : btnBase),
                      display: 'flex', flexDirection: 'column', gap: 4, position: 'relative',
                    }}
                    onClick={() => toggleTema(t.value)}>
                    {activo && (
                      <span style={{
                        position: 'absolute', top: 8, right: 10,
                        background: teal, color: dark, borderRadius: '50%',
                        width: 18, height: 18, fontSize: 11, fontWeight: 800,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>✓</span>
                    )}
                    <span style={{ fontSize: 22 }}>{t.icon}</span>
                    <span style={{ fontSize: 13 }}>{t.label}</span>
                  </button>
                )
              })}
            </div>
            {form.temas.length > 0 && (
              <button style={btnPrimary} onClick={() => setPaso('detalles')}>
                Continuar con {form.temas.length} tema{form.temas.length > 1 ? 's' : ''} →
              </button>
            )}
          </Card>
        )}

        {/* ── DETALLES (uno por tema seleccionado) ── */}
        {paso === 'detalles' && (
          <Card titulo="Cuéntanos más sobre cada problema">
            <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 0 }}>
              Puedes responder solo los que conozcas.
            </p>
            {form.temas.map(t => {
              const meta = TEMAS.find(x => x.value === t)!
              return (
                <div key={t} style={{ marginBottom: 16 }}>
                  <label style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: 14, fontWeight: 600, color: teal, marginBottom: 8,
                  }}>
                    <span>{meta.icon}</span> {meta.label}
                  </label>
                  <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 8px' }}>
                    {SUB_PREGUNTAS[t]}
                  </p>
                  <textarea
                    value={form.detalles[t] ?? ''}
                    onChange={e => setDetalle(t, e.target.value)}
                    placeholder="Describe el problema (opcional)..."
                    rows={3}
                    style={{
                      width: '100%', padding: '12px 14px', borderRadius: 10,
                      background: '#060e18', border: `1px solid ${border}`,
                      color: '#e2e8f0', fontSize: 14, resize: 'vertical', boxSizing: 'border-box',
                    }}
                  />
                </div>
              )
            })}
            <button style={btnPrimary} onClick={() => setPaso('foto')}>Continuar →</button>
          </Card>
        )}

        {/* ── FOTO ── */}
        {paso === 'foto' && (
          <Card titulo="¿Puedes adjuntar una foto?">
            <input ref={fileRef} type="file" accept="image/*" capture="environment"
              style={{ display: 'none' }}
              onChange={e => {
                const f = e.target.files?.[0] ?? null
                set({ fotoFile: f, fotoUrl: f ? URL.createObjectURL(f) : null })
                capturarGPS()
              }}
            />
            {form.fotoUrl
              ? <img src={form.fotoUrl} alt="preview"
                  style={{ width: '100%', borderRadius: 10, marginBottom: 12, maxHeight: 220, objectFit: 'cover' }} />
              : (
                <button style={{ ...btnBase, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 20 }}
                  onClick={() => fileRef.current?.click()}>
                  📸 Tomar o subir foto
                </button>
              )
            }
            {form.lat && <div style={{ fontSize: 12, color: teal, marginBottom: 8 }}>📍 Ubicación capturada</div>}
            <button style={btnPrimary} onClick={() => setPaso('consentimiento')}>
              {form.fotoFile ? 'Continuar →' : 'Continuar sin foto →'}
            </button>
          </Card>
        )}

        {/* ── CONSENTIMIENTO ── */}
        {paso === 'consentimiento' && (
          <Card titulo="¿Autorizas que te contactemos?">
            <p style={{ color: '#94a3b8', fontSize: 14, marginTop: 0 }}>
              Para hacerle seguimiento a tu reporte. Si prefieres, puedes enviarlo de forma anónima.
            </p>
            {([true, false] as const).map(v => (
              <button key={String(v)} style={form.autorizaContacto === v ? btnActive : btnBase}
                onClick={() => set({ autorizaContacto: v })}>
                {v ? '✅ Sí, pueden contactarme' : '🙈 No, enviar como reporte anónimo'}
              </button>
            ))}
            {form.autorizaContacto === true && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
                <input placeholder="Tu nombre completo" value={form.nombre}
                  onChange={e => set({ nombre: e.target.value })}
                  style={{ padding: '13px 16px', borderRadius: 10, background: card, border: `1px solid ${border}`, color: '#e2e8f0', fontSize: 15 }}
                />
                <input placeholder="Celular / WhatsApp" value={form.celular}
                  onChange={e => set({ celular: e.target.value })}
                  style={{ padding: '13px 16px', borderRadius: 10, background: card, border: `1px solid ${border}`, color: '#e2e8f0', fontSize: 15 }}
                />
                <input placeholder="Correo electrónico (opcional — para confirmación)" value={form.email}
                  onChange={e => set({ email: e.target.value })}
                  type="email"
                  style={{ padding: '13px 16px', borderRadius: 10, background: card, border: `1px solid ${border}`, color: '#e2e8f0', fontSize: 15 }}
                />
                <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', fontSize: 13, color: '#94a3b8' }}>
                  <input type="checkbox" checked={form.consentimiento}
                    onChange={e => set({ consentimiento: e.target.checked })}
                    style={{ marginTop: 2, accentColor: teal }}
                  />
                  Autorizo el tratamiento de mis datos conforme a la{' '}
                  <a href="#/privacidad" target="_blank" style={{ color: teal }}>Política de Privacidad</a>{' '}
                  (Ley 1581 de 2012).
                </label>
              </div>
            )}
            {(form.autorizaContacto === false ||
              (form.autorizaContacto === true && form.nombre && form.celular && form.consentimiento)) && (
              <button style={btnPrimary} onClick={() => form.autorizaContacto ? setPaso('lider') : enviar()}>
                {form.autorizaContacto ? 'Continuar →' : 'Enviar reporte'}
              </button>
            )}
          </Card>
        )}

        {/* ── LÍDER ── */}
        {paso === 'lider' && (
          <Card titulo="¿Te gustaría ser líder en tu zona?">
            <p style={{ color: '#94a3b8', fontSize: 14, marginTop: 0 }}>
              Los líderes multiplicadores ayudan a capturar más reportes y a organizar su comunidad.
            </p>
            {(['si', 'tal_vez', 'no'] as const).map(v => (
              <button key={v} style={form.quiereLider === v ? btnActive : btnBase}
                onClick={() => set({ quiereLider: v })}>
                {v === 'si' ? '🙋 Sí, me interesa'
                  : v === 'tal_vez' ? '🤔 Tal vez, cuéntame más'
                  : '➡️ No por ahora'}
              </button>
            ))}
            {form.quiereLider && (
              <button style={btnPrimary} onClick={enviar} disabled={enviando}>
                {enviando ? 'Enviando...' : '✅ Enviar reporte'}
              </button>
            )}
          </Card>
        )}

        {/* ── CERRADO ── */}
        {paso === 'cerrado' && (
          <Card titulo="¡Gracias por tu interés!">
            <p style={{ color: '#94a3b8' }}>
              Este formulario está diseñado para habitantes, propietarios y empresarios de La Mesa.
            </p>
            <button style={btnPrimary} onClick={() => navigate('/')}>Volver al inicio</button>
          </Card>
        )}

        {/* ── GRACIAS ── */}
        {paso === 'gracias' && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
            <h2 style={{ color: teal, fontSize: 24, marginBottom: 12 }}>¡Reporte enviado!</h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 16 }}>
              Tu reporte sobre <strong style={{ color: '#e2e8f0' }}>{form.zonaNombre}</strong> ya está en el mapa del SOM.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
              {form.temas.map(t => {
                const meta = TEMAS.find(x => x.value === t)!
                return (
                  <span key={t} style={{ background: '#0a1f1e', border: `1px solid ${teal}`, color: teal, borderRadius: 99, padding: '4px 14px', fontSize: 13 }}>
                    {meta.icon} {meta.label}
                  </span>
                )
              })}
            </div>
            <p style={{ color: '#64748b', fontSize: 13, marginBottom: 32 }}>
              Juntos construimos un municipio que decide con datos.
            </p>
            <button style={btnPrimary} onClick={() => navigate('/')}>Volver al inicio</button>
          </div>
        )}

      </div>
    </div>
  )
}

const PASOS_ORDEN: Paso[] = ['inicio', 'zona', 'barrio_vereda', 'temas', 'detalles', 'foto', 'consentimiento', 'lider']

function BarraProgreso({ paso }: { paso: Paso }) {
  const idx = PASOS_ORDEN.indexOf(paso)
  const total = PASOS_ORDEN.length
  const pct = idx < 0 ? 100 : Math.round(((idx + 1) / total) * 100)
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginBottom: 6 }}>
        <span>Paso {idx + 1} de {total}</span>
        <span>{pct}%</span>
      </div>
      <div style={{ background: border, borderRadius: 99, height: 4 }}>
        <div style={{ background: teal, borderRadius: 99, height: 4, width: `${pct}%`, transition: 'width .4s' }} />
      </div>
    </div>
  )
}

function Card({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div style={{ background: card, borderRadius: 14, border: `1px solid ${border}`, padding: '24px 22px' }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginTop: 0, marginBottom: 20, lineHeight: 1.4 }}>{titulo}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>
    </div>
  )
}
