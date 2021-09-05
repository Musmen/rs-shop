import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { updateCategories, updateCategoriesSuccessfully } from '../actions/categories.actions';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ICategoryWithSubCategories } from '../models';
import { Action } from '@ngrx/store';


@Injectable({ providedIn: 'any' })
export class CategoriesEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  getCategories$: Observable<Action> = createEffect(() => this.actions$
    .pipe(
      ofType(updateCategories.type),
      switchMap(() => this.http.get<ICategoryWithSubCategories[]>('http://localhost:3004/categories').pipe(
        map(
          (categories) => updateCategoriesSuccessfully({ categories }),
        ),
      )),
    ),
  );
}