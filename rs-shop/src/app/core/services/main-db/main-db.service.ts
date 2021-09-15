import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { getParsedYoutubeResponse, getYouTubeResponseItemsIdsList } from '@youtube/common/tools';
// import SearchResultsItem from '@core/models/cards/search-results-item.model';
// import YoutubeResponse from '@youtube/models/youtube-response/youtube-response.model';
import { MAIN_DB_API_URL } from '@common/constants';
import { IGoods } from '@app/core/models/goods.model';

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
}
