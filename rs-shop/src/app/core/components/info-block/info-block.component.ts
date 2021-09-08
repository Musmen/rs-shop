import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output,
} from '@angular/core';

import { CITIES } from '@common/constants';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBlockComponent implements OnChanges {
  @Input() location?: string | null;
  @Output() changeLocationEvent = new EventEmitter<string | null>();
  cities = CITIES;

  ngOnChanges(): void {
    this.addUserLocationToCitiesList();
  }

  private addUserLocationToCitiesList(): void {
    if (this.location && !this.cities.includes(this.location)) this.cities.push(this.location);
  }

  onSelectionChange(): void {
    this.changeLocationEvent.emit(this.location);
  }
}
