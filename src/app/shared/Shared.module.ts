import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NavigationComponent} from "../navigation/navigation.component";
import {FooterComponent} from "../footer/footer.component";
import {ToastsContainer} from "./toast/toasts-container.component";

@NgModule({
    declarations: [
        NavigationComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
        ToastsContainer
    ],
    exports: [
        NavigationComponent,
        FooterComponent,
    ]
})
export class SharedModule { }
