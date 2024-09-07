import { Component } from '@angular/core';
import { Recurso } from '../../../interfaces/recurso';
import { Reserva } from '../../../interfaces/reserva';
import { Servicio } from '../../../interfaces/servicio';
import { RecursoService } from '../../../services/recurso.service';
import { ReservaService } from '../../../services/reserva.service';
import { ServicioService } from '../../../services/servicio.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Cliente } from '../../../interfaces/cliente';
import { Horario } from '../../../interfaces/horario';
import { HORARIOS } from '../../../demo-data/horario-data';

@Component({
  selector: 'app-create-reserva',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule, 
    MatDatepickerModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatButtonModule,
    MatInputModule, 
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './create-reserva.component.html',
  styleUrl: './create-reserva.component.scss'
})
export class CreateReservaComponent {

  list:Reserva[]=[]
  listRecursos:Recurso[]=[]
  listServicios:Servicio[]=[]
  selectedRecurso:number=0
  selectedServicio:number=0

  listHorarios:Horario[]=HORARIOS

  form!:FormGroup

  listDisponibles:string[]=[]

  constructor(private service:ReservaService, 
    private recursoService:RecursoService, 
    private servicioService:ServicioService,
    private fb:FormBuilder) {
    this.get()
    this.getRecursos()
    this.getServicios()
    this.form = this.fb.group({
      servicio: [, [Validators.required]],
      recurso: [, [Validators.required]],
      dia: [, [Validators.required]],
      hora: [, [Validators.required]],
      telefonoCliente: ['', [Validators.required]],
      nombreCliente: ['', [Validators.required]],
      apellidoCliente: ['', [Validators.required]],
    })
  }

  get(){
    this.service.list().subscribe(result => {
      this.list = result//.sort((a, b) => a.fechahora.localeCompare(b.fechahora));
    })
  }

  getRecursos(){
    this.recursoService.list().subscribe(result => {
      this.listRecursos = result.sort((a, b) => a.nombre.localeCompare(b.nombre));
    })
  }
  getServicios(){
    this.servicioService.list().subscribe(result => {
      this.listServicios = result.sort((a, b) => a.nombre.localeCompare(b.nombre));
    })
  }

  getHorarioDisponibles(){
    const dateSeleccionado = new Date(this.form.get('dia')?.value);
    const horariosDelDia = this.listHorarios.filter(h => h.dia == dateSeleccionado.getDay())
    this.listDisponibles = []
    horariosDelDia.forEach(h => {
      this.generarHorasEnIntervalos(h.inicio,h.cierre).forEach(hora=>{
        this.listDisponibles.push(hora)
      })
    })
  }
  generarHorasEnIntervalos(horaInicio: string, horaFin: string): string[] {
    const resultado: string[] = [];
  
    // Convertir los strings a Date para manipular los tiempos
    let [horaIni, minutoIni] = horaInicio.split(":").map(Number);
    let [horaFinH, minutoFin] = horaFin.split(":").map(Number);
  
    // Crear objetos Date
    let inicio = new Date();
    inicio.setHours(horaIni, minutoIni, 0, 0);  // Establecer la hora y minutos de inicio
  
    let fin = new Date();
    fin.setHours(horaFinH, minutoFin, 0, 0);    // Establecer la hora y minutos de fin
  
    // Iterar en intervalos de 30 minutos
    while (inicio < fin) {
      // Agregar la hora actual en formato HH:mm al resultado
      let horas = inicio.getHours().toString().padStart(2, '0');
      let minutos = inicio.getMinutes().toString().padStart(2, '0');
      resultado.push(`${horas}:${minutos}`);
  
      // Sumar 30 minutos
      inicio.setMinutes(inicio.getMinutes() + 30);
    }

    console.log(resultado)
  
    return resultado;
  }

  onSubmit():Reserva|undefined{
    if(this.form.valid){
      const cliente:any = <Cliente>{
        nombre: this.form.get('nombreCliente')?.value,
        apellido: this.form.get('apellidoCliente')?.value,
        telefono: this.form.get('telefonoCliente')?.value,
      }
      const recElegido = this.listRecursos.find(obj => obj.id == this.form.get('recurso')?.value)
      const servElegido = this.listServicios.find(obj => obj.id == this.form.get('servicio')?.value)
      return <Reserva>{
        servicio:servElegido,
        recurso:recElegido,
        cliente: cliente,
        precio: servElegido?.precio,
        precioSenia: servElegido?.precioSenia,
        fechahora: this.form.get('dia')?.value + this.form.get('hora')?.value,
        cancelado: false
      }
    }
    return undefined
  }
  
}
