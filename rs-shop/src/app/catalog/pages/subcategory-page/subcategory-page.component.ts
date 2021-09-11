import {
  ChangeDetectionStrategy, Component, OnDestroy, OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { IAppState } from '@redux/state.model';
import { selectCategoryById, selectSubcategoryById } from '@redux/selectors/categories.selectors';

import { IGoods } from '@core/models/goods.model';
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

  goods$?: Observable<IGoods[]>;

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

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

    this.goods$ = this.http.get<IGoods[]>(`http://localhost:3004/goods/category/${categoryId}/${subcategoryId}`);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
