import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy, Component, EventEmitter,
  Input, OnDestroy, OnInit, Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { IOrderDetails } from '@core/models/order.model';
import { DEFAULT_ORDER } from '@common/constants';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartFormComponent implements OnInit, OnDestroy {
  @Input() defaultCity$?: Observable<string> | null;
  @Output() cartFormSubmitEvent = new EventEmitter<IOrderDetails>();
  @Output() changeDeliverDataEvent = new EventEmitter<string>();

  private subscriptions = new Subscription();

  cartForm!: FormGroup;
  orderDetails!: IOrderDetails;

  ngOnInit(): void {
    this.orderDetails = { ...DEFAULT_ORDER.details };

    this.cartForm = new FormGroup({
      name: new FormControl(this.orderDetails.name, [
        Validators.required, Validators.minLength(3), Validators.maxLength(50),
      ]),
      address: new FormControl(this.orderDetails.address, [
        Validators.required, Validators.minLength(3), Validators.maxLength(250),
      ]),
      phone: new FormControl(this.orderDetails.phone, [
        Validators.required, Validators.pattern('[+][0-9]*'),
      ]),
      dateToDeliver: new FormControl(this.orderDetails.dateToDeliver, [
        Validators.required, this.dateValidator,
      ]),
      timeToDeliver: new FormControl(this.orderDetails.timeToDeliver, Validators.required),
      comment: new FormControl(this.orderDetails.comment, [Validators.maxLength(250)]),
    });

    const dateToDeliverSubscription = this.cartForm.controls.dateToDeliver.valueChanges
      .subscribe(
        () => this.changeDeliverData(),
      );
    this.subscriptions.add(dateToDeliverSubscription);

    const timeToDeliverSubscription = this.cartForm.controls.timeToDeliver.valueChanges
      .subscribe(
        () => this.changeDeliverData(),
      );
    this.subscriptions.add(timeToDeliverSubscription);

    const defaultCitySubscription = this.defaultCity$!
      .subscribe(
        (location) => {
          this.orderDetails = { ...this.orderDetails, address: `${location}, ` };
          this.cartForm.controls.address.setValue(`${location}, `);
        },
      );
    this.subscriptions.add(defaultCitySubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  dateValidator(control: FormControl): { 'dateToDeliver': boolean } | null {
    const deliverTimeInMilliseconds = new Date(control.value).getTime();
    const timeNowInMilliseconds = new Date().getTime();
    if (deliverTimeInMilliseconds < timeNowInMilliseconds) {
      return { dateToDeliver: true };
    }
    return null;
  }

  onCartFormSubmit(): void {
    this.orderDetails = {
      name: this.cartForm.controls.name.value,
      address: this.cartForm.controls.address.value,
      phone: this.cartForm.controls.phone.value,
      timeToDeliver: `${this.cartForm.controls.dateToDeliver.value} ${this.cartForm.controls.timeToDeliver.value}`,
      comment: this.cartForm.controls.comment.value,
    };

    this.cartFormSubmitEvent.emit(this.orderDetails);
  }

  changeDeliverData(): void {
    this.changeDeliverDataEvent.emit(
      `${this.cartForm.controls.dateToDeliver.value} ${this.cartForm.controls.timeToDeliver.value}`,
    );
  }
}
