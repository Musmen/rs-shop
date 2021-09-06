import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

const materialModules = [ 
  MatSelectModule, MatIconModule,
];    

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ...materialModules,
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ...materialModules,
  ],
})
export class SharedModule { }
