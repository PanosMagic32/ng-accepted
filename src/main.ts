import { bootstrapApplication } from '@angular/platform-browser';
import { InjectionToken, importProvidersFrom } from '@angular/core';
import { provideRouter, Route } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app/app.component';

// Create an Injection token for the backend's URL
export const BACKEND_URL = new InjectionToken<string>('BACKEND_URL');

/**
 * Lazy load the Shell as an initial route.
 * The 'import' syntax is a new way of importing routes, which requires a spacific pattern to be followed in the routes file.
 * See shell.routes.ts for further details.
 */
export const ROUTES: Route[] = [{ path: '', loadChildren: () => import('./app/shell/shell.routes') }];

// Bootstrap the application using the 'standalone' implementation & apply some providers to be used across the application.
bootstrapApplication(AppComponent, {
  providers: [
    { provide: BACKEND_URL, useValue: 'https://www.thesportsdb.com/api/v1/json/2' },
    provideHttpClient(),
    provideRouter(ROUTES),
    importProvidersFrom([BrowserAnimationsModule, MatDialogModule]),
  ],
});
