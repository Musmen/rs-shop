import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ERRORS_DESCRIPTIONS } from '@common/constants';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  errorDescription: string = ERRORS_DESCRIPTIONS.PAGE_NOT_FOUND;
}
