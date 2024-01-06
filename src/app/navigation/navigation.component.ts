import { Component } from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {AuthService} from "../shared/services/auth.Service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  collapsed: boolean = true;

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  user?: string = this.userService.getUser()?.fullName;

  constructor(private authService: AuthService,
              private userService: UserService) {}

  userLoggedIn() {
    this.isLoggedIn = this.authService.userLoggedIn();
    return this.isLoggedIn;
  }

  UserLogout() {
    this.authService.logout();
  }
}
