import { Component, Input } from '@angular/core';

import { Sport } from '@shared/data-access/sport.interface';

@Component({
  selector: 'app-sport-item',
  templateUrl: './sport-item.component.html',
  styleUrls: ['./sport-item.component.scss'],
})
export class SportItemComponent {
  @Input() sport!: Sport;

  onSelect(sportId: string) {
    console.log(sportId);
  }
}
