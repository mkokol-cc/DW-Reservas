import { Component, ViewChild } from '@angular/core';
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
    TableClienteMobileComponent
  ],
  templateUrl: './list-cliente.component.html',
  styleUrl: './list-cliente.component.scss'
})
export class ListClienteComponent {
  
  @ViewChild(TableClienteMobileComponent) tableMobile!: TableClienteMobileComponent;
  @ViewChild(TableClienteComponent) table!: TableClienteComponent;
  constructor( private service:ClienteService , public dialog: MatDialog){}

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
          this.refreshTable()
        })
      }
    });
  }

  refreshTable(){
    this.tableMobile.get()
    this.table.get()
  }

  eventFilter!:Event
  sendFilter(event:Event){
    this.eventFilter = event
  }

}
