import { Component, OnInit } from '@angular/core';
import {User} from '../../../api/model/user.model';
import {UserGuardService} from '../../../core/user-guard.service';

@Component({
  selector: 'app-user-menu-item',
  templateUrl: './user-menu-item.component.html',
  styleUrls: ['./user-menu-item.component.scss']
})
export class UserMenuItemComponent implements OnInit {

  constructor(private userGuardService: UserGuardService) { }

  ngOnInit() {
  }

  public getUser(): User {
    return  this.userGuardService.getUser();
  }

}