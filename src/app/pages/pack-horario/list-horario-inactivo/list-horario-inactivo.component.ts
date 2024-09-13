import { Component, LOCALE_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HorarioService } from '../../../services/horario.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-horario-inactivo',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './list-horario-inactivo.component.html',
  styleUrl: './list-horario-inactivo.component.scss'
})
export class ListHorarioInactivoComponent {
  selected: Date|null = new Date();
  minDate:Date=new Date();
  
  list:Date[]=[
    new Date(2024, 11, 25),  // Meses en JavaScript son 0-indexados, por lo que diciembre es el mes 11
    new Date(2025, 0, 1)
  ]

  constructor(private service:HorarioService,private toastr: ToastrService){}

  filtrarFechas = (d: Date | null): boolean => {
    const fecha = d || new Date();
    return !this.list.some(f => 
      f.getDate() === fecha.getDate() &&
      f.getMonth() === fecha.getMonth() &&
      f.getFullYear() === fecha.getFullYear()
    );
  };

  removeDay(day: Date) {
    this.list = this.list.filter(f => 
      !(f.getDate() === day.getDate() &&
        f.getMonth() === day.getMonth() &&
        f.getFullYear() === day.getFullYear())
    );
    this.refreshCalendar()
  }

  newInactivo(){/*
    const horario = {
      id:undefined,
      inicio:null,
      cierre:null,
      programadoDesde:this.selected,
      programadoHasta:this.selected,
      dia:this.selected?.getDay()
    }
    /*
    this.service.create(horario).subscribe(res=>{
      alert("guardado")
    })*/
    if(this.selected){
      const day = new Date (this.selected.getFullYear(),this.selected.getMonth(),this.selected.getDate())
      this.list.push(day)
      this.refreshCalendar()
      this.selected = null
      this.toastr.success('Se ha creado correctamente el horario!','Genial!');
    }
  }

  refreshCalendar(){
    this.filtrarFechas = (d: Date | null): boolean => {
      const fecha = d || new Date();
      return !this.list.some(f => 
        f.getDate() === fecha.getDate() &&
        f.getMonth() === fecha.getMonth() &&
        f.getFullYear() === fecha.getFullYear()
      );
    };
  }
}
