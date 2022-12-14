import { Route } from '@angular/router';

import { CountriesResolver } from '@countries/data-access/countries.resolver';
import { LeaguesResolver } from '@leagues/data-access/leagues.resolver';
import { SportsResolver } from '@sports/data-access/sports.resolver';

import { ShellComponent } from './shell.component';

/**
 * The new way of exposing routes to be consumed from the new 'import' implementation in a 'standalone' application.
 * It also containes the data resolver for the necessary routes.
 */
export default [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'sports',
        loadChildren: () => import('../sports/sports.routes'),
        resolve: { sports: SportsResolver },
      },
      {
        path: 'leagues',
        loadChildren: () => import('../leagues/leagues.routes'),
        resolve: { leagues: LeaguesResolver },
      },
      {
        path: 'countries',
        loadChildren: () => import('../countries/countries.routes'),
        resolve: { countries: CountriesResolver },
      },
    ],
  },
] as Route[];
