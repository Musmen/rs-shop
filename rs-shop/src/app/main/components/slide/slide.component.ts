import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IGood } from '@app/core/models/good.model';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideComponent {
  @Input() content?: IGood;
}
