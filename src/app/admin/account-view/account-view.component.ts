import { Component } from '@angular/core';
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent {

  public users: User[] = [];

  constructor(private userService: UserService,
              ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.users = [];
    this.userService.getAll().subscribe((response) => {
      response.forEach((user: User) => {
        this.users = response;
      })
    })
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers();
    })
  }
}
