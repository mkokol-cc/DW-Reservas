import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListServicioComponent } from './pages/pack-servicio/list-servicio/list-servicio.component';

export const routes: Routes = [


    {path: '', component: DashboardComponent, children:[

        //{path: 'servicios', loadComponent: () => import('./pages/pack-servicio/list-servicio/list-servicio.component').then(m => m.ListServicioComponent), pathMatch: 'full'},
        //{path: 'reservas', loadComponent: () => import('./pages/pack-reserva/list-reserva/list-reserva.component').then(m => m.ListReservaComponent), pathMatch: 'full'},
        {path: 'mi-negocio', loadComponent: () => import('./pages/section-analytics/section-analytics.component').then(m => m.SectionAnalyticsComponent), pathMatch: 'full'},
        {path: 'horarios', loadComponent: () => import('./pages/section-horarios/section-horarios.component').then(m => m.SectionHorariosComponent), pathMatch: 'full'},
        {path: 'reservas', loadComponent: () => import('./pages/section-reservas/section-reservas.component').then(m => m.SectionReservasComponent), pathMatch: 'full'},
        {path: 'perfil', loadComponent: () => import('./pages/section-perfil/section-perfil.component').then(m => m.SectionPerfilComponent), pathMatch: 'full'},
    ]},

    /*
    {
        path: 'prueba',
        loadComponent: () => import('./components/list-servicio/list-servicio.component').then(m => m.ListServicioComponent)
    },*/

];
