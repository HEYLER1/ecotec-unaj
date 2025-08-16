import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastrService) { }

  msjError(e: HttpErrorResponse) {
    // Si el backend devuelve un mensaje personalizado
    if (e.error?.msg) {
      this.toastr.error(e.error.msg, 'Error');
      return;
    }

    // Si el backend no envía "msg", revisamos el status
    switch (e.status) {
      case 400:
        this.toastr.error('Solicitud incorrecta (400).', 'Error');
        break;
      case 401:
        this.toastr.error('No autorizado, por favor inicie sesión (401).', 'Error');
        break;
      case 404:
        this.toastr.error('Recurso no encontrado (404).', 'Error');
        break;
      case 500:
        this.toastr.error('Error interno del servidor (500).', 'Error');
        break;
      default:
        this.toastr.error('Ocurrió un error inesperado, contacte al administrador.', 'Error');
        break;
    }
  }
}
