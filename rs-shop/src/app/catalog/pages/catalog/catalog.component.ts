import {
  ChangeDetectionStrategy, Component, OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectAllCategories, selectCategoryById } from '@redux/selectors/categories.selectors';
import { IAppState } from '@redux/state.model';

import { CATEGORIES_ID_TO_ICONS } from '@catalog/common/constants';
import { ICategory } from '@core/models/category.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit {
  ICONS = CATEGORIES_ID_TO_ICONS;

  categories$?: Observable<ICategory[]>;
  currentCategory$?: Observable<ICategory | null>;
  currentCategoryId?: string;

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.categories$ = this.store.select(selectAllCategories);
  }

  setNewCurrentCategory(id: string): void {
    if (!id || this.currentCategoryId === id) return;
    this.currentCategoryId = id;
    this.currentCategory$ = this.store.select(selectCategoryById(id));
  }
}
