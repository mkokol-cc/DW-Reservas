import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-analytics-clientes-recurrentes',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule, 
    MatTooltipModule
  ],
  templateUrl: './analytics-clientes-recurrentes.component.html',
  styleUrl: './analytics-clientes-recurrentes.component.scss'
})
export class AnalyticsClientesRecurrentesComponent {

}
