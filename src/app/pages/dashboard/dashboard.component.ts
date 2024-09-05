import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavMenuComponent } from '../../components/sidenav-menu/sidenav-menu.component';
import { BuzonMenuComponent } from '../../components/buzon-menu/buzon-menu.component';
import { PerfilMenuComponent } from '../../components/perfil-menu/perfil-menu.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    MatSidenavModule,
    SidenavMenuComponent,
    BuzonMenuComponent,
    PerfilMenuComponent,
    LoaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
