import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url:string = '/api/clientes'

  constructor(private http:HttpClient) { }

  list(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url)
  }
  create(object: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, object)
  }
  edit(object: Cliente){
    return this.http.put<Cliente>(this.url, object)
  }

}
