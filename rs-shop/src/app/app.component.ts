import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { IAppState } from './redux/state.model';
import { selectAllCategories } from './redux/selectors/categories.selectors';
import { updateCategories } from './redux/actions/categories.actions';

import { ICategoryWithSubCategories } from './redux/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit { 
  categories$?: Observable<ICategoryWithSubCategories[]>;

  constructor(private store: Store<IAppState>) { 
    this.store.dispatch(updateCategories());
  }

  ngOnInit(): void {
    this.categories$ = this.store.select(selectAllCategories);
  }
}
