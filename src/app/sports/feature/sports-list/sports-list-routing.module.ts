import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SportsListComponent } from './sports-list.component';

export const routes: Routes = [
  {
    path: '',
    component: SportsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SportsListRoutingModule {}
