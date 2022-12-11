import { Component } from '@angular/core';

import { SportsApiService } from '@shared/data-access/sports-api.service';

@Component({
  selector: 'app-sport-list',
  templateUrl: './sport-list.component.html',
  styleUrls: ['./sport-list.component.scss'],
})
export class SportsListComponent {
  sports$ = this.sportsApiService.sports$;
  constructor(private sportsApiService: SportsApiService) {}
}
