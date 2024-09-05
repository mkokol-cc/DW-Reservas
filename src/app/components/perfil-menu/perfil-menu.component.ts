import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-perfil-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule,MatBadgeModule],
  templateUrl: './perfil-menu.component.html',
  styleUrl: './perfil-menu.component.scss'
})
export class PerfilMenuComponent {

}
