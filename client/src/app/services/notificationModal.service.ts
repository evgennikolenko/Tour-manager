import { Injectable } from '@angular/core';
import {MatSnackBar , MatSnackBarConfig, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationModalService {


  constructor( private snackBar: MatSnackBar) {
  }
  message: string = 'Snack Bar opened.';
  actionButtonLabel: string = 'Retry';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 5000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar(message: string, action: string, id?) {

    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    let snackBarRef = this.snackBar.open(message, action ? action: undefined , { ...config, panelClass: 'snackBar-notify'});

  }




}
