import { Route } from '@angular/router';

// The new way of exposing routes to be consumed from the parent routes, and lazy load a component in a 'standalone' application.
export default [
  { path: '', loadComponent: () => import('@leagues/leagues.component').then((c) => c.LeaguesComponent) },
] as Route[];
