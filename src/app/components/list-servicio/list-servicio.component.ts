import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CreateServicioComponent } from '../create-servicio/create-servicio.component';
import { EditServicioComponent } from '../edit-servicio/edit-servicio.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';


@Component({
  selector: 'app-list-servicio',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,MatExpansionModule,MatListModule,MatDialogModule],
  templateUrl: './list-servicio.component.html',
  styleUrl: './list-servicio.component.scss'
})
export class ListServicioComponent {
  constructor(public dialog: MatDialog) {}

  create() {
    const dialogRef = this.dialog.open(CreateServicioComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  delete() {
    this.dialog.open(DialogConfirmComponent, {
      data: {
        message: 'vas a eliminar el recurso ASDASDA',
      },
    });
  }

  edit() {
    const dialogRef = this.dialog.open(EditServicioComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
