import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'prueba',
        loadComponent: () => import('./components/list-servicio/list-servicio.component').then(m => m.ListServicioComponent)
    },

];
