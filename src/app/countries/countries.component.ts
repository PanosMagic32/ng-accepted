import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Country } from '@shared/data-access/country.interface';
import { SportsDBAPIService } from '@shared/data-access/sports-db.service';

import { CountryItemComponent } from './ui/country-item.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, CountryItemComponent],
  template: `
    <div *ngIf="countries$ | async" class="countries-list-container">
      <app-country-item
        *ngFor="let country of countries$ | async; trackBy: trackByFN"
        [country]="country"
      ></app-country-item>
    </div>
  `,
  styles: [
    `
      .countries-list-container {
        display: flex;
        flex-wrap: wrap;
        margin-top: 1rem;
      }

      .countries-list-container > * {
        flex: 1 1 20rem;
      }
    `,
  ],
})
export class CountriesComponent {
  sportsDBAPIService = inject(SportsDBAPIService);
  countries$ = this.sportsDBAPIService.countries$;

  trackByFN(index: number, country: Country) {
    return country.name_en;
  }
}
