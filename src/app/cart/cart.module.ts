import {NgModule} from "@angular/core";
import {CartComponent} from "./cart.component";
import {SharedModule} from "../shared/Shared.module";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastsContainer} from "../shared/toast/toasts-container.component";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../auth/auth.guard";

@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: '', component: CartComponent, canActivate: [AuthGuard]},
        ]),
        ToastsContainer,
        FormsModule
    ],
    exports: [
        CartComponent
    ]
})

export class CartModule {
}
