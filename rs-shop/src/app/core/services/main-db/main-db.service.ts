import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { IAppState } from '@redux/state.model';
import { checkLoginStatus } from '@redux/actions/user.actions';

import { MAIN_DB_API_URL } from '@common/constants';

import { IGoods } from '@core/models/goods.model';
import {
  ICredentials, ILoginCredentials, IToken, IUser,
} from '@core/models/user.model';
import { ICategory } from '@core/models/category.model';
import { IOrder } from '@core/models/order.model';

@Injectable({ providedIn: 'root' })
export class MainDbService {
  private token: string = '';

  searchResultsGoods: IGoods[] = [];

  constructor(private http: HttpClient, private store: Store<IAppState>) { }

  private fetchSearchResultsGoods$(searchValue: string): Observable<IGoods[]> {
    const URL_FOR_SEARCH_GOODS: string = `${MAIN_DB_API_URL.SEARCH_GOODS}${searchValue}`;
    return this.http.get<IGoods[]>(URL_FOR_SEARCH_GOODS);
  }

  private fetchDeleteOrder$(orderId: string): Observable<IOrder> {
    const URL_FOR_DELETE_ORDER: string = `${MAIN_DB_API_URL.ORDER_DELETE}${orderId}`;
    return this.http.delete<IOrder>(
      URL_FOR_DELETE_ORDER,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      },
    );
  }

  private fetchAddOrder$(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(
      MAIN_DB_API_URL.ORDER,
      { ...order },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      },
    );
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  getSearchGoodsResults$(searchValue: string): Observable<IGoods[]> {
    return this.fetchSearchResultsGoods$(searchValue)
      .pipe(
        catchError(
          () => of(this.searchResultsGoods),
        ),
      );
  }

  getGoodsItem$(goodsItemId: string): Observable<IGoods> {
    const URL_FOR_GOODS_ITEM: string = `${MAIN_DB_API_URL.GOODS_ITEM}${goodsItemId}`;
    return this.http.get<IGoods>(URL_FOR_GOODS_ITEM);
  }

  getAllCategories$(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(MAIN_DB_API_URL.CATEGORIES);
  }

  registerUser$(userCredentials: ICredentials): Observable<IToken> {
    return this.http.post<IToken>(MAIN_DB_API_URL.REGISTER, userCredentials);
  }

  loginUser$(userCredentials: ILoginCredentials): Observable<IToken> {
    return this.http.post<IToken>(MAIN_DB_API_URL.LOGIN, userCredentials);
  }

  fetchUserInfo$(): Observable<IUser> {
    return this.http.get<IUser>(
      MAIN_DB_API_URL.USER_INFO,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      },
    );
  }

  deleteFavoritesGoodsItem(favoritesGoodsItemId: string): void {
    const URL_FOR_DELETE_FAVORITES_ITEM: string = `${MAIN_DB_API_URL.FAVORITES_DELETE}${favoritesGoodsItemId}`;
    this.http.delete<IUser>(
      URL_FOR_DELETE_FAVORITES_ITEM,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      },
    ).subscribe();
  }

  addFavoritesGoodsItem(favoritesGoodsItemId: string): void {
    this.http.post<IUser>(
      MAIN_DB_API_URL.FAVORITES,
      { id: favoritesGoodsItemId },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      },
    ).subscribe();
  }

  deleteCartGoodsItem(cartGoodsItemId: string): void {
    const URL_FOR_DELETE_CART_ITEM: string = `${MAIN_DB_API_URL.CART_DELETE}${cartGoodsItemId}`;
    this.http.delete<IUser>(
      URL_FOR_DELETE_CART_ITEM,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      },
    ).subscribe();
  }

  addCartGoodsItem(cartGoodsItemId: string): void {
    this.http.post<IUser>(
      MAIN_DB_API_URL.CART,
      { id: cartGoodsItemId },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      },
    ).subscribe();
  }

  addOrder(order: IOrder): void {
    this.fetchAddOrder$(order).subscribe(
      () => this.store.dispatch(checkLoginStatus()),
    );
  }

  // changeOrder(order: IOrder): void {
  //   this.http.put<IOrder>(
  //     MAIN_DB_API_URL.ORDER,
  //     { ...order },
  //     {
  //       headers: { Authorization: `Bearer ${this.token}` },
  //     },
  //   ).subscribe(
  //     // () => this.store.dispatch(checkLoginStatus()),
  //   );
  // }

  deleteOrder(orderId: string): void {
    this.fetchDeleteOrder$(orderId).subscribe(
      () => this.store.dispatch(checkLoginStatus()),
    );
  }

  changeOrder(order: IOrder): void {
    this.fetchDeleteOrder$(order.id!).pipe(
      switchMap(
        () => this.fetchAddOrder$(order),
      ),
    ).subscribe(
      () => this.store.dispatch(checkLoginStatus()),
    );
  }
}
