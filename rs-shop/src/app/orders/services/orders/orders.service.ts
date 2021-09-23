import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { IAppState } from '@redux/state.model';
import { selectOrders } from '@redux/selectors/user.selectors';

import { MainDbService } from '@core/services/main-db/main-db.service';

import { IOrder } from '@core/models/order.model';

@Injectable()
export class OrdersService {
  orders: IOrder[] = [];

  constructor(
    private mainDBService: MainDbService,
    private store: Store<IAppState>,
  ) { }

  getOrders$(): Observable<IOrder[]> {
    return this.store.select(selectOrders);
  }

  changeOrder(order: IOrder): void {
    this.mainDBService.changeOrder(order);
  }

  deleteOrder(orderId: string): void {
    this.mainDBService.deleteOrder(orderId);
  }
}
