import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { detectLocation, setNewLocation } from '@app/redux/actions/state.actions';
import { updateCategories } from '@app/redux/actions/categories.actions';
import { selectLocation } from '@app/redux/selectors/state.selectors';
import { selectAllCategories } from '@app/redux/selectors/categories.selectors';
import { IAppState } from '@app/redux/state.model';

import { ICategory } from '@app/core/models/category.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  location$?: Observable<string>;
  categories$?: Observable<ICategory[]>;

  constructor(private store: Store<IAppState>, private router: Router) {
    this.store.dispatch(detectLocation());
    this.store.dispatch(updateCategories());
  }

  ngOnInit(): void {
    this.location$ = this.store.select(selectLocation);
    this.categories$ = this.store.select(selectAllCategories);
  }

  changeLocation(newLocation: string | null): void {
    if (!newLocation) return;
    this.store.dispatch(setNewLocation({ newLocation }));
  }

  onCategoryClick(categoryId: string): void {
    this.router.navigate(['/categories', categoryId]);
  }

  onCatalogButtonClick(): void {
    this.router.navigate(['/categories']);
  }

  goToMainPage(): void {
    this.router.navigate(['/main']);
  }
}
