import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { getLocation } from '@common/helpers';
import { ILocation, ITranslatedLocationResponse } from '@core/models/location.model';
import { LOCATION_API_URL, TRANSLATE_API_URL } from '@common/constants';

@Injectable()
export class LocationService {
  constructor(private http: HttpClient) {}

  getTranslatedLocationByIP$(): Observable<ITranslatedLocationResponse> {
    return this.http.get<ILocation>(LOCATION_API_URL).pipe(
      switchMap(
        (location) => this.http.get<ITranslatedLocationResponse>(
          `${TRANSLATE_API_URL}${getLocation(location)}`,
        ),
      ),
    );
  }
}
