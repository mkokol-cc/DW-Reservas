import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Servicio } from '../../../interfaces/servicio';

@Component({
  selector: 'app-create-servicio',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule,MatInputModule, MatDialogModule],
  templateUrl: './create-servicio.component.html',
  styleUrl: './create-servicio.component.scss'
})
export class CreateServicioComponent {
  form:FormGroup
  constructor(private fb: FormBuilder, private toastr: ToastrService){
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      duracion: ['', [Validators.required, Validators.min(1), Validators.max(1440)]],
      precio: ['', [Validators.required, Validators.min(0), Validators.max(99999999)]],
      precioMaximo: ['', [Validators.min(0), Validators.max(99999999)]],
      precioSenia: ['', [Validators.min(0), Validators.max(99999999)]],
      descripcion: [''],
    })
  }
  onSubmit(){
    if (this.form.valid) {
      console.log(<Servicio>this.form.value)
      this.toastr.success('Se editó correctamente el servicio!','Genial!');
    }
  }
}
