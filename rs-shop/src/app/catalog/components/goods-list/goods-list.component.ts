import {
  ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { IGoods } from '@core/models/goods.model';
import ISortState from '@app/core/models/sort-state.model';
import { initialSortState } from '@common/constants';
import { Store } from '@ngrx/store';
import { IAppState } from '@app/redux/state.model';
import { setNewSortState } from '@app/redux/actions/state.actions';
import { selectSortState } from '@app/redux/selectors/state.selectors';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsListComponent implements OnInit, OnDestroy {
  @Input() goods$?: Observable<IGoods[]>;

  private subscriptions = new Subscription();
  sortState: ISortState = { ...initialSortState };

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    const subscription = this.store.select(selectSortState)
      .subscribe((sortState) => {
        this.sortState = { ...sortState };
      });

    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  changeSortState(newSortingBy: string): void {
    if (this.sortState.sortingBy === newSortingBy) {
      this.sortState.ascending *= -1;
    } else {
      this.sortState.sortingBy = newSortingBy;
    }

    this.store.dispatch(setNewSortState({ newSortState: this.sortState }));
  }
}
