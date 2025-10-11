// interfaces/sede.ts (ACTUALIZADA)
/*export interface Sede {
  id: number;
  nombre: string;
  imagen: string | null;
  activo: boolean;
  createdAt?: string;
  updatedAt?: string;
}*/

export interface Sede {
  id_sede: number;           
  nombre: string;
  imagen: string | null;
  estado: number;           
}