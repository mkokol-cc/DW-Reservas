import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import { Horario } from '../../../interfaces/horario';
import { DialogConfirmComponent } from '../../../components/dialog-confirm/dialog-confirm.component';
import { CreateHorarioComponent } from '../create-horario/create-horario.component';
import { EditHorarioComponent } from '../edit-horario/edit-horario.component';
import { HorarioService } from '../../../services/horario.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-list-horario',
  standalone: true,
  imports: [MatButtonModule,MatChipsModule,MatIconModule,MatExpansionModule,MatListModule,MatDialogModule,MatGridListModule
    ,CommonModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, MatRadioModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './list-horario.component.html',
  styleUrl: './list-horario.component.scss'
})
export class ListHorarioComponent {

  scheduledChangeDate = new FormControl('', [Validators.required]);
  list:Horario[] = []
  selected:string="0"

  constructor(public dialog: MatDialog, private service:HorarioService){
    this.get()
  }

  onSubmit(){
    console.log('Dia Cambiado')
  }

  get(){
    this.service.list().subscribe(result => {
      this.list = result.sort((a, b) => a.inicio.localeCompare(b.inicio));
    })
  }

  create(numDia:number) {
    const dialogRef = this.dialog.open(CreateHorarioComponent,{
      data:{
        dia:numDia
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.service.create(result).subscribe(result=>{
          this.get()
        });
      }
    });
  }

  delete(id:number) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        message: 'Seguro quieres eliminar el horario?.',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.service.delete(id).subscribe(result=>{
          this.get()
        });
      }
    });
  }

  edit(obj:Horario) {
    const dialogRef = this.dialog.open(EditHorarioComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.service.edit(result).subscribe(result=>{
          this.get()
        });
      }
    });
  }
}
