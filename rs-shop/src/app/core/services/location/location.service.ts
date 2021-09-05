import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ILocation } from '@app/core/models/location.model';
import { LOCATION_API_URL } from '../common/constants';

@Injectable()
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocationByIP$(): Observable<ILocation> {
    return this.http.get<ILocation>(LOCATION_API_URL);
  }
}
