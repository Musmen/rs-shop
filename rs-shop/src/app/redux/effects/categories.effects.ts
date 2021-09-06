import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { updateCategories, updateCategoriesFailed, updateCategoriesSuccessfully } from '../actions/categories.actions';

import { ICategoryWithSubCategories } from '../models';
// Необходим сервис отдельный на запросы к основному АПИ!!!!!!!!!
@Injectable({ providedIn: 'any' })
export class CategoriesEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  getCategories$: Observable<Action> = createEffect(() => this.actions$
    .pipe(
      ofType(updateCategories.type),
      switchMap(() => this.http.get<ICategoryWithSubCategories[]>('http://localhost:3004/categories')
        .pipe(
          map(
            (categories: ICategoryWithSubCategories[]) => updateCategoriesSuccessfully({ categories }),
          ),
        )),
      catchError(() => of(updateCategoriesFailed())),
    ),
  );
}