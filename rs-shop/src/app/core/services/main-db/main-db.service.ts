import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MAIN_DB_API_URL } from '@common/constants';
import { IGoods } from '@core/models/goods.model';
import {
  ICredentials, ILoginCredentials, IToken, IUser,
} from '@app/core/models/user.model';
import { ICategory } from '@app/core/models/category.model';

@Injectable({ providedIn: 'root' })
export class MainDbService {
  searchResultsGoods: IGoods[] = [];

  constructor(private http: HttpClient) { }

  private fetchSearchResultsGoods$(searchValue: string): Observable<IGoods[]> {
    const URL_FOR_SEARCH_GOODS: string = `${MAIN_DB_API_URL.SEARCH_GOODS}${searchValue}`;
    return this.http.get<IGoods[]>(URL_FOR_SEARCH_GOODS);
  }

  getSearchGoodsResults$(searchValue: string): Observable<IGoods[]> {
    return this.fetchSearchResultsGoods$(searchValue)
      .pipe(
        catchError(
          () => of(this.searchResultsGoods),
        ),
      );
  }

  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(MAIN_DB_API_URL.CATEGORIES);
  }

  registerUser$(userCredentials: ICredentials): Observable<IToken> {
    return this.http.post<IToken>(MAIN_DB_API_URL.REGISTER, userCredentials);
  }

  loginUser$(userCredentials: ILoginCredentials): Observable<IToken> {
    return this.http.post<IToken>(MAIN_DB_API_URL.LOGIN, userCredentials);
  }

  fetchUserInfo$(userToken: string): Observable<IUser> {
    return this.http.get<IUser>(
      MAIN_DB_API_URL.USER_INFO,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      },
    );
  }
}
