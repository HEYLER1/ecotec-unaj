// interfaces/tipo-recoleccion.interface.ts
// interfaces/tipo-recoleccion.interface.ts
export interface TipoRecoleccion {
  id_tipo_recoleccion: number;
  nombre: string;
  descripcion?: string;
  estado: number;
  campos?: CampoRecoleccion[]; // ✅ Nuevo: campos dinámicos
}

export interface CampoRecoleccion {
  nombre: string;
  label: string;
  formControlName: string;
  tipo: 'number' | 'text';
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  required?: boolean;
}