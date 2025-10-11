export interface User {
    email: string;
    password: string;
    perfil?: {
        id_perfil: number;
        nombre: string;
        descripcion?: string;
    }
}

/*export interface User {
    email: string,
    password: string
    roleName?: string;
    role?: {
    id: number;
    nombre: string;
    descripcion?: string;
  }
}*/