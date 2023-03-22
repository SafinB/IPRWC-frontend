import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ServicesComponent } from './services/services.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { PasswordStrengthComponent } from './register/password-strength/password-strength.component';
import { AdminComponent } from './admin/admin.component';
import { ProductCreateComponent } from './admin/product-create/product-create.component';
import { ProductUpdateComponent } from './admin/product-update/product-update.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    ServicesComponent,
    PasswordStrengthComponent,
    AdminComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    ProductsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatInputModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
