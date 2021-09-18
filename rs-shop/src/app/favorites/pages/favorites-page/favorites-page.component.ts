import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { FavoritesService } from '@core/services/goods/favorites/favorites.service';

import { IGoods } from '@core/models/goods.model';
import { UserService } from '@app/core/services/user/user.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FavoritesPageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  favoritesGoods$?: Observable<IGoods[]>;

  constructor(
    private favoritesService: FavoritesService,
    private userService: UserService,
    private ref: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const subscription = this.favoritesService.getFavoritesGoods$()
      .subscribe(
        (favoritesGoods$) => {
          this.favoritesGoods$ = favoritesGoods$;
          this.ref.detectChanges();
        },
      );

    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onFavoriteButtonClick(goodsItemId: string): void {
    this.favoritesService.deleteFavoriteGoodsItem(this.userService.getIsUserLogged(), goodsItemId);
  }

  // onCartButtonClick(goodsItemId: string): void {

  // }
}
