import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  OnChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectCategoryById } from '@redux/selectors/categories.selectors';
import { IAppState } from '@redux/state.model';

import { ICategory } from '@core/models/category.model';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryInfoComponent implements OnInit, OnDestroy, OnChanges {
  private subscription = new Subscription();
  @Input() categoryId?: string | null;
  category$?: Observable<ICategory | null>;

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit in CategoryInfoComponent');
    if (this.categoryId) {
      this.setCategory(this.categoryId);
    } else {
      const subscription = this.route.params
        .subscribe(({ id }) => this.setCategory(id));
      this.subscription.add(subscription);
    }
  }

  ngOnChanges(): void {
    console.log('ngOnChanges in CategoryInfoComponent');
    if (this.categoryId) this.setCategory(this.categoryId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setCategory(id: string): void {
    if (!id) return;
    console.log('setNewCurrentCategory in CategoryInfoComponent:', id);
    this.categoryId = id;
    if (this.categoryId) this.category$ = this.store.select(selectCategoryById(this.categoryId));
    this.ref.detectChanges();
  }
}
