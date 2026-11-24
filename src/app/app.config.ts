import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import  localPt  from '@angular/common/locales/pt';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor';


registerLocaleData(localPt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideLuxonDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt'},
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
