import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.Service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  passwordVisibility: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  loginForm: FormGroup = new FormGroup({});


  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern(
          /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/
        ),
      ]),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(false),
    });
  }

  loginUser() {
    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];

    this.authService.login(email, password).subscribe({
      next: (response) => {

      }
    })
  }

  public onChangePassword(): void {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
