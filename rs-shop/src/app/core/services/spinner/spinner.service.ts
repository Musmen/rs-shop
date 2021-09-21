import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private _isSpinnerShown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  showSpinner(): void {
    this._isSpinnerShown$.next(true);
  }

  hideSpinner(): void {
    this._isSpinnerShown$.next(false);
  }

  getIsSpinnerShown$(): Observable<boolean> {
    return this._isSpinnerShown$.asObservable();
  }
}
