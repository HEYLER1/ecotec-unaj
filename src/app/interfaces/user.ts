export interface User {
    email: string,
    password: string
    roleName?: string;
    role?: {
    id: number;
    nombre: string;
    descripcion?: string;
  }
}