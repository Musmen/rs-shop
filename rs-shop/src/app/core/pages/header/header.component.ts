import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild,
} from '@angular/core';

import {
  BehaviorSubject, combineLatest, Observable, Subscription,
} from 'rxjs';
import {
  debounceTime, distinctUntilChanged, filter, switchMap,
} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { detectLocation, setNewLocation } from '@redux/actions/state.actions';
import { updateCategories } from '@redux/actions/categories.actions';
import { selectLocation } from '@redux/selectors/state.selectors';
import { selectAllCategories } from '@redux/selectors/categories.selectors';
import { IAppState } from '@redux/state.model';

import { MainDbService } from '@core/services/main-db/main-db.service';

import { ICategory } from '@core/models/category.model';
import { IGoods } from '@core/models/goods.model';
import { ISearchedCategory } from '@core/models/searched-category.model';

import { getSearchedCategories } from '@common/helpers';
import { DEBOUNCE_TIME_IN_MS, MIN_SEARCH_VALUE_LENGTH } from '@common/constants';

import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('myDrop') dropDown!: NgbDropdown;

  private subscriptions = new Subscription();

  location$?: Observable<string>;
  categories$?: Observable<ICategory[]>;

  searchValue$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchGoodsResults$?: Observable<IGoods[]>;

  searchedCategories?: ISearchedCategory[];
  searchedGoods?: IGoods[];

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private mainDb: MainDbService,
    private ref: ChangeDetectorRef,
  ) {
    this.store.dispatch(detectLocation());
    this.store.dispatch(updateCategories());
  }

  ngOnInit(): void {
    this.location$ = this.store.select(selectLocation);
    this.categories$ = this.store.select(selectAllCategories);

    this.searchGoodsResults$ = this.getSearchValue$().pipe(
      switchMap(
        (searchValue: string) => this.mainDb.getSearchGoodsResults$(searchValue),
      ),
    );

    const subscription = combineLatest([this.categories$, this.searchGoodsResults$])
      .subscribe(
        ([categories, searchGoodsResults]) => {
          this.searchedCategories = getSearchedCategories(categories, this.searchValue$.getValue());
          this.searchedGoods = searchGoodsResults;
          this.dropDown.open();
          this.ref.detectChanges();
        },
      );
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getSearchValue$(): Observable<string> {
    return this.searchValue$.asObservable()
      .pipe(
        debounceTime(DEBOUNCE_TIME_IN_MS),
        distinctUntilChanged(),
        filter(
          (searchValue: string) => Boolean(
            searchValue.length >= MIN_SEARCH_VALUE_LENGTH,
          ),
        ),
      );
  }

  setSearchValue(searchValue: string): void {
    this.searchValue$.next(searchValue);
  }

  changeLocation(newLocation: string | null): void {
    if (!newLocation) return;
    this.store.dispatch(setNewLocation({ newLocation }));
  }

  onRouterLinkClick(categoryId: string, subcategoryId?: string, goodsItemId?: string): void {
    if (goodsItemId) {
      this.router.navigate(['/', categoryId, subcategoryId, goodsItemId]);
      return;
    }

    if (subcategoryId) {
      this.router.navigate(['/', categoryId, subcategoryId]);
      return;
    }

    this.router.navigate(['/', categoryId]);
  }

  onCatalogButtonClick(): void {
    this.router.navigate(['']);
  }

  goToMainPage(): void {
    this.router.navigate(['/main']);
  }
}
