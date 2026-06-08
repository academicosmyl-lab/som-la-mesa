import { useNavigate } from 'react-router-dom'
import { CENSO, MUNICIPIO, TERRITORIO } from '../data/seed'

const PROBLEMAS_PUBLICOS = [
  {
    titulo: 'Agua potable en zonas rurales',
    descripcion: 'Miles de familias en veredas del municipio acceden a agua no tratada, afectando la salud y calidad de vida de los más vulnerables.',
    afectados: '8.500 personas',
    zona: 'Rural',
    urgencia: 'CRÍTICO',
    color: '#c0392b',
    icon: '💧',
  },
  {
    titulo: 'Vías terciarias deterioradas',
    descripcion: 'Las vías que conectan las veredas con el casco urbano se encuentran en mal estado, aislando a productores agrícolas y limitando el comercio.',
    afectados: '6.200 personas',
    zona: 'Rural',
    urgencia: 'CRÍTICO',
    color: '#c0392b',
    icon: '🛣️',
  },
  {
    titulo: 'Falta de conectividad digital',
    descripcion: 'La brecha digital impide que jóvenes y emprendedores accedan a educación virtual, teletrabajo y mercados en línea.',
    afectados: '12.000 personas',
    zona: 'Municipio',
    urgencia: 'URGENTE',
    color: '#e67e22',
    icon: '📡',
  },
  {
    titulo: 'Desempleo juvenil',
    descripcion: 'Los jóvenes de La Mesa no encuentran oportunidades locales y migran a Bogotá. El municipio pierde su capital humano más valioso.',
    afectados: '4.800 jóvenes',
    zona: 'Urbano',
    urgencia: 'URGENTE',
    color: '#e67e22',
    icon: '👩‍💼',
  },
]

const POTENCIAL = [
  { icon: '🌿', titulo: 'Turismo y naturaleza', texto: 'A 65 km de Bogotá, La Mesa es puerta de entrada a la Provincia del Tequendama. Cascadas, clima templado y paisaje cafetero atraen miles de visitantes cada año.' },
  { icon: '☕', titulo: 'Producción agrícola', texto: 'Café, frutas tropicales y flores tienen potencial exportador. El campo de La Mesa puede ser motor económico con la inversión adecuada.' },
  { icon: '📍', titulo: 'Posición estratégica', texto: 'Capital de la Provincia del Tequendama. Centro de servicios para 10 municipios vecinos. Una plataforma de crecimiento regional sin explotar.' },
  { icon: '🎓', titulo: 'Capital humano', texto: 'Con formación y oportunidades, los jóvenes de La Mesa pueden liderar el desarrollo. El talento está aquí — falta la apuesta institucional.' },
]

export default function PublicSite() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#FAFAF7', color: '#1a1a1a', minHeight: '100vh' }}>

      {/* ── HEADER tipo periódico ── */}
      <header style={{ borderBottom: '3px solid #1a1a1a', background: '#fff' }}>
        {/* Barra superior */}
        <div style={{
          background: '#1a1a1a', color: '#fff',
          fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
          padding: '6px 32px', display: 'flex', justifyContent: 'space-between',
        }}>
          <span>La Mesa · Cundinamarca · Colombia</span>
          <span>Edición Digital · 2026</span>
        </div>

        {/* Título principal */}
        <div style={{ padding: '24px 32px 16px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: 8 }}>
            Una nueva visión para el municipio
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 900, letterSpacing: '-2px', lineHeight: 1,
            margin: 0, fontFamily: 'Georgia, serif',
          }}>
            La Mesa que<br />nos merecemos
          </h1>
          <div style={{ height: 2, background: '#1a1a1a', margin: '16px auto', width: 80 }} />
          <p style={{ fontSize: 13, color: '#555', letterSpacing: '0.05em', margin: 0 }}>
            Propuesta ciudadana · {MUNICIPIO.departamento} · Provincia del Tequendama
          </p>
        </div>

        {/* Navegación */}
        <nav style={{ padding: '10px 32px', display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['El municipio', 'Problemas', 'Potencial', 'Participa'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              style={{
                fontSize: 13, fontFamily: 'sans-serif', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: '#1a1a1a', textDecoration: 'none',
                borderBottom: '2px solid transparent',
                paddingBottom: 2,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#1a1a1a')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
            >
              {item}
            </a>
          ))}
          <button
            onClick={() => navigate('/som')}
            style={{
              fontSize: 11, fontFamily: 'sans-serif', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#fff', background: '#1a1a1a',
              border: 'none', padding: '4px 12px', cursor: 'pointer',
              borderRadius: 2,
            }}
          >
            Acceso equipo ›
          </button>
        </nav>
      </header>

      {/* ── HERO — VIDEO ── */}
      <section style={{ position: 'relative', height: 'clamp(480px, 75vh, 780px)', overflow: 'hidden' }}>
        <video
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/som-la-mesa/media/la-mesa-hero.mp4" type="video/mp4" />
        </video>

        {/* Gradiente oscuro */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%)',
        }} />

        {/* Texto hero */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '48px 32px 52px',
          maxWidth: 900, margin: '0 auto',
        }}>
          <div style={{
            display: 'inline-block',
            background: '#fff', color: '#1a1a1a',
            fontSize: 10, fontFamily: 'sans-serif', fontWeight: 800,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            padding: '3px 10px', marginBottom: 16,
          }}>
            En construcción · {MUNICIPIO.nombre}
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 60px)',
            fontWeight: 900, color: '#fff',
            lineHeight: 1.1, margin: '0 0 16px',
            textShadow: '0 2px 16px rgba(0,0,0,0.5)',
          }}>
            El comienzo de una<br />nueva historia se aproxima
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 2vw, 18px)',
            color: 'rgba(255,255,255,0.88)',
            maxWidth: 560, lineHeight: 1.6, margin: 0,
            fontStyle: 'italic',
          }}>
            La Mesa, Cundinamarca — capital de la Provincia del Tequendama —
            tiene el talento, la tierra y la gente para escribir un capítulo diferente.
          </p>
        </div>
      </section>

      {/* ── CIFRAS DEL MUNICIPIO ── */}
      <section id="el-municipio" style={{ padding: '64px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 10, fontFamily: 'sans-serif', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: 10 }}>
            El municipio en cifras
          </div>
          <h3 style={{ fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 900, margin: 0 }}>
            La Mesa en números reales
          </h3>
          <div style={{ width: 60, height: 3, background: '#1a1a1a', margin: '16px auto 0' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1, background: '#ddd', border: '1px solid #ddd' }}>
          {[
            { valor: (TERRITORIO.poblacionCenso2018 / 1000).toFixed(0) + 'K', label: 'Habitantes', sub: 'Censo 2018' },
            { valor: CENSO.habilitados.toLocaleString('es-CO'), label: 'Habilitados para votar', sub: 'Registraduría 2023' },
            { valor: TERRITORIO.urbana.porcentaje.toFixed(0) + '%', label: 'Población urbana', sub: `vs ${TERRITORIO.rural.porcentaje.toFixed(0)}% rural` },
            { valor: MUNICIPIO.distanciaBogota + ' km', label: 'De Bogotá', sub: 'Capital de provincia' },
          ].map(c => (
            <div key={c.label} style={{ background: '#fff', padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, lineHeight: 1, color: '#1a1a1a' }}>{c.valor}</div>
              <div style={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 700, marginTop: 8, color: '#1a1a1a' }}>{c.label}</div>
              <div style={{ fontSize: 11, fontFamily: 'sans-serif', color: '#888', marginTop: 4 }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DIVISOR ── */}
      <div style={{ borderTop: '3px double #1a1a1a', borderBottom: '1px solid #1a1a1a', height: 6, margin: '0 32px' }} />

      {/* ── PROBLEMAS ── */}
      <section id="problemas" style={{ padding: '64px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: 'sans-serif', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c0392b', marginBottom: 10 }}>
            Problemas identificados
          </div>
          <h3 style={{ fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 900, margin: 0 }}>
            Lo que le duele al municipio
          </h3>
          <div style={{ width: 60, height: 3, background: '#c0392b', margin: '16px auto 0' }} />
          <p style={{ fontSize: 15, color: '#555', marginTop: 16, maxWidth: 600, margin: '16px auto 0', lineHeight: 1.7 }}>
            Estos son los problemas que más afectan a la gente de La Mesa, identificados con datos reales.
            El primer paso para solucionar un problema es nombrarlo.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0, border: '1px solid #ddd' }}>
          {PROBLEMAS_PUBLICOS.map((p, i) => (
            <article
              key={p.titulo}
              style={{
                padding: '32px 28px',
                borderRight: i % 2 === 0 ? '1px solid #ddd' : 'none',
                borderBottom: i < 2 ? '1px solid #ddd' : 'none',
                background: '#fff',
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{p.icon}</div>
              <div style={{
                display: 'inline-block',
                fontSize: 9, fontFamily: 'sans-serif', fontWeight: 800,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: p.color, border: `1px solid ${p.color}`,
                padding: '2px 7px', marginBottom: 12,
              }}>
                {p.urgencia} · {p.zona}
              </div>
              <h4 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 10px', lineHeight: 1.3 }}>{p.titulo}</h4>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, margin: '0 0 16px' }}>{p.descripcion}</p>
              <div style={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: 700, color: '#1a1a1a' }}>
                Afecta: <span style={{ color: p.color }}>{p.afectados}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── FOTO + CITA ── */}
      <section style={{ background: '#1a1a1a', color: '#fff', padding: '64px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, alignItems: 'center' }}>
          <img
            src="/som-la-mesa/media/fabio-evento-1.png"
            alt="Fabio A. Cabrera"
            style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', filter: 'grayscale(20%)' }}
          />
          <div>
            <div style={{ fontSize: 10, fontFamily: 'sans-serif', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
              La voz del municipio
            </div>
            <blockquote style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontStyle: 'italic', lineHeight: 1.5, margin: '0 0 24px', borderLeft: '4px solid #fff', paddingLeft: 24 }}>
              "La Mesa tiene todo para ser grande. Lo que nos ha faltado es alguien que se ponga al frente con honestidad, con datos y con el municipio en el corazón."
            </blockquote>
            <div style={{ fontFamily: 'sans-serif', fontSize: 13 }}>
              <strong>Fabio Andrés Cabrera Parra</strong>
              <div style={{ color: '#aaa', fontSize: 11, marginTop: 4 }}>Candidato a la Alcaldía · La Mesa, Cundinamarca · 2027</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── POTENCIAL ── */}
      <section id="potencial" style={{ padding: '64px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: 'sans-serif', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#27ae60', marginBottom: 10 }}>
            Potencial del territorio
          </div>
          <h3 style={{ fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 900, margin: 0 }}>
            Por qué La Mesa puede ser grande
          </h3>
          <div style={{ width: 60, height: 3, background: '#27ae60', margin: '16px auto 0' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          {POTENCIAL.map(p => (
            <div key={p.titulo} style={{ background: '#fff', border: '1px solid #e8e8e8', padding: '28px 24px' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{p.icon}</div>
              <h4 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 10px' }}>{p.titulo}</h4>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.7, margin: 0 }}>{p.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DIVISOR ── */}
      <div style={{ borderTop: '3px double #1a1a1a', borderBottom: '1px solid #1a1a1a', height: 6, margin: '0 32px' }} />

      {/* ── CTA PARTICIPA ── */}
      <section id="participa" style={{ padding: '80px 32px', textAlign: 'center', background: '#fff' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontSize: 10, fontFamily: 'sans-serif', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: 16 }}>
            Tu voz importa
          </div>
          <h3 style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.2 }}>
            ¿Cuál es el mayor problema<br />en tu vereda o barrio?
          </h3>
          <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7, marginBottom: 36 }}>
            Próximamente lanzamos el formulario de necesidades ciudadanas.
            Cuéntanos qué le duele a tu comunidad — tu respuesta construye el plan de gobierno.
          </p>
          <div style={{
            display: 'inline-block',
            background: '#1a1a1a', color: '#fff',
            fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '14px 36px', cursor: 'default',
            opacity: 0.5,
          }}>
            Formulario próximamente ›
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#1a1a1a', color: '#aaa', padding: '32px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 900, color: '#fff', marginBottom: 8 }}>
          La Mesa que nos merecemos
        </div>
        <div style={{ fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.1em' }}>
          Campaña Fabio A. Cabrera Parra · Alcaldía de La Mesa · 2027 &nbsp;·&nbsp; La Mesa, Cundinamarca, Colombia
        </div>
      </footer>
    </div>
  )
}
