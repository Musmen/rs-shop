import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { detectLocation, setNewLocation } from '@app/redux/actions/state.actions';
import { IAppState } from '@app/redux/state.model';

import { selectLocation } from '@app/redux/selectors/state.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  location$?: Observable<string>;

  constructor(private store: Store<IAppState>) {
    this.store.dispatch(detectLocation());
  }

  ngOnInit(): void {
    this.location$ = this.store.select(selectLocation);
  }

  changeLocation(newLocation: string | null): void {
    if (!newLocation) return;
    this.store.dispatch(setNewLocation({ newLocation }));
  }
}
