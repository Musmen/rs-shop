import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private isSpinnerShown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  showSpinner(): void {
    this.isSpinnerShown$.next(true);
  }

  hideSpinner(): void {
    this.isSpinnerShown$.next(false);
  }

  getIsSpinnerShown$(): Observable<boolean> {
    return this.isSpinnerShown$.asObservable();
  }
}
