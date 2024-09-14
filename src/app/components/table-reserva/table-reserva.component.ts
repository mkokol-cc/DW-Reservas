import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Reserva } from '../../interfaces/reserva';
import { EditReservaComponent } from '../../pages/pack-reserva/edit-reserva/edit-reserva.component';
import { ReservaService } from '../../services/reserva.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { ToastrService } from 'ngx-toastr';

export interface RegistroTabla {
  id: number;
  clienteNombre: string;
  fechaFormateada: string; // Fecha formateada
  servicioNombre: string;
  recursoNombre: string;
  estado: string; // o cualquier otro campo que necesites
}

@Component({
  selector: 'app-table-reserva',
  standalone: true,
  imports: [    
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './table-reserva.component.html',
  styleUrl: './table-reserva.component.scss'
})
export class TableReservaComponent implements OnChanges {

  list:Reserva[]=[]
  dataSource!: MatTableDataSource<RegistroTabla>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'clienteNombre', 'fechaFormateada', 'estado', 'servicio', 'acciones'];

  @Input() dateStart:any = null
  @Input() dateEnd:any = null
  @Input() recurso:any = null
  @Input() servicio:any = null
  @Input() estado:any = null
  @Input() busqueda!:Event

  filter:any = {
    dateStart: null,
    dateEnd: null,
    recurso: null,
    servicio: null,
    estado: null,
  }
  
  constructor(private service:ReservaService,public dialog: MatDialog,private toastr: ToastrService){
    this.get()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateStart'] || changes['dateEnd'] || changes['recurso'] || changes['servicio'] || changes['estado']) {
      this.filter = {
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        recurso: this.recurso,
        servicio: this.servicio,
        estado: this.estado,
      }
      this.get()
    }
    if(changes['busqueda']){
      this.applyFilter(this.busqueda)
    }
  }
  
  public get(){
    this.service.list().subscribe(result => {
      this.list = result
      const registrosTabla: RegistroTabla[] = this.list.filter(reserva =>{
        const fechaInicioNormalizada = this.filter.dateStart ? new Date(this.filter.dateStart) : null;
        if (fechaInicioNormalizada) {
          fechaInicioNormalizada.setHours(0, 0, 0, 0);
        }
        const fechaFinNormalizada = this.filter.dateEnd ? new Date(this.filter.dateEnd) : null;
        if (fechaFinNormalizada) {
          fechaFinNormalizada.setHours(23, 59, 59, 999);
        }

        const filtraPorRecurso = !this.filter.recurso || reserva.recurso.id == this.filter.recurso.id;
        const filtraPorServicio = !this.filter.servicio || reserva.servicio.id == this.filter.servicio.id;
        const filtraPorFecha = (!this.filter.dateStart || new Date(reserva.fechahora) >= fechaInicioNormalizada!) &&
                               (!this.filter.dateEnd || new Date(reserva.fechahora) <= fechaFinNormalizada!);
      
        return filtraPorRecurso && filtraPorServicio && filtraPorFecha;
      }).map(reserva => ({
        id: +reserva.id,
        clienteNombre: reserva.cliente.apellido + ", " + reserva.cliente.nombre,
        fechaFormateada: new Date(reserva.fechahora).toLocaleString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false // Para formato 24 horas
        }),        
        servicioNombre: reserva.servicio.nombre,
        recursoNombre: reserva.recurso.nombre,
        estado: 'Reserva' // o cualquier otro valor
      }));
      this.list = result//.sort((a, b) => a.fechahora.localeCompare(b.fechahora));
      this.dataSource = new MatTableDataSource(registrosTabla);
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


  delete(id:string) {
    const reservaSeleccionada = this.list.find(r => r.id == id)
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        message: 'Vas a cancelar la reserva.',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        reservaSeleccionada?.cancelado == true
        this.service.edit(id,reservaSeleccionada!).subscribe(result => {
          this.get()
          this.toastr.success('Se ha cancelado correctamente la reserva!','Genial!');
        })
      }
    });
  }
  edit(id:string) {
    const reservaSeleccionada = this.list.find(r => r.id == id)
    console.log(reservaSeleccionada)
    const dialogRef = this.dialog.open(EditReservaComponent, {
      data: reservaSeleccionada
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog EDIT RESERVA result: ${result}`);
      console.log(result)
      if(result){
        result.id = id
        this.service.edit(id,<Reserva>result).subscribe(result => {
          this.get()
          this.toastr.success('Se editó correctamente la reserva!','Genial!');
        })
      }
    });
  }
}
