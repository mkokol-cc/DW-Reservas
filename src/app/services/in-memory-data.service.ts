import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Reserva } from '../interfaces/reserva';
import { CLIENTES } from '../demo-data/cliente-data';
import { Cliente } from '../interfaces/cliente';
import { HORARIOS } from '../demo-data/horario-data';
import { Horario } from '../interfaces/horario';
import { RESERVAS } from '../demo-data/reserva-data';
import { Servicio } from '../interfaces/servicio';
import { SERVICIOS } from '../demo-data/servicio-data';
import { Recurso } from '../interfaces/recurso';
import { RECURSOS } from '../demo-data/recurso-data';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const reservas: Reserva[] = RESERVAS;
    const clientes: Cliente[] = CLIENTES
    const horarios: Horario[] = HORARIOS
    const servicios: Servicio[] = SERVICIOS
    const recursos: Recurso[] = RECURSOS
    return { reservas, clientes, horarios, servicios, recursos };
  }

}
