import { Component, ViewChild } from '@angular/core';
import { Cliente } from '../../../interfaces/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-list-cliente',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,CommonModule,
    MatCardModule
  ],
  templateUrl: './list-cliente.component.html',
  styleUrl: './list-cliente.component.scss'
})
export class ListClienteComponent {
  
  list:Cliente[]=[]

  displayedColumns: string[] = ['nombre', 'telefono', 'reservas', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<Cliente>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service:ClienteService){
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
