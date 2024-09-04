import { Injectable } from '@angular/core';
import { Recurso } from '../interfaces/recurso';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  url:string = '/api/recursos'

  constructor(private http:HttpClient) { }

  list(): Observable<Recurso[]>{
    return this.http.get<Recurso[]>(this.url)
  }
  create(object: Recurso): Observable<Recurso> {
    return this.http.post<Recurso>(this.url, object)
  }
  edit(object: Recurso){
    return this.http.put<Recurso>(this.url, object)
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
