import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../shared/services/auth.Service";
import {ToastService} from "../shared/toast/toast-services"


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  passwordVisibility: boolean = false;
  passwordIsValid = false;


  userRegisterForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    name: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  createUser(): void {
    this.toastService.show('We zijn bezig met het maken van een account!', {
      classname: 'bg-info text-light', delay: 2000
    });

    const name: string = this.userRegisterForm.value["name"] ?? '';
    const email: string = this.userRegisterForm.value["email"] ?? '';
    const password: string = this.userRegisterForm.value["password"] ?? '';
    console.log(name);

    this.authService.registerHandler(name, email, password).subscribe({
        next: () => {
          this.toastService.show('Gebruiker met succes aangemaakt!', {classname: 'bg-success text-light', delay: 2000});
          this.userRegisterForm.reset();
        },
        error: (message) => {
          this.toastService.show(message, {classname: 'bg-danger text-light', delay: 2000});
        }
      }
    );
  }

  passwordValid(event: boolean) {
    this.passwordIsValid = event;
  }

  public onChangePassword(): void {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
