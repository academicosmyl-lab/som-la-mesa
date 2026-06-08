import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

const teal = '#2dd4bf'
const dark = '#080B11'

export default function LoginPage() {
  const { signIn, session } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session) navigate('/som', { replace: true })
  }, [session, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const err = await signIn(email, password)
    setLoading(false)
    if (err) {
      setError('Correo o contraseña incorrectos.')
    } else {
      navigate('/som', { replace: true })
    }
  }

  return (
    <div style={{
      background: dark, minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif', padding: 20,
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 56, height: 56, borderRadius: 12,
            border: `2px solid ${teal}`, marginBottom: 16,
            fontSize: 20, fontWeight: 800, color: teal, letterSpacing: 1,
          }}>SOM</div>
          <div style={{ color: '#e2e8f0', fontSize: 20, fontWeight: 700 }}>Acceso al equipo</div>
          <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>
            Sistema Operativo Municipal · La Mesa
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 6, letterSpacing: 1, textTransform: 'uppercase' }}>
              Correo electrónico
            </label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              required autoFocus placeholder="correo@ejemplo.com"
              style={{
                width: '100%', padding: '13px 16px', borderRadius: 10, boxSizing: 'border-box',
                background: '#0d1520', border: '1px solid #1e3a4a',
                color: '#e2e8f0', fontSize: 15, outline: 'none',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 6, letterSpacing: 1, textTransform: 'uppercase' }}>
              Contraseña
            </label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              required placeholder="••••••••"
              style={{
                width: '100%', padding: '13px 16px', borderRadius: 10, boxSizing: 'border-box',
                background: '#0d1520', border: '1px solid #1e3a4a',
                color: '#e2e8f0', fontSize: 15, outline: 'none',
              }}
            />
          </div>

          {error && (
            <div style={{
              background: '#1a0a0a', border: '1px solid #7f1d1d',
              color: '#fca5a5', borderRadius: 8, padding: '10px 14px', fontSize: 13,
            }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            marginTop: 4, padding: '14px', borderRadius: 10, border: 'none',
            background: loading ? '#134e4a' : teal,
            color: dark, fontWeight: 700, fontSize: 15, cursor: loading ? 'wait' : 'pointer',
            transition: 'background .2s',
          }}>
            {loading ? 'Verificando...' : 'Ingresar al SOM'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 32, color: '#334155', fontSize: 12 }}>
          Acceso restringido · Solo personal autorizado
        </div>
      </div>
    </div>
  )
}
