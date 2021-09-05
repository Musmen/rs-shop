import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ILocation } from '@app/core/models/location.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBlockComponent{
  @Input() location$?: Observable<ILocation>;
}
