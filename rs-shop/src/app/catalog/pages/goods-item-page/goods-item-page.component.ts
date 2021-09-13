import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { IAppState } from '@redux/state.model';
import { selectCategoryById, selectSubcategoryById } from '@redux/selectors/categories.selectors';

import { IGoods } from '@core/models/goods.model';
import { ICategory } from '@core/models/category.model';

@Component({
  selector: 'app-goods-item-page',
  templateUrl: './goods-item-page.component.html',
  styleUrls: ['./goods-item-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsItemPageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  goodsItem: IGoods | null;
  category$!: Observable<ICategory | null>;
  subcategory$!: Observable<ICategory | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private store: Store<IAppState>,
  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    this.goodsItem = currentNavigation && currentNavigation.extras?.state?.goodsItem as IGoods;
  }

  ngOnInit(): void {
    const { categoryId, subcategoryId, goodsItemId } = this.route.snapshot.params;

    if (!this.goodsItem || !categoryId || !subcategoryId) {
      const goodsItemSubscription = this.http.get<IGoods>(
        `http://localhost:3004/goods/item/${goodsItemId}`,
      )
        .pipe(take(1))
        .subscribe((goodsItem) => {
          this.router.navigate(
            ['/', goodsItem.category, goodsItem.subCategory, goodsItem.id],
            {
              state: { goodsItem },
              replaceUrl: true,
            },
          );
          this.goodsItem = goodsItem;
          this.category$ = this.store.select(selectCategoryById(goodsItem.category || ''));
          this.subcategory$ = this.store.select(selectSubcategoryById(goodsItem.subCategory || ''));
          this.ref.detectChanges();
        });
      this.subscriptions.add(goodsItemSubscription);
    } else {
      this.category$ = this.store.select(selectCategoryById(categoryId));
      this.subcategory$ = this.store.select(selectSubcategoryById(subcategoryId));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
