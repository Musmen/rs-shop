import {
  ChangeDetectionStrategy, Component, OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectAllCategories } from '@redux/selectors/categories.selectors';
import { IAppState } from '@redux/state.model';

import { ICategory } from '@core/models/category.model';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPageComponent implements OnInit {
  categories$?: Observable<ICategory[]>;
  currentCategory$?: Observable<ICategory | null>;
  currentCategoryId?: string;

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    console.log('ngOnInit in CategoriesPageComponent****');
    this.categories$ = this.store.select(selectAllCategories);
  }

  setNewCurrentCategory(id: string): void {
    if (!id || this.currentCategoryId === id) return;
    this.currentCategoryId = id;
  }
}
