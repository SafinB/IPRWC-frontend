import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import { HerobannerComponent } from './herobanner/herobanner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastsContainer} from "./shared/toast/toasts-container.component";
import {SharedModule} from "./shared/Shared.module";


@NgModule({
  declarations: [
    AppComponent,
    HerobannerComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        NoopAnimationsModule,
        MatInputModule,
        BrowserAnimationsModule,
        ToastsContainer,
        SharedModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
