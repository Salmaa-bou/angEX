// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { errorInterceptor } from './app/core/interceptors/error.interceptor'; 
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([errorInterceptor])) 
  ]
}).catch(err => console.error('Bootstrap error:', err));