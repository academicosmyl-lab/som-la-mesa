import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { TemaReporte } from '../lib/database.types'

export interface ReporteResumen {
  id: string
  created_at: string
  zona_nombre: string
  tipo_zona: string
  temas: TemaReporte[]
  lat: number | null
  lng: number | null
  anonimo: boolean
}

export interface StatsReportes {
  total: number
  porTema: Record<TemaReporte, number>
  porZona: Record<string, number>
  ultimaActualizacion: string | null
}

export interface CompromisoDB {
  id: string
  titulo: string
  descripcion: string
  estado: string
  avance_pct: number
  evidencia_url: string | null
  fecha_compromiso: string
}

export interface DashboardData {
  loading: boolean
  reportes: ReporteResumen[]
  stats: StatsReportes
  compromisos: CompromisoDB[]
}

const TEMAS_TODOS: TemaReporte[] = ['vias', 'agua', 'seguridad', 'salud', 'educacion', 'empleo', 'otro']

export function useDashboardData(): DashboardData {
  const [loading, setLoading] = useState(true)
  const [reportes, setReportes] = useState<ReporteResumen[]>([])
  const [compromisos, setCompromisos] = useState<CompromisoDB[]>([])

  const calcStats = (rows: ReporteResumen[]): StatsReportes => {
    const porTema = Object.fromEntries(TEMAS_TODOS.map(t => [t, 0])) as Record<TemaReporte, number>
    const porZona: Record<string, number> = {}
    rows.forEach(r => {
      r.temas.forEach(t => { porTema[t] = (porTema[t] ?? 0) + 1 })
      porZona[r.zona_nombre] = (porZona[r.zona_nombre] ?? 0) + 1
    })
    return {
      total: rows.length,
      porTema,
      porZona,
      ultimaActualizacion: rows[0]?.created_at ?? null,
    }
  }

  useEffect(() => {
    const fetchAll = async () => {
      const [{ data: rep }, { data: comp }] = await Promise.all([
        supabase
          .from('reportes')
          .select('id, created_at, zona_nombre, tipo_zona, temas, lat, lng, anonimo')
          .order('created_at', { ascending: false }),
        supabase
          .from('compromisos')
          .select('id, titulo, descripcion, estado, avance_pct, evidencia_url, fecha_compromiso')
          .order('fecha_compromiso', { ascending: true }),
      ])
      setReportes((rep as ReporteResumen[]) ?? [])
      setCompromisos((comp as CompromisoDB[]) ?? [])
      setLoading(false)
    }

    fetchAll()

    // Suscripción en tiempo real a nuevos reportes
    const channel = supabase
      .channel('reportes-live')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reportes' }, payload => {
        setReportes(prev => [payload.new as ReporteResumen, ...prev])
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return { loading, reportes, stats: calcStats(reportes), compromisos }
}
