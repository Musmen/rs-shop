import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { IAppState } from './redux/state.model';
import { selectAllCategories } from './redux/selectors/categories.selectors';
import { updateCategoriesSuccessfully } from './redux/actions/categories.actions';

import { ICategoryWithSubCategories } from './redux/models';
import categories from './mock-data/categories';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit { 
  categories$?: Observable<ICategoryWithSubCategories[]>;

  constructor(private http: HttpClient, private store: Store<IAppState>) { 
    this.store.dispatch(updateCategoriesSuccessfully({ categories }));
  }

  ngOnInit(): void {
    this.categories$ = this.store.select(selectAllCategories);
  }
}
