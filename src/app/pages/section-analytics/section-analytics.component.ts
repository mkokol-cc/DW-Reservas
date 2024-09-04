import { Component } from '@angular/core';
import { AnalyticsTiempoEsperaComponent } from '../../components/analytics-tiempo-espera/analytics-tiempo-espera.component';
import { AnalyticsClientesRecurrentesComponent } from '../../components/analytics-clientes-recurrentes/analytics-clientes-recurrentes.component';
import { AnalyticsNuevosClientesComponent } from '../../components/analytics-nuevos-clientes/analytics-nuevos-clientes.component';
import { AnalyticsTasaCancelacionComponent } from '../../components/analytics-tasa-cancelacion/analytics-tasa-cancelacion.component';
import { AnalyticsOcupacionServicioRecursoComponent } from '../../components/analytics-ocupacion-servicio-recurso/analytics-ocupacion-servicio-recurso.component';

@Component({
  selector: 'app-section-analytics',
  standalone: true,
  imports: [
    AnalyticsTiempoEsperaComponent,
    AnalyticsClientesRecurrentesComponent,
    AnalyticsNuevosClientesComponent,
    AnalyticsTasaCancelacionComponent,
    AnalyticsOcupacionServicioRecursoComponent
  ],
  templateUrl: './section-analytics.component.html',
  styleUrl: './section-analytics.component.scss'
})
export class SectionAnalyticsComponent {

}
