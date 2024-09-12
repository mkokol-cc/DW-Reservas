import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HorarioService } from '../../../services/horario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-horario-inactivo',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './list-horario-inactivo.component.html',
  styleUrl: './list-horario-inactivo.component.scss'
})
export class ListHorarioInactivoComponent {
  selected: Date = new Date();
  minDate:Date=new Date()

  constructor(private service:HorarioService){}

  newInactivo(){
    const horario = {
      id:undefined,
      inicio:null,
      cierre:null,
      programadoDesde:this.selected,
      programadoHasta:this.selected,
      dia:this.selected?.getDay()
    }
    this.service.create(horario).subscribe(res=>{
      alert("guardado")
    })
  }

}
