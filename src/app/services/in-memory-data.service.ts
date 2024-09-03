import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Reserva } from '../interfaces/reserva';
import { CLIENTES } from '../demo-data/cliente-data';
import { Cliente } from '../interfaces/cliente';
import { HORARIOS } from '../demo-data/horario-data';
import { Horario } from '../interfaces/horario';
import { RESERVAS } from '../demo-data/reserva-data';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const reservas: Reserva[] = RESERVAS;
    const clientes: Cliente[] = CLIENTES
    const horarios: Horario[] = HORARIOS
    return { reservas, clientes, horarios };
  }

}
