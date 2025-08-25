// ===== app.config.ts - CONFIGURACIÓN COMPLETA CON ZONE.JS =====
// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

// HTTP e interceptores
import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTokenInterceptor } from './utils/add-token.interceptor';

// Formularios y animaciones
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

// Toastr
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    // ✅ Zone.js se usa automáticamente (NO agregar provideZonelessChangeDetection)
    
    // Routing
    provideRouter(routes),
    
    // HTTP Client
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),
    
    // Interceptor para tokens
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true
    },
    
    // Client Hydration (opcional)
    provideClientHydration(),
    
    // Animaciones (necesario para Toastr)
    provideAnimations(),
    
    // Módulos importados
    importProvidersFrom(
      FormsModule,
      ToastrModule.forRoot({
        timeOut: 4000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        closeButton: true,
        progressBar: true
      })
    )
  ]
};