import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthGuard} from "../auth/auth.guard";
import {AdminGuard} from "../shared/services/Admin.guard";
import {AdminComponent} from "./admin.component";
import {SharedModule} from "../shared/Shared.module";
import {ProductViewComponent} from "./product-view/product-view.component";
import {ProductCreateComponent} from "./product-view/product-create/product-create.component";
import {ProductUpdateComponent} from "./product-view/product-update/product-update.component";
import {PromoViewComponent} from "./promo-view/promo-view.component";
import {PromoCreateComponent} from "./promo-view/promo-create/promo-create.component";
import {AccountViewComponent} from "./account-view/account-view.component";
import {ToastsContainer} from "../shared/toast/toasts-container.component";

@NgModule({
    declarations: [
        AdminComponent,
        ProductViewComponent,
        ProductCreateComponent,
        ProductUpdateComponent,
        PromoViewComponent,
        PromoCreateComponent,
        AccountViewComponent,
    ],
    imports: [
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: '', component: AdminComponent, canActivate: [AuthGuard, AdminGuard]},
            {path: 'product-view', component: ProductViewComponent, canActivate: [AuthGuard, AdminGuard]},
            {path: 'product-create', component: ProductCreateComponent, canActivate: [AuthGuard, AdminGuard]},
            {path: 'product-update/:id', component: ProductUpdateComponent, canActivate: [AuthGuard, AdminGuard]},
            {path: 'promocode-view', component: PromoViewComponent, canActivate: [AuthGuard, AdminGuard]},
            {path: 'promocode-create', component: PromoCreateComponent, canActivate: [AuthGuard, AdminGuard]},
            {path: 'user-view', component: AccountViewComponent, canActivate: [AuthGuard, AdminGuard]},
        ]),
        ToastsContainer
    ],
    exports: [
        AdminComponent,
        ProductViewComponent,
        ProductCreateComponent,
        ProductUpdateComponent,
        PromoViewComponent,
        PromoCreateComponent,
        AccountViewComponent,
    ]
})

export class AdminModule {
}
