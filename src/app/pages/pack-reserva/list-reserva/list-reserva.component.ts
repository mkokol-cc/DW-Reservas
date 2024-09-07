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
import { CreateRecursoComponent } from '../../pack-recurso/create-recurso/create-recurso.component';
import { CreateReservaComponent } from '../create-reserva/create-reserva.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);
@Component({
  selector: 'app-list-reserva',
  standalone: true,
  providers: [provideNativeDateAdapter(),{ provide: LOCALE_ID, useValue: 'es-ES' }],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    ConfiguracionRecordatoriosComponent,
    MatCardModule ,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    FormsModule, 
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule
  ],
  templateUrl: './list-reserva.component.html',
  styleUrl: './list-reserva.component.scss'
})
export class ListReservaComponent {

  DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  daySelected:Date = new Date()

  list:Reserva[]=[]
  displayedColumns: string[] = ['id', 'cliente', 'fecha', 'estado', 'servicio', 'acciones'];
  dataSource!: MatTableDataSource<Reserva>;
  dayRange = new FormGroup({
    start: new FormControl<Date | null>(this.daySelected),
    end: new FormControl<Date | null>(this.daySelected),
  });
  listRecursos:Recurso[]=[]
  listServicios:Servicio[]=[]
  selectedRecurso:number=0
  selectedServicio:number=0

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:ReservaService, 
    private recursoService:RecursoService, 
    private servicioService:ServicioService,
    public dialog: MatDialog) {
    this.get()
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

  get(){
    this.service.list().subscribe(result => {
      this.list = result//.sort((a, b) => a.fechahora.localeCompare(b.fechahora));
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  create() {
    const dialogRef = this.dialog.open(CreateReservaComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.service.create(<Reserva>result).subscribe(result => {
          this.get()
        })
      }
    });
  }


  filterByDay(day:Date){
    this.daySelected = day
    this.dayRange.get('start')?.patchValue(day)// = day
    this.dayRange.get('end')?.patchValue(day)
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
}
