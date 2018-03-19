/********************************
 * module used for importing
 * the material design components
 ********************************/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDividerModule, MatListModule, MatButtonModule, MatIconModule,
  MatFormFieldModule, MatInputModule, MatSnackBarModule, MatToolbarModule,
  MatStepperModule, MatSelectModule, MatMenuModule
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
    MatStepperModule,
    MatSelectModule,
    MatMenuModule
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
    MatStepperModule,
    MatSelectModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
