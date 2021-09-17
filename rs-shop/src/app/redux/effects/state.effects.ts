import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { LocationService } from '@core/services/location/location.service';

import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { detectLocation, detectLocationFailed, detectLocationSuccessfully } from '../actions/state.actions';

@Injectable({ providedIn: 'any' })
export class StateEffects {
  constructor(private actions$: Actions, private location: LocationService) {}

  getLocation$: Observable<Action> = createEffect(() => this.actions$
    .pipe(
      ofType(detectLocation.type),
      switchMap(() => this.location.getLocationByIP$()
        .pipe(
          map(
            (location) => detectLocationSuccessfully({ location }),
          ),
        )),
      catchError(() => of(detectLocationFailed())),
    ));
}
