import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ILocation } from '@app/core/models/location.model';
import { LocationService } from '@app/core/services/location/location.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  location$?: Observable<ILocation>;

  constructor(private location: LocationService) { }

  ngOnInit(): void {
    this.location$ = this.location.getLocationByIP$();
  }
}
