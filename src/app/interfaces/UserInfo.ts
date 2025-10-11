// src/app/interfaces/UserInfo.ts
export interface UserProfile {
  id_usuario: number;
  email: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  dni: string;
  perfil: {
    nombre: string;
  };
}

export interface UserProfileResponse {
  success: boolean;
  data: UserProfile; 
}