import { Component, ViewChild } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ListRecursoComponent } from '../pack-recurso/list-recurso/list-recurso.component';
import { ListReservaComponent } from '../pack-reserva/list-reserva/list-reserva.component';
import { ListServicioComponent } from '../pack-servicio/list-servicio/list-servicio.component';
import { ListClienteComponent } from '../pack-clientes/list-cliente/list-cliente.component';
import { ListBlacklistClienteComponent } from '../pack-clientes/list-blacklist-cliente/list-blacklist-cliente.component';

@Component({
  selector: 'app-section-reservas',
  standalone: true,
  imports: [
    MatGridListModule,
    ListRecursoComponent,
    ListReservaComponent,
    ListServicioComponent,
    ListClienteComponent,
    ListBlacklistClienteComponent
  ],
  templateUrl: './section-reservas.component.html',
  styleUrl: './section-reservas.component.scss'
})
export class SectionReservasComponent {

  @ViewChild(ListBlacklistClienteComponent) tableBlacklist!: ListBlacklistClienteComponent;
  @ViewChild(ListClienteComponent) table!: ListClienteComponent;

  refresh(){
    this.tableBlacklist.get()
    this.table.refreshTable()
  }

}
