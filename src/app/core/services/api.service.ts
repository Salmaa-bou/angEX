// here this file   no  business logic  only generic methos g,p,p,d   centrlize the error handling  infrastructure layer 

import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root'})
export class ApiService {
    private readonly apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }
    //specifyyying the header criteria okeey
     private getHeaders() : HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept' : 'application/json',
    ...(token && {'Aurhorization': `Bearer ${token}`})

        });
     }
     get<T>(endpoint: string, params?: HttpParams): Observable<T> {
      return this.http.get<T>(`${this.apiUrl}/${endpoint}` , {
        headers: this.getHeaders(),
        params
      }).pipe(catchError(this.handleError));
     }
     post<T>(endpoint: string, body: any): Observable<T>{
        return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, {headers: this.getHeaders()
     }).pipe(catchError(this.handleError));

}    
put<T>(endpoint: string,body:any):Observable<T>
{
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`,body,{
        headers:this.getHeaders()
}).pipe(catchError(this.handleError));




}
delete<T>(endpoint: string) : Observable<T> {   
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`,{ 
        headers: this.getHeaders()

    }).pipe(catchError(this.handleError));



}
private handleError(error: any) {
    console.error('API Error :', error);
    const message = error.error?.message || error.message || 'Server error occured';
    return throwError(() => new Error(message));

}

}