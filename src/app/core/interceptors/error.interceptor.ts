//global http error handling catch all api errors in one place  infrastructure layer   
// consistent error handling  prevent duplicate error logic in evry service 
// handle auth errors globaly ; show user-freindly messages
// src/app/core/interceptors/error.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// ✅ FUNCTIONAL INTERCEPTOR (NOT a class!)
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  return next(req).pipe(
    catchError((error: any) => {
      console.error('HTTP Error:', error);
      
      // Handle specific HTTP status codes
      switch (error.status) {
        case 401: // Unauthorized
          localStorage.removeItem('token'); // Clear invalid token
          alert('Session expired. Please log in again.');
          router.navigate(['/login']).catch(console.error);
          break;
        
        case 403: // Forbidden
          alert('You do not have permission to access this resource.');
          break;
        
        case 404: // Not Found
          alert('Requested resource not found.');
          break;
        
        case 500: // Internal Server Error
          alert('Server error. Please try again later.');
          break;
        
        default:
          const message = error.error?.message || error.message || 'An unexpected error occurred';
          alert(message);
      }
      
      return throwError(() => error);
    })
  );
};