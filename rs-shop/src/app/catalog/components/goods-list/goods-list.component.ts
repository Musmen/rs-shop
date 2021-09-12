import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { setNewSortState } from '@redux/actions/state.actions';
import { selectSortState } from '@redux/selectors/state.selectors';
import { IAppState } from '@redux/state.model';

import { IGoods } from '@core/models/goods.model';
import { ICategory } from '@core/models/category.model';
import ISortState from '@core/models/sort-state.model';

import { initialSortState } from '@common/constants';
import { GOODS_COUNT_IN_GROUP } from '@catalog/common/constants';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() category?: ICategory | null;
  @Input() subcategory?: ICategory | null;

  private subscriptions = new Subscription();
  private goodsStartIndex = 0;

  goods: IGoods[] = [];
  sortState: ISortState = { ...initialSortState };

  isGoodsMaxCountReached: boolean = false;

  constructor(
    private store: Store<IAppState>,
    private http: HttpClient,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    const subscription = this.store.select(selectSortState)
      .subscribe((sortState) => {
        this.sortState = { ...sortState };
      });
    this.subscriptions.add(subscription);
  }

  ngOnChanges(): void {
    this.goods = [];
    this.goodsStartIndex = 0;
    this.isGoodsMaxCountReached = false;

    this.addNextGoodsGroup(this.category?.id, this.subcategory?.id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  changeSortState(newSortingBy: string): void {
    if (this.sortState.sortingBy === newSortingBy) {
      this.sortState.ascending *= -1;
    } else {
      this.sortState.sortingBy = newSortingBy;
    }

    this.store.dispatch(setNewSortState({ newSortState: this.sortState }));
  }

  private updateGoodsStartIndex(): void {
    this.goodsStartIndex += GOODS_COUNT_IN_GROUP;
  }

  private checkIsGoodsMaxCountReached(fetchedItemsCount: number): void {
    if (fetchedItemsCount !== GOODS_COUNT_IN_GROUP) this.isGoodsMaxCountReached = true;
  }

  private fetchNextGoodsGroup(
    categoryId = this.category?.id,
    subcategoryId = this.subcategory?.id,
    goodsStartIndex = this.goodsStartIndex,
  ): void {
    const subcategoryIdForUrl = subcategoryId
      ? `/${subcategoryId}`
      : '';

    const goodsSubscription = this.http.get<IGoods[]>(
      `http://localhost:3004/goods/category/${categoryId}${subcategoryIdForUrl}`
        + `/?start=${goodsStartIndex}&count=${GOODS_COUNT_IN_GROUP}`,
    )
      .pipe(take(1))
      .subscribe((goods) => {
        this.checkIsGoodsMaxCountReached(goods.length);
        this.goods = [...this.goods, ...goods];
        this.ref.detectChanges();
      });
    this.subscriptions.add(goodsSubscription);
  }

  addNextGoodsGroup(
    categoryId = this.category?.id,
    subcategoryId = this.subcategory?.id,
    goodsStartIndex = this.goodsStartIndex,
  ): void {
    this.fetchNextGoodsGroup(categoryId, subcategoryId, goodsStartIndex);
    this.updateGoodsStartIndex();
  }
}
