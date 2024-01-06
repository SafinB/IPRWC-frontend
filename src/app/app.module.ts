import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { PasswordStrengthComponent } from './register/password-strength/password-strength.component';
import { AdminComponent } from './admin/admin.component';
import { ProductCreateComponent } from './admin/product-create/product-create.component';
import { ProductUpdateComponent } from './admin/product-update/product-update.component';
import { ProductsComponent } from './products/products.component';
import { HerobannerComponent } from './herobanner/herobanner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {ToastsContainer} from "./shared/toast/toasts-container.component";
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    PasswordStrengthComponent,
    AdminComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    ProductsComponent,
    HerobannerComponent,
    CartComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ToastsContainer,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
