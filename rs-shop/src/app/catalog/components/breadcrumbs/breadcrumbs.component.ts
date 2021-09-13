import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnChanges,
} from '@angular/core';

import {
  combineLatest, Observable, of, Subscription,
} from 'rxjs';

import { ICategory } from '@core/models/category.model';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnChanges, OnDestroy {
  @Input() category$: Observable<ICategory | null> = of(null);
  @Input() subcategory$: Observable<ICategory | null> = of(null);
  @Input() disableSubcategoryLink?: boolean = true;

  category?: ICategory | null;
  subcategory?: ICategory | null;

  private subscriptions = new Subscription();

  constructor(private router: Router, private ref: ChangeDetectorRef) { }

  ngOnChanges(): void {
    if (!this.category$ && !this.subcategory$) return;

    const subscription = combineLatest([this.category$, this.subcategory$])
      .subscribe(([category, subcategory]) => {
        this.category = category;
        this.subcategory = subcategory;
        this.ref.detectChanges();
      });
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onBreadcrumbsLinkClick(categoryId: string, subcategoryId?: string): void {
    if (subcategoryId) {
      this.router.navigate(['', categoryId, subcategoryId]);
      return;
    }

    this.router.navigate(['', categoryId]);
  }
}
