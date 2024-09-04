import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analytics-historial-reservas',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './analytics-historial-reservas.component.html',
  styleUrl: './analytics-historial-reservas.component.scss'
})
export class AnalyticsHistorialReservasComponent {

  myChart!:Chart
  @ViewChild('bar', {static: true}) chartRef:any;
  constructor(private elementRef: ElementRef){
    this.createChart()
  }

  createChart(){
    //let htmlRef = this.elementRef.nativeElement.querySelector(`#bar`);
    const canvas = document.getElementById('bar') as HTMLCanvasElement;
    const htmlRef = canvas
    this.myChart = new Chart(this.chartRef,{
      type: 'bar',
      data: {
        labels: ['Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre'],
        datasets: [
          {
            data: [134,120,111,123,140,92],
            backgroundColor: '#c1ff5b',
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
