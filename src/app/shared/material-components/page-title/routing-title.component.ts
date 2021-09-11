import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import {filter, map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-routing-title',
  templateUrl: './routing-title.component.html',
  styleUrls: ['./routing-title.component.scss']
})

export class RoutingTitleComponent implements OnInit {

  pageTitle: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private logger: NGXLogger) {

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data))
      .subscribe((event) => {
        if (event) {
          // console.log('NavigationEnd:', event);
          this.pageTitle = event.pageTitle;
        }
      });
  }

  ngOnInit(): void {

  }


}
