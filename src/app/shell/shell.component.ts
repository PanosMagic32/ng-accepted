import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule, Event as NavigationEvent, NavigationEnd } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subscription, take } from 'rxjs';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { SportsDBAPIService } from '@shared/data-access/sports-db.service';

import { SelectOption } from './data-access/select-option.interface';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  template: `
    <form [formGroup]="selectionForm" class="category-input-bar">
      <mat-form-field class="filter-form-field">
        <mat-label>Search for an item</mat-label>
        <input matInput type="text" formControlName="query" />

        <button
          *ngIf="selectionForm.get('query')?.value"
          matSuffix
          mat-icon-button
          aria-label="Clear"
          (click)="selectionForm.get('query')?.reset()"
        >
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>

      <mat-form-field appearance="fill" class="select-btn">
        <mat-label>Category</mat-label>
        <mat-select formControlName="category">
          <mat-option *ngFor="let option of categoryOptions" [value]="option.value">{{ option.label }}</mat-option>
        </mat-select>
      </mat-form-field>
    </form>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .filter-form-field {
        width: 33%;
      }

      .category-input-bar {
        display: flex;
        justify-content: space-between;
        margin: 1rem;

        .select-btn {
          min-width: 33%;
          min-height: 3.6rem;
        }
      }
    `,
  ],
})
export class ShellComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];

  private router = inject(Router);
  private sportsDBApiService = inject(SportsDBAPIService);

  categoryOptions: SelectOption[] = [
    { value: 'sports', label: 'Sports' },
    { value: 'leagues', label: 'Leagues' },
    { value: 'countries', label: 'Countries' },
  ];

  selectionForm: FormGroup;
  selectedCategory = this.categoryOptions[0].value;

  constructor() {
    this.selectionForm = new FormGroup({
      query: new FormControl('', { nonNullable: true }),
      category: new FormControl(this.categoryOptions[0].value, { nonNullable: true }),
    });

    this.router.navigate(['/', 'sports']);

    this.subscriptions.push(
      this.router.events.subscribe((event: NavigationEvent) => {
        if (event instanceof NavigationEnd) {
          this.selectionForm.get('category')?.setValue(event.url.split('/')[1]);
        }
      })
    );

    this.subscriptions.push(
      this.selectionForm
        .get('query')
        ?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((query) => {
          switch (this.selectedCategory) {
            case 'sports':
              this.sportsDBApiService.fetchSports(query.trim()).pipe(take(1)).subscribe();
              this.router.navigate(['/', this.selectedCategory]);
              break;

            case 'leagues':
              this.sportsDBApiService.fetchLeagues(query.trim()).pipe(take(1)).subscribe();
              this.router.navigate(['/', this.selectedCategory]);
              break;

            case 'countries':
              this.sportsDBApiService.fetchCountries(query.trim()).pipe(take(1)).subscribe();
              this.router.navigate(['/', this.selectedCategory]);
              break;

            default:
              break;
          }
        }) as Subscription
    );

    this.subscriptions.push(
      this.selectionForm.get('category')?.valueChanges.subscribe((category) => {
        this.router.navigate(['/', category]);
        this.selectionForm.get('query')?.reset();
        this.selectedCategory = category;
      }) as Subscription
    );
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((s) => s.unsubscribe());
    }
  }
}
