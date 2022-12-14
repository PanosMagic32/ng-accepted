import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SportsDBAPIService } from '@shared/data-access/sports-db.service';

import { Country } from './data-access/country.interface';
import { CountryItemComponent } from './ui/country-item.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, MatProgressBarModule, CountryItemComponent],
  template: `
    <ng-container *ngIf="isLoading$ | async">
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </ng-container>

    <div *ngIf="(countries$ | async) && (isLoading$ | async) === false; else noContent" class="countries-list-container">
      <app-country-item
        *ngFor="let country of countries$ | async; trackBy: trackByFN"
        [country]="country"
      ></app-country-item>
    </div>

    <ng-template #noContent>
      <p *ngIf="(isLoading$ | async) === false">No content available to display.</p>
    </ng-template>
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

  // Assign the 'isLoading' Observable to a variable to use with the async pipe in the template.
  isLoading$ = this.sportsDBAPIService.isLoading$;

  // The trackBy function, for the ngFor loop optimization.
  trackByFN(index: number, country: Country) {
    return country.name_en;
  }
}
