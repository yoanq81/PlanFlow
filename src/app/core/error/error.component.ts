import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA, // Importing MAT_SNACK_BAR_DATA to inject data into the component
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-error',
  imports: [MatIconModule],
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  // Public properties
  data = inject<{ err: HttpErrorResponse }>(MAT_SNACK_BAR_DATA);
  title = signal<string>(this.#getErrorTitle());
  message = signal<string>(
    this.data.err.message || 'Ocurrió un error inesperado.'
  );

  #getErrorTitle() {
    let errorTitle = 'Error';
    switch (this.data.err.status) {
      case 400:
        errorTitle = 'Solicitud Incorrecta';
        break;
      case 401:
        errorTitle = 'No Autorizado';
        break;
      case 403:
        errorTitle = 'Denegado';
        break;
      case 404:
        errorTitle = 'No Encontrado';
        break;
      case 409:
        errorTitle = 'Conflicto';
        break;
      case 500:
        errorTitle = 'Error Interno en el Servidor';
        break;
      case 503:
        errorTitle = 'Servicio no disponible';
        break;
      default:
        errorTitle = 'Error desconocido';
        break;
    }
    return errorTitle;
  }
}
