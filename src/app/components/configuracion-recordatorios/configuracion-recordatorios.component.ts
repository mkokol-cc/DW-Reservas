import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-configuracion-recordatorios',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule,MatBadgeModule],
  templateUrl: './configuracion-recordatorios.component.html',
  styleUrl: './configuracion-recordatorios.component.scss'
})
export class ConfiguracionRecordatoriosComponent {

}
