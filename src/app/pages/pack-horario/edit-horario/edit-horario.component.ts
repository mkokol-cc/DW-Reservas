import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Recurso } from '../../../interfaces/recurso';
import { Horario } from '../../../interfaces/horario';

@Component({
  selector: 'app-edit-horario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule,MatInputModule, MatDialogModule],
  templateUrl: './edit-horario.component.html',
  styleUrl: './edit-horario.component.scss'
})
export class EditHorarioComponent {
  form:FormGroup
  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: Horario){
    this.form = this.fb.group({
      id:[data.id],
      dia:[data.dia],
      inicio: [data.inicio, [Validators.required]],
      cierre: [data.cierre, [Validators.required]],
    })
  }
  onSubmit(){
    if (this.form.valid) {
      console.log(<Horario>this.form.value)
      //this.toastr.success('Se edito correctamente el recurso!','Genial!');
    }
  }
}
