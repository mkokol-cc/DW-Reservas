import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CreateServicioComponent } from '../create-servicio/create-servicio.component';
import { EditServicioComponent } from '../edit-servicio/edit-servicio.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { Servicio } from '../../interfaces/servicio';
import {MatGridListModule} from '@angular/material/grid-list';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-servicio',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,MatExpansionModule,MatListModule,MatDialogModule,MatGridListModule],
  templateUrl: './list-servicio.component.html',
  styleUrl: './list-servicio.component.scss'
})
export class ListServicioComponent {

  list:Servicio[] = [{
    nombre:"Corte de Pelo",
    duracion:30,
    precio:5000.00,
    precioMaximo:8000.00,
    precioSenia:2000.00,
    descripcion:"string",
    eliminado:false,
  },{
    nombre:"Corte de Pelo y Barba",
    duracion:30,
    precio:5000.00,
    precioMaximo:8000.00,
    precioSenia:2000.00,
    descripcion:"string",
    eliminado:false,
  },{
    nombre:"Peinado Femenino",
    duracion:30,
    precio:5000.00,
    precioMaximo:8000.00,
    precioSenia:2000.00,
    descripcion:"string",
    eliminado:false,
  },{
    nombre:"Corte de Pelo Infantil",
    duracion:30,
    precio:5000.00,
    precioMaximo:8000.00,
    precioSenia:2000.00,
    descripcion:"string",
    eliminado:false,
  }]

  constructor(public dialog: MatDialog, private toastr: ToastrService) {}

  create() {
    const dialogRef = this.dialog.open(CreateServicioComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  delete(obj:Servicio) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        message: 'Vas a eliminar el recurso "'+obj.nombre+'".',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.animal = result;
      if(result){
        this.toastr.success('Se edito correctamente el servicio!','Genial!');
      }
    });
  }

  edit(obj:Servicio) {
    const dialogRef = this.dialog.open(EditServicioComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



}
