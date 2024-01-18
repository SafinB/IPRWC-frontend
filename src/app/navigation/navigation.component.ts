import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {AuthService} from "../shared/services/auth.Service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{

  isLoggedIn: boolean = false;
  isAdmin?: boolean = false;
  user?: string = this.userService.getUser()?.name;

  constructor(private authService: AuthService,
              private userService: UserService) {}

  ngOnInit(): void {
      if (this.userService.getUser() !== null && this.userService.getUser() !== undefined) {
        this.isAdmin = this.userService.getUser()?.role;
      }
  }

  userLoggedIn() {
    this.isLoggedIn = this.authService.userLoggedIn();
    return this.isLoggedIn;
  }

  UserLogout() {
    this.authService.logout();
  }
}
