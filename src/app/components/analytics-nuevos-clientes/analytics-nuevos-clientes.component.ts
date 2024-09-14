import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-analytics-nuevos-clientes',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './analytics-nuevos-clientes.component.html',
  styleUrl: './analytics-nuevos-clientes.component.scss'
})
export class AnalyticsNuevosClientesComponent {

}
