import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Cliente } from '../../../interfaces/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DialogConfirmComponent } from '../../../components/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { TableClienteComponent } from '../../../components/table-cliente/table-cliente.component';
import { TableClienteMobileComponent } from '../../../components/table-cliente-mobile/table-cliente-mobile.component';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-cliente',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule,
    CommonModule,
    MatCardModule, 
    MatButtonModule,
    TableClienteComponent,
    TableClienteMobileComponent,
    MatTooltipModule,
    MatIconModule
  ],
  templateUrl: './list-cliente.component.html',
  styleUrl: './list-cliente.component.scss'
})
export class ListClienteComponent {

  @Output() refresh = new EventEmitter<void>();
  notify() {
    this.refreshTable()
    this.refresh.emit(); // Emite un evento para que el padre lo capture
  }
  
  @ViewChild(TableClienteMobileComponent) tableMobile!: TableClienteMobileComponent;
  @ViewChild(TableClienteComponent) table!: TableClienteComponent;
  constructor( private service:ClienteService , public dialog: MatDialog,private toastr: ToastrService){}

  refreshTable(){
    this.tableMobile.get()
    this.table.get()
  }

  eventFilter!:Event
  sendFilter(event:Event){
    this.eventFilter = event
  }


}
