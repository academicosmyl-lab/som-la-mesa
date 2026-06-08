import { Navigate } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        background: '#080B11', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#2dd4bf', fontFamily: 'system-ui, sans-serif', fontSize: 14,
      }}>
        Verificando acceso...
      </div>
    )
  }

  if (!session) return <Navigate to="/login" replace />

  return <>{children}</>
}
