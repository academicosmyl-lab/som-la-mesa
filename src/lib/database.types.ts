export type TemaReporte =
  | 'vias'
  | 'agua'
  | 'seguridad'
  | 'salud'
  | 'educacion'
  | 'empleo'
  | 'otro'

export type TipoZona = 'urbano' | 'rural'

export type EstadoCompromiso = 'planeado' | 'en_curso' | 'cumplido'

export interface Zona {
  id: string
  nombre: string
  tipo: TipoZona
  lat: number
  lng: number
  votos_en_juego: number
}

export interface Reporte {
  id: string
  created_at: string
  zona_id: string
  zona_nombre: string
  tipo_zona: TipoZona
  tema: TemaReporte
  detalle: string | null
  foto_url: string | null
  lat: number | null
  lng: number | null
  anonimo: boolean
  ciudadano_id: string | null
}

export interface Ciudadano {
  id: string
  created_at: string
  nombre: string
  celular: string
  zona_id: string | null
  quiere_ser_lider: boolean
  consentimiento: boolean
  consentimiento_fecha: string
}

export interface Compromiso {
  id: string
  titulo: string
  descripcion: string
  estado: EstadoCompromiso
  avance_pct: number
  evidencia_url: string | null
  zona_id: string | null
  fecha_compromiso: string
  fecha_actualizacion: string
}

export interface Database {
  public: {
    Tables: {
      zonas: {
        Row: Zona
        Insert: Omit<Zona, 'id'>
        Update: Partial<Omit<Zona, 'id'>>
      }
      reportes: {
        Row: Reporte
        Insert: Omit<Reporte, 'id' | 'created_at'>
        Update: Partial<Omit<Reporte, 'id' | 'created_at'>>
      }
      ciudadanos: {
        Row: Ciudadano
        Insert: Omit<Ciudadano, 'id' | 'created_at' | 'consentimiento_fecha'> & { consentimiento_fecha?: string }
        Update: Partial<Omit<Ciudadano, 'id' | 'created_at'>>
      }
      compromisos: {
        Row: Compromiso
        Insert: Omit<Compromiso, 'id'>
        Update: Partial<Omit<Compromiso, 'id'>>
      }
    }
  }
}
