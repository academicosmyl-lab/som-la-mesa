import { useNavigate } from 'react-router-dom'

export default function PrivacidadPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: '#080B11', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px' }}>

        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: '1px solid #2dd4bf44', color: '#2dd4bf', borderRadius: 8, padding: '8px 18px', cursor: 'pointer', marginBottom: 32, fontSize: 14 }}
        >
          ← Volver
        </button>

        <div style={{ borderLeft: '4px solid #2dd4bf', paddingLeft: 20, marginBottom: 40 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, color: '#2dd4bf', textTransform: 'uppercase', marginBottom: 8 }}>SOM · Sistema Operativo Municipal</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>Aviso de Privacidad y Tratamiento de Datos Personales</h1>
        </div>

        <Section title="1. Responsable del tratamiento">
          <p>
            <strong>Campaña Fabio Andrés Cabrera Parra</strong> — candidato a la Alcaldía de La Mesa,
            Cundinamarca, elecciones territoriales de octubre de 2027.
          </p>
          <p>Correo de contacto para ejercicio de derechos: <strong>academicosmyl@gmail.com</strong></p>
        </Section>

        <Section title="2. Base legal">
          <p>
            El tratamiento de datos personales se realiza conforme a la <strong>Ley 1581 de 2012</strong> (Habeas Data)
            y su Decreto Reglamentario <strong>1377 de 2013</strong>, bajo vigilancia de la
            Superintendencia de Industria y Comercio (SIC).
          </p>
        </Section>

        <Section title="3. Datos que recopilamos">
          <ul>
            <li>Nombre completo y número de celular/WhatsApp (solo si usted lo autoriza expresamente).</li>
            <li>Zona de residencia: barrio o vereda.</li>
            <li>Descripción del problema reportado y fotografía (opcional).</li>
            <li>Coordenadas GPS del reporte (solo si usted lo autoriza en su dispositivo).</li>
          </ul>
          <p>
            Si usted no desea identificarse, puede enviar su reporte de forma <strong>anónima</strong>.
            En ese caso no se recopilan datos personales.
          </p>
        </Section>

        <Section title="4. Finalidad del tratamiento">
          <ul>
            <li>Identificar y priorizar problemas del territorio para la agenda de campaña y eventual gobierno.</li>
            <li>Hacer seguimiento y respuesta a los reportes ciudadanos.</li>
            <li>Construir el mapa de necesidades del municipio (gemelo digital del SOM).</li>
            <li>Contactar a ciudadanos que voluntariamente soliciten ser líderes multiplicadores.</li>
          </ul>
          <p><strong>Sus datos NO serán usados para publicidad comercial ni cedidos a terceros sin su consentimiento.</strong></p>
        </Section>

        <Section title="5. Derechos del titular">
          <p>Usted tiene derecho a:</p>
          <ul>
            <li><strong>Conocer</strong> qué datos suyos tenemos registrados.</li>
            <li><strong>Actualizar</strong> o corregir sus datos.</li>
            <li><strong>Suprimir</strong> sus datos en cualquier momento (derecho al olvido).</li>
            <li><strong>Revocar</strong> el consentimiento otorgado.</li>
            <li><strong>Presentar quejas</strong> ante la SIC: <em>www.sic.gov.co</em></li>
          </ul>
          <p>Para ejercer cualquiera de estos derechos escriba a <strong>academicosmyl@gmail.com</strong> indicando su nombre y la solicitud. Responderemos en un máximo de 15 días hábiles.</p>
        </Section>

        <Section title="6. Seguridad">
          <p>
            Los datos se almacenan en servidores con cifrado en tránsito (HTTPS) y en reposo.
            El acceso está restringido al equipo autorizado de la campaña mediante control de roles.
          </p>
        </Section>

        <Section title="7. Vigencia">
          <p>
            Los datos se conservarán durante el período de la campaña y hasta 1 año después de las elecciones
            de octubre de 2027, salvo que usted solicite su eliminación antes.
          </p>
        </Section>

        <div style={{ marginTop: 48, padding: '16px 20px', background: '#0f1a1a', borderRadius: 10, border: '1px solid #2dd4bf33', fontSize: 13, color: '#94a3b8' }}>
          Última actualización: junio de 2026 · Versión 1.0
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: 17, fontWeight: 600, color: '#2dd4bf', marginBottom: 12, marginTop: 0 }}>{title}</h2>
      <div style={{ lineHeight: 1.75, color: '#cbd5e1' }}>{children}</div>
    </div>
  )
}
