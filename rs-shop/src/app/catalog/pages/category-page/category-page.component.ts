import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { IAppState } from '@redux/state.model';
import { selectCategoryById } from '@redux/selectors/categories.selectors';

import { ICategory } from '@core/models/category.model';
import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  category$?: Observable<ICategory | null>;
  goods$?: Observable<IGoods[]>;

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private http: HttpClient,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    const subscription = this.route.params.subscribe(({ categoryId }) => {
      this.category$ = this.store.select(selectCategoryById(categoryId));
      this.goods$ = this.http.get<IGoods[]>(`http://localhost:3004/goods/category/${categoryId}`);
      this.ref.detectChanges();
    });

    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
