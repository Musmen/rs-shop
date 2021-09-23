import { ActivatedRoute } from '@angular/router';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectCategoryById } from '@redux/selectors/categories.selectors';
import { IAppState } from '@redux/state.model';

import { ICategory } from '@core/models/category.model';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  category$!: Observable<ICategory | null>;

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    const subscription = this.route.params.subscribe(({ categoryId }) => {
      this.category$ = this.store.select(selectCategoryById(categoryId));
      this.ref.detectChanges();
    });
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
