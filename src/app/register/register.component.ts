import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../shared/services/auth.Service";
import {ToastService} from "../shared/toast/toast-services";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  passwordVisibility: boolean = false;

  userCreateForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    fullName: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    userCreateRole: new FormControl(null, Validators.required)
  })

  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  createUser(): void {
    this.toastService.show('We zijn bezig met het maken !', {
      classname: 'bg-info text-light', delay: 3000
    });
    let user = {
      fullName: this.userCreateForm.value["fullName"],
      email: this.userCreateForm.value["email"],
      password: this.userCreateForm.value["password"],
      role: this.userCreateForm.value["userCreateRole"],
    }
    this.authService.registerHandler(user).subscribe({
        next: () => {
          this.toastService.show('User created succesfully!', {classname: 'bg-success text-light', delay: 3000});
          this.userCreateForm.reset();
        },
        error: (message) => {
          this.toastService.show(message, {classname: 'bg-danger text-light', delay: 3000});
        }
      }
    );
  }

  public onChangePassword(): void {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
