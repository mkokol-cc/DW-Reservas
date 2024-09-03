import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { notificationsInterceptor } from './interceptors/notifications.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideToastr(), provideAnimations(),

    provideHttpClient(withInterceptors([notificationsInterceptor])),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, delay: 1000 }
    )),//api fake con 1 segundo de delay
  ]
};
