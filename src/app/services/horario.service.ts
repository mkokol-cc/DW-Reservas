import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Horario } from '../interfaces/horario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  url:string = '/api/horarios'

  constructor(private http:HttpClient) { }

  list(): Observable<Horario[]>{
    return this.http.get<Horario[]>(this.url)
  }
  create(object: Horario): Observable<Horario> {
    return this.http.post<Horario>(this.url, object)
  }
  edit(object: Horario){
    return this.http.put<Horario>(this.url, object)
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

}
