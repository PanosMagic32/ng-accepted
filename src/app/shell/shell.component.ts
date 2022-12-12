import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule, Event as NavigationEvent, NavigationEnd } from '@angular/router';
import { debounceTime, Subscription } from 'rxjs';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { SportsDBAPIService } from '@shared/data-access/sports-db.service';

import { SelectOptions } from './data-access/select-options.interface';

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
        width: 15rem;
      }

      .category-input-bar {
        display: flex;
        justify-content: space-between;
        margin: 1rem;

        .select-btn {
          min-width: 15rem;
          min-height: 3.6rem;
        }
      }
    `,
  ],
})
export class ShellComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private sportsDBApiService = inject(SportsDBAPIService);

  categoryOptions: SelectOptions[] = [
    { value: 'sports', label: 'Sports' },
    { value: 'leagues', label: 'Leagues' },
    { value: 'countries', label: 'Countries' },
  ];

  selectionForm: FormGroup;

  constructor() {
    this.selectionForm = this.fb.group({
      query: '',
      category: '',
    });

    this.subscriptions.push(
      this.router.events.subscribe((event: NavigationEvent) => {
        if (event instanceof NavigationEnd) {
          this.selectionForm.get('category')?.setValue(event.url.split('/')[1]);
        }
      })
    );

    this.subscriptions.push(
      this.selectionForm.valueChanges.pipe(debounceTime(500)).subscribe((query) => {
        console.log(query);
        this.sportsDBApiService.fetchSports(query).subscribe();
      })
    );

    this.subscriptions.push(
      this.selectionForm.get('category')?.valueChanges.subscribe((category) => {
        this.router.navigate(['/', category]);
        this.selectionForm.get('query')?.reset();
      }) as Subscription
    );
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((s) => s.unsubscribe());
    }
  }
}
