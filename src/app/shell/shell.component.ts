import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

import { SportsApiService } from '@shared/data-access/sports-api.service';

interface SelectOptions {
  value: string;
  label: string;
}

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  categoryOptions: SelectOptions[] = [
    { value: 'sports', label: 'Sports' },
    { value: 'leagues', label: 'Leagues' },
    { value: 'countries', label: 'Countries' },
  ];

  selectionForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private sportsApiService: SportsApiService) {
    this.selectionForm = this.fb.group({
      query: '',
      category: this.categoryOptions[0].value,
    });

    this.router.navigate(['/', this.categoryOptions[0].value]);

    this.selectionForm.valueChanges.pipe(debounceTime(500)).subscribe((query) => {
      console.log(query);
      this.sportsApiService.fetchSports(query).subscribe();
    });

    this.selectionForm.get('category')?.valueChanges.subscribe((category) => {
      this.router.navigate(['/', category]);
      this.selectionForm.get('query')?.reset();
    });
  }
}
