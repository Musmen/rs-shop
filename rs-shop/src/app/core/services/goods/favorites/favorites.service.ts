import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { selectFavoritesGoodsIds } from '@redux/selectors/user.selectors';
import { setFavoriteGoodsIdsInLoggedUser } from '@redux/actions/user.actions';
import { IAppState } from '@redux/state.model';

import { MainDbService } from '@core/services/main-db/main-db.service';

import { IGoods } from '@core/models/goods.model';
import { IUser } from '@core/models/user.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  favoritesGoodsItemsIds: string[] = [];

  constructor(
    private store: Store<IAppState>,
    private mainDbService: MainDbService,
  ) {
    this.store.select(selectFavoritesGoodsIds).subscribe(
      (favoritesGoodsItemsIds) => {
        this.favoritesGoodsItemsIds = favoritesGoodsItemsIds;
      },
    );
  }

  getFavoritesGoods$(): Observable<IGoods[]> {
    return this.store.select(selectFavoritesGoodsIds)
      .pipe(
        switchMap((favoritesGoodsIds) => {
          if (!favoritesGoodsIds.length) return of([]);
          return forkJoin(
            favoritesGoodsIds.map(
              (favoritesGoodsItemId) => this.mainDbService.getGoodsItem$(favoritesGoodsItemId),
            ),
          );
        }),
      );
  }

  checkIsGoodsItemInFavorites(goodsItemId: string): boolean {
    return this.favoritesGoodsItemsIds.includes(goodsItemId);
  }

  addFavoriteGoodsItem(isUserLogged: boolean, goodsItemId: string): void {
    this.favoritesGoodsItemsIds = this.favoritesGoodsItemsIds.includes(goodsItemId)
      ? this.favoritesGoodsItemsIds
      : this.favoritesGoodsItemsIds.concat(goodsItemId);

    this.store.dispatch(setFavoriteGoodsIdsInLoggedUser(
      { favoritesGoodsItemsIds: this.favoritesGoodsItemsIds },
    ));
    if (isUserLogged) this.mainDbService.addFavoritesGoodsItem(goodsItemId);
  }

  deleteFavoriteGoodsItem(isUserLogged: boolean, goodsItemId: string): void {
    this.favoritesGoodsItemsIds = this.favoritesGoodsItemsIds.filter(
      (favoritesGoodsItemId) => favoritesGoodsItemId !== goodsItemId,
    );

    this.store.dispatch(setFavoriteGoodsIdsInLoggedUser(
      { favoritesGoodsItemsIds: this.favoritesGoodsItemsIds },
    ));
    if (isUserLogged) this.mainDbService.deleteFavoritesGoodsItem(goodsItemId);
  }

  getUserUpdatedFavorites(loggedUser: IUser): string[] {
    this.favoritesGoodsItemsIds.forEach(
      (favoritesGoodsItemId) => {
        if (!loggedUser.favorites.includes(favoritesGoodsItemId)) {
          this.mainDbService.addFavoritesGoodsItem(favoritesGoodsItemId);
        }
      },
    );

    return Array.from(new Set([...this.favoritesGoodsItemsIds, ...loggedUser.favorites]));
  }
}
