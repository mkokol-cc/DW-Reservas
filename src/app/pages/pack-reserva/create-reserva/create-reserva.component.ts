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

  onSubmit(){}
}
