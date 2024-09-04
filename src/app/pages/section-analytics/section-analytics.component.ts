import { Component } from '@angular/core';
import { AnalyticsTiempoEsperaComponent } from '../../components/analytics-tiempo-espera/analytics-tiempo-espera.component';
import { AnalyticsClientesRecurrentesComponent } from '../../components/analytics-clientes-recurrentes/analytics-clientes-recurrentes.component';
import { AnalyticsNuevosClientesComponent } from '../../components/analytics-nuevos-clientes/analytics-nuevos-clientes.component';
import { AnalyticsTasaCancelacionComponent } from '../../components/analytics-tasa-cancelacion/analytics-tasa-cancelacion.component';
import { AnalyticsOcupacionServicioRecursoComponent } from '../../components/analytics-ocupacion-servicio-recurso/analytics-ocupacion-servicio-recurso.component';
import { AnalyticsIngresosFuturosComponent } from '../../components/analytics-ingresos-futuros/analytics-ingresos-futuros.component';
import { AnalyticsTasaOcupacionComponent } from '../../components/analytics-tasa-ocupacion/analytics-tasa-ocupacion.component';
import { AnalyticsHistorialReservasComponent } from '../../components/analytics-historial-reservas/analytics-historial-reservas.component';

@Component({
  selector: 'app-section-analytics',
  standalone: true,
  imports: [
    AnalyticsTiempoEsperaComponent,
    AnalyticsClientesRecurrentesComponent,
    AnalyticsNuevosClientesComponent,
    AnalyticsTasaCancelacionComponent,
    AnalyticsOcupacionServicioRecursoComponent,
    AnalyticsIngresosFuturosComponent,
    AnalyticsTasaOcupacionComponent,
    AnalyticsHistorialReservasComponent
  ],
  templateUrl: './section-analytics.component.html',
  styleUrl: './section-analytics.component.scss'
})
export class SectionAnalyticsComponent {

}
