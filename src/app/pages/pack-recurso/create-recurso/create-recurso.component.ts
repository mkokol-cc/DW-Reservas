import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Recurso } from '../../../interfaces/recurso';

@Component({
  selector: 'app-create-recurso',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule,MatInputModule, MatDialogModule],
  templateUrl: './create-recurso.component.html',
  styleUrl: './create-recurso.component.scss'
})
export class CreateRecursoComponent {
  form:FormGroup
  constructor(private fb: FormBuilder, private toastr: ToastrService){
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: [''],
    })
  }
  onSubmit(){
    if (this.form.valid) {
      console.log(<Recurso>this.form.value)
      this.toastr.success('Se edito correctamente el recurso!','Genial!');
    }
  }
}
