import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-section-perfil',
  standalone: true,
  imports: [MatDividerModule,MatCardModule],
  templateUrl: './section-perfil.component.html',
  styleUrl: './section-perfil.component.scss'
})
export class SectionPerfilComponent {

}
