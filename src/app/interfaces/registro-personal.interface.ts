// interfaces/registro-personal.interface.ts
export interface DetallePersonalPilas {
  id_detalle_pilas: number;
  registro_personal_id: number;
  plasticos_kg: number;
  organicos_kg: number;
  vidrio_kg: number;
  metales_kg: number;
  papel_carton_kg: number;
  no_aprovechables_kg: number;
}

export interface DetallePersonalCanastillas {
  id_detalle_canastillas: number;
  registro_personal_id: number;
  plasticos_kg: number;
}

export interface DetallePersonalTacho {
  id_detalle_tacho: number;
  registro_personal_id: number;
  papel_kg: number;
}

export interface RegistroPersonal {
  id_registro_personal: number;
  usuario_id: number;
  edificio_id: number;
  tipo_recoleccion_id: number;
  observaciones: string | null;
  fecha_registro: string;
  estado: number;
  edificio?: {
    id_edificio: number;
    nombre: string;
    sede?: {
      id_sede: number;
      nombre: string;
    };
  };
  tipo_recoleccion?: {
    id_tipo_recoleccion: number;
    nombre: string;
  };
  detalle_pilas?: DetallePersonalPilas | null;
  detalle_canastillas?: DetallePersonalCanastillas | null;
  detalle_tacho?: DetallePersonalTacho | null;
}