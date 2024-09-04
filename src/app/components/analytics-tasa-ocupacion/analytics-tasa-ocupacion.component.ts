import { Component, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Chart } from 'chart.js';
import { Recurso } from '../../interfaces/recurso';
import { Reserva } from '../../interfaces/reserva';
import { Servicio } from '../../interfaces/servicio';
import { RecursoService } from '../../services/recurso.service';
import { ReservaService } from '../../services/reserva.service';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-analytics-tasa-ocupacion',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './analytics-tasa-ocupacion.component.html',
  styleUrl: './analytics-tasa-ocupacion.component.scss'
})
export class AnalyticsTasaOcupacionComponent {
  myChart: Chart<"doughnut", number[], unknown> | undefined;
  listReservas:Reserva[]=[]
  listRecursos:Recurso[]=[]
  listServicios:Servicio[]=[]
  selectedRecurso:number=0
  selectedServicio:number=0

  constructor(private elementRef: ElementRef, 
    private service:ReservaService,
    private recursoService:RecursoService,
    private servicioService:ServicioService
  ){
    this.recursoService.list().subscribe(result => {
      this.listRecursos = result
    })
    this.servicioService.list().subscribe(result => {
      this.listServicios = result
    })
    this.service.list().subscribe(result => {
      this.listReservas = result
      //this.createChart()
      this.createChart()
    })
  }

  createChart(){
    let htmlRef = this.elementRef.nativeElement.querySelector(`#doughnut`);
    this.myChart = new Chart(htmlRef,{
      type: 'doughnut',
      data: {
        labels: ['Libre', 'Ocupado'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [123,332],
            backgroundColor: ['#a9a9a9','#5d89ff'],
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Doughnut Chart'
          }
        }
      },
    })
  }

  getReservasFuturas(endDate:Date){
    const fechaHoy = new Date(); // Fecha actual
    // Filtrar las reservas que están entre hoy y la fecha pasada como parámetro
    const reservasFiltradas = this.listReservas.filter(reserva => {
      const fechaReserva = new Date(reserva.fechahora);
      return fechaReserva >= fechaHoy && fechaReserva <= endDate;
    });
    return reservasFiltradas;
  }

}
