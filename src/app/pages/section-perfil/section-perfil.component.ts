import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-section-perfil',
  standalone: true,
  imports: [MatDividerModule,MatCardModule,MatFormFieldModule, MatInputModule,MatListModule,MatIconModule],
  templateUrl: './section-perfil.component.html',
  styleUrl: './section-perfil.component.scss'
})
export class SectionPerfilComponent {

}
