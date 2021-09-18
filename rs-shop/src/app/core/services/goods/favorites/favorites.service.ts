import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { selectFavoritesGoodsIds } from '@redux/selectors/user.selectors';
import {
  setFavoriteGoodsIdsInLoggedUser, setFavoriteGoodsIdsInNotloggedUser,
} from '@redux/actions/user.actions';
import { IAppState } from '@redux/state.model';

import { IGoods } from '@core/models/goods.model';

import { MainDbService } from '@core/services/main-db/main-db.service';
import { IUser } from '@app/core/models/user.model';

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

  getFavoritesGoods$(): Observable<Observable<IGoods[]>> {
    return this.store.select(selectFavoritesGoodsIds)
      .pipe(
        map(
          (favoritesGoodsItemsIds) => forkJoin(
            favoritesGoodsItemsIds.map(
              (favoritesGoodsItemId) => this.mainDbService.getGoodsItem$(favoritesGoodsItemId),
            ),
          ),
        ),
      );
  }

  checkIsGoodsItemInFavorites(goodsItemId: string): boolean {
    return this.favoritesGoodsItemsIds.includes(goodsItemId);
  }

  addFavoriteGoodsItem(isUserLogged: boolean, goodsItemId: string): void {
    this.favoritesGoodsItemsIds = this.favoritesGoodsItemsIds.includes(goodsItemId)
      ? this.favoritesGoodsItemsIds
      : this.favoritesGoodsItemsIds.concat(goodsItemId);

    if (isUserLogged) {
      this.store.dispatch(setFavoriteGoodsIdsInLoggedUser(
        { favoritesGoodsItemsIds: this.favoritesGoodsItemsIds },
      ));
      this.mainDbService.addFavoritesGoodsItem(goodsItemId);
    } else {
      this.store.dispatch(setFavoriteGoodsIdsInNotloggedUser(
        { favoritesGoodsItemsIds: this.favoritesGoodsItemsIds },
      ));
    }
  }

  deleteFavoriteGoodsItem(isUserLogged: boolean, goodsItemId: string): void {
    this.favoritesGoodsItemsIds = this.favoritesGoodsItemsIds.filter(
      (favoritesGoodsItemId) => favoritesGoodsItemId !== goodsItemId,
    );

    if (isUserLogged) {
      this.store.dispatch(setFavoriteGoodsIdsInLoggedUser(
        { favoritesGoodsItemsIds: this.favoritesGoodsItemsIds },
      ));
      this.mainDbService.deleteFavoritesGoodsItem(goodsItemId);
    } else {
      this.store.dispatch(setFavoriteGoodsIdsInNotloggedUser(
        { favoritesGoodsItemsIds: this.favoritesGoodsItemsIds },
      ));
    }
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

  updateNotLoggedUserFavorites(): void {
    this.store.dispatch(setFavoriteGoodsIdsInNotloggedUser(
      { favoritesGoodsItemsIds: this.favoritesGoodsItemsIds },
    ));
  }
}
