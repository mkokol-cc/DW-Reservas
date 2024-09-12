import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table-cliente-mobile',
  standalone: true,
  imports: [
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    CommonModule,
    MatIconModule, 
    MatButtonModule,
  ],
  templateUrl: './table-cliente-mobile.component.html',
  styleUrl: './table-cliente-mobile.component.scss'
})
export class TableClienteMobileComponent implements OnChanges {

  @Input() busqueda!:Event

  list:Cliente[]=[]

  displayedColumns: string[] = ['clienteData', 'acciones'];
  dataSource!: MatTableDataSource<Cliente>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service:ClienteService , public dialog: MatDialog){
    this.get()
  }

  get(){
    this.service.list().subscribe(result => {
      this.list = result//.sort((a, b) => a.inicio.localeCompare(b.inicio));
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['busqueda']){
      this.applyFilter(this.busqueda)
    }
  }

  toBlackList(cliente:Cliente){
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        message: 'Vas a enviar al cliente '+cliente.apellido+', '+cliente.nombre+' a la lista negra.',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        cliente.habilitado = false
        this.service.edit(cliente.id,cliente).subscribe(result => {
          this.get()
        })
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
}
