import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutComponent implements OnInit {

  @Input()
  menu = true;
  @Input()
  padding = '5px';

  constructor() {
  }

  ngOnInit() {
  }

}
