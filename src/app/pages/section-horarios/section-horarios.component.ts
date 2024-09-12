import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { ListWeekHorarioComponent } from '../pack-horario/list-week-horario/list-week-horario.component';
import { CreateWeekHorarioComponent } from '../pack-horario/create-week-horario/create-week-horario.component';
import { FormControl } from '@angular/forms';
import { ListHorarioInactivoComponent } from '../pack-horario/list-horario-inactivo/list-horario-inactivo.component';

@Component({
  selector: 'app-section-horarios',
  standalone: true,
  imports: [MatTabsModule,MatCardModule,ListWeekHorarioComponent,CreateWeekHorarioComponent,
    ListHorarioInactivoComponent
  ],
  templateUrl: './section-horarios.component.html',
  styleUrl: './section-horarios.component.scss'
})
export class SectionHorariosComponent {
  
  programadoToEdit:Date = new Date();
  selected = new FormControl(0);
  
  reciveProgramadoToEdit(mensaje: Date) {
    this.programadoToEdit = mensaje;
    this.selected.setValue(1)
  }
}
