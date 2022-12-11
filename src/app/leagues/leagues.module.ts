import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaguesRoutingModule } from './leagues-routing.module';
import { LeaguesComponent } from './leagues.component';


@NgModule({
  declarations: [
    LeaguesComponent
  ],
  imports: [
    CommonModule,
    LeaguesRoutingModule
  ]
})
export class LeaguesModule { }
