import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '@core/models/category.model';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryInfoComponent {
  @Input() category$?: Observable<ICategory | null>;

  constructor(private router: Router) { }

  onSubCategoryLinkClick(categoryId: string, subcategoryId: string): void {
    this.router.navigate(['/', categoryId, subcategoryId]);
  }
}
