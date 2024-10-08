import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-analytics-historial-reservas',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './analytics-historial-reservas.component.html',
  styleUrl: './analytics-historial-reservas.component.scss'
})
export class AnalyticsHistorialReservasComponent implements AfterViewInit{

  myChart!:Chart
  constructor(private elementRef: ElementRef){
  }

  ngAfterViewInit(){
    this.createChart()
  }

  createChart(){
    let htmlRef = this.elementRef.nativeElement.querySelector(`#bar`);
    this.myChart = new Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: ['Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre'],
        datasets: [
          {
            data: [134,120,111,123,140,92],
            backgroundColor: '#ff974a',
            label: 'Reservas'
          }
        ]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Mes'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad'
            }
          }
        }
      },
    })
  }
}
