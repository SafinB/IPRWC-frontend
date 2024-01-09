import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProductsComponent} from "./products/products.component";
import {HerobannerComponent} from "./herobanner/herobanner.component";
import {CartComponent} from "./cart/cart.component";
import {AdminComponent} from "./admin/admin.component";
import {ProductViewComponent} from "./admin/product-view/product-view.component";
import {ProductCreateComponent} from "./admin/product-view/product-create/product-create.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HerobannerComponent},
  {path: 'login', component: LoginComponent, data: { animation: 'openClosePage' }},
  {path: 'register', component: RegisterComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'product-view', component: ProductViewComponent},
  {path: 'product-create', component: ProductCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
