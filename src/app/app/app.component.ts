import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {OnLineAction} from '@app/app/state/app-actions';
import {Store} from '@ngxs/store';
import {merge, Observable} from 'rxjs';
import {fromEvent} from 'rxjs/internal/observable/fromEvent';
import {Observer} from 'rxjs/internal/types';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {


  constructor(private swUpdate: SwUpdate, private store: Store) {

  }


  public ngOnDestroy() {

  }

  public ngOnInit(): void {

    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

        if (confirm('New version available. Load New Version?')) {

          window.location.reload();
        }
      });
    }
    this.createOnline$().subscribe(
      isOnline =>
        this.store.dispatch(new OnLineAction(isOnline)));
  }

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }

}
