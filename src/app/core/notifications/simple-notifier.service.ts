import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class NotifierService {

  constructor(private matSnackBar: MatSnackBar) {
  }

  public notifyInfo(message: string, timeOut: number = 0) {
     this.matSnackBar.open(message, '', {duration: timeOut});
  }

  public notifySuccess(message: string, timeOut: number = 0) {
    if (timeOut > 0) {
      this.matSnackBar.open(message, 'Ok', {duration: timeOut});
    } else {
      this.matSnackBar.open(message, 'Ok');
    }
  }

  public notifyError(message: string, action?: string, duration?: number): MatSnackBarRef<SimpleSnackBar> {

    const config = new MatSnackBarConfig();
    config.duration = duration ? duration : 0;

    return this.matSnackBar.open(message, action, config);

  }


}
