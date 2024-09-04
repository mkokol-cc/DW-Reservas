import { Component, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../interfaces/reserva';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
Chart.register(...registerables)

@Component({
  selector: 'app-analytics-ocupacion-servicio-recurso',
  standalone: true,
  imports: [MatRadioModule, FormsModule, MatCardModule],
  templateUrl: './analytics-ocupacion-servicio-recurso.component.html',
  styleUrl: './analytics-ocupacion-servicio-recurso.component.scss'
})
export class AnalyticsOcupacionServicioRecursoComponent {
  
  listReservas:Reserva[]=[]
  byServicio:boolean = true
  myChart: Chart<"pie", number[], unknown> | undefined;

  constructor(private elementRef: ElementRef, private service:ReservaService){
    this.service.list().subscribe(result => {
      this.listReservas = result
      this.createChart()
    })
  }

  createChart(){
    if(this.myChart){
      this.myChart.destroy()
    }
    let htmlRef = this.elementRef.nativeElement.querySelector(`#pie`);
    this.myChart = new Chart(htmlRef,{
      type: 'pie',
      data: this.getData(),
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: false,
            text: 'Distribucion de Reservas'
          }
        }
      },
    })
  }

  getData():any{
    const reservaData = this.filterReservasBy(this.byServicio)
    const data = {
      labels: reservaData.map(item => item.nombre),
      datasets: [{
        label: 'Cantidad De Reservas',
        data: reservaData.map(item => item.cantidad),//cantidad de reservas por Servicio/Recurso
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    return data
  }

  filterReservasBy(porServicio:boolean){
    const conteoPorServicio: { id: number, nombre: string, cantidad: number }[] = [];
    this.listReservas.forEach(reserva => {
      // Verifica si es por servicio o por recurso
      const reservaEncontrada = porServicio ? 
        conteoPorServicio.find(item => item.id === reserva.servicio.id) : 
        conteoPorServicio.find(item => item.id === reserva.recurso.id);
      if (reservaEncontrada) {
        // Si ya existe en el array, incrementa la cantidad
        reservaEncontrada.cantidad += 1;
      } else {
        // Si no existe, lo agregamos con cantidad inicial de 1
        if (porServicio) {
          conteoPorServicio.push({ id: reserva.servicio.id, nombre: reserva.servicio.nombre, cantidad: 1 });
        } else {
          conteoPorServicio.push({ id: reserva.recurso.id, nombre: reserva.recurso.nombre, cantidad: 1 });
        }
      }
    });
    console.log(conteoPorServicio)
    return conteoPorServicio;
  }

  radioChange(e:any){
    this.createChart()
  }

}
