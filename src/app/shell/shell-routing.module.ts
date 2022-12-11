import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SportsResolver } from '@sports/data-access/sports.resolver';

import { ShellComponent } from './shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'sports',
        loadChildren: () => import('@sports/feature/sports-list/sports-list.module').then((m) => m.SportsListModule),
        resolve: {sports:SportsResolver},
      },
      {
        path: 'leagues',
        loadChildren: () => import('@leagues/leagues.module').then((m) => m.LeaguesModule),
      },
      {
        path: 'countries',
        loadChildren: () => import('@countries/countries.module').then((m) => m.CountriesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
