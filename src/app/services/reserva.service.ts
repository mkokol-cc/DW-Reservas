import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../interfaces/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  url:string = '/api/reservas'

  constructor(private http:HttpClient) { }

  list(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.url)
  }
  create(object: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.url, object)
  }
  edit(object: Reserva){
    return this.http.put<Reserva>(this.url, object)
  }

}
