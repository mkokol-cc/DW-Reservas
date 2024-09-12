import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import { SidenavMenuComponent } from '../../components/sidenav-menu/sidenav-menu.component';
import { BuzonMenuComponent } from '../../components/buzon-menu/buzon-menu.component';
import { PerfilMenuComponent } from '../../components/perfil-menu/perfil-menu.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { BreakpointObserver } from '@angular/cdk/layout';

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
export class DashboardComponent implements OnInit {

  isSmallScreen: boolean = false;
  mode: MatDrawerMode = "side"

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    // Detectar si el ancho de la pantalla es menor que 600px
    this.breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.isSmallScreen = result.matches;
      this.mode = result.matches ? 'over' : 'side'
    });
  }

}
