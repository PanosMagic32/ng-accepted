import { Route } from '@angular/router';

// The new way of exposing routes to be consumed from the parent routes, and lazy load a component in a 'standalone' application.
export default [
  { path: '', loadComponent: () => import('@sports/sports.component').then((c) => c.SportsComponent) },
] as Route[];
