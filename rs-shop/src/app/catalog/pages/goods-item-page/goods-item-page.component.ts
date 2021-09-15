import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation,
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { selectCategoryById, selectSubcategoryById } from '@redux/selectors/categories.selectors';
import { IAppState } from '@redux/state.model';

import { IGoods } from '@core/models/goods.model';
import { ICategory } from '@core/models/category.model';

import SwiperCore, {
  SwiperOptions, Pagination, Thumbs, Swiper,
} from 'swiper';
import { POSTERS_SLIDER_CONFIG, TUMBS_SLIDER_CONFIG } from '@catalog/common/constants';

SwiperCore.use([Pagination, Thumbs]);

@Component({
  selector: 'app-goods-item-page',
  templateUrl: './goods-item-page.component.html',
  styleUrls: ['./goods-item-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GoodsItemPageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  goodsItem?: IGoods | null;

  category$!: Observable<ICategory | null>;
  subcategory$!: Observable<ICategory | null>;

  tumbsSlider!: Swiper;
  postersSlider!: Swiper;

  tumbsSliderConfig: SwiperOptions = TUMBS_SLIDER_CONFIG;
  postersSliderConfig: SwiperOptions = POSTERS_SLIDER_CONFIG;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private store: Store<IAppState>,
  ) { }

  ngOnInit(): void {
    let currentSubcategoryId = '';

    const subscription = this.route.params.pipe(
      switchMap(({ subcategoryId, goodsItemId }) => {
        currentSubcategoryId = subcategoryId;
        return this.http.get<IGoods>(
          `http://localhost:3004/goods/item/${goodsItemId}`,
        );
      }),
    )
      .subscribe((goodsItem: IGoods) => {
        if (currentSubcategoryId !== goodsItem.subCategory) {
          this.router.navigate(
            ['/', goodsItem.category, goodsItem.subCategory, goodsItem.id],
            { replaceUrl: true },
          );
          return;
        }
        this.category$ = this.store.select(selectCategoryById(goodsItem.category || ''));
        this.subcategory$ = this.store.select(selectSubcategoryById(goodsItem.subCategory || ''));
        this.goodsItem = goodsItem;
        this.ref.detectChanges();
      });
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onTumbsSwiper(tumbsSlider: Swiper) {
    this.tumbsSlider = tumbsSlider;
  }

  onPostersSwiper(postersSlider: Swiper) {
    this.postersSlider = postersSlider;
    this.postersSlider.params.thumbs!.swiper = this.tumbsSlider;
    this.postersSlider.thumbs.init();
  }
}
