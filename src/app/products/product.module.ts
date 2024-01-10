import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/Shared.module";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastsContainer} from "../shared/toast/toasts-container.component";
import {RouterModule} from "@angular/router";
import {ProductsComponent} from "./products.component";


@NgModule({
    declarations: [
        ProductsComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: '', component: ProductsComponent},
        ]),
        ToastsContainer,
        FormsModule
    ],
    exports: [
        ProductsComponent
    ]
})

export class ProductModule {
}
