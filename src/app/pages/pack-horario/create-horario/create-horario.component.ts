import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Horario } from '../../../interfaces/horario';

@Component({
  selector: 'app-create-horario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule,MatInputModule, MatDialogModule],
  templateUrl: './create-horario.component.html',
  styleUrl: './create-horario.component.scss'
})
export class CreateHorarioComponent {
  dayName:string[]=['domingo','lunes','martes','miércoles','jueves','viernes','sábado']
  form:FormGroup
  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: Horario){
    this.form = this.fb.group({
      dia: [data.dia],
      inicio: ['', [Validators.required]],
      cierre: ['', [Validators.required]],
    })
  }
  onSubmit(){
    if (this.form.valid) {
      console.log(<Horario>this.form.value)
      //this.toastr.success('Se edito correctamente el recurso!','Genial!');
    }
  }
}
