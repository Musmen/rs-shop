import { isPlatformBrowser } from '@angular/common';
import {
  Injectable, Inject, PLATFORM_ID, InjectionToken,
} from '@angular/core';

import { MyLocalStorage } from '@core/services/ref/simulators/my-local-storage';

const myLocalStorage = new MyLocalStorage();

@Injectable({ providedIn: 'root' })
export class RefService {
  private localStorageRef: Storage;

  constructor(
    @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>,
  ) {
    this.localStorageRef = isPlatformBrowser(platformId)
      ? localStorage
      : myLocalStorage;
  }

  get localStorage(): Storage {
    return this.localStorageRef;
  }
}
