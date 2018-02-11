/********************************
 * module used for importing
 * the material design components
 ********************************/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDividerModule, MatListModule, MatButtonModule, MatIconModule,
  MatFormFieldModule, MatInputModule, MatSnackBarModule, MatToolbarModule,
  MatStepperModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatStepperModule
  ],
  exports: [
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatStepperModule
  ]
})
export class MaterialModule { }
