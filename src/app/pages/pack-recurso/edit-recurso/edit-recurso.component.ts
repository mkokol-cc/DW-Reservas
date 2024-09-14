import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Recurso } from '../../../interfaces/recurso';

@Component({
  selector: 'app-edit-recurso',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule,MatInputModule, MatDialogModule],
  templateUrl: './edit-recurso.component.html',
  styleUrl: './edit-recurso.component.scss'
})
export class EditRecursoComponent {
  form:FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data: Recurso, private fb:FormBuilder, private toastr: ToastrService){
    this.form = this.fb.group({
      nombre: [data.nombre, [Validators.required]],
      descripcion: [data.descripcion],
    })
  }
  onSubmit(){
    if (this.form.valid) {
      console.log(<Recurso>this.form.value)
      this.toastr.success('Se editó correctamente el recurso!','Genial!');
    }
  }
}
