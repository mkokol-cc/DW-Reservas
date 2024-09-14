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
import { ToastrService } from 'ngx-toastr';

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

  @Input() programadoToEdit: Date = new Date();

  fechaDesde = new FormControl<Date | null>(null, [Validators.required]);
  fechaHasta = new FormControl<Date | null>(null);
  list:Horario[] = []
  minDate:Date = new Date()

  constructor(public dialog: MatDialog, private service:HorarioService,private toastr: ToastrService){
    this.get()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['programadoToEdit']) {
      this.fechaDesde.setValue(this.programadoToEdit)
      this.get()
    }
  }

  deleteHorarioCerrado(horario:Horario){
    const horarioCerrado = this.list.find(h => h.dia==horario.dia && h.inicio==null)
    if(horarioCerrado){
      this.list = this.list.filter(h => h!=horarioCerrado)
    }
  }

  crearHorarioCerrado(dia:number){
    const hayHorario = this.list.find(h => h.dia==dia)
    if(!hayHorario){
      const horarioCerrado = {
        id:0,
        dia:dia,
        inicio:null,
        cierre:null,
        programadoDesde:new Date(),
        programadoHasta:new Date(),
      }
      this.list.push(horarioCerrado)
    }
  }

  onSubmit(){
    this.list.forEach(element => {
      const h:any = {
        inicio:element.inicio,
        cierre:element.cierre,
        dia:element.dia,
        programadoDesde:this.fechaDesde.value,
        programadoHasta:this.fechaHasta.value
      }
      //console.log(h)
      //JSON.stringify(h)
      //this.service.create(<Horario>h).subscribe()
    });
    //guardar toda la lista
    //console.log('Dia Cambiado')
    this.toastr.success('Se creó correctamente el horario!','Genial!');
  }

  get(){
    this.service.list().subscribe(result => {
      this.list = result.filter(r => r.programadoDesde==this.programadoToEdit).sort((a, b) => a.inicio && b.inicio ? a.inicio.localeCompare(b.inicio) : a.dia);
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
      console.log(result)
      if(result){
        this.deleteHorarioCerrado(<Horario>result)
        this.list.push(<Horario>result)
      }
    });
  }

  delete(obj:Horario) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        message: 'Seguro quieres eliminar el horario?.',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.list = this.list.filter(h => h!=obj)
        this.crearHorarioCerrado(obj.dia)
      }
    });
  }

  edit(obj:Horario) {
    const dialogRef = this.dialog.open(EditHorarioComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log(result)
      if(result){
        this.list = this.list.filter(h => h!=obj)
        this.list.push(<Horario>result)
      }
    });
  }
}
