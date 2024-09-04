import { Component, ElementRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Reserva } from '../../interfaces/reserva';
import { Chart } from 'chart.js';
import { ReservaService } from '../../services/reserva.service';
import { RecursoService } from '../../services/recurso.service';
import { ServicioService } from '../../services/servicio.service';
import { Recurso } from '../../interfaces/recurso';
import { Servicio } from '../../interfaces/servicio';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-analytics-ingresos-futuros',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './analytics-ingresos-futuros.component.html',
  styleUrl: './analytics-ingresos-futuros.component.scss'
})
export class AnalyticsIngresosFuturosComponent {

  myChart!:Chart 
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
      console.log(this.agruparReservasPorMes())
      console.log(this.agruparReservasPorSemana())
      this.createChart()
    })
  }

  createChart(){
    //if(this.myChart){
    //  this.myChart.destroy()
    //}
    const datos = this.agruparReservasPorSemana()
    let htmlRef = this.elementRef.nativeElement.querySelector(`#line-chart`);
    this.myChart = new Chart(htmlRef,{
      type: 'line',
      data: {
        labels: Object.keys(datos),
        datasets: [
        {
          label: 'Reservas',
          data: Object.values(datos),
          borderColor: '#3eff81',
          fill: false,
        },]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Precio Promedio de Reservas: $4500'
          }
        }
      },
    })
  }

  agruparReservasPorMes() {
    const reservasPorMes: { [key: string]: number } = {};
    this.listReservas.forEach(reserva => {
      const fecha = new Date(reserva.fechahora);
      const mesAnio = `${fecha.getMonth() + 1}/${fecha.getFullYear()}`; // Formato MM/YYYY
  
      if (reservasPorMes[mesAnio]) {
        reservasPorMes[mesAnio]++;
      } else {
        reservasPorMes[mesAnio] = 1;
      }
    });
    return reservasPorMes;
  }

  obtenerNumeroSemana(fecha: Date): number {
    const fechaInicioAño = new Date(fecha.getFullYear(), 0, 1); // Inicio del año
    const diasDesdeInicioAño = Math.floor((fecha.getTime() - fechaInicioAño.getTime()) / (1000 * 60 * 60 * 24)); // Días desde el inicio del año
    return Math.ceil((diasDesdeInicioAño + fechaInicioAño.getDay() + 1) / 7); // Número de semana
  }
  
  agruparReservasPorSemana() {
    const reservasPorSemana: { [key: string]: number } = {};
    this.listReservas.forEach(reserva => {
      const fecha = new Date(reserva.fechahora);
      const semanaAnio = `Semana ${this.obtenerNumeroSemana(fecha)}/${fecha.getFullYear()}`; // Formato Semana X/YYYY
  
      if (reservasPorSemana[semanaAnio]) {
        reservasPorSemana[semanaAnio]++;
      } else {
        reservasPorSemana[semanaAnio] = 1;
      }
    });
    return reservasPorSemana;
  }
}
