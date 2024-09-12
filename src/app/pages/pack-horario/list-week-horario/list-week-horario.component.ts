import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import { Horario } from '../../../interfaces/horario';
import { HorarioService } from '../../../services/horario.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-list-week-horario',
  standalone: true,
  imports: [MatButtonModule,MatChipsModule,MatIconModule,MatExpansionModule,MatListModule,MatDialogModule,MatGridListModule
    ,CommonModule,MatCardModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, MatRadioModule,
    MatSelectModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './list-week-horario.component.html',
  styleUrl: './list-week-horario.component.scss'
})
export class ListWeekHorarioComponent {

  list:Horario[] = []
  selected:Date=new Date()
  agrupadosPorProgramado:{ [key: string]: Horario[] } = {}
  @Output() programadoToEdit = new EventEmitter<Date>();

  constructor(public dialog: MatDialog, private service:HorarioService){
    this.get()
  }

  get(){
    this.service.list().subscribe(result => {
      this.list = result.sort((a, b) => a.inicio && b.inicio ? a.inicio.localeCompare(b.inicio) : a.dia);
      this.agrupadosPorProgramado = this.list.reduce((acc, objeto) => {
        const key = new Date(objeto.programadoDesde).toISOString();
        // Si el grupo no existe, se crea un array vacío
        if (!acc[key]) {
          acc[key] = [];
        }
        // Se añade el objeto al grupo correspondiente
        acc[key].push(objeto);
        return acc;
      }, {} as { [key: string]: Horario[] });
      this.selected = new Date(Object.keys(this.agrupadosPorProgramado)[0])
      console.log(this.selected)
      console.log(this.agrupadosPorProgramado)
    })
  }

  isSelectedDate(strDate:Date):boolean{
    if(strDate == this.selected){
      return true
    }
    return false
  }
  isActualHorario(strDate:string){
    const date = new Date(strDate)
    return (date <= new Date())
  }

  edit() {
    this.programadoToEdit.emit(this.selected)
  }
}
