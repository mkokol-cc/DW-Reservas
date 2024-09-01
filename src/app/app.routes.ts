import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListServicioComponent } from './components/list-servicio/list-servicio.component';

export const routes: Routes = [


    {path: '', component: DashboardComponent, children:[

        {path: 'servicios', loadComponent: () => import('./components/list-servicio/list-servicio.component').then(m => m.ListServicioComponent), pathMatch: 'full'},
    ]},

    /*
    {
        path: 'prueba',
        loadComponent: () => import('./components/list-servicio/list-servicio.component').then(m => m.ListServicioComponent)
    },*/

];
