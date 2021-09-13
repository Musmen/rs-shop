import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { IAppState } from '@redux/state.model';
import { selectCategoryById, selectSubcategoryById } from '@redux/selectors/categories.selectors';

import { ICategory } from '@core/models/category.model';

@Component({
  selector: 'app-subcategory-page',
  templateUrl: './subcategory-page.component.html',
  styleUrls: ['./subcategory-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcategoryPageComponent implements OnInit {
  category$!: Observable<ICategory | null>;
  subcategory$!: Observable<ICategory | null>;

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const { categoryId, subcategoryId } = this.route.snapshot.params;
    this.category$ = this.store.select(selectCategoryById(categoryId));
    this.subcategory$ = this.store.select(selectSubcategoryById(subcategoryId));
  }
}
