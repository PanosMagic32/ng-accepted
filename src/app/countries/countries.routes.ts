import { Route } from '@angular/router';

export default [
  { path: '', loadComponent: () => import('@countries/countries.component').then((c) => c.CountriesComponent) },
] as Route[];
