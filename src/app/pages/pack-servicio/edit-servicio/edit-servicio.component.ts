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
import { Servicio } from '../../../interfaces/servicio';

@Component({
  selector: 'app-edit-servicio',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule,MatInputModule, MatDialogModule],
  templateUrl: './edit-servicio.component.html',
  styleUrl: './edit-servicio.component.scss'
})
export class EditServicioComponent {
  form:FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data: Servicio, private fb:FormBuilder, private toastr: ToastrService){
    this.form = this.fb.group({
      nombre: [data.nombre, [Validators.required]],
      duracion: [data.duracion, [Validators.required, Validators.min(1), Validators.max(1440)]],
      precio: [data.precio, [Validators.required, Validators.min(0), Validators.max(99999999)]],
      precioMaximo: [data.precioMaximo, [Validators.min(0), Validators.max(99999999)]],
      precioSenia: [data.precioSenia, [Validators.min(0), Validators.max(99999999)]],
      descripcion: [data.descripcion],
    })
  }
  onSubmit(){
    if (this.form.valid) {
      console.log(<Servicio>this.form.value)
      this.toastr.success('Se edito correctamente el servicio!','Genial!');
    }
  }
}
