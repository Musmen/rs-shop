import {
  ChangeDetectionStrategy, Component, OnDestroy, OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { IAppState } from '@redux/state.model';
import { selectCategoryById, selectSubcategoryById } from '@redux/selectors/categories.selectors';

import { ICategory } from '@core/models/category.model';

@Component({
  selector: 'app-subcategory-page',
  templateUrl: './subcategory-page.component.html',
  styleUrls: ['./subcategory-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcategoryPageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  category?: ICategory | null;
  subcategory?: ICategory | null;

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const { categoryId, subcategoryId } = this.route.snapshot.params;

    const categorySubscription = this.store.select(selectCategoryById(categoryId))
      .subscribe((category) => {
        this.category = category;
      });
    this.subscriptions.add(categorySubscription);

    const subcategorySubscription = this.store.select(selectSubcategoryById(subcategoryId))
      .subscribe((subcategory) => {
        this.subcategory = subcategory;
      });
    this.subscriptions.add(subcategorySubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
