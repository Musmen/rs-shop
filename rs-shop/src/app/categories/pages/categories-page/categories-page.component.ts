import {
  ChangeDetectionStrategy, Component, OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectAllCategories } from '@redux/selectors/categories.selectors';
import { IAppState } from '@redux/state.model';

import { CATEGORIES_ID_TO_ICONS } from '@app/categories/common/constants';
import { ICategory } from '@core/models/category.model';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPageComponent implements OnInit {
  ICONS = CATEGORIES_ID_TO_ICONS;

  categories$?: Observable<ICategory[]>;
  currentCategoryId?: string;

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.categories$ = this.store.select(selectAllCategories);
  }

  setNewCurrentCategory(id: string): void {
    if (!id || this.currentCategoryId === id) return;
    this.currentCategoryId = id;
  }
}
