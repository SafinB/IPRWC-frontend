import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastsContainer} from "../shared/toast/toasts-container.component";
import {SharedModule} from "../shared/Shared.module";
import {RegisterComponent} from "./register/register.component";
import {PasswordStrengthComponent} from "./register/password-strength/password-strength.component";


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        PasswordStrengthComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {path: '', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
        ]),
        ReactiveFormsModule,
        ToastsContainer,
        FormsModule
    ],
    exports: [
        LoginComponent,
        RegisterComponent,
        PasswordStrengthComponent,
    ]
})
export class AuthModule { }
