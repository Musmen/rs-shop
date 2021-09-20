import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IOrderDetails } from '@app/core/models/order.model';
import { DEFAULT_ORDER } from '@common/constants';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartFormComponent implements OnInit {
  cartForm!: FormGroup;
  orderDetails: IOrderDetails = DEFAULT_ORDER.details;

  ngOnInit(): void {
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
  }

  dateValidator(control: FormControl): { 'dateToDeliver': boolean } | null {
    const deliverTimeInMilliseconds = new Date(control.value).getTime();
    const timeNowInMilliseconds = new Date().getTime();
    if (deliverTimeInMilliseconds < timeNowInMilliseconds) {
      return { dateToDeliver: true };
    }
    return null;
  }

  approveOrder(): void {

  }

  cartFormSubmit(): void {
    // this.loginService.logIn();
    // {
    //   login: this.loginForm.controls.login.value,
    //   password: this.loginForm.controls.password.value,
    // });
  }
}
