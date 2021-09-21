import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { SpinnerService } from '@core/services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  isSpinnerShown$: Observable<boolean> = this.spinnerService.getIsSpinnerShown$();

  constructor(private spinnerService: SpinnerService) { }
}
