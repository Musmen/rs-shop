import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICategory } from '@app/core/models/category.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  @Input() categories?: ICategory[] | null;
}
