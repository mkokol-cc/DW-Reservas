import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CreateRecursoComponent } from '../create-recurso/create-recurso.component';
import { EditRecursoComponent } from '../edit-recurso/edit-recurso.component';
import { DialogConfirmComponent } from '../../../components/dialog-confirm/dialog-confirm.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ToastrService } from 'ngx-toastr';
import { Recurso } from '../../../interfaces/recurso';
import { RecursoService } from '../../../services/recurso.service';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-list-recurso',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule
  ],
  templateUrl: './list-recurso.component.html',
  styleUrl: './list-recurso.component.scss'
})
export class ListRecursoComponent {

  list:Recurso[]=[]
  
  constructor(public dialog: MatDialog, private service:RecursoService,private toastr: ToastrService) {
    this.get()
  }

  get(){
    this.service.list().subscribe(result => {
      this.list = result.sort((a, b) => a.nombre.localeCompare(b.nombre));
    })
  }

  create() {
    const dialogRef = this.dialog.open(CreateRecursoComponent);
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      if(result){
        this.service.create(<Recurso>result).subscribe(result => {
          this.get()
          this.toastr.success('Se creó correctamente el recurso!','Genial!');
        })
      }
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
        //this.toastr.success('Se eliminó correctamente el servicio!','Genial!');
        this.service.delete(obj.id).subscribe(result => {
          this.get()
          this.toastr.success('Se eliminó correctamente el recurso!','Genial!');
        })
      }
    });
  }

  edit(obj:Recurso) {
    const dialogRef = this.dialog.open(EditRecursoComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      result.id = obj.id
      if(result){
        this.service.edit(obj.id,<Recurso>result).subscribe(result => {
          this.get()
          this.toastr.success('Se editó correctamente el recurso!','Genial!');
        })
      }
    });
  }

}
