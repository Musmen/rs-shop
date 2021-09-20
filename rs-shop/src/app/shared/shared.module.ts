import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  GoodsItemMinimalCardComponent,
} from './components/goods-item-minimal-card/goods-item-minimal-card.component';

const materialModules = [
  MatSelectModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule,
];

@NgModule({
  declarations: [
    GoodsItemMinimalCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    ...materialModules,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    ...materialModules,
    GoodsItemMinimalCardComponent,
  ],
})
export class SharedModule { }
