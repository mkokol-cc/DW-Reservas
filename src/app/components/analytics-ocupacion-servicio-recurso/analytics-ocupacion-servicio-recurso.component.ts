import { Component, ElementRef, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)

@Component({
  selector: 'app-analytics-ocupacion-servicio-recurso',
  standalone: true,
  imports: [],
  templateUrl: './analytics-ocupacion-servicio-recurso.component.html',
  styleUrl: './analytics-ocupacion-servicio-recurso.component.scss'
})
export class AnalyticsOcupacionServicioRecursoComponent implements OnInit {
  myChart:any;
  data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  constructor(private elementRef: ElementRef){
  }

  ngOnInit(){
    let htmlRef = this.elementRef.nativeElement.querySelector(`#pie`);
    const myChart = new Chart(htmlRef,{
      type: 'pie',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Pie Chart'
          }
        }
      },
    })
  }
}
