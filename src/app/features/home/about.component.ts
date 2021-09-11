import {Component, OnDestroy, OnInit} from '@angular/core';
import {MyAccountService} from '@app/features/qcm-rest-api/services/my-account.service';
import {Subscription} from 'rxjs';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {


  public title;

  private subscription: Subscription;

  constructor(private userService: MyAccountService) {

    const MESSAGE = 'Welcome to Open QCM  ';

    this.title = MESSAGE;

    // this.subscription = this.userService.getCurrentUser()
    //   .subscribe((user) => {
    //       if (user) {
    //         this.title = 'Welcome ' + user.user_name + ' to Open QCM ';
    //       }
    //     },
    //     (error) => {
    //       this.title = MESSAGE;
    //     }
    //   )

  }

  ngOnInit() {

  }

  public ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    // this.subscription.unsubscribe();
  }

}
