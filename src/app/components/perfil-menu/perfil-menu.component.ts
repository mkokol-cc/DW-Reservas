import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-perfil-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule,MatBadgeModule,MatDividerModule],
  templateUrl: './perfil-menu.component.html',
  styleUrl: './perfil-menu.component.scss'
})
export class PerfilMenuComponent {

}
