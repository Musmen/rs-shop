import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IGoods } from '@core/models/goods.model';

import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { selectPopularGoods, selectPromoGoods } from '@redux/selectors/goods.selectors';
import { IAppState } from '@redux/state.model';

import { MainDbService } from '@core/services/main-db/main-db.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  promoGoods$?: Observable<IGoods[]>;
  popularGoods$?: Observable<IGoods[]>;

  constructor(
    private store: Store<IAppState>,
    private mainDBService: MainDbService,
  ) { }

  ngOnInit(): void {
    this.promoGoods$ = this.store.select(selectPromoGoods).pipe(
      switchMap(
        (promoGoods) => forkJoin(
          promoGoods.map(
            (promoGoodsItemId) => this.mainDBService.getGoodsItem$(promoGoodsItemId),
          ),
        ),
      ),
    );

    this.popularGoods$ = this.store.select(selectPopularGoods).pipe(
      switchMap(
        (popularGoods) => forkJoin(
          popularGoods.map(
            (popularGoodsItemId) => this.mainDBService.getGoodsItem$(popularGoodsItemId),
          ),
        ),
      ),
    );
  }
}
