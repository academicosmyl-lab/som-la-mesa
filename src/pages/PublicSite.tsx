import './PublicSite.css'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MUNICIPIO } from '../data/seed'
import StatsCharts from '../components/public/StatsCharts'

const PROBLEMAS_PUBLICOS = [
  {
    titulo: 'Agua potable en zonas rurales',
    descripcion: 'Miles de familias en veredas del municipio acceden a agua no tratada, afectando la salud y calidad de vida de los más vulnerables.',
    afectados: '8.500 personas',
    zona: 'Rural',
    urgencia: 'CRÍTICO',
    color: '#c0392b',
    img: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?w=800&q=80',
  },
  {
    titulo: 'Vías terciarias deterioradas',
    descripcion: 'Las vías que conectan las veredas con el casco urbano están en mal estado, aislando productores agrícolas y limitando el comercio local.',
    afectados: '6.200 personas',
    zona: 'Rural',
    urgencia: 'CRÍTICO',
    color: '#c0392b',
    img: 'https://images.unsplash.com/photo-1609185034404-a7a6354df54d?w=800&q=80',
  },
  {
    titulo: 'Falta de conectividad digital',
    descripcion: 'La brecha digital impide que jóvenes y emprendedores accedan a educación virtual, teletrabajo y mercados en línea.',
    afectados: '12.000 personas',
    zona: 'Municipio',
    urgencia: 'URGENTE',
    color: '#e67e22',
    img: 'https://images.unsplash.com/photo-1564760290292-23341e4df6ec?w=800&q=80',
  },
  {
    titulo: 'Desempleo juvenil',
    descripcion: 'Los jóvenes de La Mesa no encuentran oportunidades locales y migran a Bogotá. El municipio pierde su capital humano más valioso.',
    afectados: '4.800 jóvenes',
    zona: 'Urbano',
    urgencia: 'URGENTE',
    color: '#e67e22',
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
  },
]

const POTENCIAL = [
  { icon: '🌿', titulo: 'Turismo y naturaleza', texto: 'A 65 km de Bogotá, La Mesa es puerta de entrada a la Provincia del Tequendama. Cascadas, clima templado y paisaje cafetero atraen miles de visitantes cada año.' },
  { icon: '☕', titulo: 'Producción agrícola', texto: 'Café, frutas tropicales y flores tienen potencial exportador. El campo de La Mesa puede ser motor económico con la inversión adecuada.' },
  { icon: '📍', titulo: 'Posición estratégica', texto: 'Capital de la Provincia del Tequendama. Centro de servicios para 10 municipios vecinos. Una plataforma de crecimiento regional sin explotar.' },
  { icon: '🎓', titulo: 'Capital humano', texto: 'Con formación y oportunidades, los jóvenes de La Mesa pueden liderar el desarrollo. El talento está aquí — falta la apuesta institucional.' },
]

const BASE = '/som-la-mesa'

export default function PublicSite() {
  const navigate = useNavigate()
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted
      setMuted(m => !m)
    }
  }

  return (
    <div className="ps-root">

      {/* ── HEADER ── */}
      <header style={{ borderBottom: '3px solid #1a1a1a', background: '#fff' }}>
        <div className="ps-topbar">
          <span>La Mesa · Cundinamarca · Colombia</span>
          <span>Edición Digital · 2026</span>
        </div>

        <div className="ps-header-title">
          <p className="ps-eyebrow">Una nueva visión para el municipio</p>
          <h1 className="ps-title">La Mesa que<br />nos merecemos</h1>
          <div className="ps-divider-short" />
          <p className="ps-subtitle">{MUNICIPIO.departamento} · Provincia del Tequendama</p>
        </div>

        <nav className="ps-nav">
          {[
            { label: 'El municipio', id: 'el-municipio' },
            { label: 'Problemas',   id: 'problemas'    },
            { label: 'Potencial',   id: 'potencial'    },
            { label: 'Participa',   id: 'participa'    },
          ].map(({ label, id }) => (
            <a
              key={id}
              href="#"
              onClick={e => {
                e.preventDefault()
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {label}
            </a>
          ))}
          <button className="ps-nav-btn" onClick={() => navigate('/login')}>
            Equipo ›
          </button>
        </nav>
      </header>

      {/* ── HERO VIDEO ── */}
      <section className="ps-hero">
        <video ref={videoRef} autoPlay muted loop playsInline>
          <source src={`${BASE}/media/la-mesa-hero.mp4`} type="video/mp4" />
        </video>
        <div className="ps-hero-overlay" />

        {/* Botón mute/unmute */}
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Activar sonido' : 'Silenciar'}
          style={{
            position: 'absolute', top: 16, right: 16, zIndex: 10,
            background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '50%', width: 42, height: 42,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff', fontSize: 18,
            backdropFilter: 'blur(4px)',
            transition: 'background 0.2s',
          }}
        >
          {muted ? '🔇' : '🔊'}
        </button>
        <div className="ps-hero-content">
          <div className="ps-hero-tag">En construcción · {MUNICIPIO.nombre}</div>
          <h2 className="ps-hero-title">
            El comienzo de una<br />nueva historia se aproxima
          </h2>
          <p className="ps-hero-desc">
            La Mesa, Cundinamarca — capital de la Provincia del Tequendama —
            tiene el talento, la tierra y la gente para escribir un capítulo diferente.
          </p>
        </div>
      </section>

      {/* ── CIFRAS ── */}
      <section id="el-municipio" className="ps-section">
        <div className="ps-section-header">
          <p className="ps-section-eyebrow" style={{ color: '#888' }}>El municipio en cifras</p>
          <h3 className="ps-section-title">La Mesa en números reales</h3>
          <div style={{ width: 60, height: 3, background: '#1a1a1a', margin: '14px auto 0' }} />
        </div>

        <StatsCharts />
      </section>

      <div className="ps-rule" />

      {/* ── PROBLEMAS ── */}
      <section id="problemas" className="ps-section">
        <div className="ps-section-header">
          <p className="ps-section-eyebrow" style={{ color: '#c0392b' }}>Problemas identificados</p>
          <h3 className="ps-section-title">Lo que le duele al municipio</h3>
          <div style={{ width: 60, height: 3, background: '#c0392b', margin: '14px auto 0' }} />
          <p className="ps-section-lead">
            Estos son los problemas que más afectan a la gente de La Mesa.
            El primer paso para solucionar un problema es nombrarlo.
          </p>
        </div>

        <div className="ps-problems-grid">
          {PROBLEMAS_PUBLICOS.map(p => (
            <article key={p.titulo} className="ps-problem-card">
              <div className="ps-problem-img-wrap">
                <img src={p.img} alt={p.titulo} className="ps-problem-img" loading="lazy" />
                <div className="ps-urgency-badge" style={{ color: '#fff', borderColor: p.color, background: p.color }}>
                  {p.urgencia} · {p.zona}
                </div>
              </div>
              <div className="ps-problem-body">
                <h4 className="ps-problem-title">{p.titulo}</h4>
                <p className="ps-problem-desc">{p.descripcion}</p>
                <div className="ps-problem-affected">
                  Afecta: <span style={{ color: p.color }}>{p.afectados}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── CITA / FOTO ── */}
      <section className="ps-quote-section">
        <div className="ps-quote-inner">
          <img
            src={`${BASE}/media/fabio-cabildo.png`}
            alt="Fabio A. Cabrera hablando en cabildo"
            className="ps-quote-img"
          />
          <div>
            <p className="ps-quote-eyebrow">La voz del municipio</p>
            <blockquote className="ps-blockquote">
              "La Mesa tiene todo para ser grande. Lo que nos ha faltado es alguien
              que se ponga al frente con honestidad, con datos y con el municipio en el corazón."
            </blockquote>
            <div className="ps-quote-author">
              <strong>Fabio Andrés Cabrera Parra</strong>
              <p className="ps-quote-author-sub">Candidato a la Alcaldía · La Mesa, Cundinamarca · 2027</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── POTENCIAL ── */}
      <section id="potencial" className="ps-section">
        <div className="ps-section-header">
          <p className="ps-section-eyebrow" style={{ color: '#27ae60' }}>Potencial del territorio</p>
          <h3 className="ps-section-title">Por qué La Mesa puede ser grande</h3>
          <div style={{ width: 60, height: 3, background: '#27ae60', margin: '14px auto 0' }} />
        </div>

        <div className="ps-potential-grid">
          {POTENCIAL.map(p => (
            <div key={p.titulo} className="ps-potential-card">
              <div className="ps-potential-icon">{p.icon}</div>
              <h4 className="ps-potential-title">{p.titulo}</h4>
              <p className="ps-potential-text">{p.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <div className="ps-gallery">
        {[
          { src: `${BASE}/media/fabio-mesa-reunion.png`,  alt: 'Reunión de trabajo' },
          { src: `${BASE}/media/fabio-institucional.png`, alt: 'Gestión institucional' },
          { src: `${BASE}/media/fabio-comunidad.png`,     alt: 'Con la comunidad' },
        ].map(img => (
          <div key={img.src} className="ps-gallery-item">
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>

      <div className="ps-rule" />

      {/* ── CTA ── */}
      <section id="participa" className="ps-cta">
        <div className="ps-cta-inner">
          <p className="ps-eyebrow" style={{ color: '#888', marginBottom: 16 }}>Tu voz importa</p>
          <h3 className="ps-cta-title">
            ¿Cuál es el mayor problema<br />en tu vereda o barrio?
          </h3>
          <p className="ps-cta-text">
            El formulario de necesidades ciudadanas ya está activo.
            Cuéntanos qué le duele a tu comunidad — tu respuesta construye el plan de gobierno.
          </p>
          <a href="#/reportar" className="ps-cta-btn" style={{ textDecoration: 'none' }}>
            <span className="ps-cta-text-inner">Reportar mi zona</span>
            <span className="ps-cta-arrow">›</span>
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ps-footer">
        <div className="ps-footer-title">La Mesa que nos merecemos</div>
        <div className="ps-footer-sub">
          Campaña Fabio A. Cabrera Parra · Alcaldía de La Mesa · 2027 · La Mesa, Cundinamarca
        </div>
      </footer>

    </div>
  )
}
