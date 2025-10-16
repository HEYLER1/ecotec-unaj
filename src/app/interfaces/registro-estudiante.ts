// interfaces/registro-estudiante.ts
export interface RegistroEstudiante {
  edificio_id: number;
  codigo_pila: string;
  observaciones?: string;
  verificacion: VerificacionResiduos;
}

export interface VerificacionResiduos {
  papel_carton: boolean;
  plasticos: boolean;
  metales: boolean;
  organicos: boolean;
  vidrio: boolean;
  no_aprovechables: boolean;
}