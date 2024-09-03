import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Reserva } from '../../../interfaces/reserva';


@Component({
  selector: 'app-list-reserva',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './list-reserva.component.html',
  styleUrl: './list-reserva.component.scss'
})
export class ListReservaComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'cliente', 'fecha', 'estado', 'servicio', 'acciones'];
  dataSource!: MatTableDataSource<Reserva>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
