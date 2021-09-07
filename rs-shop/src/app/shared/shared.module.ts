import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const materialModules = [ 
  MatSelectModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule,
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
