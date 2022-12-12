import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

import { Country } from '@shared/data-access/country.interface';

@Component({
  selector: 'app-country-item',
  standalone: true,
  template: `
    <ng-container *ngIf="country">
      <mat-card class="country-item-card">
        <mat-card-content>
          <p>Country: {{ country.name_en }}</p>
        </mat-card-content>
      </mat-card>
    </ng-container>
  `,
  styles: [
    `
      .country-item-card {
        cursor: pointer;
        margin: 0 1rem 1rem 1rem;
        height: 5rem;
      }
    `,
  ],
  imports: [NgIf, MatCardModule],
})
export class CountryItemComponent {
  @Input() country!: Country;
}
