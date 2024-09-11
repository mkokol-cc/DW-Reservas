import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HORARIOS } from '../../../demo-data/horario-data';
import { Cliente } from '../../../interfaces/cliente';
import { Horario } from '../../../interfaces/horario';
import { Recurso } from '../../../interfaces/recurso';
import { Reserva } from '../../../interfaces/reserva';
import { Servicio } from '../../../interfaces/servicio';
import { RecursoService } from '../../../services/recurso.service';
import { ServicioService } from '../../../services/servicio.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-edit-reserva',
  standalone: true,
  providers: [provideNativeDateAdapter(),{ provide: LOCALE_ID, useValue: 'es-ES' }],
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
  templateUrl: './edit-reserva.component.html',
  styleUrl: './edit-reserva.component.scss'
})
export class EditReservaComponent {
  list:Reserva[]=[]
  listRecursos:Recurso[]=[]
  listServicios:Servicio[]=[]
  selectedRecurso:number=0
  selectedServicio:number=0

  listHorarios:Horario[]=HORARIOS

  form!:FormGroup

  listDisponibles:string[]=[]

  constructor(@Inject(MAT_DIALOG_DATA) public data:Reserva, 
    private recursoService:RecursoService, 
    private servicioService:ServicioService,
    private fb:FormBuilder) {
    //this.get()
    this.getRecursos()
    this.getServicios()
    this.form = this.fb.group({
      servicio: [data.servicio.id, [Validators.required]],
      recurso: [data.recurso.id, [Validators.required]],
      dia: [new Date(data.fechahora), [Validators.required]],
      hora: [new Date(data.fechahora).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false }), [Validators.required]],
      telefonoCliente: [data.cliente.telefono, [Validators.required]],
      nombreCliente: [data.cliente.nombre, [Validators.required]],
      apellidoCliente: [data.cliente.apellido, [Validators.required]],
    })
    this.getHorarioDisponibles()
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
      if(h.inicio && h.cierre){
        this.generarHorasEnIntervalos(h.inicio!,h.cierre!).forEach(hora=>{
          this.listDisponibles.push(hora)
        })
      }
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
      const [hours, minutes] = this.form.get('hora')?.value.split(":").map(Number);
      const dateTime = new Date(this.form.get('dia')?.value)
      dateTime.setHours(hours)
      dateTime.setMinutes(minutes)
      return <Reserva>{
        servicio:servElegido,
        recurso:recElegido,
        cliente: cliente,
        precio: servElegido?.precio,
        precioSenia: servElegido?.precioSenia,
        fechahora: dateTime,
        cancelado: false
      }
    }
    return undefined
  }
}
