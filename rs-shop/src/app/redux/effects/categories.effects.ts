import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { MainDbService } from '@core/services/main-db/main-db.service';
import { ICategory } from '@core/models/category.model';

import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  updateCategories, updateCategoriesFailed, updateCategoriesSuccessfully,
} from '../actions/categories.actions';

@Injectable({ providedIn: 'any' })
export class CategoriesEffects {
  constructor(private actions$: Actions, private mainDBService: MainDbService) {}

  getCategories$: Observable<Action> = createEffect(() => this.actions$
    .pipe(
      ofType(updateCategories.type),
      switchMap(() => this.mainDBService.getAllCategories$()
        .pipe(
          map(
            (categories: ICategory[]) => updateCategoriesSuccessfully({ categories }),
          ),
        )),
      catchError(() => of(updateCategoriesFailed())),
    ));
}
