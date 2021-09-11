import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Account} from '@app/core/auth/account.model';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent {

  images: any[] = [];
  num = 1;

  // pieChartColors: any[] = [{
  //   backgroundColor: ['#f44336', '#3f51b5', '#ffeb3b', '#4caf50', '#2196f']
  // }];
  //
  // pieOptions: any = {
  //   responsive: true,
  //   legend: {
  //     position: 'right'
  //   }
  // };
  //
  // pieChartLabels: string[] = ['MS Word', 'Typing', 'Sage Pastel'];
  // pieChartData: number[] = [300, 500, 100];
  // pieChartType = 'pie';

  public user: Account;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });

    for (this.num; this.num <= 9; this.num += 1) {
      this.images.push(this.num);
    }
  }
}
