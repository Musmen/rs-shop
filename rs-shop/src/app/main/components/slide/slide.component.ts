import {
  Component, ChangeDetectionStrategy, Input, ViewEncapsulation,
} from '@angular/core';
import { IGood } from '@app/core/models/good.model';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SlideComponent {
  @Input() content?: IGood;
}
