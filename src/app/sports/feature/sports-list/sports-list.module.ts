import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { SportItemComponent } from '@sports/ui/sport-item/sport-item.component';

import { SportsListRoutingModule } from './sports-list-routing.module';
import { SportsListComponent } from './sports-list.component';

@NgModule({
  declarations: [SportsListComponent, SportItemComponent],
  imports: [CommonModule, SportsListRoutingModule, NgOptimizedImage, MatCardModule],
  exports: [SportsListComponent],
})
export class SportsListModule {}
