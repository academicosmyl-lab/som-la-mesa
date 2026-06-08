import { StrictMode, Component, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './lib/AuthContext.tsx'

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null }
  static getDerivedStateFromError(error: Error) { return { error } }
  render() {
    if (this.state.error) {
      const err = this.state.error
      return (
        <div style={{
          fontFamily: 'Space Mono, monospace', padding: 40,
          background: '#080B11', color: '#FF5D5D', minHeight: '100vh',
        }}>
          <div style={{ fontSize: 11, color: '#FF9F2E', marginBottom: 8, letterSpacing: '0.12em' }}>
            SOM — ERROR DE RENDER
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{err.message}</div>
          <pre style={{ fontSize: 9, color: '#7E8AA0', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
            {err.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HashRouter>
    </ErrorBoundary>
  </StrictMode>,
)
