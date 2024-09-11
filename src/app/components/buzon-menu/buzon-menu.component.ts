import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-buzon-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule,MatBadgeModule,
    MatDividerModule],
  templateUrl: './buzon-menu.component.html',
  styleUrl: './buzon-menu.component.scss'
})
export class BuzonMenuComponent {

}
