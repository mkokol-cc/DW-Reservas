import { Component } from '@angular/core';
import { Recurso } from '../../../interfaces/recurso';
import { EditRecursoComponent } from '../edit-recurso/edit-recurso.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogConfirmComponent } from '../../../components/dialog-confirm/dialog-confirm.component';
import { CreateRecursoComponent } from '../create-recurso/create-recurso.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-list-recurso',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,MatExpansionModule,MatListModule,MatDialogModule,MatGridListModule],
  templateUrl: './list-recurso.component.html',
  styleUrl: './list-recurso.component.scss'
})
export class ListRecursoComponent {
  list:Recurso[] = [{
    nombre:"Corte de Pelo",
    descripcion:"string",
    eliminado:false,
  },{
    nombre:"Corte de Pelo y Barba",
    descripcion:"string",
    eliminado:false,
  },{
    nombre:"Peinado Femenino",
    descripcion:"string",
    eliminado:false,
  },{
    nombre:"Corte de Pelo Infantil",
    descripcion:"string",
    eliminado:false,
  }]

  constructor(public dialog: MatDialog, private toastr: ToastrService) {}

  create() {
    const dialogRef = this.dialog.open(CreateRecursoComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  delete(obj:Recurso) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        message: 'Vas a eliminar el recurso "'+obj.nombre+'".',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.animal = result;
      if(result){
        this.toastr.success('Se edito correctamente el Recurso!','Genial!');
      }
    });
  }

  edit(obj:Recurso) {
    const dialogRef = this.dialog.open(EditRecursoComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



}
