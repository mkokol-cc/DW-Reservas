import {Component, LOCALE_ID, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Reserva } from '../../../interfaces/reserva';
import { ReservaService } from '../../../services/reserva.service';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ConfiguracionRecordatoriosComponent } from '../../../components/configuracion-recordatorios/configuracion-recordatorios.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Recurso } from '../../../interfaces/recurso';
import { Servicio } from '../../../interfaces/servicio';
import { RecursoService } from '../../../services/recurso.service';
import { ServicioService } from '../../../services/servicio.service';
import { MatSelectModule } from '@angular/material/select';
import { CreateReservaComponent } from '../create-reserva/create-reserva.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import localeEs from '@angular/common/locales/es';
import { MatChipsModule } from '@angular/material/chips';
import { DialogConfirmComponent } from '../../../components/dialog-confirm/dialog-confirm.component';
import { EditReservaComponent } from '../edit-reserva/edit-reserva.component';
import { TableReservaComponent } from '../../../components/table-reserva/table-reserva.component';
import { TableReservaMobileComponent } from '../../../components/table-reserva-mobile/table-reserva-mobile.component';

export interface RegistroTabla {
  id: number;
  clienteNombre: string;
  fechaFormateada: string; // Fecha formateada
  servicioNombre: string;
  recursoNombre: string;
  estado: string; // o cualquier otro campo que necesites
}


registerLocaleData(localeEs);
@Component({
  selector: 'app-list-reserva',
  standalone: true,
  providers: [provideNativeDateAdapter(),{ provide: LOCALE_ID, useValue: 'es-ES' }],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ConfiguracionRecordatoriosComponent,
    MatCardModule ,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    FormsModule, 
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,MatChipsModule,
    MatCardModule,

    TableReservaComponent,
    TableReservaMobileComponent
  ],
  templateUrl: './list-reserva.component.html',
  styleUrl: './list-reserva.component.scss'
})
export class ListReservaComponent {

  DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  daySelected:Date = new Date()
  list:Reserva[]=[]
  dayRange = new FormGroup({
    start: new FormControl<Date | null>(this.daySelected),
    end: new FormControl<Date | null>(this.daySelected),
  });
  listRecursos:Recurso[]=[]
  listServicios:Servicio[]=[]
  selectedRecurso:number=0
  selectedServicio:number=0

  filter:any = {
    dateStart: null,
    dateEnd: null,
    recurso: null,
    servicio: null,
    estado: null,
  }

  @ViewChild(TableReservaMobileComponent) tableMobile!: TableReservaMobileComponent;
  @ViewChild(TableReservaComponent) table!: TableReservaComponent;

  constructor(private service:ReservaService, 
    private recursoService:RecursoService, 
    private servicioService:ServicioService,
    public dialog: MatDialog) {
      this.dayRange.valueChanges.subscribe(val => {
        if (val.start && val.end) {
          console.log('Rango de fechas seleccionado:', val);
          // Lógica para manejar el rango de fechas
          this.filter.dateStart = val.start,
          this.filter.dateEnd = val.end
        }
      });
    this.getRecursos()
    this.getServicios()
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

  compareDatesIgnoreTime(date1: Date, date2: Date): number {
    // Normaliza ambos objetos Date a medianoche
    const d1 = new Date(date1);
    d1.setHours(0, 0, 0, 0);
    const d2 = new Date(date2);
    d2.setHours(0, 0, 0, 0);
    // Compara las fechas normalizadas
    return d1.getTime() - d2.getTime();
  }

  searchEvent!:Event
  sendFilter(event: Event){
    this.searchEvent = event
  }

  create() {
    const dialogRef = this.dialog.open(CreateReservaComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.service.create(<Reserva>result).subscribe(result => {
          this.refreshTable()
        })
      }
    });
  }

  refreshTable(){
    this.tableMobile.get()
    this.table.get()
  }


  filterByDay(day:Date){
    this.daySelected = day
    this.dayRange.get('start')?.patchValue(day)// = day
    this.dayRange.get('end')?.patchValue(day)
    this.filter.dateStart = this.dayRange.get('start')?.value
    this.filter.dateEnd = this.dayRange.get('start')?.value
  }
  nextDay(date:Date):Date{
    const nextDay = new Date()
    nextDay.setDate(date.getDate() + 1)
    return nextDay
  }
  prevDay(date:Date):Date{
    const prevDay = new Date()
    prevDay.setDate(date.getDate() - 1)
    return prevDay
  }

  removeDayFilter(){
    this.filter.dateStart = null
    this.filter.dateEnd = null
  }
  removeRecursoFilter(){
    this.filter.recurso = null
  }
  removeServicioFilter(){
    this.filter.servicio = null
  }
}
