import {
  ChangeDetectionStrategy, Component, OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import { FavoritesService } from '@core/services/goods/favorites/favorites.service';
import { UserService } from '@core/services/user/user.service';

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
  ) { }

  ngOnInit(): void {
    this.favoritesGoods$ = this.favoritesService.getFavoritesGoods$();
  }

  onFavoriteButtonClick(goodsItemId: string): void {
    this.favoritesService.deleteFavoriteGoodsItem(this.userService.getIsUserLogged(), goodsItemId);
  }

  // onCartButtonClick(goodsItemId: string): void {

  // }
}
