import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { selectCartGoodsIds } from '@redux/selectors/user.selectors';
import { setCartGoodsIds } from '@redux/actions/user.actions';
import { IAppState } from '@redux/state.model';

import { MainDbService } from '@core/services/main-db/main-db.service';

import { getUniqueItemsList } from '@common/helpers';
import { IGoods } from '@core/models/goods.model';
import { IUser } from '@core/models/user.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartGoodsItemsIds: string[] = [];

  constructor(
    private store: Store<IAppState>,
    private mainDbService: MainDbService,
  ) {
    this.store.select(selectCartGoodsIds).subscribe(
      (cartGoodsItemsIds) => {
        this.cartGoodsItemsIds = cartGoodsItemsIds;
      },
    );
  }

  getCartGoods$(): Observable<IGoods[]> {
    return this.store.select(selectCartGoodsIds)
      .pipe(
        switchMap((cartGoodsIds) => {
          if (!cartGoodsIds.length) return of([]);
          return forkJoin(
            cartGoodsIds.map(
              (cartGoodsItemId) => this.mainDbService.getGoodsItem$(cartGoodsItemId),
            ),
          );
        }),
      );
  }

  checkIsGoodsItemInCart(goodsItemId: string): boolean {
    return this.cartGoodsItemsIds.includes(goodsItemId);
  }

  addCartGoodsItem(isUserLogged: boolean, goodsItemId: string): void {
    this.cartGoodsItemsIds = this.cartGoodsItemsIds.includes(goodsItemId)
      ? this.cartGoodsItemsIds
      : this.cartGoodsItemsIds.concat(goodsItemId);

    this.store.dispatch(setCartGoodsIds(
      { cartGoodsItemsIds: this.cartGoodsItemsIds },
    ));
    if (isUserLogged) this.mainDbService.addCartGoodsItem(goodsItemId);
  }

  deleteCartGoodsItem(isUserLogged: boolean, goodsItemId: string): void {
    this.cartGoodsItemsIds = this.cartGoodsItemsIds.filter(
      (cartGoodsItemId) => cartGoodsItemId !== goodsItemId,
    );

    this.store.dispatch(setCartGoodsIds(
      { cartGoodsItemsIds: this.cartGoodsItemsIds },
    ));
    if (isUserLogged) this.mainDbService.deleteCartGoodsItem(goodsItemId);
  }

  getUserUpdatedCart(loggedUser: IUser): string[] {
    this.cartGoodsItemsIds.forEach(
      (cartGoodsItemId) => {
        if (!loggedUser.cart.includes(cartGoodsItemId)) {
          this.mainDbService.addCartGoodsItem(cartGoodsItemId);
        }
      },
    );

    return getUniqueItemsList(this.cartGoodsItemsIds, loggedUser.cart);
  }
}
