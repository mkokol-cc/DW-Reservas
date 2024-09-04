import { Injectable } from '@angular/core';
import { Servicio } from '../interfaces/servicio';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url:string = '/api/servicios'

  constructor(private http:HttpClient) { }

  list(): Observable<Servicio[]>{
    return this.http.get<Servicio[]>(this.url)
  }
  create(object: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.url, object)
  }
  edit(object: Servicio){
    return this.http.put<Servicio>(this.url, object)
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  
}
