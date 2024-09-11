import { Component } from '@angular/core';
import { Cliente } from '../../../interfaces/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { DialogConfirmComponent } from '../../../components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-list-blacklist-cliente',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,MatExpansionModule,MatListModule,MatDialogModule,MatGridListModule,
    MatCardModule
  ],
  templateUrl: './list-blacklist-cliente.component.html',
  styleUrl: './list-blacklist-cliente.component.scss'
})
export class ListBlacklistClienteComponent {

  list:Cliente[]=[]

  constructor( private service:ClienteService,public dialog: MatDialog){
    this.get()
  }

  removeToBlackList(cliente:Cliente){
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        message: 'Vas a sacar al cliente '+cliente.apellido+', '+cliente.nombre+' de la lista negra.',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        cliente.habilitado = true
        this.service.edit(cliente.id,cliente).subscribe(result => {
          this.get()
        })
      }
    });
  }

  get(){
    this.service.list().subscribe(result => {
      this.list = result//.sort((a, b) => a.inicio.localeCompare(b.inicio));
    })
  }
}
