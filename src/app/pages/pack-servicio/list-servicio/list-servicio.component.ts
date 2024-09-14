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
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-list-servicio',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule
  ],
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
          this.toastr.success('Se creó correctamente el servicio!','Genial!');
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
        //this.toastr.success('Se eliminó correctamente el servicio!','Genial!');
        this.service.delete(obj.id).subscribe(result => {
          this.get()
          this.toastr.success('Se eliminó correctamente el servicio!','Genial!');
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
        result.id = obj.id
        this.service.edit(obj.id,<Servicio>result).subscribe(result => {
          this.get()
          this.toastr.success('Se editó correctamente el servicio!','Genial!');
        })
      }
    });
  }



}
