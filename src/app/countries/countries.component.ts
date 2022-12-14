import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { SportsDBAPIService } from '@shared/data-access/sports-db.service';

import { Country } from './data-access/country.interface';
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
  // Inject the SportsDBAPIService & assign it to a variable.
  sportsDBAPIService = inject(SportsDBAPIService);

  // Assign the 'countries' Observable to a variable to use with the async pipe in the template.
  countries$ = this.sportsDBAPIService.countries$;

  // The trackBy function, for the ngFor loop optimization.
  trackByFN(index: number, country: Country) {
    return country.name_en;
  }
}
