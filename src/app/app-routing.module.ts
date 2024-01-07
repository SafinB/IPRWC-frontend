import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProductsComponent} from "./products/products.component";
import {HerobannerComponent} from "./herobanner/herobanner.component";
import {CartComponent} from "./cart/cart.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HerobannerComponent},
  {path: 'login', component: LoginComponent, data: { animation: 'openClosePage' }},
  {path: 'register', component: RegisterComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
