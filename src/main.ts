import { bootstrapApplication } from '@angular/platform-browser';
import { InjectionToken, importProvidersFrom } from '@angular/core';
import { provideRouter, Route } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app/app.component';

export const BACKEND_URL = new InjectionToken<string>('BACKEND_URL');

export const ROUTES: Route[] = [{ path: '', loadChildren: () => import('./app/shell/shell.routes') }];

bootstrapApplication(AppComponent, {
  providers: [
    { provide: BACKEND_URL, useValue: 'https://www.thesportsdb.com/api/v1/json/2' },
    provideHttpClient(),
    provideRouter(ROUTES),
    importProvidersFrom([BrowserAnimationsModule, MatDialogModule]),
  ],
});
