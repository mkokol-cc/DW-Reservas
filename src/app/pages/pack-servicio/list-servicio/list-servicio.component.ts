import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CreateServicioComponent } from '../create-servicio/create-servicio.component';
import { EditServicioComponent } from '../edit-servicio/edit-servicio.component';
import { DialogConfirmComponent } from '../../../components/dialog-confirm/dialog-confirm.component';
import { Servicio } from '../../../interfaces/servicio';
import {MatGridListModule} from '@angular/material/grid-list';
import { ToastrService } from 'ngx-toastr';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-list-servicio',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,MatExpansionModule,MatListModule,MatDialogModule,MatGridListModule],
  templateUrl: './list-servicio.component.html',
  styleUrl: './list-servicio.component.scss'
})
export class ListServicioComponent {

  list:Servicio[]=[]
  
  constructor(public dialog: MatDialog, private service:ServicioService,private toastr: ToastrService) {
    this.get()
  }

  get(){
    this.service.list().subscribe(result => {
      this.list = result.sort((a, b) => a.nombre.localeCompare(b.nombre));
    })
  }

  create() {
    const dialogRef = this.dialog.open(CreateServicioComponent);
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      if(result){
        this.service.create(<Servicio>result).subscribe(result => {
          this.get()
        })
      }
    });
  }

  delete(obj:Servicio) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        message: 'Vas a eliminar el servicio "'+obj.nombre+'".',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.animal = result;
      if(result){
        //this.toastr.success('Se elimino correctamente el servicio!','Genial!');
        this.service.delete(obj.id).subscribe(result => {
          this.get()
        })
      }
    });
  }

  edit(obj:Servicio) {
    const dialogRef = this.dialog.open(EditServicioComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      if(result){
        this.service.edit(<Servicio>result).subscribe(result => {
          this.get()
        })
      }
    });
  }



}
