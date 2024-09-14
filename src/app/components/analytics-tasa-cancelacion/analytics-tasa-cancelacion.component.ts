import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-analytics-tasa-cancelacion',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTooltipModule],
  templateUrl: './analytics-tasa-cancelacion.component.html',
  styleUrl: './analytics-tasa-cancelacion.component.scss'
})
export class AnalyticsTasaCancelacionComponent {

}
