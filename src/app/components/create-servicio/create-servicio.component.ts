import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-create-servicio',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatButtonModule,MatInputModule, MatDialogModule],
  templateUrl: './create-servicio.component.html',
  styleUrl: './create-servicio.component.scss'
})
export class CreateServicioComponent {

}
