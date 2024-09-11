import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { DialogConfirmComponent } from '../../../components/dialog-confirm/dialog-confirm.component';
import { Horario } from '../../../interfaces/horario';
import { HorarioService } from '../../../services/horario.service';
import { CreateHorarioComponent } from '../create-horario/create-horario.component';
import { EditHorarioComponent } from '../edit-horario/edit-horario.component';

@Component({
  selector: 'app-create-week-horario',
  standalone: true,
  imports: [MatButtonModule,MatChipsModule,MatIconModule,MatExpansionModule,MatListModule,MatDialogModule,MatGridListModule
    ,CommonModule,MatCardModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, MatRadioModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-week-horario.component.html',
  styleUrl: './create-week-horario.component.scss'
})
export class CreateWeekHorarioComponent implements OnChanges {

  @Input() programadoToEdit: string = "";

  scheduledChangeDate = new FormControl('', [Validators.required]);
  list:Horario[] = []
  selected:string="0"

  constructor(public dialog: MatDialog, private service:HorarioService){
    this.get()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['programadoToEdit']) {
      this.get()
    }
  }

  onSubmit(){
    console.log('Dia Cambiado')
  }

  get(){
    this.service.list().subscribe(result => {
      this.list = result.filter(r => r.programado==this.programadoToEdit).sort((a, b) => a.inicio && b.inicio ? a.inicio.localeCompare(b.inicio) : a.dia);
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
