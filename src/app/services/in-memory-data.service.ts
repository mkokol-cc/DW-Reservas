import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Reserva } from '../interfaces/reserva';
import { CLIENTES } from '../demo-data/cliente-data';
import { Cliente } from '../interfaces/cliente';
import { HORARIOS } from '../demo-data/horario-data';
import { Horario } from '../interfaces/horario';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const reservas: Reserva[] = [/*
      { id: 1, cliente: 'Juan Pérez', fecha: '2024-09-01', monto: 100.00 },
      { id: 2, cliente: 'María Gómez', fecha: '2024-09-02', monto: 150.00 },
      { id: 3, cliente: 'Luis Torres', fecha: '2024-09-03', monto: 200.00 }*/
    ];
    const clientes: Cliente[] = CLIENTES
    const horarios: Horario[] = HORARIOS
    return { reservas, clientes, horarios };
  }

}
