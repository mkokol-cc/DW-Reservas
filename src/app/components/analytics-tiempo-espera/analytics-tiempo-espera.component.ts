import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-analytics-tiempo-espera',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatTooltipModule],
  templateUrl: './analytics-tiempo-espera.component.html',
  styleUrl: './analytics-tiempo-espera.component.scss'
})
export class AnalyticsTiempoEsperaComponent {

}
