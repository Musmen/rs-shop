import {
  ChangeDetectionStrategy, Component, OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import { FavoritesService } from '@core/services/goods/favorites/favorites.service';
import { UserService } from '@core/services/user/user.service';
import { CartService } from '@core/services/goods/cart/cart.service';

import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPageComponent implements OnInit {
  favoritesGoods$?: Observable<IGoods[]>;

  constructor(
    private favoritesService: FavoritesService,
    private userService: UserService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.favoritesGoods$ = this.favoritesService.getFavoritesGoods$();
  }

  onFavoriteButtonClick(goodsItemId: string): void {
    this.favoritesService.deleteFavoriteGoodsItem(this.userService.getIsUserLogged(), goodsItemId);
  }

  onCartButtonClick(goodsItem: IGoods): void {
    const isUserLogged = this.userService.getIsUserLogged();

    if (goodsItem.isInCart) {
      this.cartService.deleteCartGoodsItem(isUserLogged, goodsItem.id);
    } else {
      this.cartService.addCartGoodsItem(isUserLogged, goodsItem.id);
    }
  }
}
