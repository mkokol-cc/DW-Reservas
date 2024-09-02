import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ListRecursoComponent } from '../pack-recurso/list-recurso/list-recurso.component';
import { ListReservaComponent } from '../pack-reserva/list-reserva/list-reserva.component';
import { ListServicioComponent } from '../pack-servicio/list-servicio/list-servicio.component';

@Component({
  selector: 'app-section-reservas',
  standalone: true,
  imports: [MatGridListModule,ListRecursoComponent,ListReservaComponent,ListServicioComponent],
  templateUrl: './section-reservas.component.html',
  styleUrl: './section-reservas.component.scss'
})
export class SectionReservasComponent {

}
