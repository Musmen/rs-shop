import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from '@app/core/models/category.model';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  @Input() category?: ICategory | null;
  @Input() subcategory?: ICategory | null;
  @Input() disableSubcategoryLink?: boolean = true;

  constructor(private router: Router) { }

  onBreadcrumbsLinkClick(categoryId: string, subcategoryId?: string): void {
    if (subcategoryId) {
      this.router.navigate(['', categoryId, subcategoryId]);
      return;
    }

    this.router.navigate(['', categoryId]);
  }
}
